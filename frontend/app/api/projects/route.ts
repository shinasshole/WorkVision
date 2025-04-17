import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 모든 프로젝트 조회
export async function GET(request: NextRequest) {
  try {
    // 실제 구현에서는 데이터베이스에서 프로젝트 목록을 가져옵니다
    const projects = [
      {
        id: '1',
        name: '웹사이트 리뉴얼',
        description: '회사 웹사이트 디자인 및 기능 개선 프로젝트',
        teamId: '1',
        managerId: '1',
        members: [
          { userId: '1', role: '프로젝트 관리자', assignedAt: '2025-01-10T00:00:00Z' },
          { userId: '2', role: '개발자', assignedAt: '2025-01-12T00:00:00Z' },
          { userId: '3', role: '디자이너', assignedAt: '2025-01-15T00:00:00Z' }
        ],
        startDate: '2025-01-15T00:00:00Z',
        dueDate: '2025-05-15T00:00:00Z',
        status: 'in-progress',
        progress: 75,
        priority: 'high',
        createdAt: '2025-01-10T00:00:00Z',
        updatedAt: '2025-04-15T00:00:00Z'
      },
      {
        id: '2',
        name: '모바일 앱 개발',
        description: '신규 모바일 앱 MVP 개발',
        teamId: '1',
        managerId: '1',
        members: [
          { userId: '1', role: '프로젝트 관리자', assignedAt: '2025-02-01T00:00:00Z' },
          { userId: '2', role: '개발자', assignedAt: '2025-02-05T00:00:00Z' }
        ],
        startDate: '2025-02-15T00:00:00Z',
        dueDate: '2025-06-30T00:00:00Z',
        status: 'in-progress',
        progress: 30,
        priority: 'medium',
        createdAt: '2025-02-01T00:00:00Z',
        updatedAt: '2025-04-10T00:00:00Z'
      }
    ];

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error('프로젝트 조회 중 오류 발생:', error);
    return NextResponse.json(
      { error: '프로젝트 목록을 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 새 프로젝트 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 필수 필드 검증
    if (!body.name || !body.teamId || !body.managerId) {
      return NextResponse.json(
        { error: '프로젝트 이름, 팀 ID, 관리자 ID는 필수 입력 항목입니다.' },
        { status: 400 }
      );
    }
    
    // 실제 구현에서는 데이터베이스에 프로젝트를 저장합니다
    const newProject = {
      id: Date.now().toString(),
      name: body.name,
      description: body.description || '',
      teamId: body.teamId,
      managerId: body.managerId,
      members: [
        { userId: body.managerId, role: '프로젝트 관리자', assignedAt: new Date().toISOString() }
      ],
      startDate: body.startDate || new Date().toISOString(),
      dueDate: body.dueDate || '',
      status: body.status || 'planning',
      progress: body.progress || 0,
      priority: body.priority || 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    return NextResponse.json({ project: newProject }, { status: 201 });
  } catch (error) {
    console.error('프로젝트 생성 중 오류 발생:', error);
    return NextResponse.json(
      { error: '프로젝트를 생성하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 이 파일은 프로젝트 API의 기본 라우트를 처리합니다.
// 개별 프로젝트 조회, 수정, 삭제는 [id] 폴더에 구현합니다.
