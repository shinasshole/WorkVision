import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ReportsList from '@/components/reports/ReportsList';
import CreateReportButton from '@/components/reports/CreateReportButton';

// 업무 보고 페이지 컴포넌트
// 이 페이지는 팀원들의 업무 보고를 확인하는 메인 화면이에요.
// 마치 회사의 게시판처럼 모든 업무 보고를 한눈에 볼 수 있어요!
export default function ReportsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-8">
          <div className="relative">
            <h1 className="text-3xl font-bold text-gray-800 relative z-10">
              업무 보고
              <span className="text-sm ml-2 font-normal text-gray-500">Work Reports</span>
            </h1>
            <div className="absolute -bottom-3 left-0 h-3 w-20 bg-primary-200 rounded-full z-0"></div>
          </div>
          <CreateReportButton />
        </div>
        
        <div className="card shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
          <ReportsList />
        </div>
      </div>
    </MainLayout>
  );
}
