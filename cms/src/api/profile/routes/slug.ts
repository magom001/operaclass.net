export default {
  routes: [
    {
      method: "GET",
      path: "/profiles/slugs/all",
      handler: "profile.getAllSlugs",
    },
    {
      method: "GET",
      path: "/profiles/slug/:slug",
      handler: "profile.findBySlug",
    },
    {
      method: "GET",
      path: "/profiles/random/record",
      handler: "profile.getRandom",
    },
  ],
};
