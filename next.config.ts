/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "isrrdeirbljebcmyeqxq.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    // ✅ Autorise les IPs privées en développement
    dangerouslyAllowSVG: true,
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;