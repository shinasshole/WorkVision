"use client";

import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useSidebar } from '@/contexts/SidebarContext';

// MainLayout 컴포넌트
// 사이드바와 헤더를 포함한 전체 레이아웃을 구성하는 컴포넌트예요.
// 이것은 마치 집의 기본 구조를 만드는 것과 같아요. 벽, 천장, 바닥을 먼저 세우고
// 그 안에 가구(컨텐츠)를 배치하는 것처럼, 웹사이트의 기본 구조를 잡아주는 역할을 해요!
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 사이드바 상태 가져오기
  const { isOpen } = useSidebar();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className={`transition-all duration-300 ${isOpen ? 'ml-72' : 'ml-20'}`}>
        <Header />
        <main className="pt-16 px-8 py-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
