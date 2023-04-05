const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      features: path.resolve(__dirname, 'src/features/'),
      modules: path.resolve(__dirname, 'src/modules/'),
      shared: path.resolve(__dirname, 'src/shared/'),
      hooks: path.resolve(__dirname, 'src/hooks/'),
    },
  },
};
