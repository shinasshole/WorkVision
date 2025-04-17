/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 14에서 권장되는 설정
  reactStrictMode: true,
  swcMinify: true,
  
  // 이미지 최적화 설정
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
    formats: ['image/avif', 'image/webp'],
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
// reactStrictMode: 개발 중 잠재적 문제를 조기에 발견하기 위한 React의 엄격 모드 활성화
// swcMinify: Rust 기반 컴파일러인 SWC를 사용하여 JavaScript 코드 최적화
// images: 이미지 최적화 관련 설정으로, 외부 이미지 도메인 및 포맷 지정
// env: 클라이언트 측에서 접근 가능한 환경 변수 설정
// experimental: Next.js의 실험적 기능 활성화 (서버 액션 등)
// distDir: 빌드 결과물이 저장될 디렉토리 지정
// webpack: 웹팩 설정을 커스터마이징할 수 있는 함수
