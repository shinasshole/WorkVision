import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 특정 보고서 조회
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reportId = params.id;
    
    // 실제 구현에서는 데이터베이스에서 해당 ID의 보고서를 조회합니다
    // 여기서는 예시 데이터를 반환합니다
    const report = {
      id: reportId,
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
      attachments: [
        {
          name: '진행상황.pdf',
          url: '/files/progress.pdf',
          type: 'application/pdf',
          size: 1536000,
          uploadedAt: '2025-04-15T10:00:00Z'
        }
      ],
      comments: ['1'],
      createdAt: '2025-04-15T10:00:00Z',
      updatedAt: '2025-04-15T10:00:00Z',
      submittedAt: '2025-04-15T10:30:00Z',
      period: {
        start: '2025-04-08T00:00:00Z',
        end: '2025-04-14T23:59:59Z'
      },
      metrics: [
        { key: '완료된 작업', value: 2, target: 5, unit: '개' },
        { key: '전체 진행률', value: 35, target: 100, unit: '%' }
      ]
    };
    
    // 보고서가 존재하지 않는 경우
    if (!report) {
      return NextResponse.json(
        { error: '해당 ID의 보고서를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ report }, { status: 200 });
  } catch (error) {
    console.error('보고서 조회 중 오류 발생:', error);
    return NextResponse.json(
      { error: '보고서 정보를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 보고서 정보 업데이트
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reportId = params.id;
    const body = await request.json();
    
    // 실제 구현에서는 데이터베이스에서 해당 ID의 보고서를 업데이트합니다
    const updatedReport = {
      id: reportId,
      title: body.title || '웹사이트 리뉴얼 진행 상황 보고',
      content: body.content || '# 웹사이트 리뉴얼 진행 상황\n\n## 완료된 작업\n- 메인 페이지 디자인 완료\n- 메인 페이지 개발 70% 진행 중\n\n## 다음 단계\n- 메인 페이지 개발 완료\n- 서브 페이지 디자인 시작',
      author: body.author || '1',
      projectId: body.projectId || '1',
      relatedTasks: body.relatedTasks || ['1', '2'],
      type: body.type || 'weekly',
      status: body.status || 'submitted',
      reviewers: body.reviewers || [
        { userId: '2', status: 'reviewed', comment: '잘 진행되고 있습니다.', reviewedAt: '2025-04-16T15:30:00Z' }
      ],
      updatedAt: new Date().toISOString(),
      submittedAt: body.status === 'submitted' && !body.submittedAt ? new Date().toISOString() : body.submittedAt || '2025-04-15T10:30:00Z',
      period: body.period || {
        start: '2025-04-08T00:00:00Z',
        end: '2025-04-14T23:59:59Z'
      }
    };
    
    return NextResponse.json({ report: updatedReport }, { status: 200 });
  } catch (error) {
    console.error('보고서 업데이트 중 오류 발생:', error);
    return NextResponse.json(
      { error: '보고서 정보를 업데이트하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 보고서 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reportId = params.id;
    
    // 실제 구현에서는 데이터베이스에서 해당 ID의 보고서를 삭제합니다
    // 여기서는 성공 메시지만 반환합니다
    
    return NextResponse.json(
      { message: `ID ${reportId}의 보고서가 성공적으로 삭제되었습니다.` },
      { status: 200 }
    );
  } catch (error) {
    console.error('보고서 삭제 중 오류 발생:', error);
    return NextResponse.json(
      { error: '보고서를 삭제하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 이 파일은 특정 ID를 가진 보고서에 대한 조회, 수정, 삭제 작업을 처리합니다.
