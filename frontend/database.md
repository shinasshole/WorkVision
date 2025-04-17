# WorkVision 데이터베이스 스키마

WorkVision 애플리케이션의 데이터베이스 스키마 설계 문서입니다. 이 문서는 애플리케이션에서 사용되는 주요 데이터 모델과 관계를 정의합니다.

## 데이터베이스 선택: MongoDB

WorkVision은 유연한 스키마와 빠른 개발 속도를 위해 MongoDB를 사용합니다. MongoDB는 문서 지향 NoSQL 데이터베이스로, JSON과 유사한 BSON 형식으로 데이터를 저장합니다.

## 컬렉션(Collections) 구조

### 1. 사용자(Users)

사용자 정보를 저장하는 컬렉션입니다.

```typescript
interface User {
  _id: ObjectId;                // 사용자 고유 ID
  email: string;                // 이메일 (로그인 ID)
  password: string;             // 암호화된 비밀번호
  name: string;                 // 사용자 이름
  position: string;             // 직책
  department: string;           // 부서
  profileImage?: string;        // 프로필 이미지 URL
  role: 'admin' | 'manager' | 'member'; // 권한 수준
  teams: ObjectId[];            // 소속된 팀 ID 배열
  createdAt: Date;              // 계정 생성 일시
  updatedAt: Date;              // 정보 수정 일시
  lastLogin?: Date;             // 마지막 로그인 일시
  status: 'active' | 'inactive' | 'suspended'; // 계정 상태
  preferences: {                // 사용자 환경설정
    theme: 'light' | 'dark' | 'system';
    notifications: {
      email: boolean;
      push: boolean;
      desktop: boolean;
    };
    language: string;           // 언어 설정 (ko, en 등)
  };
}
```

### 2. 팀(Teams)

팀 정보를 저장하는 컬렉션입니다.

```typescript
interface Team {
  _id: ObjectId;                // 팀 고유 ID
  name: string;                 // 팀 이름
  description: string;          // 팀 설명
  leaderId: ObjectId;           // 팀장 ID (User 참조)
  members: {                    // 팀원 정보
    userId: ObjectId;           // 사용자 ID (User 참조)
    role: 'leader' | 'member';  // 팀 내 역할
    joinedAt: Date;             // 팀 가입 일시
  }[];
  projects: ObjectId[];         // 팀 프로젝트 ID 배열 (Project 참조)
  createdAt: Date;              // 팀 생성 일시
  updatedAt: Date;              // 정보 수정 일시
  status: 'active' | 'archived'; // 팀 상태
  color: string;                // 팀 색상 (UI 표시용)
  icon?: string;                // 팀 아이콘
}
```

### 3. 프로젝트(Projects)

프로젝트 정보를 저장하는 컬렉션입니다.

```typescript
interface Project {
  _id: ObjectId;                // 프로젝트 고유 ID
  name: string;                 // 프로젝트 이름
  description: string;          // 프로젝트 설명
  teamId: ObjectId;             // 담당 팀 ID (Team 참조)
  managerId: ObjectId;          // 프로젝트 관리자 ID (User 참조)
  members: {                    // 프로젝트 멤버
    userId: ObjectId;           // 사용자 ID (User 참조)
    role: string;               // 프로젝트 내 역할
    assignedAt: Date;           // 배정 일시
  }[];
  startDate: Date;              // 시작일
  dueDate: Date;                // 마감일
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold'; // 프로젝트 상태
  progress: number;             // 진행률 (0-100)
  priority: 'low' | 'medium' | 'high'; // 우선순위
  tasks: ObjectId[];            // 관련 업무 ID 배열 (Task 참조)
  tags: string[];               // 태그
  createdAt: Date;              // 생성 일시
  updatedAt: Date;              // 수정 일시
  files: {                      // 관련 파일
    name: string;               // 파일명
    url: string;                // 파일 URL
    type: string;               // 파일 타입
    size: number;               // 파일 크기
    uploadedAt: Date;           // 업로드 일시
    uploadedBy: ObjectId;       // 업로더 ID (User 참조)
  }[];
}
```

### 4. 업무(Tasks)

개별 업무 항목을 저장하는 컬렉션입니다.

