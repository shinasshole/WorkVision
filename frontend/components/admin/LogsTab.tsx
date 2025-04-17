"use client";

import React, { useState } from 'react';

// 로그 타입 정의
// 시스템에서 발생하는 각종 로그의 구조를 정의해요.
// 마치 비행기의 블랙박스가 기록하는 정보와 같아요!
type Log = {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'debug';
  source: string;
  message: string;
  user?: string;
  details?: string;
};

// 로그 관리 탭 컴포넌트
// 시스템에서 발생한 로그를 관리하는 컴포넌트예요.
// 마치 병원의 의사가 환자의 진료 기록을 확인하는 것과 같아요!
const LogsTab: React.FC = () => {
  // 로그 목록 상태 (실제로는 API에서 가져올 것)
  // 이건 테스트를 위한 가짜 데이터예요.
  // 실제 서비스에서는 서버에서 진짜 로그 데이터를 가져오게 됩니다!
  const [logs, setLogs] = useState<Log[]>([
    {
      id: 'log-001',
      timestamp: '2023-06-15T14:32:15',
      level: 'info',
      source: 'UserService',
      message: '사용자 로그인 성공',
      user: '김철수',
      details: 'IP: 192.168.1.100, Browser: Chrome 114.0.0, OS: Windows 10'
    },
    {
      id: 'log-002',
      timestamp: '2023-06-15T14:30:05',
      level: 'error',
      source: 'DatabaseService',
      message: '데이터베이스 연결 실패',
      details: 'Connection timeout after 30000ms. Server: db.example.com:27017'
    },
    {
      id: 'log-003',
      timestamp: '2023-06-15T14:28:30',
      level: 'warning',
      source: 'FileService',
      message: '파일 업로드 용량 초과',
      user: '박지민',
      details: 'File size: 15.2MB, Max allowed: 10MB, File type: image/jpeg'
    },
    {
      id: 'log-004',
      timestamp: '2023-06-15T14:25:12',
      level: 'info',
      source: 'ReportService',
      message: '일일 보고서 생성 완료',
      user: '시스템',
      details: 'Report ID: RPT-20230615, Items: 152, Duration: 3.5s'
    },
    {
      id: 'log-005',
      timestamp: '2023-06-15T14:20:45',
      level: 'debug',
      source: 'AuthService',
      message: 'JWT 토큰 발급',
      user: '이영희',
      details: 'Token expires in: 3600s, Permissions: user, editor'
    },
    {
      id: 'log-006',
      timestamp: '2023-06-15T14:15:33',
      level: 'error',
      source: 'APIService',
      message: '외부 API 호출 실패',
      details: 'Status: 503 Service Unavailable, Endpoint: https://api.example.com/data'
    },
    {
      id: 'log-007',
      timestamp: '2023-06-15T14:10:20',
      level: 'info',
      source: 'NotificationService',
      message: '알림 발송 완료',
      user: '시스템',
      details: 'Recipients: 25, Type: task_reminder, Delivery: email, push'
    },
    {
      id: 'log-008',
      timestamp: '2023-06-15T14:05:08',
      level: 'warning',
      source: 'SecurityService',
      message: '비밀번호 5회 오류로 계정 잠금',
      user: '최민수',
      details: 'Account locked for 30 minutes, IP: 203.0.113.45'
    },
    {
      id: 'log-009',
      timestamp: '2023-06-15T14:00:15',
      level: 'info',
      source: 'UserService',
      message: '새 사용자 등록',
      user: '관리자',
      details: 'New user: hong.gildong@example.com, Role: user'
    },
    {
      id: 'log-010',
      timestamp: '2023-06-15T13:55:30',
      level: 'debug',
      source: 'SchedulerService',
      message: '백업 작업 예약',
      user: '시스템',
      details: 'Scheduled at: 2023-06-16T02:00:00, Type: full_backup'
    }
  ]);
  
  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState('');
  
  // 필터 상태
  const [levelFilter, setLevelFilter] = useState<'all' | 'info' | 'warning' | 'error' | 'debug'>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  
  // 날짜 필터 상태
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // 상세 보기 로그 상태
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  
  // 로그 소스 목록 (중복 제거)
  const sources = ['all', ...Array.from(new Set(logs.map(log => log.source)))];
  
  // 검색 및 필터링된 로그 목록
  const filteredLogs = logs.filter(log => {
    // 검색어 필터링
    const matchesSearch = 
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.user && log.user.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (log.details && log.details.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // 레벨 필터링
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    
    // 소스 필터링
    const matchesSource = sourceFilter === 'all' || log.source === sourceFilter;
    
    // 날짜 필터링
    const logDate = new Date(log.timestamp);
    const matchesStartDate = !startDate || logDate >= new Date(startDate);
    const matchesEndDate = !endDate || logDate <= new Date(endDate);
    
    return matchesSearch && matchesLevel && matchesSource && matchesStartDate && matchesEndDate;
  });
  
  // 로그 레벨에 따른 스타일 클래스 설정
  const getLevelClasses = (level: string) => {
    switch (level) {
      case 'info':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          icon: '🔵'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          icon: '🟡'
        };
      case 'error':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          icon: '🔴'
        };
      case 'debug':
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          icon: '⚪'
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          icon: '⚪'
        };
    }
  };
  
  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR');
  };
  
  // 로그 다운로드 핸들러
  const handleDownloadLogs = () => {
    // 실제 구현에서는 API 호출 또는 파일 생성 로직
    const logsJson = JSON.stringify(filteredLogs, null, 2);
    const blob = new Blob([logsJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // 로그 삭제 핸들러
  const handleClearLogs = () => {
    if (window.confirm('정말로 모든 로그를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      // 실제 구현에서는 API 호출
      setLogs([]);
    }
  };
  
  return (
    <div className="logs-tab">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-800">시스템 로그</h2>
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            onClick={handleDownloadLogs}
          >
            로그 다운로드
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            onClick={handleClearLogs}
          >
            로그 삭제
          </button>
        </div>
      </div>
      
      {/* 검색 및 필터 */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">검색</label>
            <div className="relative">
              <input
                type="text"
                id="search"
                placeholder="메시지, 사용자, 상세 정보 검색..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>
          
          <div>
            <label htmlFor="levelFilter" className="block text-sm font-medium text-gray-700 mb-1">로그 레벨</label>
            <select
              id="levelFilter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value as any)}
            >
              <option value="all">모든 레벨</option>
              <option value="info">정보 (Info)</option>
              <option value="warning">경고 (Warning)</option>
              <option value="error">오류 (Error)</option>
              <option value="debug">디버그 (Debug)</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="sourceFilter" className="block text-sm font-medium text-gray-700 mb-1">로그 소스</label>
            <select
              id="sourceFilter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
            >
              {sources.map((source) => (
                <option key={source} value={source}>
                  {source === 'all' ? '모든 소스' : source}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">시작 날짜</label>
            <input
              type="datetime-local"
              id="startDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">종료 날짜</label>
            <input
              type="datetime-local"
              id="endDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* 로그 통계 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-500 font-medium">정보 (Info)</p>
          <p className="text-2xl font-bold text-blue-700">
            {logs.filter(log => log.level === 'info').length}
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
          <p className="text-sm text-yellow-500 font-medium">경고 (Warning)</p>
          <p className="text-2xl font-bold text-yellow-700">
            {logs.filter(log => log.level === 'warning').length}
          </p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <p className="text-sm text-red-500 font-medium">오류 (Error)</p>
          <p className="text-2xl font-bold text-red-700">
            {logs.filter(log => log.level === 'error').length}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">디버그 (Debug)</p>
          <p className="text-2xl font-bold text-gray-700">
            {logs.filter(log => log.level === 'debug').length}
          </p>
        </div>
      </div>
      
      {/* 로그 목록 */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {filteredLogs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    시간
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    레벨
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    소스
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    메시지
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    사용자
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map((log) => {
                  const levelClasses = getLevelClasses(log.level);
                  
                  return (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(log.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${levelClasses.bg} ${levelClasses.text}`}>
                          {levelClasses.icon} {log.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.source}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                        {log.message}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.user || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-primary-600 hover:text-primary-900"
                          onClick={() => setSelectedLog(log)}
                        >
                          상세 보기
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">로그가 없습니다</h3>
            <p className="text-gray-500">검색 조건에 맞는 로그가 없습니다.</p>
          </div>
        )}
      </div>
      
      {/* 로그 상세 모달 */}
      {selectedLog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-900">로그 상세 정보</h3>
              <button
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setSelectedLog(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">ID</h4>
                <p className="text-sm text-gray-900">{selectedLog.id}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">시간</h4>
                <p className="text-sm text-gray-900">{formatDate(selectedLog.timestamp)}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">레벨</h4>
                <div className="flex items-center">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getLevelClasses(selectedLog.level).bg} ${getLevelClasses(selectedLog.level).text}`}>
                    {getLevelClasses(selectedLog.level).icon} {selectedLog.level}
                  </span>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">소스</h4>
                <p className="text-sm text-gray-900">{selectedLog.source}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">메시지</h4>
                <p className="text-sm text-gray-900">{selectedLog.message}</p>
              </div>
              
              {selectedLog.user && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">사용자</h4>
                  <p className="text-sm text-gray-900">{selectedLog.user}</p>
                </div>
              )}
              
              {selectedLog.details && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">상세 정보</h4>
                  <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                    <pre className="text-xs text-gray-900 whitespace-pre-wrap font-mono">{selectedLog.details}</pre>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                onClick={() => setSelectedLog(null)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogsTab;
