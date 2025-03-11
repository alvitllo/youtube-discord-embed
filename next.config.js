const cdnURL = "https://yt.vitastudio.pro";

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: process.env.NODE_ENV !== "development" ? cdnURL : undefined,

  reactStrictMode: true,

  poweredByHeader: false,

  async redirects() {
    return [
      {
        source: "/",
        destination: "https://github.com/ray-1337/youtube-discord-embed/",
        permanent: true
      },
      {
        source: "/shorts/:ytID",
        destination: "/watch?v=:ytID",
        permanent: false
      }
    ]
  },

  async headers() {
    return [{
      source: "/:path",
      headers: [{
        key: "Content-Security-Policy",
        value: [
          ['default-src', "'self'", cdnURL].concat(process.env.NODE_ENV === "development" ? ["'unsafe-eval'"] : []),
          ['block-all-mixed-content'],
          ['upgrade-insecure-requests']
        ]
        .reduce((prev, [directive, ...policy]) => {
          return `${prev}${directive} ${policy.filter(Boolean).join(' ')};`
        }, '')
      }]
    }]
  }
};

module.exports = nextConfig