```typescript
interface Task {
  _id: ObjectId;                // 업무 고유 ID
  title: string;                // 업무 제목
  description: string;          // 업무 설명
  projectId: ObjectId;          // 소속 프로젝트 ID (Project 참조)
  assignees: ObjectId[];        // 담당자 ID 배열 (User 참조)
  status: 'todo' | 'in-progress' | 'review' | 'completed'; // 업무 상태
  priority: 'low' | 'medium' | 'high'; // 우선순위
  startDate?: Date;             // 시작일
  dueDate?: Date;               // 마감일
  completedAt?: Date;           // 완료일
  progress: number;             // 진행률 (0-100)
  parentTask?: ObjectId;        // 상위 업무 ID (Task 참조)
  subTasks: ObjectId[];         // 하위 업무 ID 배열 (Task 참조)
  tags: string[];               // 태그
  attachments: {                // 첨부 파일
    name: string;               // 파일명
    url: string;                // 파일 URL
    type: string;               // 파일 타입
    size: number;               // 파일 크기
    uploadedAt: Date;           // 업로드 일시
  }[];
  comments: ObjectId[];         // 댓글 ID 배열 (Comment 참조)
  createdBy: ObjectId;          // 생성자 ID (User 참조)
  createdAt: Date;              // 생성 일시
  updatedAt: Date;              // 수정 일시
  estimatedHours?: number;      // 예상 소요 시간
  actualHours?: number;         // 실제 소요 시간
}
```

### 5. 보고서(Reports)

업무 보고서를 저장하는 컬렉션입니다.

```typescript
interface Report {
  _id: ObjectId;                // 보고서 고유 ID
  title: string;                // 보고서 제목
  content: string;              // 보고서 내용 (마크다운 또는 HTML)
  author: ObjectId;             // 작성자 ID (User 참조)
  projectId: ObjectId;          // 관련 프로젝트 ID (Project 참조)
  relatedTasks: ObjectId[];     // 관련 업무 ID 배열 (Task 참조)
  type: 'daily' | 'weekly' | 'monthly' | 'project'; // 보고서 유형
  status: 'draft' | 'submitted' | 'reviewed' | 'approved'; // 보고서 상태
  reviewers: {                  // 검토자 정보
    userId: ObjectId;           // 검토자 ID (User 참조)
    status: 'pending' | 'reviewed' | 'approved' | 'rejected'; // 검토 상태
    comment?: string;           // 검토 의견
    reviewedAt?: Date;          // 검토 일시
  }[];
  attachments: {                // 첨부 파일
    name: string;               // 파일명
    url: string;                // 파일 URL
    type: string;               // 파일 타입
    size: number;               // 파일 크기
    uploadedAt: Date;           // 업로드 일시
  }[];
  comments: ObjectId[];         // 댓글 ID 배열 (Comment 참조)
  createdAt: Date;              // 생성 일시
  updatedAt: Date;              // 수정 일시
  submittedAt?: Date;           // 제출 일시
  period?: {                    // 보고 기간
    start: Date;                // 시작일
    end: Date;                  // 종료일
  };
  metrics?: {                   // 성과 지표
    key: string;                // 지표명
    value: number;              // 지표값
    target?: number;            // 목표값
    unit?: string;              // 단위
  }[];
}
```

### 6. 댓글(Comments)

보고서나 업무에 대한 댓글을 저장하는 컬렉션입니다.

```typescript
interface Comment {
  _id: ObjectId;                // 댓글 고유 ID
  content: string;              // 댓글 내용
  author: ObjectId;             // 작성자 ID (User 참조)
  targetType: 'task' | 'report'; // 댓글 대상 유형
  targetId: ObjectId;           // 댓글 대상 ID (Task 또는 Report 참조)
  parentComment?: ObjectId;     // 상위 댓글 ID (대댓글인 경우)
  mentions: ObjectId[];         // 멘션된 사용자 ID 배열 (User 참조)
  attachments: {                // 첨부 파일
    name: string;               // 파일명
    url: string;                // 파일 URL
    type: string;               // 파일 타입
    size: number;               // 파일 크기
  }[];
  createdAt: Date;              // 생성 일시
  updatedAt: Date;              // 수정 일시
  isEdited: boolean;            // 수정 여부
  reactions: {                  // 반응 정보
    type: string;               // 반응 유형 (예: 'like', 'heart', 'smile')
    users: ObjectId[];          // 반응한 사용자 ID 배열 (User 참조)
  }[];
}
```

