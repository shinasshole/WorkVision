import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 특정 팀 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const teamId = params.id;
    
    // 실제 구현에서는 데이터베이스에서 해당 ID의 팀을 조회합니다
    // 여기서는 예시 데이터를 반환합니다
    const team = {
      id: teamId,
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
    };
    
    // 팀이 존재하지 않는 경우
    if (!team) {
      return NextResponse.json(
        { error: '해당 ID의 팀을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ team }, { status: 200 });
  } catch (error) {
    console.error('팀 조회 중 오류 발생:', error);
    return NextResponse.json(
      { error: '팀 정보를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 팀 정보 업데이트
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const teamId = params.id;
    const body = await request.json();
    
    // 실제 구현에서는 데이터베이스에서 해당 ID의 팀을 업데이트합니다
    const updatedTeam = {
      id: teamId,
      name: body.name || '개발팀',
      description: body.description || '소프트웨어 개발 및 유지보수를 담당하는 팀입니다.',
      leaderId: body.leaderId || '1',
      members: body.members || [
        { userId: '1', role: 'leader', joinedAt: '2025-01-01T00:00:00Z' },
        { userId: '2', role: 'member', joinedAt: '2025-01-05T00:00:00Z' }
      ],
      projects: body.projects || ['1', '2'],
      updatedAt: new Date().toISOString(),
      status: body.status || 'active',
      color: body.color || '#4F46E5'
    };
    
    return NextResponse.json({ team: updatedTeam }, { status: 200 });
  } catch (error) {
    console.error('팀 업데이트 중 오류 발생:', error);
    return NextResponse.json(
      { error: '팀 정보를 업데이트하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 팀 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const teamId = params.id;
    
    // 실제 구현에서는 데이터베이스에서 해당 ID의 팀을 삭제합니다
    // 여기서는 성공 메시지만 반환합니다
    
    return NextResponse.json(
      { message: `ID ${teamId}의 팀이 성공적으로 삭제되었습니다.` },
      { status: 200 }
    );
  } catch (error) {
    console.error('팀 삭제 중 오류 발생:', error);
    return NextResponse.json(
      { error: '팀을 삭제하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 이 파일은 특정 ID를 가진 팀에 대한 조회, 수정, 삭제 작업을 처리합니다.
