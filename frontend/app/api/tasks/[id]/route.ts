import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 특정 업무 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const taskId = params.id;
    
    // 실제 구현에서는 데이터베이스에서 해당 ID의 업무를 조회합니다
    // 여기서는 예시 데이터를 반환합니다
    const task = {
      id: taskId,
      title: '메인 페이지 개발',
      description: '디자인에 따른 메인 페이지 프론트엔드 개발',
      projectId: '1',
      assignees: ['2'], // 김철수(개발자)
      status: 'in-progress',
      priority: 'high',
      startDate: '2025-02-06T00:00:00Z',
      dueDate: '2025-02-20T00:00:00Z',
      progress: 70,
      parentTask: null,
      subTasks: ['4', '5'],
      tags: ['개발', '프론트엔드'],
      attachments: [
        {
          name: '디자인 가이드.pdf',
          url: '/files/design-guide.pdf',
          type: 'application/pdf',
          size: 2048000,
          uploadedAt: '2025-02-06T00:00:00Z'
        }
      ],
      comments: ['1', '2'],
      createdBy: '1',
      createdAt: '2025-01-15T00:00:00Z',
      updatedAt: '2025-04-15T00:00:00Z',
      estimatedHours: 20,
      actualHours: 15
    };
    
    // 업무가 존재하지 않는 경우
    if (!task) {
      return NextResponse.json(
        { error: '해당 ID의 업무를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ task }, { status: 200 });
  } catch (error) {
    console.error('업무 조회 중 오류 발생:', error);
    return NextResponse.json(
      { error: '업무 정보를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 업무 정보 업데이트
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const taskId = params.id;
    const body = await request.json();
    
    // 실제 구현에서는 데이터베이스에서 해당 ID의 업무를 업데이트합니다
    const updatedTask = {
      id: taskId,
      title: body.title || '메인 페이지 개발',
      description: body.description || '디자인에 따른 메인 페이지 프론트엔드 개발',
      projectId: body.projectId || '1',
      assignees: body.assignees || ['2'],
      status: body.status || 'in-progress',
      priority: body.priority || 'high',
      startDate: body.startDate || '2025-02-06T00:00:00Z',
      dueDate: body.dueDate || '2025-02-20T00:00:00Z',
      progress: body.progress !== undefined ? body.progress : 70,
      tags: body.tags || ['개발', '프론트엔드'],
      updatedAt: new Date().toISOString()
    };
    
    return NextResponse.json({ task: updatedTask }, { status: 200 });
  } catch (error) {
    console.error('업무 업데이트 중 오류 발생:', error);
    return NextResponse.json(
      { error: '업무 정보를 업데이트하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 업무 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const taskId = params.id;
    
    // 실제 구현에서는 데이터베이스에서 해당 ID의 업무를 삭제합니다
    // 여기서는 성공 메시지만 반환합니다
    
    return NextResponse.json(
      { message: `ID ${taskId}의 업무가 성공적으로 삭제되었습니다.` },
      { status: 200 }
    );
  } catch (error) {
    console.error('업무 삭제 중 오류 발생:', error);
    return NextResponse.json(
      { error: '업무를 삭제하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 이 파일은 특정 ID를 가진 업무에 대한 조회, 수정, 삭제 작업을 처리합니다.
