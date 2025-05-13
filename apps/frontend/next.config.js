/** @type {import('next').NextConfig} */
const nextConfig = {
  
    images: {
        remotePatterns: [
              {
                protocol: 'https',
                hostname: 'images.pexels.com',
                port: '',
                pathname: '/**',
              },
              {
                protocol: 'https',
                hostname: 'avatar.iran.liara.run',
                port: '',
                pathname: '/**',
              },
            ],
      },
};

export default nextConfig;
