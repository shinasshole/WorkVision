import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 모든 팀 조회
export async function GET(request: NextRequest) {
  try {
    // 실제 구현에서는 데이터베이스에서 팀 목록을 가져옵니다
    const teams = [
      {
        id: '1',
        name: '개발팀',
        description: '소프트웨어 개발 및 유지보수를 담당하는 팀입니다.',
        leaderId: '1', // 홍길동
        members: [
          { userId: '1', role: 'leader', joinedAt: '2025-01-01T00:00:00Z' },
          { userId: '2', role: 'member', joinedAt: '2025-01-05T00:00:00Z' }
        ],
        projects: ['1', '2'],
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-04-01T00:00:00Z',
        status: 'active',
        color: '#4F46E5'
      },
      {
        id: '2',
        name: '디자인팀',
        description: 'UI/UX 디자인을 담당하는 팀입니다.',
        leaderId: '3', // 이영희
        members: [
          { userId: '3', role: 'leader', joinedAt: '2025-01-02T00:00:00Z' }
        ],
        projects: ['1'],
        createdAt: '2025-01-02T00:00:00Z',
        updatedAt: '2025-03-15T00:00:00Z',
        status: 'active',
        color: '#10B981'
      }
    ];

    return NextResponse.json({ teams }, { status: 200 });
  } catch (error) {
    console.error('팀 조회 중 오류 발생:', error);
    return NextResponse.json(
      { error: '팀 목록을 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 새 팀 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 필수 필드 검증
    if (!body.name || !body.leaderId) {
      return NextResponse.json(
        { error: '팀 이름과 팀장 ID는 필수 입력 항목입니다.' },
        { status: 400 }
      );
    }
    
    // 실제 구현에서는 데이터베이스에 팀을 저장합니다
    const newTeam = {
      id: Date.now().toString(),
      name: body.name,
      description: body.description || '',
      leaderId: body.leaderId,
      members: [
        { userId: body.leaderId, role: 'leader', joinedAt: new Date().toISOString() }
      ],
      projects: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
      color: body.color || '#4F46E5'
    };
    
    return NextResponse.json({ team: newTeam }, { status: 201 });
  } catch (error) {
    console.error('팀 생성 중 오류 발생:', error);
    return NextResponse.json(
      { error: '팀을 생성하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 이 파일은 팀 API의 기본 라우트를 처리합니다.
// 개별 팀 조회, 수정, 삭제는 [id] 폴더에 구현합니다.
