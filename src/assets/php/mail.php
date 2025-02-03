<?php

class DotenvParser
{
    public function load(string $filePath): void
    {
        if (!file_exists($filePath)) {
            return;
        }
        $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            list($key, $value) = explode('=', trim($line));
            putenv("$key=$value");
        }
    }
}

$path = "../../../";

require $path . 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable($path);
$dotenv->load();


// Server-seitige Validierung
if (isset($_POST['subject'], $_POST['email'], $_POST['message'], $_POST['name'])) {
    $subject = $_POST['subject'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $name = $_POST['name'];                         
} else {
    header('Location: .?error=Formular nicht korrekt ausgefüllt');
    exit;
}

// HTML-Nachrichtentext laden
$html = file_get_contents($path . 'src/assets/html/contents.html');

// Dynamische Inhalte in HTML einfügen
$html = str_replace('{{subject}}', $subject, $html);
$html = str_replace('{{message}}', $message, $html);
$html = str_replace('{{email}}', $email, $html);
$html = str_replace('{{name}}', $name, $html);

// PHPMailer-Namespace importieren
use PHPMailer\PHPMailer\PHPMailer;

// Neue PHPMailer-Instanz erstellen
$mail = new PHPMailer();

// SMTP-Einstellungen festlegen
$mail->isSMTP();
$mail->Host = 'mail.manitu.de';
$mail->SMTPAuth = true;
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;
$mail->Username = $_ENV['EMAIL_USERNAME'];
$mail->Password = $_ENV['EMAIL_PASSWORD'];

// Absender- und Empfängerinformationen
$mail->setFrom('noreply@manitu.de', $name);
$mail->addAddress('justwait@justwaitforme.de', 'JustWait');

// HTML-Nachrichtentext und Content-Type festlegen
$mail->msgHTML($html, __DIR__);
$mail->ContentType = 'text/html';

// Combine subject, name, and message for plain text body
$plainTextBody = "Subject: " . $subject . "\n" . "From: " . $name . "\n\n" . $message;

// Set the plain text body
$mail->AltBody = $plainTextBody;

// Betreff festlegen
$mail->Subject = $subject;

// E-Mail versenden und Fehlermeldung behandeln
if (!$mail->send()) {
    header('Location: ' . $path . '?error#contact');
    exit;
} else {
    header('Location:  ' . $path . '.?success#contact');
    exit;
}

?>