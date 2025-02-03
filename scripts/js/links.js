setTimeout(() => {
    fetch('../config/links.json')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.links-container');
            const links = data.links.map(link =>
                `
            <a class="link-item" href="${link.url}" target="_blank">
                <i class="fab fa-${link.icon}">
                </i>
                ${link.name}
            </a>
            `).join('');

            container.innerHTML = links;
        })
        .catch(error => console.error('Error fetching links:', error));
}, 1000)
