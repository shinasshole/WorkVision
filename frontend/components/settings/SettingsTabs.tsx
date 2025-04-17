"use client";

import React, { useState } from 'react';
import ProfileSettings from './ProfileSettings';
import NotificationSettings from './NotificationSettings';
import ThemeSettings from './ThemeSettings';
import SecuritySettings from './SecuritySettings';
import LanguageSettings from './LanguageSettings';

// 설정 탭 컴포넌트
// 여러 설정 카테고리를 탭으로 구분하여 보여주는 컴포넌트예요.
// 마치 파일 캐비닛의 여러 서랍처럼, 각 탭은 다른 종류의 설정을 담고 있어요!
const SettingsTabs: React.FC = () => {
  // 현재 선택된 탭 상태
  const [activeTab, setActiveTab] = useState<string>('profile');
  
  // 탭 목록
  const tabs = [
    { id: 'profile', label: '프로필', icon: '👤' },
    { id: 'notifications', label: '알림', icon: '🔔' },
    { id: 'theme', label: '테마 및 디스플레이', icon: '🎨' },
    { id: 'language', label: '언어', icon: '🌐' },
    { id: 'security', label: '보안', icon: '🔒' },
  ];
  
  // 탭 내용 렌더링 함수
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'theme':
        return <ThemeSettings />;
      case 'language':
        return <LanguageSettings />;
      case 'security':
        return <SecuritySettings />;
      default:
        return <ProfileSettings />;
    }
  };
  
  return (
    <div className="settings-tabs">
      {/* 탭 네비게이션 */}
      <div className="flex flex-col sm:flex-row border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 border-primary-500 text-primary-600'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            } ${activeTab === tab.id ? '' : 'sm:border-b-2 sm:border-transparent'}`}
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

export default SettingsTabs;
