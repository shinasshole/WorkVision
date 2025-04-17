# WorkVision - 업무현황 공유 플랫폼

WorkVision은 팀과 조직을 위한 현대적인 업무 관리 및 협업 대시보드 애플리케이션입니다. 사용자들은 프로젝트 진행상황을 추적하고, 업무 보고서를 작성하며, 팀원들과 효율적으로 소통할 수 있습니다.

## 주요 기능

- **직관적인 대시보드**: 주요 업무 지표와 프로젝트 현황을 한눈에 파악
- **프로젝트 관리**: 진행 중인 프로젝트 추적 및 관리
- **업무 보고**: 체계적인 업무 보고서 작성 및 공유
- **팀 관리**: 팀원 정보 및 업무 할당 관리
- **일정 관리**: 개인 및 팀 일정 관리
- **알림 시스템**: 중요 업데이트 및 마감일 알림
- **반응형 디자인**: 모든 디바이스에서 최적화된 사용자 경험

## 기술 스택

### 프론트엔드
- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **아이콘**: React Icons
- **날짜 관리**: date-fns

## 개발 환경 설정

### 필수 요구사항
- Node.js 18.17.0 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 프로젝트 클론
git clone https://github.com/yourusername/WorkVision.git
cd WorkVision/frontend

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버는 기본적으로 http://localhost:3000 에서 실행됩니다.

## 배포

GitHub Pages를 통해 정적 사이트로 배포할 수 있습니다:

```bash
# 빌드 및 배포
npm run deploy
```

## 프로젝트 구조

```
frontend/
├── app/                # Next.js App Router 구조
│   ├── admin/          # 관리자 페이지
│   ├── calendar/       # 일정 관리 페이지
│   ├── notifications/  # 알림 페이지
│   ├── reports/        # 업무 보고 페이지
│   ├── settings/       # 설정 페이지
│   ├── teams/          # 팀 관리 페이지
│   ├── layout.tsx      # 루트 레이아웃
│   ├── page.tsx        # 메인 대시보드 페이지
│   └── globals.css     # 전역 스타일
├── components/         # 재사용 가능한 컴포넌트
│   ├── admin/          # 관리자 관련 컴포넌트
│   ├── calendar/       # 일정 관련 컴포넌트
│   ├── dashboard/      # 대시보드 관련 컴포넌트
│   ├── layout/         # 레이아웃 관련 컴포넌트
│   ├── notifications/  # 알림 관련 컴포넌트
│   ├── reports/        # 보고서 관련 컴포넌트
│   ├── settings/       # 설정 관련 컴포넌트
│   └── teams/          # 팀 관련 컴포넌트
├── contexts/           # React Context API
├── types/              # TypeScript 타입 정의
└── public/             # 정적 파일
```

## 브라우저 지원

- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)

## 라이센스

이 프로젝트는 MIT 라이센스를 따릅니다.
