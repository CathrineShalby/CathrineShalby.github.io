function includeHTMLWithScriptExecution(componentId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            const component = document.getElementById(componentId);
            component.innerHTML = data;
            executeScriptsWithinHTML(component);
        })
        .catch(error => console.error('Error loading component:', error));
}

function executeScriptsWithinHTML(element) {
    const scripts = element.querySelectorAll('script');

    scripts.forEach(script => {
        const newScript = document.createElement('script');

        if (script.src) {
            // For external scripts (like tokenx-minified.js)
            newScript.src = script.src;
            newScript.async = false; // Ensures correct execution order
        } else {
            // For inline scripts (like TokenX.init)
            newScript.textContent = script.innerHTML;
        }

        document.head.appendChild(newScript);
    });
}

// Load header and footer dynamically
document.addEventListener('DOMContentLoaded', () => {
    includeHTMLWithScriptExecution('header', 'header.html');
    includeHTMLWithScriptExecution('footer', 'footer.html');
});
