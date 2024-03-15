export default {
  routes: [
    {
      method: "GET",
      path: "/pianists/slug/:slug",
      handler: "pianist.findBySlug",
    },
  ],
};
