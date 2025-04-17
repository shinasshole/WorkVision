import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 모든 보고서 조회
export async function GET(request: NextRequest) {
  try {
    // 쿼리 파라미터 가져오기
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const authorId = searchParams.get('authorId');
    const type = searchParams.get('type');
    
    // 실제 구현에서는 데이터베이스에서 보고서 목록을 가져옵니다
    let reports = [
      {
        id: '1',
        title: '웹사이트 리뉴얼 진행 상황 보고',
        content: '# 웹사이트 리뉴얼 진행 상황\n\n## 완료된 작업\n- 메인 페이지 디자인 완료\n- 메인 페이지 개발 70% 진행 중\n\n## 다음 단계\n- 메인 페이지 개발 완료\n- 서브 페이지 디자인 시작',
        author: '1', // 홍길동
        projectId: '1',
        relatedTasks: ['1', '2'],
        type: 'weekly',
        status: 'submitted',
        reviewers: [
          { userId: '2', status: 'reviewed', comment: '잘 진행되고 있습니다.', reviewedAt: '2025-04-16T15:30:00Z' }
        ],
        comments: ['1'],
        createdAt: '2025-04-15T10:00:00Z',
        updatedAt: '2025-04-15T10:00:00Z',
        submittedAt: '2025-04-15T10:30:00Z',
        period: {
          start: '2025-04-08T00:00:00Z',
          end: '2025-04-14T23:59:59Z'
        }
      },
      {
        id: '2',
        title: '모바일 앱 개발 주간 업데이트',
        content: '# 모바일 앱 개발 주간 업데이트\n\n## 완료된 작업\n- UI 설계 50% 진행 중\n\n## 다음 단계\n- UI 설계 완료\n- 프로토타입 개발 시작',
        author: '2', // 김철수
        projectId: '2',
        relatedTasks: ['3'],
        type: 'weekly',
        status: 'submitted',
        reviewers: [
          { userId: '1', status: 'pending' }
        ],
        comments: [],
        createdAt: '2025-04-16T09:00:00Z',
        updatedAt: '2025-04-16T09:00:00Z',
        submittedAt: '2025-04-16T09:30:00Z',
        period: {
          start: '2025-04-08T00:00:00Z',
          end: '2025-04-14T23:59:59Z'
        }
      }
    ];
    
    // 프로젝트 ID로 필터링
    if (projectId) {
      reports = reports.filter(report => report.projectId === projectId);
    }
    
    // 작성자 ID로 필터링
    if (authorId) {
      reports = reports.filter(report => report.author === authorId);
    }
    
    // 보고서 유형으로 필터링
    if (type) {
      reports = reports.filter(report => report.type === type);
    }

    return NextResponse.json({ reports }, { status: 200 });
  } catch (error) {
    console.error('보고서 조회 중 오류 발생:', error);
    return NextResponse.json(
      { error: '보고서 목록을 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 새 보고서 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 필수 필드 검증
    if (!body.title || !body.content || !body.author || !body.projectId || !body.type) {
      return NextResponse.json(
        { error: '제목, 내용, 작성자 ID, 프로젝트 ID, 보고서 유형은 필수 입력 항목입니다.' },
        { status: 400 }
      );
    }
    
    // 실제 구현에서는 데이터베이스에 보고서를 저장합니다
    const newReport = {
      id: Date.now().toString(),
      title: body.title,
      content: body.content,
      author: body.author,
      projectId: body.projectId,
      relatedTasks: body.relatedTasks || [],
      type: body.type,
      status: body.status || 'draft',
      reviewers: body.reviewers || [],
      comments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      submittedAt: body.status === 'submitted' ? new Date().toISOString() : null,
      period: body.period || null
    };
    
    return NextResponse.json({ report: newReport }, { status: 201 });
  } catch (error) {
    console.error('보고서 생성 중 오류 발생:', error);
    return NextResponse.json(
      { error: '보고서를 생성하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 이 파일은 보고서 API의 기본 라우트를 처리합니다.
// 개별 보고서 조회, 수정, 삭제는 [id] 폴더에 구현합니다.
