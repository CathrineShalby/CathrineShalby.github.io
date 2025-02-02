function loadHeaderWithScripts(componentId, filePath) {
    document.addEventListener('DOMContentLoaded', () => {
        const container = document.getElementById(componentId);

        if (!container) {
            console.error(`Error: No container found with id "${componentId}"`);
            return;
        }

        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                container.innerHTML = data;

                // Execute both inline and external scripts
                executeScripts(container);
            })
            .catch(error => console.error('Error loading component:', error));
    });
}

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

// Load the header
loadHeaderWithScripts('header', 'header.html');
