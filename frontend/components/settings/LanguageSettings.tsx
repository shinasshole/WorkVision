"use client";

import React, { useState } from 'react';

// 언어 설정 컴포넌트
// 사용자가 앱의 언어를 선택할 수 있는 화면이에요.
// 마치 여러 나라 사람들이 모인 국제 회의에서 통역기를 선택하는 것과 같아요!
const LanguageSettings: React.FC = () => {
  // 언어 설정 상태 (실제로는 API에서 가져올 것)
  // 이건 테스트를 위한 가짜 데이터예요.
  // 실제 서비스에서는 서버에서 진짜 사용자 설정을 가져오게 됩니다!
  const [settings, setSettings] = useState({
    language: 'ko', // 'ko', 'en', 'ja', 'zh'
    dateFormat: 'yyyy-mm-dd', // 'yyyy-mm-dd', 'mm/dd/yyyy', 'dd/mm/yyyy'
    timeFormat: '24h', // '12h', '24h'
    firstDayOfWeek: 'monday' // 'sunday', 'monday'
  });
  
  // 언어 목록
  const languages = [
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ];
  
  // 날짜 형식 목록
  const dateFormats = [
    { value: 'yyyy-mm-dd', label: 'YYYY-MM-DD (2025-04-17)' },
    { value: 'mm/dd/yyyy', label: 'MM/DD/YYYY (04/17/2025)' },
    { value: 'dd/mm/yyyy', label: 'DD/MM/YYYY (17/04/2025)' }
  ];
  
  // 시간 형식 목록
  const timeFormats = [
    { value: '12h', label: '12시간 (AM/PM)' },
    { value: '24h', label: '24시간' }
  ];
  
  // 주 시작일 목록
  const weekStartDays = [
    { value: 'sunday', label: '일요일' },
    { value: 'monday', label: '월요일' }
  ];
  
  // 설정 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // 언어 선택 핸들러
  const handleLanguageSelect = (code: string) => {
    setSettings(prev => ({
      ...prev,
      language: code
    }));
  };
  
  // 설정 저장 핸들러 (실제로는 API 호출 필요)
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('언어 설정 저장:', settings);
    // 실제 구현에서는 API 호출
    alert('언어 설정이 저장되었습니다.');
  };
  
  return (
    <div className="language-settings">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">언어 설정</h2>
      
      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* 언어 선택 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-md font-medium text-gray-800 mb-4">언어 선택</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {languages.map(language => (
              <div 
                key={language.code}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  settings.language === language.code 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleLanguageSelect(language.code)}
              >
                <div className="flex items-center">
                  <input 
                    type="radio" 
                    id={`lang_${language.code}`} 
                    name="language" 
                    value={language.code} 
                    checked={settings.language === language.code} 
                    onChange={handleChange}
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500"
                  />
                  <label htmlFor={`lang_${language.code}`} className="ml-2 text-sm font-medium text-gray-700 flex items-center">
                    <span className="text-xl mr-2">{language.flag}</span>
                    {language.name}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 날짜 및 시간 형식 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-md font-medium text-gray-800 mb-4">날짜 및 시간 형식</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 mb-2">날짜 형식</label>
              <select
                id="dateFormat"
                name="dateFormat"
                value={settings.dateFormat}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {dateFormats.map(format => (
                  <option key={format.value} value={format.value}>
                    {format.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="timeFormat" className="block text-sm font-medium text-gray-700 mb-2">시간 형식</label>
              <select
                id="timeFormat"
                name="timeFormat"
                value={settings.timeFormat}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {timeFormats.map(format => (
                  <option key={format.value} value={format.value}>
                    {format.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* 캘린더 설정 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-md font-medium text-gray-800 mb-4">캘린더 설정</h3>
          
          <div>
            <label htmlFor="firstDayOfWeek" className="block text-sm font-medium text-gray-700 mb-2">주 시작일</label>
            <select
              id="firstDayOfWeek"
              name="firstDayOfWeek"
              value={settings.firstDayOfWeek}
              onChange={handleChange}
              className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {weekStartDays.map(day => (
                <option key={day.value} value={day.value}>
                  {day.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* 언어 지원 정보 */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5">
              <span className="text-blue-500 text-xl">ℹ️</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">언어 지원 정보</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>현재 WorkVision은 한국어, 영어, 일본어, 중국어를 지원합니다. 추가 언어는 계속해서 업데이트될 예정입니다.</p>
                <p className="mt-1">언어 번역에 문제가 있거나 제안사항이 있으시면 설정 &gt; 지원 메뉴에서 피드백을 보내주세요.</p>
              </div>
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

export default LanguageSettings;
