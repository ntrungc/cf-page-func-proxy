export default {
  async fetch(request, env) {
    let url = new URL(request.url);

    // Check if the request is for a different domain
    if (url.hostname === "khoahoc.vietjack.com") {
      // Replace the domain with "ieltsfighter.pages.dev"
      url.hostname = "khoahoc.vietjack.com";
      let new_request = new Request(url, request);
      const response = await fetch(new_request);

      // Check if the response is an HTML file
      if (response.headers.get("content-type").includes("text/html")) {
        // Read the response text
        const htmlText = await response.text();

        // Add your JavaScript code here
        const injectedScript = '<script>alert("This is injected JavaScript!");</script>';

        // Modify the HTML by appending the injected script
        const modifiedHtmlText = htmlText.replace('</body>', injectedScript + '</body>');

        // Create a new response with the modified HTML
        const modifiedResponse = new Response(modifiedHtmlText, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        });

        return modifiedResponse;
      }

      return response;
    }

    // Otherwise, serve the static assets.
    return env.ASSETS.fetch(request);
  }
};
