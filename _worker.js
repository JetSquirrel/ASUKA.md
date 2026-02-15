export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle /me endpoint for agents
    if (url.pathname === '/me') {
      try {
        // Fetch the ASUKA.md file
        const asukaDoc = await env.ASSETS.fetch(new URL('/ASUKA.md', url.origin));

        if (!asukaDoc.ok) {
          return new Response('Soul document not found', { status: 404 });
        }

        const content = await asukaDoc.text();

        // Return plain text with appropriate headers
        return new Response(content, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        });
      } catch (error) {
        return new Response('Error loading soul document', { status: 500 });
      }
    }

    // For all other routes, serve static assets
    return env.ASSETS.fetch(request);
  },
};
