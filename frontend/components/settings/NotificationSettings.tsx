"use client";

import React, { useState } from 'react';

// 알림 설정 컴포넌트
// 사용자가 받을 알림의 종류와 방식을 설정하는 화면이에요.
// 마치 스마트폰의 알림 설정을 관리하는 것과 같아요!
const NotificationSettings: React.FC = () => {
  // 알림 설정 상태 (실제로는 API에서 가져올 것)
  // 이건 테스트를 위한 가짜 데이터예요.
  // 실제 서비스에서는 서버에서 진짜 사용자 설정을 가져오게 됩니다!
  const [settings, setSettings] = useState({
    // 앱 내 알림
    inApp: {
      tasks: true,
      comments: true,
      mentions: true,
      teamUpdates: true,
      events: true,
      systemUpdates: false
    },
    // 이메일 알림
    email: {
      tasks: false,
      comments: false,
      mentions: true,
      teamUpdates: false,
      events: true,
      systemUpdates: true,
      dailySummary: true,
      weeklySummary: true
    },
    // 방해 금지 시간
    doNotDisturb: {
      enabled: true,
      startTime: '18:00',
      endTime: '09:00',
      weekend: true
    }
  });
  
  // 알림 설정 변경 핸들러
  const handleToggleInApp = (key: keyof typeof settings.inApp) => {
    setSettings(prev => ({
      ...prev,
      inApp: {
        ...prev.inApp,
        [key]: !prev.inApp[key]
      }
    }));
  };
  
  const handleToggleEmail = (key: keyof typeof settings.email) => {
    setSettings(prev => ({
      ...prev,
      email: {
        ...prev.email,
        [key]: !prev.email[key]
      }
    }));
  };
  
  const handleDoNotDisturbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      doNotDisturb: {
        ...prev.doNotDisturb,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };
  
  // 설정 저장 핸들러 (실제로는 API 호출 필요)
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('알림 설정 저장:', settings);
    // 실제 구현에서는 API 호출
    alert('알림 설정이 저장되었습니다.');
  };
  
  return (
    <div className="notification-settings">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">알림 설정</h2>
      
      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* 앱 내 알림 설정 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-md font-medium text-gray-800 mb-4">앱 내 알림</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">업무 할당 및 마감일</p>
                <p className="text-xs text-gray-500">새 업무가 할당되거나 마감일이 다가올 때 알림</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.inApp.tasks}
                  onChange={() => handleToggleInApp('tasks')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">댓글</p>
                <p className="text-xs text-gray-500">내 게시물이나 참여한 대화에 새 댓글이 달릴 때 알림</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.inApp.comments}
                  onChange={() => handleToggleInApp('comments')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">멘션</p>
                <p className="text-xs text-gray-500">누군가 나를 멘션(@)했을 때 알림</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.inApp.mentions}
                  onChange={() => handleToggleInApp('mentions')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">팀 업데이트</p>
                <p className="text-xs text-gray-500">팀 구성, 공지사항 등 팀 관련 변경사항 알림</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.inApp.teamUpdates}
                  onChange={() => handleToggleInApp('teamUpdates')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">일정</p>
                <p className="text-xs text-gray-500">회의, 이벤트 등 일정 관련 알림</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.inApp.events}
                  onChange={() => handleToggleInApp('events')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">시스템 업데이트</p>
                <p className="text-xs text-gray-500">시스템 변경, 유지보수 등 알림</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.inApp.systemUpdates}
                  onChange={() => handleToggleInApp('systemUpdates')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
          </div>
        </div>
        
        {/* 이메일 알림 설정 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-md font-medium text-gray-800 mb-4">이메일 알림</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">업무 할당 및 마감일</p>
                <p className="text-xs text-gray-500">새 업무가 할당되거나 마감일이 다가올 때 이메일 발송</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.email.tasks}
                  onChange={() => handleToggleEmail('tasks')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">댓글</p>
                <p className="text-xs text-gray-500">내 게시물이나 참여한 대화에 새 댓글이 달릴 때 이메일 발송</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.email.comments}
                  onChange={() => handleToggleEmail('comments')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">멘션</p>
                <p className="text-xs text-gray-500">누군가 나를 멘션(@)했을 때 이메일 발송</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.email.mentions}
                  onChange={() => handleToggleEmail('mentions')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">일정</p>
                <p className="text-xs text-gray-500">회의, 이벤트 등 일정 관련 이메일 발송</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.email.events}
                  onChange={() => handleToggleEmail('events')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">일일 요약</p>
                <p className="text-xs text-gray-500">하루 동안의 활동 요약 이메일 발송</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.email.dailySummary}
                  onChange={() => handleToggleEmail('dailySummary')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">주간 요약</p>
                <p className="text-xs text-gray-500">일주일 동안의 활동 요약 이메일 발송</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.email.weeklySummary}
                  onChange={() => handleToggleEmail('weeklySummary')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
          </div>
        </div>
        
        {/* 방해 금지 시간 설정 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-md font-medium text-gray-800">방해 금지 시간</h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                name="enabled"
                className="sr-only peer" 
                checked={settings.doNotDisturb.enabled}
                onChange={handleDoNotDisturbChange}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
            </label>
          </div>
          
          {settings.doNotDisturb.enabled && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">이 시간 동안에는 알림을 받지 않습니다.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">시작 시간</label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={settings.doNotDisturb.startTime}
                    onChange={handleDoNotDisturbChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">종료 시간</label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={settings.doNotDisturb.endTime}
                    onChange={handleDoNotDisturbChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="weekend"
                  name="weekend"
                  checked={settings.doNotDisturb.weekend}
                  onChange={handleDoNotDisturbChange}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="weekend" className="ml-2 text-sm font-medium text-gray-700">주말에는 항상 방해 금지 모드 적용</label>
              </div>
            </div>
          )}
        </div>
        
        {/* 저장 버튼 */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          >
            설정 저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotificationSettings;
