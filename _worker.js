export default {
  async fetch(request, env) {
    let url = new URL(request.url);
    
    // Check if the request URL contains "ielts-fighter.com"
    if (url.href.includes("ielts-fighter.com")) {
      // Replace "ielts-fighter.com" with "ieltsfighter.pages.dev" in the URL
      url.href = url.href.replace("ielts-fighter.com", "ieltsfighter.pages.dev");

      // Create a new request with the modified URL
      let new_request = new Request(url, request);

      // Fetch the modified request
      return fetch(new_request);
    }

    // Otherwise, serve the static assets.
    return env.ASSETS.fetch(request);
  }
};
