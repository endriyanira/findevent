/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "cdn1.parksmedia.wdprapps.disney.com",
        port: "",
      },
      {
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        hostname: "cdn-ssl.s7.disneystore.com",
        port: "",
      },
      {
        hostname: "res.cloudinary.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
