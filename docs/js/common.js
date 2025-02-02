function includeHTML(componentId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            // Inject the fetched HTML
            document.getElementById(componentId).innerHTML = data;

            // Execute any inline scripts within the injected content
            executeInlineScripts(componentId);
        })
        .catch(error => console.error('Error loading component:', error));
}

function executeInlineScripts(componentId) {
    const container = document.getElementById(componentId);
    const scripts = container.getElementsByTagName('script');

    // Loop through and execute each script
    for (let script of scripts) {
        const newScript = document.createElement('script');
        newScript.text = script.innerHTML; // Inline script execution
        if (script.src) {
            newScript.src = script.src; // For external scripts
        }
        document.body.appendChild(newScript);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    includeHTML('header', 'header.html');
    includeHTML('footer', 'footer.html');
});
