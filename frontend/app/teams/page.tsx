import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import TeamsList from '@/components/teams/TeamsList';

// 팀 관리 페이지 컴포넌트
// 이 페이지는 조직 내 팀 구조와 구성원을 관리하는 화면이에요.
// 마치 회사의 조직도를 디지털로 옮겨놓은 것과 같아요!
export default function TeamsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-8">
          <div className="relative">
            <h1 className="text-3xl font-bold text-gray-800 relative z-10">
              팀 관리
              <span className="text-sm ml-2 font-normal text-gray-500">Team Management</span>
            </h1>
            <div className="absolute -bottom-3 left-0 h-3 w-20 bg-primary-200 rounded-full z-0"></div>
          </div>
        </div>
        
        <div className="card shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
          <TeamsList />
        </div>
      </div>
    </MainLayout>
  );
}
