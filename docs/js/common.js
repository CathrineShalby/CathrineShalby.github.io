// Function to fetch and inject header with scripts
function loadHeaderWithScripts(componentId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            const container = document.getElementById(componentId);
            container.innerHTML = data;

            // Execute both inline and external scripts
            executeScripts(container);
        })
        .catch(error => console.error('Error loading header:', error));
}

// Function to re-execute scripts
function executeScripts(container) {
    const scripts = container.querySelectorAll('script');

    scripts.forEach(script => {
        const newScript = document.createElement('script');
        if (script.src) {
            newScript.src = script.src;
        } else {
            newScript.textContent = script.innerHTML;
        }
        document.body.appendChild(newScript);
    });
}

// Load header on page load
document.addEventListener('DOMContentLoaded', () => {
    loadHeaderWithScripts('header', 'header.html');
});
