/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com/**',
                port: '',
                search: '',
            },
        ],
    },

};

export default nextConfig;
