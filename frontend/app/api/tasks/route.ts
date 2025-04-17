import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 모든 업무 조회
export async function GET(request: NextRequest) {
  try {
    // 쿼리 파라미터 가져오기
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    const status = searchParams.get('status');
    
    // 실제 구현에서는 데이터베이스에서 업무 목록을 가져옵니다
    let tasks = [
      {
        id: '1',
        title: '메인 페이지 디자인',
        description: '회사 웹사이트의 메인 페이지 디자인 작업',
        projectId: '1',
        assignees: ['3'], // 이영희(디자이너)
        status: 'completed',
        priority: 'high',
        startDate: '2025-01-20T00:00:00Z',
        dueDate: '2025-02-05T00:00:00Z',
        completedAt: '2025-02-03T00:00:00Z',
        progress: 100,
        tags: ['디자인', '웹사이트'],
        createdBy: '1',
        createdAt: '2025-01-15T00:00:00Z',
        updatedAt: '2025-02-03T00:00:00Z'
      },
      {
        id: '2',
        title: '메인 페이지 개발',
        description: '디자인에 따른 메인 페이지 프론트엔드 개발',
        projectId: '1',
        assignees: ['2'], // 김철수(개발자)
        status: 'in-progress',
        priority: 'high',
        startDate: '2025-02-06T00:00:00Z',
        dueDate: '2025-02-20T00:00:00Z',
        progress: 70,
        tags: ['개발', '프론트엔드'],
        createdBy: '1',
        createdAt: '2025-01-15T00:00:00Z',
        updatedAt: '2025-04-15T00:00:00Z'
      },
      {
        id: '3',
        title: '모바일 앱 UI 설계',
        description: '모바일 앱의 사용자 인터페이스 설계',
        projectId: '2',
        assignees: ['3'], // 이영희(디자이너)
        status: 'in-progress',
        priority: 'medium',
        startDate: '2025-02-15T00:00:00Z',
        dueDate: '2025-03-15T00:00:00Z',
        progress: 50,
        tags: ['디자인', '모바일'],
        createdBy: '1',
        createdAt: '2025-02-10T00:00:00Z',
        updatedAt: '2025-04-10T00:00:00Z'
      }
    ];
    
    // 프로젝트 ID로 필터링
    if (projectId) {
      tasks = tasks.filter(task => task.projectId === projectId);
    }
    
    // 상태로 필터링
    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    console.error('업무 조회 중 오류 발생:', error);
    return NextResponse.json(
      { error: '업무 목록을 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 새 업무 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 필수 필드 검증
    if (!body.title || !body.projectId) {
      return NextResponse.json(
        { error: '업무 제목과 프로젝트 ID는 필수 입력 항목입니다.' },
        { status: 400 }
      );
    }
    
    // 실제 구현에서는 데이터베이스에 업무를 저장합니다
    const newTask = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description || '',
      projectId: body.projectId,
      assignees: body.assignees || [],
      status: body.status || 'todo',
      priority: body.priority || 'medium',
      startDate: body.startDate || null,
      dueDate: body.dueDate || null,
      progress: body.progress || 0,
      tags: body.tags || [],
      createdBy: body.createdBy,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    return NextResponse.json({ task: newTask }, { status: 201 });
  } catch (error) {
    console.error('업무 생성 중 오류 발생:', error);
    return NextResponse.json(
      { error: '업무를 생성하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 이 파일은 업무 API의 기본 라우트를 처리합니다.
// 개별 업무 조회, 수정, 삭제는 [id] 폴더에 구현합니다.
