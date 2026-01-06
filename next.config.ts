import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/:slug*-Pin-Code-:pincode(\\d{6})',
        destination: '/pincode/:pincode',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
