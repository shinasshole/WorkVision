"use client";

import React, { useState } from 'react';
import DashboardTab from './DashboardTab';
import UserManagementTab from './UserManagementTab';
import TeamManagementTab from './TeamManagementTab';
import SystemSettingsTab from './SystemSettingsTab';
import DataManagementTab from './DataManagementTab';
import LogsTab from './LogsTab';

// 관리자 탭 컴포넌트
// 여러 관리자 기능을 탭으로 구분하여 보여주는 컴포넌트예요.
// 마치 중앙 통제실의 여러 모니터를 전환하는 것과 같아요!
const AdminTabs: React.FC = () => {
  // 현재 선택된 탭 상태
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  // 탭 목록
  const tabs = [
    { id: 'dashboard', label: '대시보드', icon: '📊' },
    { id: 'users', label: '사용자 관리', icon: '👥' },
    { id: 'teams', label: '팀 관리', icon: '🏢' },
    { id: 'settings', label: '시스템 설정', icon: '⚙️' },
    { id: 'data', label: '데이터 관리', icon: '💾' },
    { id: 'logs', label: '로그', icon: '📋' },
  ];
  
  // 탭 내용 렌더링 함수
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'users':
        return <UserManagementTab />;
      case 'teams':
        return <TeamManagementTab />;
      case 'settings':
        return <SystemSettingsTab />;
      case 'data':
        return <DataManagementTab />;
      case 'logs':
        return <LogsTab />;
      default:
        return <DashboardTab />;
    }
  };
  
  return (
    <div className="admin-tabs">
      {/* 탭 네비게이션 */}
      <div className="flex flex-col sm:flex-row border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* 탭 내용 */}
      <div className="tab-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminTabs;
