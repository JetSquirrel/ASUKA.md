export async function onRequest(context) {
  const url = new URL(context.request.url);
  url.pathname = "/friend/rei.md";
  
  const response = await fetch(url.toString());
  
  if (!response.ok) {
    return new Response("Not found", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" }});
  }
  
  const content = await response.text();
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}