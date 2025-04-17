import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 로그인 API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 필수 필드 검증
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: '이메일과 비밀번호는 필수 입력 항목입니다.' },
        { status: 400 }
      );
    }
    
    // 실제 구현에서는 데이터베이스에서 사용자 인증을 수행합니다
    // 여기서는 예시 데이터를 사용합니다
    const users = [
      { 
        id: '1', 
        name: '홍길동', 
        email: 'hong@example.com', 
        password: 'password123', // 실제로는 해시된 비밀번호를 저장하고 비교해야 합니다
        position: '개발팀장',
        department: '개발팀',
        role: 'manager'
      },
      { 
        id: '2', 
        name: '김철수', 
        email: 'kim@example.com', 
        password: 'password123',
        position: '시니어 개발자',
        department: '개발팀',
        role: 'member'
      }
    ];
    
    // 사용자 인증
    const user = users.find(u => u.email === body.email && u.password === body.password);
    
    if (!user) {
      return NextResponse.json(
        { error: '이메일 또는 비밀번호가 올바르지 않습니다.' },
        { status: 401 }
      );
    }
    
    // 비밀번호 정보 제외
    const { password, ...userWithoutPassword } = user;
    
    // 실제 구현에서는 JWT 토큰을 생성하여 반환합니다
    const token = 'example_jwt_token';
    
    return NextResponse.json({
      user: userWithoutPassword,
      token,
      message: '로그인에 성공했습니다.'
    }, { status: 200 });
  } catch (error) {
    console.error('로그인 중 오류 발생:', error);
    return NextResponse.json(
      { error: '로그인 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 이 파일은 사용자 로그인을 처리합니다.
