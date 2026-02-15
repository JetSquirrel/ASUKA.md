export async function onRequest(context) {
  const url = new URL(context.request.url);
  url.pathname = "/ASUKA.md";
  
  const asukaDoc = await fetch(url.toString());
  
  if (!asukaDoc.ok) {
    return new Response("Soul document not found", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" }});
  }
  
  const content = await asukaDoc.text();
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}