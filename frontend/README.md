# 업무현황 공유 플랫폼

이 프로젝트는 회사 등 집단 내에서 업무현황을 공유할 수 있는 웹/앱 서비스입니다. 사용자들은 날짜별로 프로젝트 진행상황과 보고를 올리고, 이에 대한 피드백을 댓글 형식으로 주고받을 수 있습니다.

## 주요 기능

- 날짜별 프로젝트 진행상황 보고 및 조회
- 실시간 댓글 형식의 피드백 시스템
- 프로젝트 및 업무 카테고리 관리
- 사용자 권한 관리 (관리자, 팀장, 팀원 등)
- 알림 시스템 (새로운 보고서, 댓글, 멘션 등)
- 대시보드를 통한 프로젝트 현황 시각화
- 모바일 앱을 통한 접근성 향상

## 기술 스택

### 프론트엔드
- **웹**: Next.js (React), TypeScript
- **상태 관리**: Zustand
- **UI 라이브러리**: Tailwind CSS
- **데이터 페칭**: React Query

### 모바일 앱
- **프레임워크**: React Native
- **상태 관리**: Zustand
- **UI 컴포넌트**: React Native Paper

### 백엔드
- **API 서버**: Node.js, Express.js
- **데이터베이스**: MongoDB (NoSQL)
- **인증**: JWT, OAuth 2.0
- **실시간 통신**: Socket.io

## 개발 환경 설정

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 프로젝트 클론
git clone [repository-url]
cd 업무현황공유플랫폼

# 프론트엔드 설치 및 실행
cd frontend
npm install
npm run dev

# 백엔드 설치 및 실행 (별도 터미널에서)
cd backend
npm install
npm run dev
```

## 프로젝트 구조

```
업무현황공유플랫폼/
├── frontend/               # 프론트엔드 코드
│   ├── app/                # Next.js App Router
│   ├── components/         # 재사용 가능한 컴포넌트
│   ├── public/             # 정적 파일
│   └── ...
├── backend/                # 백엔드 코드
│   ├── controllers/        # API 컨트롤러
│   ├── models/             # 데이터베이스 모델
│   ├── routes/             # API 라우트
│   └── ...
└── 설계문서.md              # 프로젝트 설계 문서
```

## 브라우저 지원

- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)

## 라이센스

이 프로젝트는 MIT 라이센스를 따릅니다.
