/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: "http://localhost:5000/"
    },
    images: {
        domains: ['drive.google.com'],
        
    }
}

module.exports = nextConfig
