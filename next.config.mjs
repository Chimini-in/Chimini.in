/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/home', destination: '/index.html' },
      { source: '/shop', destination: '/shop.html' },
      { source: '/collections', destination: '/collections.html' },
      { source: '/gifts', destination: '/gifts.html' },
      { source: '/about', destination: '/about.html' },
      { source: '/contact', destination: '/contact.html' }
    ];
  }
};

export default nextConfig;
