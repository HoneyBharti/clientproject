/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/quickbooksAuth',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:5001/studio-8784786518-2e560/us-central1/quickbooksAuth'
            : '/api/quickbooksAuth',
      },
      {
        source: '/quickbooksCallback',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:5001/studio-8784786518-2e560/us-central1/quickbooksCallback'
            : '/api/quickbooksCallback',
      },
    ];
  },
};

export default nextConfig;
