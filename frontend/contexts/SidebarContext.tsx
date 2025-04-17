"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// 사이드바 컨텍스트 타입 정의
// 컨텍스트는 컴포넌트 트리 전체에 데이터를 공유할 수 있게 해주는 도구예요.
// 마치 가족 단체 채팅방처럼 모든 구성원이 같은 정보를 공유할 수 있게 해줍니다!
type SidebarContextType = {
  isOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
};

// 기본값으로 사용할 컨텍스트 생성
// 초기값을 설정해두는 것이에요. 마치 새 게임을 시작할 때 기본 설정값을 정해두는 것과 비슷해요!
const SidebarContext = createContext<SidebarContextType>({
  isOpen: true,
  toggleSidebar: () => {},
  closeSidebar: () => {},
  openSidebar: () => {},
});

// 사이드바 컨텍스트 제공자 컴포넌트
// 이 컴포넌트는 사이드바 상태를 관리하고 그 상태를 자식 컴포넌트들에게 제공해요.
// 마치 중앙 관제센터처럼 사이드바의 열림/닫힘 상태를 총괄하는 역할을 합니다!
export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 사이드바 열림/닫힘 상태를 저장하는 상태 변수
  // 기본값은 true(열림)으로 설정
  const [isOpen, setIsOpen] = useState(true);

  // 사이드바 토글 함수 - 열려있으면 닫고, 닫혀있으면 엶
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // 사이드바를 닫는 함수
  const closeSidebar = () => {
    setIsOpen(false);
  };

  // 사이드바를 여는 함수
  const openSidebar = () => {
    setIsOpen(true);
  };

  // 컨텍스트 값 설정
  const value = {
    isOpen,
    toggleSidebar,
    closeSidebar,
    openSidebar,
  };

  // 컨텍스트 제공자 반환
  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};

// 사이드바 컨텍스트를 사용하기 위한 커스텀 훅
// 이 함수를 사용하면 어떤 컴포넌트에서든 쉽게 사이드바 상태에 접근할 수 있어요.
// 마치 리모컨처럼 어디서든 사이드바를 제어할 수 있게 해주는 도구입니다!
export const useSidebar = () => useContext(SidebarContext);

export default SidebarContext;
