import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 특정 프로젝트 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;
    
    // 실제 구현에서는 데이터베이스에서 해당 ID의 프로젝트를 조회합니다
    // 여기서는 예시 데이터를 반환합니다
    const project = {
      id: projectId,
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
      tasks: ['1', '2', '3'],
      tags: ['웹사이트', '디자인', '개발'],
      createdAt: '2025-01-10T00:00:00Z',
      updatedAt: '2025-04-15T00:00:00Z',
      files: [
        {
          name: '요구사항 명세서.pdf',
          url: '/files/requirements.pdf',
          type: 'application/pdf',
          size: 1024000,
          uploadedAt: '2025-01-11T00:00:00Z',
          uploadedBy: '1'
        }
      ]
    };
    
    // 프로젝트가 존재하지 않는 경우
    if (!project) {
      return NextResponse.json(
        { error: '해당 ID의 프로젝트를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error('프로젝트 조회 중 오류 발생:', error);
    return NextResponse.json(
      { error: '프로젝트 정보를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 프로젝트 정보 업데이트
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;
    const body = await request.json();
    
    // 실제 구현에서는 데이터베이스에서 해당 ID의 프로젝트를 업데이트합니다
    const updatedProject = {
      id: projectId,
      name: body.name || '웹사이트 리뉴얼',
      description: body.description || '회사 웹사이트 디자인 및 기능 개선 프로젝트',
      teamId: body.teamId || '1',
      managerId: body.managerId || '1',
      members: body.members || [
        { userId: '1', role: '프로젝트 관리자', assignedAt: '2025-01-10T00:00:00Z' },
        { userId: '2', role: '개발자', assignedAt: '2025-01-12T00:00:00Z' },
        { userId: '3', role: '디자이너', assignedAt: '2025-01-15T00:00:00Z' }
      ],
      startDate: body.startDate || '2025-01-15T00:00:00Z',
      dueDate: body.dueDate || '2025-05-15T00:00:00Z',
      status: body.status || 'in-progress',
      progress: body.progress || 75,
      priority: body.priority || 'high',
      tasks: body.tasks || ['1', '2', '3'],
      tags: body.tags || ['웹사이트', '디자인', '개발'],
      updatedAt: new Date().toISOString()
    };
    
    return NextResponse.json({ project: updatedProject }, { status: 200 });
  } catch (error) {
    console.error('프로젝트 업데이트 중 오류 발생:', error);
    return NextResponse.json(
      { error: '프로젝트 정보를 업데이트하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 프로젝트 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;
    
    // 실제 구현에서는 데이터베이스에서 해당 ID의 프로젝트를 삭제합니다
    // 여기서는 성공 메시지만 반환합니다
    
    return NextResponse.json(
      { message: `ID ${projectId}의 프로젝트가 성공적으로 삭제되었습니다.` },
      { status: 200 }
    );
  } catch (error) {
    console.error('프로젝트 삭제 중 오류 발생:', error);
    return NextResponse.json(
      { error: '프로젝트를 삭제하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 이 파일은 특정 ID를 가진 프로젝트에 대한 조회, 수정, 삭제 작업을 처리합니다.
