/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 100,
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
