import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 회원가입 API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 필수 필드 검증
    if (!body.name || !body.email || !body.password) {
      return NextResponse.json(
        { error: '이름, 이메일, 비밀번호는 필수 입력 항목입니다.' },
        { status: 400 }
      );
    }
    
    // 실제 구현에서는 이메일 중복 검사를 수행합니다
    const existingUsers = [
      { email: 'hong@example.com' },
      { email: 'kim@example.com' }
    ];
    
    if (existingUsers.some(user => user.email === body.email)) {
      return NextResponse.json(
        { error: '이미 사용 중인 이메일입니다.' },
        { status: 409 }
      );
    }
    
    // 실제 구현에서는 데이터베이스에 사용자를 저장합니다
    const newUser = {
      id: Date.now().toString(),
      name: body.name,
      email: body.email,
      position: body.position || '',
      department: body.department || '',
      role: body.role || 'member',
      createdAt: new Date().toISOString()
    };
    
    return NextResponse.json({
      user: newUser,
      message: '회원가입이 완료되었습니다.'
    }, { status: 201 });
  } catch (error) {
    console.error('회원가입 중 오류 발생:', error);
    return NextResponse.json(
      { error: '회원가입 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 이 파일은 사용자 회원가입을 처리합니다.
