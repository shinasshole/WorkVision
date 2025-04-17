"use client";

import React, { useState } from 'react';

// 데이터 관리 탭 컴포넌트
// 시스템의 데이터를 관리하는 컴포넌트예요.
// 마치 도서관의 사서가 책을 정리하는 것과 같아요!
const DataManagementTab: React.FC = () => {
  // 데이터 백업 상태
  const [backupStatus, setBackupStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  // 데이터 복원 상태
  const [restoreStatus, setRestoreStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  // 데이터 정리 상태
  const [cleanupStatus, setCleanupStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  // 백업 목록 (실제로는 API에서 가져올 것)
  // 이건 테스트를 위한 가짜 데이터예요.
  // 실제 서비스에서는 서버에서 진짜 백업 데이터를 가져오게 됩니다!
  const [backups, setBackups] = useState([
    { id: 'bk-001', name: '일일 백업', date: '2023-06-15 02:00:00', size: '45.2 MB', type: 'automatic' },
    { id: 'bk-002', name: '주간 백업', date: '2023-06-10 03:00:00', size: '42.8 MB', type: 'automatic' },
    { id: 'bk-003', name: '수동 백업', date: '2023-06-05 15:30:00', size: '43.5 MB', type: 'manual' },
    { id: 'bk-004', name: '배포 전 백업', date: '2023-06-01 10:15:00', size: '41.9 MB', type: 'manual' },
    { id: 'bk-005', name: '월간 백업', date: '2023-05-30 02:00:00', size: '40.2 MB', type: 'automatic' },
  ]);
  
  // 데이터 통계 (실제로는 API에서 가져올 것)
  // 이건 테스트를 위한 가짜 데이터예요.
  // 실제 서비스에서는 서버에서 진짜 데이터 통계를 가져오게 됩니다!
  const dataStats = {
    totalSize: '120.5 MB',
    userDataSize: '45.2 MB',
    reportDataSize: '35.8 MB',
    mediaSize: '25.3 MB',
    systemDataSize: '14.2 MB',
    unusedDataSize: '8.5 MB',
    lastCleanup: '2023-06-01',
    backupCount: backups.length,
    oldestBackup: '2023-05-30',
    newestBackup: '2023-06-15'
  };
  
  // 백업 시작 핸들러
  const handleStartBackup = () => {
    setBackupStatus('loading');
    
    // 실제 구현에서는 API 호출
    // 여기서는 타이머로 시뮬레이션
    setTimeout(() => {
      // 새 백업 추가
      const newBackup = {
        id: `bk-00${backups.length + 1}`,
        name: '수동 백업',
        date: new Date().toISOString().replace('T', ' ').substring(0, 19),
        size: '45.8 MB',
        type: 'manual'
      };
      
      setBackups([newBackup, ...backups]);
      setBackupStatus('success');
      
      // 3초 후 상태 초기화
      setTimeout(() => {
        setBackupStatus('idle');
      }, 3000);
    }, 2000);
  };
  
  // 데이터 정리 핸들러
  const handleCleanupData = () => {
    setCleanupStatus('loading');
    
    // 실제 구현에서는 API 호출
    // 여기서는 타이머로 시뮬레이션
    setTimeout(() => {
      setCleanupStatus('success');
      
      // 3초 후 상태 초기화
      setTimeout(() => {
        setCleanupStatus('idle');
      }, 3000);
    }, 2000);
  };
  
  // 백업 삭제 핸들러
  const handleDeleteBackup = (id: string) => {
    // 실제 구현에서는 API 호출 후 상태 업데이트
    setBackups(backups.filter(backup => backup.id !== id));
  };
  
  // 백업 복원 핸들러
  const handleRestoreBackup = (id: string) => {
    setRestoreStatus('loading');
    
    // 실제 구현에서는 API 호출
    // 여기서는 타이머로 시뮬레이션
    setTimeout(() => {
      setRestoreStatus('success');
      
      // 3초 후 상태 초기화
      setTimeout(() => {
        setRestoreStatus('idle');
      }, 3000);
    }, 2000);
  };
  
  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR');
  };
  
  return (
    <div className="data-management-tab">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">데이터 관리</h2>
        <p className="text-sm text-gray-600">
          시스템 데이터를 백업, 복원, 정리할 수 있습니다. 정기적인 데이터 관리를 통해 시스템 성능을 최적화하세요.
        </p>
      </div>
      
      {/* 데이터 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">총 데이터 크기</h3>
          <p className="text-2xl font-bold text-primary-600">{dataStats.totalSize}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">백업 수</h3>
          <p className="text-2xl font-bold text-primary-600">{dataStats.backupCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">미사용 데이터</h3>
          <p className="text-2xl font-bold text-primary-600">{dataStats.unusedDataSize}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">마지막 정리 날짜</h3>
          <p className="text-2xl font-bold text-primary-600">{dataStats.lastCleanup}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* 데이터 분석 */}
        <div className="lg:col-span-2 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-md font-medium text-gray-800 mb-4">데이터 분석</h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-600">사용자 데이터</span>
                <span className="text-sm text-gray-500">{dataStats.userDataSize}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '38%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-600">보고서 데이터</span>
                <span className="text-sm text-gray-500">{dataStats.reportDataSize}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-600">미디어 데이터</span>
                <span className="text-sm text-gray-500">{dataStats.mediaSize}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '21%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-600">시스템 데이터</span>
                <span className="text-sm text-gray-500">{dataStats.systemDataSize}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-600 h-2.5 rounded-full" style={{ width: '12%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-600">미사용 데이터</span>
                <span className="text-sm text-gray-500">{dataStats.unusedDataSize}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-red-600 h-2.5 rounded-full" style={{ width: '7%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 데이터 작업 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-md font-medium text-gray-800 mb-4">데이터 작업</h3>
          
          <div className="space-y-4">
            <div>
              <button
                className={`w-full py-3 px-4 rounded-md flex items-center justify-center font-medium transition-colors ${
                  backupStatus === 'loading' 
                    ? 'bg-primary-100 text-primary-700 cursor-not-allowed' 
                    : 'bg-primary-500 text-white hover:bg-primary-600'
                }`}
                onClick={handleStartBackup}
                disabled={backupStatus === 'loading'}
              >
                {backupStatus === 'loading' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    백업 중...
                  </>
                ) : backupStatus === 'success' ? (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    백업 완료!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
                    </svg>
                    데이터 백업
                  </>
                )}
              </button>
            </div>
            
            <div>
              <button
                className={`w-full py-3 px-4 rounded-md flex items-center justify-center font-medium transition-colors ${
                  cleanupStatus === 'loading' 
                    ? 'bg-orange-100 text-orange-700 cursor-not-allowed' 
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
                onClick={handleCleanupData}
                disabled={cleanupStatus === 'loading'}
              >
                {cleanupStatus === 'loading' ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-orange-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    정리 중...
                  </>
                ) : cleanupStatus === 'success' ? (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    정리 완료!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    미사용 데이터 정리
                  </>
                )}
              </button>
            </div>
            
            <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200">
              <p className="text-sm text-yellow-700">
                <span className="font-medium">주의:</span> 데이터 정리는 되돌릴 수 없습니다. 정리 전에 백업을 생성하세요.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 백업 목록 */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-md font-medium text-gray-800 mb-4">백업 목록</h3>
        
        {backups.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이름
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    날짜
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    크기
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    유형
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {backups.map((backup) => (
                  <tr key={backup.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{backup.name}</div>
                      <div className="text-xs text-gray-500">{backup.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(backup.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {backup.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        backup.type === 'automatic' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {backup.type === 'automatic' ? '자동' : '수동'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        className="text-primary-600 hover:text-primary-900 mr-3"
                        onClick={() => handleRestoreBackup(backup.id)}
                      >
                        복원
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteBackup(backup.id)}
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">백업이 없습니다.</p>
          </div>
        )}
      </div>
      
      {/* 복원 진행 중 오버레이 */}
      {restoreStatus === 'loading' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="text-center">
              <svg className="animate-spin h-12 w-12 text-primary-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">데이터 복원 중...</h3>
              <p className="text-sm text-gray-500">
                데이터 복원이 완료될 때까지 기다려주세요. 이 작업은 몇 분 정도 소요될 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* 복원 성공 오버레이 */}
      {restoreStatus === 'success' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">복원 완료!</h3>
              <p className="text-sm text-gray-500 mb-4">
                데이터가 성공적으로 복원되었습니다.
              </p>
              <button
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                onClick={() => setRestoreStatus('idle')}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataManagementTab;
