if (window.location.search.includes('error') || window.location.search.includes('success')) {
    if (window.location.search.includes('error')) {
        document.getElementById('error').classList.add('show-result');
    } else if (window.location.search.includes('success')) {
        document.getElementById('success').classList.add('show-result');
    }
}



