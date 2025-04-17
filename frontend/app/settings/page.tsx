import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SettingsTabs from '@/components/settings/SettingsTabs';

// 설정 페이지 컴포넌트
// 사용자가 앱의 다양한 설정을 관리할 수 있는 페이지예요.
// 마치 자동차의 대시보드에서 여러 기능을 조절하는 것과 같아요!
export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-8">
          <div className="relative">
            <h1 className="text-3xl font-bold text-gray-800 relative z-10">
              설정
              <span className="text-sm ml-2 font-normal text-gray-500">Settings</span>
            </h1>
            <div className="absolute -bottom-3 left-0 h-3 w-20 bg-primary-200 rounded-full z-0"></div>
          </div>
        </div>
        
        <div className="card shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
          <SettingsTabs />
        </div>
      </div>
    </MainLayout>
  );
}
