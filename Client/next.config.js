/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "lh3.googleusercontent.com"
        ],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            }
        ]
    },
    reactStrictMode: false
}

module.exports = nextConfig
