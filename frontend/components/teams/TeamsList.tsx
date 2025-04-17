"use client";

import React, { useState } from 'react';
import TeamCard from './TeamCard';

// 팀 타입 정의
// 각 팀이 어떤 정보를 가지고 있는지 정의해요.
// 마치 조직도에서 각 부서의 정보를 정의하는 것과 같아요!
type Team = {
  id: string;
  name: string;
  description: string;
  leader: {
    id: string;
    name: string;
    position: string;
    avatar: string;
  };
  memberCount: number;
  color: string;
  members: TeamMember[];
};

// 팀원 타입 정의
// 각 팀원이 어떤 정보를 가지고 있는지 정의해요.
// 마치 직원 카드에 들어갈 정보를 정리하는 것과 같아요!
type TeamMember = {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
  skills: string[];
};

// 팀 목록 컴포넌트
// 여러 팀 정보를 목록 형태로 보여주는 컴포넌트예요.
// 마치 회사 조직도를 한눈에 보여주는 것과 같아요!
const TeamsList: React.FC = () => {
  // 현재 열려있는 팀 ID 상태 관리
  const [openTeamId, setOpenTeamId] = useState<string | null>(null);
  
  // 팀 토글 함수
  const toggleTeam = (teamId: string) => {
    if (openTeamId === teamId) {
      setOpenTeamId(null); // 이미 열려있는 팀이면 닫기
    } else {
      setOpenTeamId(teamId); // 다른 팀이면 열기
    }
  };
  
  // 샘플 팀 데이터 (실제로는 API에서 가져올 것)
  // 이건 테스트를 위한 가짜 데이터예요.
  // 실제 서비스에서는 서버에서 진짜 팀 데이터를 가져오게 됩니다!
  const sampleTeams: Team[] = [
    {
      id: '1',
      name: '개발팀',
      description: '제품 개발 및 기술 지원을 담당하는 팀입니다. 웹/앱 개발, 서버 관리, 기술 지원 업무를 수행합니다.',
      leader: {
        id: 'u1',
        name: '김개발',
        position: '개발팀장',
        avatar: '',
      },
      memberCount: 8,
      color: 'blue',
      members: [
        {
          id: 'u1',
          name: '김개발',
          position: '개발팀장',
          email: 'kim@workvision.com',
          phone: '010-1234-5678',
          avatar: '',
          joinDate: '2023-01-15',
          skills: ['React', 'Node.js', 'AWS', 'TypeScript']
        },
        {
          id: 'u2',
          name: '이프론트',
          position: '프론트엔드 개발자',
          email: 'lee@workvision.com',
          phone: '010-2345-6789',
          avatar: '',
          joinDate: '2023-03-20',
          skills: ['React', 'TypeScript', 'Tailwind CSS']
        },
        {
          id: 'u3',
          name: '박백엔드',
          position: '백엔드 개발자',
          email: 'park@workvision.com',
          phone: '010-3456-7890',
          avatar: '',
          joinDate: '2023-02-10',
          skills: ['Node.js', 'Express', 'MongoDB', 'Docker']
        },
        {
          id: 'u4',
          name: '최모바일',
          position: '모바일 개발자',
          email: 'choi@workvision.com',
          phone: '010-4567-8901',
          avatar: '',
          joinDate: '2023-05-05',
          skills: ['React Native', 'Flutter', 'Swift']
        },
        {
          id: 'u5',
          name: '정데브옵스',
          position: 'DevOps 엔지니어',
          email: 'jung@workvision.com',
          phone: '010-5678-9012',
          avatar: '',
          joinDate: '2023-04-15',
          skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD']
        },
        {
          id: 'u6',
          name: '한풀스택',
          position: '풀스택 개발자',
          email: 'han@workvision.com',
          phone: '010-6789-0123',
          avatar: '',
          joinDate: '2023-06-20',
          skills: ['React', 'Node.js', 'MongoDB', 'TypeScript']
        },
        {
          id: 'u7',
          name: '강주니어',
          position: '주니어 개발자',
          email: 'kang@workvision.com',
          phone: '010-7890-1234',
          avatar: '',
          joinDate: '2024-01-10',
          skills: ['JavaScript', 'HTML', 'CSS']
        },
        {
          id: 'u8',
          name: '윤인턴',
          position: '인턴 개발자',
          email: 'yoon@workvision.com',
          phone: '010-8901-2345',
          avatar: '',
          joinDate: '2024-03-01',
          skills: ['JavaScript', 'React']
        }
      ]
    },
    {
      id: '2',
      name: '디자인팀',
      description: '제품 디자인 및 사용자 경험을 담당하는 팀입니다. UI/UX 디자인, 그래픽 디자인, 브랜딩 업무를 수행합니다.',
      leader: {
        id: 'u9',
        name: '박디자인',
        position: '디자인팀장',
        avatar: '',
      },
      memberCount: 5,
      color: 'purple',
      members: [
        {
          id: 'u9',
          name: '박디자인',
          position: '디자인팀장',
          email: 'park.d@workvision.com',
          phone: '010-9012-3456',
          avatar: '',
          joinDate: '2023-01-20',
          skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator']
        },
        {
          id: 'u10',
          name: '김UI',
          position: 'UI 디자이너',
          email: 'kim.ui@workvision.com',
          phone: '010-0123-4567',
          avatar: '',
          joinDate: '2023-03-15',
          skills: ['Figma', 'Sketch', 'UI Design']
        },
        {
          id: 'u11',
          name: '이UX',
          position: 'UX 디자이너',
          email: 'lee.ux@workvision.com',
          phone: '010-1234-5678',
          avatar: '',
          joinDate: '2023-04-10',
          skills: ['User Research', 'Wireframing', 'Prototyping']
        },
        {
          id: 'u12',
          name: '최그래픽',
          position: '그래픽 디자이너',
          email: 'choi.g@workvision.com',
          phone: '010-2345-6789',
          avatar: '',
          joinDate: '2023-05-20',
          skills: ['Photoshop', 'Illustrator', 'After Effects']
        },
        {
          id: 'u13',
          name: '정모션',
          position: '모션 디자이너',
          email: 'jung.m@workvision.com',
          phone: '010-3456-7890',
          avatar: '',
          joinDate: '2023-06-15',
          skills: ['After Effects', 'Premiere Pro', 'Motion Graphics']
        }
      ]
    },
    {
      id: '3',
      name: '마케팅팀',
      description: '제품 마케팅 및 홍보를 담당하는 팀입니다. 디지털 마케팅, 콘텐츠 제작, 소셜 미디어 관리 업무를 수행합니다.',
      leader: {
        id: 'u14',
        name: '최마케팅',
        position: '마케팅팀장',
        avatar: '',
      },
      memberCount: 6,
      color: 'green',
      members: [
        {
          id: 'u14',
          name: '최마케팅',
          position: '마케팅팀장',
          email: 'choi.m@workvision.com',
          phone: '010-4567-8901',
          avatar: '',
          joinDate: '2023-02-01',
          skills: ['마케팅 전략', 'GTM', '브랜드 관리', '데이터 분석']
        },
        {
          id: 'u15',
          name: '김디지털',
          position: '디지털 마케터',
          email: 'kim.d@workvision.com',
          phone: '010-5678-9012',
          avatar: '',
          joinDate: '2023-03-10',
          skills: ['SEO', 'SEM', '퍼포먼스 마케팅']
        },
        {
          id: 'u16',
          name: '이콘텐츠',
          position: '콘텐츠 마케터',
          email: 'lee.c@workvision.com',
          phone: '010-6789-0123',
          avatar: '',
          joinDate: '2023-04-15',
          skills: ['콘텐츠 제작', '카피라이팅', '블로그 운영']
        },
        {
          id: 'u17',
          name: '박소셜',
          position: '소셜 미디어 매니저',
          email: 'park.s@workvision.com',
          phone: '010-7890-1234',
          avatar: '',
          joinDate: '2023-05-01',
          skills: ['소셜 미디어 관리', '커뮤니티 운영', '인플루언서 마케팅']
        },
        {
          id: 'u18',
          name: '정그로스',
          position: '그로스 마케터',
          email: 'jung.g@workvision.com',
          phone: '010-8901-2345',
          avatar: '',
          joinDate: '2023-06-10',
          skills: ['그로스 해킹', '유저 획득', '리텐션 전략']
        },
        {
          id: 'u19',
          name: '한브랜드',
          position: '브랜드 마케터',
          email: 'han.b@workvision.com',
          phone: '010-9012-3456',
          avatar: '',
          joinDate: '2023-07-15',
          skills: ['브랜드 전략', '마케팅 캠페인', '이벤트 기획']
        }
      ]
    },
    {
      id: '4',
      name: '기획팀',
      description: '제품 기획 및 전략을 담당하는 팀입니다. 제품 기획, 사용자 조사, 시장 분석 업무를 수행합니다.',
      leader: {
        id: 'u20',
        name: '이기획',
        position: '기획팀장',
        avatar: '',
      },
      memberCount: 4,
      color: 'orange',
      members: [
        {
          id: 'u20',
          name: '이기획',
          position: '기획팀장',
          email: 'lee.p@workvision.com',
          phone: '010-0123-4567',
          avatar: '',
          joinDate: '2023-01-10',
          skills: ['제품 전략', '로드맵 관리', '비즈니스 모델링']
        },
        {
          id: 'u21',
          name: '김프로덕트',
          position: '프로덕트 매니저',
          email: 'kim.p@workvision.com',
          phone: '010-1234-5678',
          avatar: '',
          joinDate: '2023-02-15',
          skills: ['제품 기획', '요구사항 정의', '사용자 스토리']
        },
        {
          id: 'u22',
          name: '박리서치',
          position: '사용자 리서처',
          email: 'park.r@workvision.com',
          phone: '010-2345-6789',
          avatar: '',
          joinDate: '2023-03-20',
          skills: ['사용자 조사', '인터뷰', '데이터 분석']
        },
        {
          id: 'u23',
          name: '최비즈니스',
          position: '비즈니스 애널리스트',
          email: 'choi.b@workvision.com',
          phone: '010-3456-7890',
          avatar: '',
          joinDate: '2023-04-25',
          skills: ['시장 분석', '경쟁사 분석', '비즈니스 인텔리전스']
        }
      ]
    }
  ];
  
  return (
    <div className="teams-list space-y-6">
      {/* 팀 검색 */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="팀 또는 팀원 검색..."
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
      </div>
      
      {/* 팀 통계 요약 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-500 font-medium">전체 팀</p>
          <p className="text-2xl font-bold text-blue-700">{sampleTeams.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <p className="text-sm text-green-500 font-medium">전체 구성원</p>
          <p className="text-2xl font-bold text-green-700">
            {sampleTeams.reduce((sum, team) => sum + team.memberCount, 0)}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <p className="text-sm text-purple-500 font-medium">팀장</p>
          <p className="text-2xl font-bold text-purple-700">{sampleTeams.length}</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
          <p className="text-sm text-orange-500 font-medium">평균 팀 규모</p>
          <p className="text-2xl font-bold text-orange-700">
            {Math.round(sampleTeams.reduce((sum, team) => sum + team.memberCount, 0) / sampleTeams.length)}
          </p>
        </div>
      </div>
      
      {/* 팀 목록 */}
      <div className="space-y-6">
        {sampleTeams.map(team => (
          <TeamCard
            key={team.id}
            team={team}
            isOpen={openTeamId === team.id}
            onToggle={() => toggleTeam(team.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamsList;
