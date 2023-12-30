module.exports = {
  resolve: {
    fallback: { zlib: require.resolve("browserify-zlib") },
  },
  resolve: {
    fallback: { querystring: require.resolve("querystring-es3") },
  },
};
