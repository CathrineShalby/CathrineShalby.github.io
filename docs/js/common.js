// Function to fetch and inject the header
function includeHeader(componentId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(componentId).innerHTML = data;
            executeInlineScripts(document.getElementById(componentId));
            console.log("Header included successfully. Running TokenX initialization...");
        })
        .catch(error => console.error('Error loading header:', error));
}

// Re-execute scripts inside the dynamically included content
function executeInlineScripts(element) {
    const scripts = element.querySelectorAll("script");

    scripts.forEach((script) => {
        const newScript = document.createElement("script");
        if (script.src) {
            // External script
            newScript.src = script.src;
        } else {
            // Inline script (e.g., TokenX.init)
            newScript.textContent = script.textContent;
        }
        document.body.appendChild(newScript);
    });
}

// Ensure scripts execute in the correct order after header loads
document.addEventListener('DOMContentLoaded', () => {
    includeHeader('header', 'header.html');
});
