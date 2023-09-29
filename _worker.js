export default {
  async fetch(request, env) {
    let url = new URL(request.url);
    if (url.hostname === "khoahoc.vietjack.com") {
      // Replace the domain with "ieltsfighter.pages.dev"
      url.hostname = "ieltsfighter.pages.dev";
      let new_request = new Request(url, request);
      return fetch(new_request);
    }
    // Otherwise, serve the static assets.
    return env.ASSETS.fetch(request);
  }
};
