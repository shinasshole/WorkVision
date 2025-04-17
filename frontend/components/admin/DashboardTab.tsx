"use client";

import React from 'react';

// 대시보드 탭 컴포넌트
// 시스템 전체 현황을 한눈에 보여주는 컴포넌트예요.
// 마치 회사의 경영 현황판을 보는 것과 같아요!
const DashboardTab: React.FC = () => {
  // 샘플 통계 데이터 (실제로는 API에서 가져올 것)
  // 이건 테스트를 위한 가짜 데이터예요.
  // 실제 서비스에서는 서버에서 진짜 통계 데이터를 가져오게 됩니다!
  const stats = {
    users: {
      total: 125,
      active: 98,
      inactive: 27,
      newToday: 3,
      growth: 12.5 // 지난 달 대비 성장률 (%)
    },
    teams: {
      total: 12,
      active: 10,
      avgSize: 8.3
    },
    content: {
      reports: 1248,
      events: 356,
      comments: 4872
    },
    system: {
      uptime: '99.98%',
      responseTime: '245ms',
      storage: {
        used: 128, // GB
        total: 500, // GB
        percentage: 25.6
      }
    },
    activity: [
      { date: '2025-04-17', reports: 32, events: 12, logins: 78 },
      { date: '2025-04-16', reports: 28, events: 15, logins: 82 },
      { date: '2025-04-15', reports: 35, events: 8, logins: 90 },
      { date: '2025-04-14', reports: 22, events: 10, logins: 76 },
      { date: '2025-04-13', reports: 15, events: 5, logins: 65 },
      { date: '2025-04-12', reports: 12, events: 3, logins: 45 },
      { date: '2025-04-11', reports: 30, events: 18, logins: 85 }
    ]
  };
  
  return (
    <div className="dashboard-tab">
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">시스템 현황</h2>
        
        {/* 주요 통계 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 font-medium">총 사용자</p>
                <p className="text-2xl font-bold text-gray-800">{stats.users.total}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-md text-blue-500 text-xl">👤</div>
            </div>
            <div className="mt-2 flex items-center">
              <span className="text-xs font-medium text-green-600">+{stats.users.newToday} 오늘</span>
              <span className="text-xs text-gray-500 ml-2">({stats.users.active} 활성)</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 font-medium">총 팀</p>
                <p className="text-2xl font-bold text-gray-800">{stats.teams.total}</p>
              </div>
              <div className="p-2 bg-green-50 rounded-md text-green-500 text-xl">🏢</div>
            </div>
            <div className="mt-2 flex items-center">
              <span className="text-xs font-medium text-gray-600">평균 {stats.teams.avgSize.toFixed(1)}명/팀</span>
              <span className="text-xs text-gray-500 ml-2">({stats.teams.active} 활성)</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 font-medium">총 보고서</p>
                <p className="text-2xl font-bold text-gray-800">{stats.content.reports}</p>
              </div>
              <div className="p-2 bg-purple-50 rounded-md text-purple-500 text-xl">📝</div>
            </div>
            <div className="mt-2 flex items-center">
              <span className="text-xs font-medium text-gray-600">{stats.activity[0].reports} 오늘</span>
              <span className="text-xs text-gray-500 ml-2">({stats.content.comments} 댓글)</span>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500 font-medium">시스템 상태</p>
                <p className="text-2xl font-bold text-gray-800">{stats.system.uptime}</p>
              </div>
              <div className="p-2 bg-orange-50 rounded-md text-orange-500 text-xl">⚡</div>
            </div>
            <div className="mt-2 flex items-center">
              <span className="text-xs font-medium text-gray-600">{stats.system.responseTime} 응답시간</span>
            </div>
          </div>
        </div>
        
        {/* 스토리지 사용량 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700">스토리지 사용량</h3>
            <span className="text-xs text-gray-500">{stats.system.storage.used}GB / {stats.system.storage.total}GB</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary-500 h-2.5 rounded-full" 
              style={{ width: `${stats.system.storage.percentage}%` }}
            ></div>
          </div>
          <div className="mt-2 flex justify-between">
            <span className="text-xs text-gray-500">사용 중: {stats.system.storage.percentage}%</span>
            <span className="text-xs text-gray-500">남은 공간: {stats.system.storage.total - stats.system.storage.used}GB</span>
          </div>
        </div>
        
        {/* 최근 활동 그래프 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-700 mb-4">최근 7일 활동</h3>
          
          <div className="relative h-60">
            {/* 실제로는 Chart.js 등의 라이브러리로 그래프를 그릴 것입니다 */}
            {/* 여기서는 간단한 막대 그래프로 표현합니다 */}
            <div className="flex justify-between h-full items-end">
              {stats.activity.slice().reverse().map((day, index) => (
                <div key={index} className="flex flex-col items-center w-1/7">
                  <div className="flex flex-col items-center w-full">
                    <div 
                      className="w-6 bg-blue-500 rounded-t"
                      style={{ height: `${day.logins / 2}px` }}
                    ></div>
                    <div 
                      className="w-6 bg-green-500 rounded-t mt-0.5"
                      style={{ height: `${day.reports}px` }}
                    ></div>
                    <div 
                      className="w-6 bg-purple-500 rounded-t mt-0.5"
                      style={{ height: `${day.events * 3}px` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2">
                    {new Date(day.date).toLocaleDateString('ko-KR', { weekday: 'short' })}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="absolute top-0 right-0 flex items-center">
              <div className="flex items-center mr-4">
                <div className="w-3 h-3 bg-blue-500 rounded-sm mr-1"></div>
                <span className="text-xs text-gray-500">로그인</span>
              </div>
              <div className="flex items-center mr-4">
                <div className="w-3 h-3 bg-green-500 rounded-sm mr-1"></div>
                <span className="text-xs text-gray-500">보고서</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-sm mr-1"></div>
                <span className="text-xs text-gray-500">일정</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 최근 시스템 알림 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-700">최근 시스템 알림</h3>
            <button className="text-xs text-primary-600 hover:text-primary-700">모두 보기</button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start p-3 bg-blue-50 rounded-md">
              <div className="text-blue-500 mr-3">ℹ️</div>
              <div>
                <p className="text-sm font-medium text-gray-800">시스템 업데이트 예정</p>
                <p className="text-xs text-gray-600">2025년 4월 20일 02:00 - 04:00 (KST) 동안 시스템 점검이 예정되어 있습니다.</p>
                <p className="text-xs text-gray-500 mt-1">2시간 전</p>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-green-50 rounded-md">
              <div className="text-green-500 mr-3">✅</div>
              <div>
                <p className="text-sm font-medium text-gray-800">백업 완료</p>
                <p className="text-xs text-gray-600">일일 시스템 백업이 성공적으로 완료되었습니다.</p>
                <p className="text-xs text-gray-500 mt-1">오늘 04:30</p>
              </div>
            </div>
            
            <div className="flex items-start p-3 bg-yellow-50 rounded-md">
              <div className="text-yellow-500 mr-3">⚠️</div>
              <div>
                <p className="text-sm font-medium text-gray-800">스토리지 사용량 주의</p>
                <p className="text-xs text-gray-600">스토리지 사용량이 25%를 초과했습니다. 불필요한 파일을 정리해주세요.</p>
                <p className="text-xs text-gray-500 mt-1">어제 15:45</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* 최근 가입 사용자 */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-gray-700">최근 가입 사용자</h3>
            <button className="text-xs text-primary-600 hover:text-primary-700">모두 보기</button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-300 mr-3 flex items-center justify-center text-gray-600">윤</div>
                <div>
                  <p className="text-sm font-medium text-gray-800">윤인턴</p>
                  <p className="text-xs text-gray-500">개발팀 / 인턴 개발자</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">오늘 09:15</span>
            </div>
            
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-300 mr-3 flex items-center justify-center text-gray-600">정</div>
                <div>
                  <p className="text-sm font-medium text-gray-800">정모션</p>
                  <p className="text-xs text-gray-500">디자인팀 / 모션 디자이너</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">어제 14:30</span>
            </div>
            
            <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-300 mr-3 flex items-center justify-center text-gray-600">한</div>
                <div>
                  <p className="text-sm font-medium text-gray-800">한브랜드</p>
                  <p className="text-xs text-gray-500">마케팅팀 / 브랜드 마케터</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">2025-04-15</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
