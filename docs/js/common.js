function includeHTMLWithScriptExecution(componentId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then((data) => {
            document.getElementById(componentId).innerHTML = data;
            executeInlineScripts(document.getElementById(componentId));
        })
        .catch(error => console.error('Error loading component:', error));
}

function executeInlineScripts(element) {
    const scripts = element.querySelectorAll("script");

    scripts.forEach((script) => {
        const newScript = document.createElement("script");
        if (script.src) {
            // External script
            newScript.src = script.src;
        } else {
            // Inline script
            newScript.textContent = script.innerHTML;
        }
        document.head.appendChild(newScript);
    });
}

// Include header and footer dynamically
document.addEventListener('DOMContentLoaded', () => {
    includeHTMLWithScriptExecution('header', 'header.html');
    includeHTMLWithScriptExecution('footer', 'footer.html');
});
