/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 14에서 권장되는 설정
  reactStrictMode: true,
  swcMinify: true,
  
  // 이미지 최적화 설정
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: process.env.NODE_ENV === 'production', // 프로덕션 환경에서만 비활성화
  },
  
  // 환경 변수 설정
  env: {
    APP_NAME: 'WorkVision',
    APP_VERSION: '0.1.0',
  },
  
  // 조건부 설정 - 프로덕션 환경에서만 적용
  ...(process.env.NODE_ENV === 'production' ? {
    output: 'export',
    basePath: '/WorkVision',
    assetPrefix: '/WorkVision/',
  } : {})
};

module.exports = nextConfig;
