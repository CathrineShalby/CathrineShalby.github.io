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
            document.getElementById(componentId).innerHTML = data;
            return executeAndLogScripts(document.getElementById(componentId));
        })
        .catch(error => console.error(`[includeHTML] Error loading component:`, error));
}

function executeAndLogScripts(container) {
    const scripts = container.querySelectorAll("script");
    let externalScripts = [];

    scripts.forEach((script, index) => {
        const newScript = document.createElement("script");
        if (script.src) {
            newScript.src = script.src;
            newScript.async = false; // Ensure proper loading order
            externalScripts.push(new Promise((resolve) => {
                newScript.onload = () => {
                    console.log(`[executeScripts] External script loaded (src: ${script.src})`);
                    resolve();
                };
            }));
        } else {
            newScript.textContent = script.innerHTML;
        }
        document.head.appendChild(newScript);
    });

    // After all external scripts are loaded, execute the inline script
    Promise.all(externalScripts).then(() => {
        console.log("[executeScripts] All external scripts loaded. Executing inline scripts...");
        executeInlineScripts(container);
    });
}

function executeInlineScripts(container) {
    const inlineScripts = container.querySelectorAll("script:not([src])");
    inlineScripts.forEach((script) => {
        try {
            eval(script.innerHTML);  // Caution: Ensure the inline script is safe!
            console.log("[executeScripts] Inline script executed successfully.");
        } catch (e) {
            console.error("[executeScripts] Error executing inline script:", e);
        }
    });
}

// Include header and footer dynamically
document.addEventListener('DOMContentLoaded', () => {
    includeHTMLWithDebugging('header', '../../header.html');
    includeHTMLWithDebugging('footer', '../../footer.html');
});
