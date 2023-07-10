/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}


module.exports = nextConfig

module.exports = {
  images: {
    formats:['image/webp']
  },
}