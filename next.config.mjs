import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** Where MinIO actually listens; same address the backend signs links for. */
const MINIO_URL = process.env.MINIO_PUBLIC_URL ?? 'http://94.141.81.82:9000';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  /**
   * Mission covers and videos live in MinIO, which the backend hands out as
   * `/uploads/...` paths (MINIO_BROWSER_PREFIX). The admin panel proxies that
   * prefix through nginx; the game needs the same door. Host must stay the
   * MinIO one — a SigV4 signature covers it, and a mismatch answers 403 —
   * which is what a rewrite to an absolute URL does.
   */
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: `${MINIO_URL}/:path*`,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/*',
      },
    ],
  },

  // ⛔️ TEMPORARY – skip ESLint & TypeScript errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withNextIntl(nextConfig);
