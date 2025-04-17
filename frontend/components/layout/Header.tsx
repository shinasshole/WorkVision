import React from 'react';
import { RiSearchLine, RiNotification3Line, RiQuestionLine } from 'react-icons/ri';

// 헤더 컴포넌트
// 웹사이트의 상단 영역을 담당하는 컴포넌트예요.
// 마치 책의 제목과 목차가 있는 부분처럼, 사이트의 주요 기능에 빠르게 접근할 수 있게 해줘요!
const Header: React.FC = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-64 z-10">
      <div className="flex items-center justify-between h-full px-6">
        {/* 검색창 */}
        <div className="relative w-96">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
          <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        {/* 우측 아이콘 메뉴 */}
        <div className="flex items-center space-x-4">
          {/* 알림 아이콘 */}
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <RiNotification3Line className="text-xl text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* 도움말 아이콘 */}
          <button className="p-2 rounded-full hover:bg-gray-100">
            <RiQuestionLine className="text-xl text-gray-600" />
          </button>
          
          {/* 구분선 */}
          <div className="h-8 border-r border-gray-300"></div>
          
          {/* 현재 날짜 */}
          <div className="text-sm text-gray-600">
            {new Date().toLocaleDateString('ko-KR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric', 
              weekday: 'short' 
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
