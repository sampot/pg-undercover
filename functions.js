/** Optional Playgrounds SAM infrastructure stub. */
export default { async fetch(request) { return Response.json({ ok: true, name: "pg-undercover", path: new URL(request.url).pathname }); } };
/** Optional Playgrounds stub. */
export default {
  async fetch(request) {
    return Response.json({ ok: true, name: "pg-undercover", path: new URL(request.url).pathname });
  },
};