### 7. 알림(Notifications)

사용자 알림을 저장하는 컬렉션입니다.

```typescript
interface Notification {
  _id: ObjectId;                // 알림 고유 ID
  userId: ObjectId;             // 수신자 ID (User 참조)
  type: 'mention' | 'comment' | 'assignment' | 'deadline' | 'status_change' | 'report_submission'; // 알림 유형
  title: string;                // 알림 제목
  message: string;              // 알림 내용
  sourceType: 'task' | 'report' | 'project' | 'comment' | 'user'; // 알림 발생 소스 유형
  sourceId: ObjectId;           // 알림 발생 소스 ID
  createdAt: Date;              // 생성 일시
  isRead: boolean;              // 읽음 상태
  actionUrl?: string;           // 알림 클릭 시 이동할 URL
  sender?: ObjectId;            // 발신자 ID (User 참조, 있는 경우)
  priority: 'low' | 'normal' | 'high'; // 알림 중요도
}
```

### 8. 일정(Events)

일정 정보를 저장하는 컬렉션입니다.

```typescript
interface Event {
  _id: ObjectId;                // 일정 고유 ID
  title: string;                // 일정 제목
  description?: string;         // 일정 설명
  start: Date;                  // 시작 일시
  end: Date;                    // 종료 일시
  allDay: boolean;              // 종일 일정 여부
  location?: string;            // 장소
  organizer: ObjectId;          // 주최자 ID (User 참조)
  attendees: {                  // 참석자 정보
    userId: ObjectId;           // 사용자 ID (User 참조)
    status: 'pending' | 'accepted' | 'declined'; // 참석 상태
    responseTime?: Date;        // 응답 시간
  }[];
  relatedProject?: ObjectId;    // 관련 프로젝트 ID (Project 참조)
  relatedTask?: ObjectId;       // 관련 업무 ID (Task 참조)
  recurrence?: {                // 반복 설정
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'; // 반복 주기
    interval: number;           // 반복 간격
    endDate?: Date;             // 반복 종료일
    count?: number;             // 반복 횟수
    byDay?: string[];           // 반복 요일 (예: ['MO', 'WE', 'FR'])
  };
  reminders: {                  // 알림 설정
    time: number;               // 알림 시간 (분 단위, 일정 시작 전)
    type: 'email' | 'push' | 'both'; // 알림 방식
  }[];
  color?: string;               // 일정 색상 (UI 표시용)
  isPrivate: boolean;           // 비공개 여부
  createdAt: Date;              // 생성 일시
  updatedAt: Date;              // 수정 일시
  attachments?: {               // 첨부 파일
    name: string;               // 파일명
    url: string;                // 파일 URL
    type: string;               // 파일 타입
    size: number;               // 파일 크기
  }[];
}
```

### 9. 활동 로그(ActivityLogs)

시스템 내 주요 활동을 기록하는 컬렉션입니다.

```typescript
interface ActivityLog {
  _id: ObjectId;                // 로그 고유 ID
  userId: ObjectId;             // 활동 수행 사용자 ID (User 참조)
  action: string;               // 수행한 활동 (예: 'create', 'update', 'delete', 'comment')
  targetType: 'user' | 'team' | 'project' | 'task' | 'report' | 'comment'; // 대상 유형
  targetId: ObjectId;           // 대상 ID
  details: object;              // 상세 정보 (변경 내용 등)
  timestamp: Date;              // 활동 시간
  ipAddress?: string;           // IP 주소
  userAgent?: string;           // 사용자 에이전트 정보
}
```

## 인덱스 설계

효율적인 쿼리 성능을 위한 인덱스 설계입니다.

