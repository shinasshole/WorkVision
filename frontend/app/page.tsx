import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import StatCard from '@/components/dashboard/StatCard';
import ProjectCard from '@/components/dashboard/ProjectCard';
import RecentReportsList from '@/components/dashboard/RecentReportsList';
import { RiFileTextLine, RiTeamLine, RiTimeLine, RiCheckboxCircleLine } from 'react-icons/ri';

// 대시보드 페이지
// 이 페이지는 앱의 메인 대시보드를 보여줍니다.
// 마치 자동차의 계기판처럼 중요한 정보를 한눈에 볼 수 있게 해주는 역할을 해요!
export default function Home() {
  // 통계 데이터 (실제로는 API에서 가져올 데이터)
  const stats = [
    { 
      title: '진행 중인 프로젝트', 
      value: 12, 
      icon: <RiFileTextLine className="text-blue-500" />,
      change: { value: 8, isPositive: true }
    },
    { 
      title: '팀원', 
      value: 24, 
      icon: <RiTeamLine className="text-green-500" />,
      change: { value: 2, isPositive: true }
    },
    { 
      title: '마감 임박 업무', 
      value: 5, 
      icon: <RiTimeLine className="text-yellow-500" />,
      change: { value: 10, isPositive: false }
    },
    { 
      title: '완료된 업무', 
      value: 128, 
      icon: <RiCheckboxCircleLine className="text-purple-500" />,
      change: { value: 12, isPositive: true }
    }
  ];
  
  // 프로젝트 데이터 (실제로는 API에서 가져올 데이터)
  const projects = [
    {
      id: '1',
      name: '웹사이트 리뉴얼',
      description: '회사 웹사이트 디자인 및 기능 개선 프로젝트',
      progress: 75,
      teamMembers: 5,
      dueDate: '2025-05-15',
      status: 'in-progress'
    },
    {
      id: '2',
      name: '모바일 앱 개발',
      description: '신규 모바일 앱 MVP 개발',
      progress: 30,
      teamMembers: 8,
      dueDate: '2025-06-30',
      status: 'in-progress'
    },
    {
      id: '3',
      name: '마케팅 캠페인',
      description: '2025 여름 시즌 마케팅 캠페인 기획 및 실행',
      progress: 15,
      teamMembers: 4,
      dueDate: '2025-07-01',
      status: 'planning'
    },
    {
      id: '4',
      name: '제품 출시 준비',
      description: '신제품 출시를 위한 전략 및 계획 수립',
      progress: 50,
      teamMembers: 6,
      dueDate: '2025-08-15',
      status: 'in-progress'
    }
  ];
  
  // 최근 업무 보고 데이터 (실제로는 API에서 가져올 데이터)
  const recentReports = [
    {
      id: '1',
      title: '웹사이트 리뉴얼 진행 상황 보고',
      author: {
        name: '홍길동',
        avatar: 'https://via.placeholder.com/40'
      },
      project: '웹사이트 리뉴얼',
      date: '2025-04-17',
      commentsCount: 5
    },
    {
      id: '2',
      title: '모바일 앱 개발 주간 업데이트',
      author: {
        name: '김철수',
        avatar: 'https://via.placeholder.com/40'
      },
      project: '모바일 앱 개발',
      date: '2025-04-16',
      commentsCount: 3
    },
    {
      id: '3',
      title: '마케팅 캠페인 초안 검토 요청',
      author: {
        name: '이영희',
        avatar: 'https://via.placeholder.com/40'
      },
      project: '마케팅 캠페인',
      date: '2025-04-15',
      commentsCount: 8
    },
    {
      id: '4',
      title: '제품 출시 일정 조정 제안',
      author: {
        name: '박민수',
        avatar: 'https://via.placeholder.com/40'
      },
      project: '제품 출시 준비',
      date: '2025-04-14',
      commentsCount: 12
    }
  ];

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">대시보드</h1>
        <p className="text-gray-600">안녕하세요, 오늘의 업무 현황을 확인하세요.</p>
      </div>
      
      {/* 통계 카드 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 프로젝트 섹션 */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">진행 중인 프로젝트</h2>
            <a href="/projects" className="text-sm text-primary-500 hover:text-primary-600">
              모든 프로젝트 보기
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                name={project.name}
                description={project.description}
                progress={project.progress}
                teamMembers={project.teamMembers}
                dueDate={project.dueDate}
                status={project.status as 'planning' | 'in-progress' | 'completed' | 'on-hold'}
              />
            ))}
          </div>
        </div>
        
        {/* 최근 업무 보고 섹션 */}
        <div className="lg:col-span-1">
          <RecentReportsList reports={recentReports} />
        </div>
      </div>
    </MainLayout>
  );
}
