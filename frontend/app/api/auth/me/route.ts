import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 현재 로그인한 사용자 정보 조회 API
export async function GET(request: NextRequest) {
  try {
    // 실제 구현에서는 요청 헤더에서 토큰을 추출하고 검증합니다
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: '인증 토큰이 필요합니다.' },
        { status: 401 }
      );
    }
    
    const token = authHeader.split(' ')[1];
    
    // 실제 구현에서는 토큰을 검증하고 사용자 정보를 가져옵니다
    // 여기서는 예시 데이터를 반환합니다
    const user = {
      id: '1',
      name: '홍길동',
      email: 'hong@example.com',
      position: '개발팀장',
      department: '개발팀',
      profileImage: 'https://via.placeholder.com/150',
      role: 'manager',
      teams: ['1', '2'],
      lastLogin: new Date().toISOString()
    };
    
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('사용자 정보 조회 중 오류 발생:', error);
    return NextResponse.json(
      { error: '사용자 정보를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 이 파일은 현재 로그인한 사용자의 정보를 조회합니다.
