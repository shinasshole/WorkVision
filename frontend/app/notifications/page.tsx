import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import NotificationsList from '@/components/notifications/NotificationsList';

// 알림 페이지 컴포넌트
// 사용자에게 도착한 모든 알림을 보여주는 페이지예요.
// 마치 우편함에서 받은 편지들을 정리해서 보여주는 것과 같아요!
export default function NotificationsPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-8">
          <div className="relative">
            <h1 className="text-3xl font-bold text-gray-800 relative z-10">
              알림
              <span className="text-sm ml-2 font-normal text-gray-500">Notifications</span>
            </h1>
            <div className="absolute -bottom-3 left-0 h-3 w-20 bg-primary-200 rounded-full z-0"></div>
          </div>
        </div>
        
        <div className="card shadow-lg hover:shadow-xl transition-shadow duration-300 p-6">
          <NotificationsList />
        </div>
      </div>
    </MainLayout>
  );
}
