"use client";

import React, { useState } from 'react';

// 시스템 설정 탭 컴포넌트
// 시스템 전체 설정을 관리하는 컴포넌트예요.
// 마치 자동차의 엔진 설정을 조정하는 것과 같아요!
const SystemSettingsTab: React.FC = () => {
  // 시스템 설정 상태 (실제로는 API에서 가져올 것)
  // 이건 테스트를 위한 가짜 데이터예요.
  // 실제 서비스에서는 서버에서 진짜 시스템 설정을 가져오게 됩니다!
  const [settings, setSettings] = useState({
    general: {
      siteName: 'WorkVision',
      siteDescription: '업무 비전 공유 플랫폼',
      logoUrl: '',
      faviconUrl: '',
      timezone: 'Asia/Seoul',
      dateFormat: 'YYYY-MM-DD',
      timeFormat: '24h'
    },
    security: {
      sessionTimeout: 30, // 분 단위
      maxLoginAttempts: 5,
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        expiryDays: 90
      },
      twoFactorAuth: {
        enabled: true,
        required: false
      }
    },
    email: {
      provider: 'smtp',
      host: 'smtp.example.com',
      port: 587,
      username: 'noreply@workvision.com',
      fromEmail: 'noreply@workvision.com',
      fromName: 'WorkVision',
      encryption: 'tls'
    },
    notifications: {
      emailNotifications: true,
      inAppNotifications: true,
      dailyDigest: true,
      weeklyDigest: true
    },
    storage: {
      provider: 'local',
      maxUploadSize: 10, // MB
      allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
    },
    api: {
      rateLimit: {
        enabled: true,
        maxRequests: 100,
        timeWindow: 60 // 초 단위
      },
      tokenExpiry: 24 // 시간 단위
    },
    backup: {
      automatic: true,
      frequency: 'daily',
      time: '02:00',
      retentionDays: 30
    }
  });
  
  // 설정 변경 핸들러
  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      general: {
        ...prev.general,
        [name]: value
      }
    }));
  };
  
  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : type === 'number' 
        ? parseInt(value) 
        : value;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setSettings(prev => ({
        ...prev,
        security: {
          ...prev.security,
          [parent]: {
            ...prev.security[parent as keyof typeof prev.security],
            [child]: newValue
          }
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        security: {
          ...prev.security,
          [name]: newValue
        }
      }));
    }
  };
  
  // 설정 저장 핸들러 (실제로는 API 호출 필요)
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('시스템 설정 저장:', settings);
    // 실제 구현에서는 API 호출
    alert('시스템 설정이 저장되었습니다.');
  };
  
  return (
    <div className="system-settings-tab">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">시스템 설정</h2>
        <p className="text-sm text-gray-600">
          WorkVision 플랫폼의 전체 시스템 설정을 관리합니다. 이 설정은 모든 사용자에게 영향을 미칩니다.
        </p>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-0.5">
            <span className="text-blue-500 text-xl">ℹ️</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">관리자 권한 필요</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>시스템 설정을 변경하려면 관리자 권한이 필요합니다. 변경사항은 즉시 모든 사용자에게 적용됩니다.</p>
            </div>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* 일반 설정 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-md font-medium text-gray-800 mb-4">일반 설정</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">사이트 이름</label>
              <input
                type="text"
                id="siteName"
                name="siteName"
                value={settings.general.siteName}
                onChange={handleGeneralChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-1">사이트 설명</label>
              <input
                type="text"
                id="siteDescription"
                name="siteDescription"
                value={settings.general.siteDescription}
                onChange={handleGeneralChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">시간대</label>
              <select
                id="timezone"
                name="timezone"
                value={settings.general.timezone}
                onChange={handleGeneralChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="Asia/Seoul">서울 (GMT+9)</option>
                <option value="Asia/Tokyo">도쿄 (GMT+9)</option>
                <option value="America/New_York">뉴욕 (GMT-5)</option>
                <option value="Europe/London">런던 (GMT+0)</option>
                <option value="Europe/Paris">파리 (GMT+1)</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 mb-1">날짜 형식</label>
              <select
                id="dateFormat"
                name="dateFormat"
                value={settings.general.dateFormat}
                onChange={handleGeneralChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* 보안 설정 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-md font-medium text-gray-800 mb-4">보안 설정</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 mb-1">세션 타임아웃 (분)</label>
              <input
                type="number"
                id="sessionTimeout"
                name="sessionTimeout"
                value={settings.security.sessionTimeout}
                onChange={handleSecurityChange}
                min="5"
                max="1440"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="maxLoginAttempts" className="block text-sm font-medium text-gray-700 mb-1">최대 로그인 시도 횟수</label>
              <input
                type="number"
                id="maxLoginAttempts"
                name="maxLoginAttempts"
                value={settings.security.maxLoginAttempts}
                onChange={handleSecurityChange}
                min="1"
                max="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">비밀번호 정책</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="minLength" className="block text-sm font-medium text-gray-700 mb-1">최소 길이</label>
                <input
                  type="number"
                  id="minLength"
                  name="passwordPolicy.minLength"
                  value={settings.security.passwordPolicy.minLength}
                  onChange={handleSecurityChange}
                  min="6"
                  max="20"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="expiryDays" className="block text-sm font-medium text-gray-700 mb-1">만료 기간 (일)</label>
                <input
                  type="number"
                  id="expiryDays"
                  name="passwordPolicy.expiryDays"
                  value={settings.security.passwordPolicy.expiryDays}
                  onChange={handleSecurityChange}
                  min="0"
                  max="365"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">0으로 설정하면 만료되지 않음</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="requireUppercase"
                  name="passwordPolicy.requireUppercase"
                  checked={settings.security.passwordPolicy.requireUppercase}
                  onChange={handleSecurityChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="requireUppercase" className="ml-2 block text-sm text-gray-700">
                  대문자 포함 필요
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="requireLowercase"
                  name="passwordPolicy.requireLowercase"
                  checked={settings.security.passwordPolicy.requireLowercase}
                  onChange={handleSecurityChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="requireLowercase" className="ml-2 block text-sm text-gray-700">
                  소문자 포함 필요
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="requireNumbers"
                  name="passwordPolicy.requireNumbers"
                  checked={settings.security.passwordPolicy.requireNumbers}
                  onChange={handleSecurityChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="requireNumbers" className="ml-2 block text-sm text-gray-700">
                  숫자 포함 필요
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="requireSpecialChars"
                  name="passwordPolicy.requireSpecialChars"
                  checked={settings.security.passwordPolicy.requireSpecialChars}
                  onChange={handleSecurityChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="requireSpecialChars" className="ml-2 block text-sm text-gray-700">
                  특수문자 포함 필요
                </label>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">2단계 인증</h4>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="twoFactorEnabled"
                name="twoFactorAuth.enabled"
                checked={settings.security.twoFactorAuth.enabled}
                onChange={handleSecurityChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="twoFactorEnabled" className="ml-2 block text-sm text-gray-700">
                2단계 인증 활성화
              </label>
            </div>
            
            {settings.security.twoFactorAuth.enabled && (
              <div className="flex items-center mt-2 ml-6">
                <input
                  type="checkbox"
                  id="twoFactorRequired"
                  name="twoFactorAuth.required"
                  checked={settings.security.twoFactorAuth.required}
                  onChange={handleSecurityChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="twoFactorRequired" className="ml-2 block text-sm text-gray-700">
                  모든 사용자에게 필수로 적용
                </label>
              </div>
            )}
          </div>
        </div>
        
        {/* 백업 설정 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-md font-medium text-gray-800">백업 설정</h3>
            <button
              type="button"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              지금 백업
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="automaticBackup"
                checked={settings.backup.automatic}
                onChange={() => setSettings(prev => ({
                  ...prev,
                  backup: {
                    ...prev.backup,
                    automatic: !prev.backup.automatic
                  }
                }))}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="automaticBackup" className="ml-2 block text-sm text-gray-700">
                자동 백업 활성화
              </label>
            </div>
            
            {settings.backup.automatic && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-6">
                <div>
                  <label htmlFor="backupFrequency" className="block text-sm font-medium text-gray-700 mb-1">백업 주기</label>
                  <select
                    id="backupFrequency"
                    value={settings.backup.frequency}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      backup: {
                        ...prev.backup,
                        frequency: e.target.value
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="daily">매일</option>
                    <option value="weekly">매주</option>
                    <option value="monthly">매월</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="backupTime" className="block text-sm font-medium text-gray-700 mb-1">백업 시간</label>
                  <input
                    type="time"
                    id="backupTime"
                    value={settings.backup.time}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      backup: {
                        ...prev.backup,
                        time: e.target.value
                      }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="retentionDays" className="block text-sm font-medium text-gray-700 mb-1">보관 기간 (일)</label>
                  <input
                    type="number"
                    id="retentionDays"
                    value={settings.backup.retentionDays}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      backup: {
                        ...prev.backup,
                        retentionDays: parseInt(e.target.value)
                      }
                    }))}
                    min="1"
                    max="365"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}
            
            <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200 mt-4">
              <p className="text-sm text-yellow-700">
                <span className="font-medium">주의:</span> 백업 파일에는 모든 시스템 데이터가 포함됩니다. 백업 파일을 안전하게 보관하세요.
              </p>
            </div>
          </div>
        </div>
        
        {/* 저장 버튼 */}
        <div className="flex justify-end">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md mr-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            기본값으로 재설정
          </button>
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

export default SystemSettingsTab;
