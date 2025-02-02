function includeHTML(componentId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(componentId).innerHTML = data;
            executeScriptsSequentially(componentId);
        })
        .catch(error => console.error('Error loading component:', error));
}

function executeScriptsSequentially(componentId) {
    const container = document.getElementById(componentId);
    const scripts = container.querySelectorAll('script');

    (async function execute() {
        for (const script of scripts) {
            if (script.src) {
                // Handle external scripts dynamically
                await loadExternalScript(script.src);
            } else {
                // Handle inline scripts
                eval(script.innerHTML);
            }
        }
    })();
}

function loadExternalScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.type = 'text/javascript';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// Include common components dynamically
document.addEventListener('DOMContentLoaded', () => {
    includeHTML('header', 'header.html');
    includeHTML('footer', 'footer.html');
});
