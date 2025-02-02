function includeHTML(componentId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(componentId).innerHTML = data;
            executeInlineScripts(componentId);
        })
        .catch(error => console.error('Error loading component:', error));
}

function executeInlineScripts(componentId) {
    const container = document.getElementById(componentId);
    const scripts = container.querySelectorAll('script');

    scripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.type = 'text/javascript';

        if (script.src) {
            // If it's an external script, re-add it to the DOM
            newScript.src = script.src;
        } else {
            // Inline scripts (like TokenX.init)
            newScript.textContent = script.innerHTML;
        }

        document.body.appendChild(newScript);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    includeHTML('header', 'header.html');
    includeHTML('footer', 'footer.html');
});
