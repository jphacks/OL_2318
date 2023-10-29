/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  generateBuildId: async () => {
    // 例えば、ここで最新のコミットハッシュを取得することができます
    return "my-build-id";
  },
  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: `http://host.docker.internal:3000/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
