function includeHTML(componentId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(componentId).innerHTML = data;

            // After header is loaded, initialize TokenX
            if (componentId === 'header') {
                loadAndInitTokenX();
            }
        })
        .catch(error => console.error('Error loading component:', error));
}

function loadAndInitTokenX() {
    // Dynamically load the TokenX library
    const tokenXScript = document.createElement('script');
    tokenXScript.src = "https://tokenx.qcri.org/libs/js/tokenx-minified.js";
    tokenXScript.onload = () => {
        // Initialize TokenX after the script has fully loaded
        TokenX.init({
            userId: 7777,
            apiBaseUrl: "https://tokenx.qcri.org/api",
        });
        console.log("TokenX successfully initialized.");
    };
    document.body.appendChild(tokenXScript);
}

document.addEventListener('DOMContentLoaded', () => {
    includeHTML('header', 'header.html');
    includeHTML('footer', 'footer.html');
});
