"use client";

import React, { useState } from 'react';

// 테마 설정 컴포넌트
// 사용자가 앱의 시각적 모드와 디스플레이 설정을 관리하는 화면이에요.
// 마치 집 안의 조명과 인테리어를 자신의 취향에 맞게 바꾸는 것과 같아요!
const ThemeSettings: React.FC = () => {
  // 테마 설정 상태 (실제로는 API에서 가져올 것)
  // 이건 테스트를 위한 가짜 데이터예요.
  // 실제 서비스에서는 서버에서 진짜 사용자 설정을 가져오게 됩니다!
  const [settings, setSettings] = useState({
    theme: 'light', // 'light', 'dark', 'system'
    fontSize: 'medium', // 'small', 'medium', 'large'
    colorScheme: 'blue', // 'blue', 'green', 'purple', 'orange'
    reduceMotion: false,
    highContrast: false,
    compactMode: false
  });
  
  // 테마 설정 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // 설정 저장 핸들러 (실제로는 API 호출 필요)
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('테마 설정 저장:', settings);
    // 실제 구현에서는 API 호출
    alert('테마 설정이 저장되었습니다.');
  };
  
  return (
    <div className="theme-settings">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">테마 및 디스플레이 설정</h2>
      
      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* 테마 모드 설정 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-md font-medium text-gray-800 mb-4">테마 모드</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                settings.theme === 'light' 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSettings(prev => ({ ...prev, theme: 'light' }))}
            >
              <div className="flex items-center mb-3">
                <input 
                  type="radio" 
                  id="themeLight" 
                  name="theme" 
                  value="light" 
                  checked={settings.theme === 'light'} 
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                />
                <label htmlFor="themeLight" className="ml-2 text-sm font-medium text-gray-700">라이트 모드</label>
              </div>
              <div className="h-20 bg-white border border-gray-200 rounded-md flex items-center justify-center">
                <div className="w-8 h-8 bg-primary-500 rounded-md"></div>
              </div>
            </div>
            
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                settings.theme === 'dark' 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSettings(prev => ({ ...prev, theme: 'dark' }))}
            >
              <div className="flex items-center mb-3">
                <input 
                  type="radio" 
                  id="themeDark" 
                  name="theme" 
                  value="dark" 
                  checked={settings.theme === 'dark'} 
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                />
                <label htmlFor="themeDark" className="ml-2 text-sm font-medium text-gray-700">다크 모드</label>
              </div>
              <div className="h-20 bg-gray-800 border border-gray-700 rounded-md flex items-center justify-center">
                <div className="w-8 h-8 bg-primary-500 rounded-md"></div>
              </div>
            </div>
            
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                settings.theme === 'system' 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSettings(prev => ({ ...prev, theme: 'system' }))}
            >
              <div className="flex items-center mb-3">
                <input 
                  type="radio" 
                  id="themeSystem" 
                  name="theme" 
                  value="system" 
                  checked={settings.theme === 'system'} 
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                />
                <label htmlFor="themeSystem" className="ml-2 text-sm font-medium text-gray-700">시스템 설정 사용</label>
              </div>
              <div className="h-20 bg-gradient-to-r from-white to-gray-800 border border-gray-200 rounded-md flex items-center justify-center">
                <div className="w-8 h-8 bg-primary-500 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 색상 스킴 설정 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-md font-medium text-gray-800 mb-4">색상 스킴</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                settings.colorScheme === 'blue' 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSettings(prev => ({ ...prev, colorScheme: 'blue' }))}
            >
              <div className="flex items-center mb-3">
                <input 
                  type="radio" 
                  id="colorBlue" 
                  name="colorScheme" 
                  value="blue" 
                  checked={settings.colorScheme === 'blue'} 
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                />
                <label htmlFor="colorBlue" className="ml-2 text-sm font-medium text-gray-700">블루</label>
              </div>
              <div className="h-8 bg-blue-500 rounded-md"></div>
            </div>
            
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                settings.colorScheme === 'green' 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSettings(prev => ({ ...prev, colorScheme: 'green' }))}
            >
              <div className="flex items-center mb-3">
                <input 
                  type="radio" 
                  id="colorGreen" 
                  name="colorScheme" 
                  value="green" 
                  checked={settings.colorScheme === 'green'} 
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                />
                <label htmlFor="colorGreen" className="ml-2 text-sm font-medium text-gray-700">그린</label>
              </div>
              <div className="h-8 bg-green-500 rounded-md"></div>
            </div>
            
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                settings.colorScheme === 'purple' 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSettings(prev => ({ ...prev, colorScheme: 'purple' }))}
            >
              <div className="flex items-center mb-3">
                <input 
                  type="radio" 
                  id="colorPurple" 
                  name="colorScheme" 
                  value="purple" 
                  checked={settings.colorScheme === 'purple'} 
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                />
                <label htmlFor="colorPurple" className="ml-2 text-sm font-medium text-gray-700">퍼플</label>
              </div>
              <div className="h-8 bg-purple-500 rounded-md"></div>
            </div>
            
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                settings.colorScheme === 'orange' 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSettings(prev => ({ ...prev, colorScheme: 'orange' }))}
            >
              <div className="flex items-center mb-3">
                <input 
                  type="radio" 
                  id="colorOrange" 
                  name="colorScheme" 
                  value="orange" 
                  checked={settings.colorScheme === 'orange'} 
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                />
                <label htmlFor="colorOrange" className="ml-2 text-sm font-medium text-gray-700">오렌지</label>
              </div>
              <div className="h-8 bg-orange-500 rounded-md"></div>
            </div>
          </div>
        </div>
        
        {/* 글꼴 크기 설정 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-md font-medium text-gray-800 mb-4">글꼴 크기</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                settings.fontSize === 'small' 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSettings(prev => ({ ...prev, fontSize: 'small' }))}
            >
              <div className="flex items-center mb-3">
                <input 
                  type="radio" 
                  id="fontSmall" 
                  name="fontSize" 
                  value="small" 
                  checked={settings.fontSize === 'small'} 
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                />
                <label htmlFor="fontSmall" className="ml-2 text-sm font-medium text-gray-700">작게</label>
              </div>
              <p className="text-sm">작은 글꼴 크기 (14px)</p>
            </div>
            
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                settings.fontSize === 'medium' 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSettings(prev => ({ ...prev, fontSize: 'medium' }))}
            >
              <div className="flex items-center mb-3">
                <input 
                  type="radio" 
                  id="fontMedium" 
                  name="fontSize" 
                  value="medium" 
                  checked={settings.fontSize === 'medium'} 
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                />
                <label htmlFor="fontMedium" className="ml-2 text-sm font-medium text-gray-700">중간</label>
              </div>
              <p className="text-base">중간 글꼴 크기 (16px)</p>
            </div>
            
            <div 
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                settings.fontSize === 'large' 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSettings(prev => ({ ...prev, fontSize: 'large' }))}
            >
              <div className="flex items-center mb-3">
                <input 
                  type="radio" 
                  id="fontLarge" 
                  name="fontSize" 
                  value="large" 
                  checked={settings.fontSize === 'large'} 
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                />
                <label htmlFor="fontLarge" className="ml-2 text-sm font-medium text-gray-700">크게</label>
              </div>
              <p className="text-lg">큰 글꼴 크기 (18px)</p>
            </div>
          </div>
        </div>
        
        {/* 접근성 설정 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-md font-medium text-gray-800 mb-4">접근성 설정</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">모션 감소</p>
                <p className="text-xs text-gray-500">애니메이션과 전환 효과를 줄입니다.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  name="reduceMotion"
                  className="sr-only peer" 
                  checked={settings.reduceMotion}
                  onChange={handleChange}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">고대비 모드</p>
                <p className="text-xs text-gray-500">텍스트와 배경 간의 대비를 높입니다.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  name="highContrast"
                  className="sr-only peer" 
                  checked={settings.highContrast}
                  onChange={handleChange}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">컴팩트 모드</p>
                <p className="text-xs text-gray-500">UI 요소 간의 간격을 줄여 더 많은 콘텐츠를 표시합니다.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  name="compactMode"
                  className="sr-only peer" 
                  checked={settings.compactMode}
                  onChange={handleChange}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
          </div>
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

export default ThemeSettings;
