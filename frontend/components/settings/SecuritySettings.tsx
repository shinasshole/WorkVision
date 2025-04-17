"use client";

import React, { useState } from 'react';

// 보안 설정 컴포넌트
// 사용자가 계정 보안과 관련된 설정을 관리하는 화면이에요.
// 마치 집의 보안 시스템을 설정하는 것과 같아요!
const SecuritySettings: React.FC = () => {
  // 보안 설정 상태 (실제로는 API에서 가져올 것)
  // 이건 테스트를 위한 가짜 데이터예요.
  // 실제 서비스에서는 서버에서 진짜 사용자 설정을 가져오게 됩니다!
  const [settings, setSettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: '30', // 분 단위
    loginNotifications: true,
    passwordExpiry: '90', // 일 단위
    lastPasswordChange: '2025-03-01',
    recentLogins: [
      { id: 1, device: '크롬 브라우저 (Windows)', ip: '192.168.1.1', location: '서울, 대한민국', time: '2025-04-17T15:30:00', current: true },
      { id: 2, device: '모바일 앱 (Android)', ip: '192.168.1.2', location: '서울, 대한민국', time: '2025-04-16T10:15:00', current: false },
      { id: 3, device: '사파리 브라우저 (macOS)', ip: '192.168.1.3', location: '부산, 대한민국', time: '2025-04-15T09:45:00', current: false },
      { id: 4, device: '파이어폭스 브라우저 (Windows)', ip: '192.168.1.4', location: '서울, 대한민국', time: '2025-04-14T14:20:00', current: false }
    ]
  });
  
  // 설정 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // 로그인 세션 종료 핸들러 (실제로는 API 호출 필요)
  const handleTerminateSession = (id: number) => {
    console.log(`세션 종료: ${id}`);
    // 실제 구현에서는 API 호출
    alert(`로그인 세션 ${id}이(가) 종료되었습니다.`);
  };
  
  // 설정 저장 핸들러 (실제로는 API 호출 필요)
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('보안 설정 저장:', settings);
    // 실제 구현에서는 API 호출
    alert('보안 설정이 저장되었습니다.');
  };
  
  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // 시간 포맷팅 함수
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // 비밀번호 만료까지 남은 일수 계산
  const getDaysUntilPasswordExpiry = () => {
    const lastChange = new Date(settings.lastPasswordChange);
    const expiryDays = parseInt(settings.passwordExpiry);
    const expiryDate = new Date(lastChange);
    expiryDate.setDate(lastChange.getDate() + expiryDays);
    
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  return (
    <div className="security-settings">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">보안 설정</h2>
      
      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* 계정 보안 설정 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-md font-medium text-gray-800 mb-4">계정 보안</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">2단계 인증</p>
                <p className="text-xs text-gray-500">로그인 시 추가 인증 단계를 요구합니다.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  name="twoFactorAuth"
                  className="sr-only peer" 
                  checked={settings.twoFactorAuth}
                  onChange={handleChange}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
            
            {settings.twoFactorAuth && (
              <div className="ml-6 p-3 bg-blue-50 rounded-md border border-blue-100">
                <p className="text-sm text-blue-700">2단계 인증이 활성화되었습니다. 로그인 시 이메일로 인증 코드가 전송됩니다.</p>
                <button
                  type="button"
                  className="mt-2 text-xs font-medium text-primary-600 hover:text-primary-700"
                >
                  2단계 인증 설정 변경
                </button>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">로그인 알림</p>
                <p className="text-xs text-gray-500">새로운 기기에서 로그인 시 알림을 받습니다.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  name="loginNotifications"
                  className="sr-only peer" 
                  checked={settings.loginNotifications}
                  onChange={handleChange}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
              </label>
            </div>
            
            <div>
              <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 mb-1">세션 타임아웃</label>
              <div className="flex items-center">
                <select
                  id="sessionTimeout"
                  name="sessionTimeout"
                  value={settings.sessionTimeout}
                  onChange={handleChange}
                  className="w-full sm:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="15">15분</option>
                  <option value="30">30분</option>
                  <option value="60">1시간</option>
                  <option value="120">2시간</option>
                  <option value="240">4시간</option>
                  <option value="480">8시간</option>
                </select>
                <p className="ml-2 text-xs text-gray-500">동안 활동이 없으면 자동으로 로그아웃됩니다.</p>
              </div>
            </div>
            
            <div>
              <label htmlFor="passwordExpiry" className="block text-sm font-medium text-gray-700 mb-1">비밀번호 만료 기간</label>
              <div className="flex items-center">
                <select
                  id="passwordExpiry"
                  name="passwordExpiry"
                  value={settings.passwordExpiry}
                  onChange={handleChange}
                  className="w-full sm:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="30">30일</option>
                  <option value="60">60일</option>
                  <option value="90">90일</option>
                  <option value="180">180일</option>
                  <option value="365">365일</option>
                </select>
                <p className="ml-2 text-xs text-gray-500">마다 비밀번호 변경이 필요합니다.</p>
              </div>
              
              <div className="mt-2 text-xs">
                <p>마지막 비밀번호 변경일: {formatDate(settings.lastPasswordChange)}</p>
                {getDaysUntilPasswordExpiry() <= 0 ? (
                  <p className="text-red-600 font-medium">비밀번호가 만료되었습니다. 지금 변경해주세요.</p>
                ) : getDaysUntilPasswordExpiry() <= 7 ? (
                  <p className="text-orange-600 font-medium">비밀번호 만료까지 {getDaysUntilPasswordExpiry()}일 남았습니다.</p>
                ) : (
                  <p className="text-green-600">비밀번호 만료까지 {getDaysUntilPasswordExpiry()}일 남았습니다.</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* 로그인 기록 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-md font-medium text-gray-800 mb-4">로그인 기록</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">기기</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP 주소</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">위치</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시간</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">액션</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {settings.recentLogins.map((login) => (
                  <tr key={login.id} className={login.current ? 'bg-blue-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{login.device}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{login.ip}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{login.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatTime(login.time)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {login.current ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          현재 세션
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          이전 세션
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {!login.current && (
                        <button
                          type="button"
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleTerminateSession(login.id)}
                        >
                          세션 종료
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              모든 세션 종료 (현재 세션 제외)
            </button>
          </div>
        </div>
        
        {/* 계정 활동 로그 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-medium text-gray-800">계정 활동 로그</h3>
            <button
              type="button"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              전체 로그 보기
            </button>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-md border border-blue-100">
            <p className="text-sm text-blue-700">계정 활동 로그는 로그인, 비밀번호 변경, 보안 설정 변경 등 계정과 관련된 모든 활동을 기록합니다. 의심스러운 활동이 있다면 즉시 비밀번호를 변경하고 관리자에게 문의하세요.</p>
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

export default SecuritySettings;
