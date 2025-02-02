const routes = {
    "/": "/index.html",
    "/blog": "/blog.html",
    "/vector-embedding": "posts/vector-embedding.html",
    "/ssl": "posts/ssl.html",
    "/2025-cyber-trends": "posts/2025-cyber-trends.html",
  
};

// Navigate to a route
async function navigateTo(url) {
    history.pushState(null, null, url);
    const route = routes[url] || "pages/404.html";  // Fallback to 404 page if not found
    try {
        const response = await fetch(route);
        const content = await response.ok ? await response.text() : `<h1>Page Not Found</h1>`;
        document.getElementById("content").innerHTML = content;
    } catch (error) {
        console.error("Error loading content", error);
    }
}

// Handle link clicks
document.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        navigateTo(e.target.href);
    }
});

// Handle back/forward buttons
window.addEventListener("popstate", () => {
    navigateTo(window.location.pathname);
});

// Initial page load
navigateTo(window.location.pathname);