```javascript
// Users 컬렉션 인덱스
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "name": 1 });
db.users.createIndex({ "department": 1 });
db.users.createIndex({ "teams": 1 });

// Teams 컬렉션 인덱스
db.teams.createIndex({ "name": 1 });
db.teams.createIndex({ "leaderId": 1 });
db.teams.createIndex({ "members.userId": 1 });
db.teams.createIndex({ "status": 1 });

// Projects 컬렉션 인덱스
db.projects.createIndex({ "name": 1 });
db.projects.createIndex({ "teamId": 1 });
db.projects.createIndex({ "managerId": 1 });
db.projects.createIndex({ "members.userId": 1 });
db.projects.createIndex({ "status": 1 });
db.projects.createIndex({ "dueDate": 1 });

// Tasks 컬렉션 인덱스
db.tasks.createIndex({ "projectId": 1 });
db.tasks.createIndex({ "assignees": 1 });
db.tasks.createIndex({ "status": 1 });
db.tasks.createIndex({ "dueDate": 1 });
db.tasks.createIndex({ "createdBy": 1 });

// Reports 컬렉션 인덱스
db.reports.createIndex({ "author": 1 });
db.reports.createIndex({ "projectId": 1 });
db.reports.createIndex({ "type": 1 });
db.reports.createIndex({ "status": 1 });
db.reports.createIndex({ "submittedAt": 1 });

// Comments 컬렉션 인덱스
db.comments.createIndex({ "author": 1 });
db.comments.createIndex({ "targetType": 1, "targetId": 1 });
db.comments.createIndex({ "mentions": 1 });

// Notifications 컬렉션 인덱스
db.notifications.createIndex({ "userId": 1 });
db.notifications.createIndex({ "isRead": 1 });
db.notifications.createIndex({ "createdAt": 1 });

// Events 컬렉션 인덱스
db.events.createIndex({ "organizer": 1 });
db.events.createIndex({ "attendees.userId": 1 });
db.events.createIndex({ "start": 1 });
db.events.createIndex({ "end": 1 });
db.events.createIndex({ "relatedProject": 1 });

// ActivityLogs 컬렉션 인덱스
db.activityLogs.createIndex({ "userId": 1 });
db.activityLogs.createIndex({ "timestamp": 1 });
db.activityLogs.createIndex({ "targetType": 1, "targetId": 1 });
```

## 데이터 관계 다이어그램

```
User <---> Team (다대다 관계: 사용자는 여러 팀에 속할 수 있고, 팀은 여러 사용자를 가질 수 있음)
Team <---> Project (일대다 관계: 팀은 여러 프로젝트를 가질 수 있음)
Project <---> Task (일대다 관계: 프로젝트는 여러 업무를 가질 수 있음)
User <---> Task (다대다 관계: 사용자는 여러 업무를 담당할 수 있고, 업무는 여러 담당자를 가질 수 있음)
User <---> Report (일대다 관계: 사용자는 여러 보고서를 작성할 수 있음)
Project <---> Report (일대다 관계: 프로젝트는 여러 보고서를 가질 수 있음)
Task/Report <---> Comment (일대다 관계: 업무/보고서는 여러 댓글을 가질 수 있음)
User <---> Notification (일대다 관계: 사용자는 여러 알림을 받을 수 있음)
User <---> Event (다대다 관계: 사용자는 여러 일정에 참여할 수 있고, 일정은 여러 참석자를 가질 수 있음)
```

## 데이터 마이그레이션 및 백업 전략

1. **정기적인 백업**: 매일 전체 데이터베이스 백업 및 주간 증분 백업
2. **지리적 복제**: 주 데이터베이스와 지리적으로 분산된 복제본 유지
3. **시점 복구(Point-in-time Recovery)**: 특정 시점으로 복구할 수 있는 기능 구현
4. **마이그레이션 스크립트**: 스키마 변경 시 데이터 마이그레이션을 위한 스크립트 관리

## 성능 최적화 전략

1. **인덱스 최적화**: 자주 사용되는 쿼리 패턴에 맞는 인덱스 설계
2. **샤딩(Sharding)**: 데이터 증가에 따른 수평적 확장을 위한 샤딩 전략 수립
3. **캐싱**: 자주 접근하는 데이터에 대한 캐싱 레이어 구현
4. **쿼리 최적화**: 복잡한 집계 쿼리의 성능 개선을 위한 전략 수립
5. **데이터 수명 주기 관리**: 오래된 데이터의 아카이빙 및 삭제 정책 수립
