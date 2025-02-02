// Function to fetch and inject the header and run its scripts
function includeHeaderWithScripts(componentId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            const container = document.getElementById(componentId);
            container.innerHTML = data;

            // Execute external and inline scripts
            executeScripts(container);
        })
        .catch(error => console.error('Error loading header:', error));
}

// Function to re-execute scripts within the included header
function executeScripts(container) {
    const scripts = container.querySelectorAll('script');

    scripts.forEach((script) => {
        const newScript = document.createElement('script');
        if (script.src) {
            // Re-trigger external scripts
            newScript.src = script.src;
        } else {
            // Re-trigger inline scripts like TokenX.init()
            newScript.textContent = script.innerHTML;
        }
        document.body.appendChild(newScript);  // Ensure script runs in the DOM context
    });
}

// Run header injection on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    includeHeaderWithScripts('header', 'header.html');
});
