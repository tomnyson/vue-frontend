const { defineConfig } = require('@vue/cli-service');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const axios = require('axios');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: async config => {
    if (process.env.NODE_ENV !== 'production') return;

    // Dynamically fetch routes from the API
    const getDynamicRoutes = async () => {
      const routes = [];
      try {
        const response = await axios.get('https://61a5e3c48395690017be8ed2.mockapi.io/blogs/blogs');
        const posts = response.data;
        posts.forEach(post => {
          routes.push(`/blog/${post.id}`);
        });
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
      return routes;
    };

    // Fetch dynamic routes before pushing PrerenderSPAPlugin into the plugins array
    const routes = ['/'].concat(await getDynamicRoutes());

    config.plugins.push(
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, 'dist'),
        routes,
        renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
          renderAfterTime: 5000, // Wait for 5 seconds to ensure everything loads
          headless: true,
        }),
      })
    );


  },
});