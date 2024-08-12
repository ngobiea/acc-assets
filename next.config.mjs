/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // esmExternals: false,
    serverComponentsExternalPackages: ['sequelize', 'sequelize-typescript'],

  },
};


export default nextConfig;

