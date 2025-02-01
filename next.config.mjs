/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (config) => {
  //   config.externals = [...config.externals, { canvas: "canvas" }]; // Required for GSAP
  //   return config;
  // },
  images: {
    domains: ["plus.unsplash.com"],
  },
};

export default nextConfig;
