// Function to fetch and inject the component into the page
function includeHTML(componentId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${filePath}: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(componentId).innerHTML = data;
            console.log(`[includeHTML] Successfully loaded ${filePath}.`);
        })
        .catch(error => console.error(`[includeHTML] Error loading component: ${error.message}`));
}

// Include header and footer dynamically
document.addEventListener('DOMContentLoaded', () => {
    console.log('[DOMContentLoaded] DOM fully loaded. Loading common components...');
    includeHTML('header', '../../header.html');
    includeHTML('footer', '../../footer.html');
});
