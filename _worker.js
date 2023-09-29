export default {
  async fetch(request, env) {
    let url = new URL(request.url);

    // Check if the request is for a URL containing "ielts-fighter.com"
    if (url.href.includes("ielts-fighter.com")) {
      // Replace all occurrences of "ielts-fighter.com" with "ieltsfighter.pages.dev"
      const modifiedHtml = await modifyHtmlResponse(request, env);
      return new Response(modifiedHtml, {
        status: 200,
        statusText: "OK",
        headers: {
          "Content-Type": "text/html",
        },
      });
    }

    // Otherwise, continue with the original request
    return fetch(request);
  },
};

async function modifyHtmlResponse(request, env) {
  // Fetch the original HTML response
  const response = await fetch(request);

  // Read the response text as a string
  const originalHtml = await response.text();

  // Modify the HTML content to replace all occurrences of "ielts-fighter.com"
  // with "ieltsfighter.pages.dev"
  const modifiedHtml = originalHtml.replace(/ielts-fighter\.com/g, "ieltsfighter.pages.dev");

  return modifiedHtml;
}
