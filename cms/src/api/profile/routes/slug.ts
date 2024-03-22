export default {
  routes: [
    {
      method: "GET",
      path: "/profiles/slug/:slug",
      handler: "profile.findBySlug",
    },
  ],
};
