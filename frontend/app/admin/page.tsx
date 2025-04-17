import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AdminTabs from '@/components/admin/AdminTabs';

// 관리자 페이지 컴포넌트
// 시스템 전체를 관리하고 모니터링하는 페이지예요.
// 마치 회사의 중앙 통제실과 같은 역할을 하는 페이지입니다!
export default function AdminPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-8">
          <div className="relative">
            <h1 className="text-3xl font-bold text-gray-800 relative z-10">
              관리자 대시보드
              <span className="text-sm ml-2 font-normal text-gray-500">Admin Dashboard</span>
            </h1>
            <div className="absolute -bottom-3 left-0 h-3 w-20 bg-primary-200 rounded-full z-0"></div>
          </div>
        </div>
        
        <div className="card shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
          <AdminTabs />
        </div>
      </div>
    </MainLayout>
  );
}
