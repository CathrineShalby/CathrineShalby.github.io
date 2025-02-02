function includeHTML(componentId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            // Inject the HTML into the component
            document.getElementById(componentId).innerHTML = data;

            // Find and execute any scripts inside the injected HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = data;
            const scripts = tempDiv.querySelectorAll('script');

            scripts.forEach((script) => {
                const newScript = document.createElement('script');
                
                if (script.src) {
                    // If the script has a src attribute, copy and append it
                    newScript.src = script.src;
                    newScript.async = false; // Ensures order of execution
                } else {
                    // If inline, copy the content and execute it
                    newScript.innerHTML = script.innerHTML;
                }
                
                document.body.appendChild(newScript);
            });
        })
        .catch(error => console.error('Error loading component:', error));
}

// Include header and footer
document.addEventListener('DOMContentLoaded', () => {
    includeHTML('header', 'header.html');
    includeHTML('footer', 'footer.html');
});
