export default {
  async fetch(request, env) {
    let url = new URL(request.url);

    // Check if the request is for a different domain
    if (url.hostname === "khoahoc.vietjack.com") {
      let response = await env.ASSETS.fetch(request);

      // Check if the response is an HTML file
      if (response.headers.get("content-type").includes("text/html")) {
        // Read the response text
        let htmlText = await response.text();

        // Add your JavaScript code here
        let injectedScript = '<script>alert("This is injected JavaScript!");</script>';

        // Inject the JavaScript code into the HTML
        htmlText = htmlText.replace('</body>', injectedScript + '</body>');

        // Create a new response with the modified HTML
        response = new Response(htmlText, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        });
      }

      return response;
    }

    // Otherwise, serve the static assets.
    return env.ASSETS.fetch(request);
  }
};
