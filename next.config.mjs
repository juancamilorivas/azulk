/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cdn-news.shironam.news",
          port: "",
          pathname: "/storage/shironam-media/**",
        },
      ],
    },
  };
  
  export default nextConfig;