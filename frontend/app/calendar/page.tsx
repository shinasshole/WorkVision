import React from 'react';
import CalendarView from '@/components/calendar/CalendarView';
import EventsList from '@/components/calendar/EventsList';
import CreateEventButton from '@/components/calendar/CreateEventButton';
import MainLayout from '@/components/layout/MainLayout';

// 캘린더 페이지 컴포넌트
// 이 페이지는 일정을 관리하는 메인 화면이에요.
// 마치 종이 달력을 디지털로 옮겨놓은 것처럼 생각하면 됩니다!
export default function CalendarPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-8">
          <div className="relative">
            <h1 className="text-3xl font-bold text-gray-800 relative z-10">
              일정 관리
              <span className="text-sm ml-2 font-normal text-gray-500">Schedule Management</span>
            </h1>
            <div className="absolute -bottom-3 left-0 h-3 w-20 bg-primary-200 rounded-full z-0"></div>
          </div>
          <CreateEventButton />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 캘린더 뷰 (월간 달력) - 화면 크기가 큰 경우 2/3 차지 */}
          <div className="lg:col-span-2">
            <div className="card shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CalendarView />
            </div>
          </div>
          
          {/* 이벤트 목록 - 화면 크기가 큰 경우 1/3 차지 */}
          <div className="card shadow-lg hover:shadow-xl transition-shadow duration-300 p-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">다가오는 일정</h2>
            <EventsList />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
