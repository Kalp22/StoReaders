/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Explicitly specify HTTPS for Google Drive
        hostname: "drive.google.com",
      },
    ],
  },
};

module.exports = nextConfig;
