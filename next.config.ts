/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Next.jsはサーバ側で動的にページを作るフレームワークなのでGitHub Pagesのような静的ホスティングサービスでは基本的に動作しない */
  /** Next.jsを静的サイトにビルドしてそれをGitHub Pagesにアップロードする */
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
