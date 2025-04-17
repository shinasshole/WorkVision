import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 모든 사용자 조회
export async function GET(request: NextRequest) {
  try {
    // 실제 구현에서는 데이터베이스에서 사용자 목록을 가져옵니다
    const users = [
      { 
        id: '1', 
        name: '지혜인', 
        email: 'jihyeon@gmail.com', 
        position: '개발팀장',
        department: '개발팀',
        profileImage: 'https://via.placeholder.com/150',
        role: 'manager'
      },
      { 
        id: '2', 
        name: '김철수', 
        email: 'kim@example.com', 
        position: '시니어 개발자',
        department: '개발팀',
        profileImage: 'https://via.placeholder.com/150',
        role: 'member'
      },
      { 
        id: '3', 
        name: '이영희', 
        email: 'lee@example.com', 
        position: '디자이너',
        department: '디자인팀',
        profileImage: 'https://via.placeholder.com/150',
        role: 'member'
      }
    ];

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error('사용자 조회 중 오류 발생:', error);
    return NextResponse.json(
      { error: '사용자 목록을 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 새 사용자 생성
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
    
    // 실제 구현에서는 데이터베이스에 사용자를 저장합니다
    const newUser = {
      id: Date.now().toString(),
      name: body.name,
      email: body.email,
      position: body.position || '',
      department: body.department || '',
      profileImage: body.profileImage || 'https://via.placeholder.com/150',
      role: body.role || 'member',
      createdAt: new Date().toISOString()
    };
    
    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    console.error('사용자 생성 중 오류 발생:', error);
    return NextResponse.json(
      { error: '사용자를 생성하는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

// 이 파일은 사용자 API의 기본 라우트를 처리합니다.
// 개별 사용자 조회, 수정, 삭제는 [id] 폴더에 구현합니다.
