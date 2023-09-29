export default {
  async fetch(request, env) {
    let url = new URL(request.url);
    
    // Check if the hostname is "ielts-fighter.com" and replace it with "ieltsfighter.pages.dev"
    if (url.hostname === "ielts-fighter.com") {
      url.hostname = "ieltsfighter.pages.dev";
      let new_request = new Request(url, request);
      return fetch(new_request);
    }
    
    // Check if the pathname starts with '/' and replace links within the response body
    if (url.pathname.startsWith('/')) {
      let response = await fetch(request);
      let text = await response.text();
      
      // Replace all occurrences of "ielts-fighter.com" with "ieltsfighter.pages.dev" in the response text
      text = text.replace(/ielts-fighter\.com/g, 'ieltsfighter.pages.dev');
      
      // Create a new response with the modified body
      return new Response(text, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      });
    }
    
    // Otherwise, serve the static assets.
    return env.ASSETS.fetch(request);
  }
};
