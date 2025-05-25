/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async rewrites() {
    return [
      {
        source: '/:lang/assets/:path*',
        destination: '/assets/:path*',
      },
      {
        source: '/:lang/locales/:path*',
        destination: '/locales/:path*',
      },
    ];
  },
}

module.exports = nextConfig 