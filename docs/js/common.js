function includeHTMLWithDebugging(componentId, filePath) {
    console.log(`[includeHTML] Loading component into #${componentId} from ${filePath}...`);

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            console.log(`[includeHTML] Successfully loaded ${filePath}. Injecting into #${componentId}...`);
            const component = document.getElementById(componentId);
            if (!component) {
                throw new Error(`Element with ID #${componentId} not found.`);
            }

            component.innerHTML = data;
            console.log(`[includeHTML] HTML content injected into #${componentId}.`);
            executeAndLogScripts(component);
        })
        .catch(error => {
            console.error(`[includeHTML] Error loading component: ${error}`);
        });
}

function executeAndLogScripts(element) {
    const scripts = element.querySelectorAll('script');

    if (scripts.length === 0) {
        console.warn('[executeScripts] No scripts found in the included component.');
        return;
    }

    scripts.forEach((script, index) => {
        const newScript = document.createElement('script');

        if (script.src) {
            console.log(`[executeScripts] Found external script (src: ${script.src}) at index ${index}.`);
            newScript.src = script.src;
            newScript.async = false; // Ensures correct execution order
        } else {
            console.log(`[executeScripts] Found inline script at index ${index}.`);
            newScript.textContent = script.innerHTML;
        }

        newScript.onload = () => console.log(`[executeScripts] Script loaded successfully.`);
        newScript.onerror = () => console.error(`[executeScripts] Script failed to load.`);

        document.head.appendChild(newScript);
    });
}

// Load header and footer dynamically
document.addEventListener('DOMContentLoaded', () => {
    console.log('[DOMContentLoaded] DOM fully loaded. Loading common components...');
    includeHTMLWithDebugging('header', 'header.html');
    includeHTMLWithDebugging('footer', 'footer.html');
});
