import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
module.exports = {
  images: {
    domains: [
      "images.unsplash.com",
      "unsplash.com",
      "seeklogo.com",
      "images.seeklogo.com",
      "upload.wikimedia.org"
      // add other domains if needed
    ],
  },
};
export default nextConfig;
