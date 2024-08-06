/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.r2.cloudflarestorage.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '',
        pathname: '**',
      },
    ],
  },
  //このプロジェクトをビルドしている時の型エラーを無視する
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
