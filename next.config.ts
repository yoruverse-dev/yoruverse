import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's4.anilist.co',
                port: '',
                pathname: '/file/anilistcdn/character/large/**',
            }
        ]
    }
};

export default nextConfig;
