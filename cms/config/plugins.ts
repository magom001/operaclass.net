export default () => ({
  upload: {
    config: {
      provider: "strapi-provider-upload-imgur",
      providerOptions: {
        clientId: process.env.IMGUR_CLIENT_ID,
      },
    },
  },
});
