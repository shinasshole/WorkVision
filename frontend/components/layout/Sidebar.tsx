"use client";

import React from 'react';
import Link from 'next/link';
import { 
  RiDashboardLine, 
  RiCalendarLine, 
  RiTeamLine, 
  RiTaskLine, 
  RiSettings4Line,
  RiNotification3Line
} from 'react-icons/ri';
import { useSidebar } from '@/contexts/SidebarContext';
import { usePathname } from 'next/navigation';

// 사이드바 메뉴 아이템 타입 정의
// 타입스크립트는 변수나 함수의 형태를 미리 정의해서 오류를 방지하는 도구예요.
// 마치 요리 레시피에서 재료와 양을 미리 정확히 정해두는 것과 비슷해요!
type SidebarItemProps = {
  icon: React.ReactNode;
  text: string;
  href: string;
  active?: boolean;
  collapsed?: boolean;
};

// 사이드바 메뉴 아이템 컴포넌트
// 이 컴포넌트는 사이드바의 각 메뉴 항목을 표현해요.
// 레고 블록처럼 작은 부품을 만들어서 여러 곳에서 재사용할 수 있게 했어요!
const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, href, active = false, collapsed = false }) => {
  return (
    <Link href={href} className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
      active 
        ? 'bg-primary-500 text-white' 
        : 'text-gray-600 hover:bg-gray-100'
    }`}>
      <span className={`text-xl ${collapsed ? '' : 'mr-3'}`}>{icon}</span>
      {!collapsed && <span className="font-medium">{text}</span>}
    </Link>
  );
};

// 사이드바 컴포넌트
// 여러 SidebarItem을 모아서 하나의 사이드바를 구성해요.
// 마치 여러 레고 블록을 조립해서 하나의 완성된 모형을 만드는 것과 같아요!
const Sidebar: React.FC = () => {
  // 사이드바 상태 가져오기
  const { isOpen, toggleSidebar } = useSidebar();
  
  // 현재 경로 가져오기
  const pathname = usePathname();
  
  return (
    <div className={`h-screen bg-white border-r border-gray-200 p-4 fixed left-0 top-0 transition-all duration-300 z-10 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      {/* 로고 영역 */}
      <div className="flex items-center mb-8 px-2">
        <div className="w-8 h-8 bg-primary-500 rounded-md flex items-center justify-center text-white font-bold mr-2">
          W
        </div>
        {isOpen && <h1 className="text-xl font-bold text-gray-800">WorkVision</h1>}
      </div>
      
      {/* 메뉴 영역 */}
      <nav className="mb-8">
        <SidebarItem 
          icon={<RiDashboardLine />} 
          text="대시보드" 
          href="/" 
          active={pathname === '/'} 
          collapsed={!isOpen}
        />
        <SidebarItem 
          icon={<RiCalendarLine />} 
          text="일정" 
          href="/calendar" 
          active={pathname === '/calendar'} 
          collapsed={!isOpen}
        />
        <SidebarItem 
          icon={<RiTaskLine />} 
          text="업무 보고" 
          href="/reports" 
          active={pathname === '/reports'} 
          collapsed={!isOpen}
        />
        <SidebarItem 
          icon={<RiTeamLine />} 
          text="팀 관리" 
          href="/teams" 
          active={pathname === '/teams'} 
          collapsed={!isOpen}
        />
        <SidebarItem 
          icon={<RiNotification3Line />} 
          text="알림" 
          href="/notifications" 
          active={pathname === '/notifications'} 
          collapsed={!isOpen}
        />
      </nav>
      
      {/* 사이드바 토글 버튼 */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-4 top-20 bg-white border border-gray-200 rounded-full p-2 shadow-md text-gray-600 hover:text-primary-500 transition-colors"
      >
        {isOpen ? '◀️' : '▶️'}
      </button>
      
      {/* 사용자 프로필 영역 */}
      {isOpen && (
        <div className="mt-auto pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
              <div>
                <p className="font-medium text-gray-800">홍길동</p>
                <p className="text-sm text-gray-500">개발팀</p>
              </div>
            </div>
            <Link href="/settings" className="p-2 text-gray-500 hover:text-primary-500 hover:bg-gray-100 rounded-full transition-colors">
              <RiSettings4Line className="text-xl" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
