/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.icon-icons.com',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig

module.exports = nextConfig