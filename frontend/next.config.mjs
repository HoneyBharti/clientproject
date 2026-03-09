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
        destination: 'https://us-central1-studio-8784786518-2e560.cloudfunctions.net/quickbooksAuth',
      },
      {
        source: '/quickbooksCallback',
        destination: 'https://us-central1-studio-8784786518-2e560.cloudfunctions.net/quickbooksCallback',
      },
      {
        source: '/quickbooksWebhook',
        destination: 'https://us-central1-studio-8784786518-2e560.cloudfunctions.net/quickbooksWebhook',
      },
      {
        source: '/api/createBill',
        destination: 'https://us-central1-studio-8784786518-2e560.cloudfunctions.net/createQuickBooksBill',
      },
      {
        source: '/api/deleteBill',
        destination: 'https://us-central1-studio-8784786518-2e560.cloudfunctions.net/deleteQuickBooksBill',
      },
      {
        source: '/api/getBills',
        destination: 'https://us-central1-studio-8784786518-2e560.cloudfunctions.net/getQuickBooksBills',
      },
      {
        source: '/api/updateBill',
        destination: 'https://us-central1-studio-8784786518-2e560.cloudfunctions.net/updateQuickBooksBill',
      },
      {
        source: '/api/getCompanyInfo',
        destination: 'https://us-central1-studio-8784786518-2e560.cloudfunctions.net/getQuickBooksCompanyInfo',
      },
      {
        source: '/api/createCustomer',
        destination: 'https://us-central1-studio-8784786518-2e560.cloudfunctions.net/createQuickBooksCustomer',
      },
      {
        source: '/api/getCustomers',
        destination: 'https://us-central1-studio-8784786518-2e560.cloudfunctions.net/getQuickBooksCustomers',
      },
      {
        source: '/api/updateCustomer',
        destination: 'https://us-central1-studio-8784786518-2e560.cloudfunctions.net/updateQuickBooksCustomer',
      },
      {
        source: '/api/deleteCustomer',
        destination: 'https://us-central1-studio-8784786518-2e560.cloudfunctions.net/deleteQuickBooksCustomer',
      },
      {
        source: '/api/createAccount',
        destination: 'https://us-central1-studio-8784786518-2e560.cloudfunctions.net/createQuickBooksAccount',
      },
      {
        source: '/api/getAccounts',
        destination: 'https://us-central1-studio-8784786518-2e560.cloudfunctions.net/getQuickBooksAccounts',
      },
      {
        source: '/api/updateAccount',
        destination: 'https://us-central1-studio-8784786518-2e560.cloudfunctions.net/updateQuickBooksAccount',
      },
    ];
  },
};

export default nextConfig;
