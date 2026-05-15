import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],

  // Compressão gzip/brotli de responses
  compress: true,

  // Cache headers
  async headers() {
    return [
      {
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/static/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/(.*\\.webp|.*\\.jpg|.*\\.png|.*\\.ico|.*\\.svg|.*\\.woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Security headers — todas as rotas
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Link", value: "<https://fonts.gstatic.com>; rel=preconnect; crossorigin" },
        ],
      },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 560, 768, 1024, 1280, 1920],
    imageSizes: [64, 128, 256, 384, 640, 800],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "**",
      },
    ],
  },

  experimental: {
    optimizePackageImports: [
      "@once-ui-system/core",
      "lucide-react",
      "framer-motion",
    ],
  },

  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default withMDX(nextConfig);
