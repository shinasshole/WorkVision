/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 14에서 권장되는 설정
  reactStrictMode: true,
  swcMinify: true,
  
  // GitHub Pages 배포를 위한 설정
  output: 'export',
  basePath: '/WorkVision',
  assetPrefix: '/WorkVision/',
  
  // 이미지 최적화 설정
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: true, // GitHub Pages에서는 이미지 최적화 서버를 사용할 수 없으므로 비활성화
  },
  
  // 환경 변수 설정
  env: {
    APP_NAME: 'WorkVision',
    APP_VERSION: '0.1.0',
  },
  
  // 실험적 기능 활성화
  experimental: {
    // App Router 관련 설정
    serverActions: true,
  },
  
  // 빌드 출력 디렉토리 설정
  distDir: '.next',
  
  // 웹팩 설정 (필요한 경우)
  webpack: (config, { isServer }) => {
    // 웹팩 설정 커스터마이징
    return config;
  },
};

module.exports = nextConfig;

// 주석: 
// 이 설정 파일은 Next.js 애플리케이션의 동작을 제어합니다.
// output: 'export' - 정적 HTML 파일로 내보내기 설정
// basePath: '/WorkVision' - GitHub Pages의 리포지토리 이름에 맞춘 기본 경로 설정
// assetPrefix: '/WorkVision/' - 정적 자산(JS, CSS 등)의 경로 접두사 설정
// unoptimized: true - GitHub Pages에서는 이미지 최적화 서버를 사용할 수 없으므로 비활성화
