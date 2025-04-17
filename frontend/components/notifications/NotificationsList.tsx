"use client";

import React, { useState } from 'react';
import NotificationCard from './NotificationCard';

// 알림 타입 정의
// 각 알림이 어떤 정보를 가지고 있는지 정의해요.
// 마치 편지에 보낸 사람, 제목, 내용 등이 있는 것처럼 알림에도 여러 정보가 있어요!
type Notification = {
  id: string;
  type: 'task' | 'event' | 'team' | 'system';
  title: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  source: {
    id: string;
    type: 'report' | 'event' | 'team' | 'system';
    url: string;
  };
};

// 알림 목록 컴포넌트
// 여러 알림을 목록 형태로 보여주는 컴포넌트예요.
// 마치 우편함에서 편지들을 날짜별로 정리해서 보여주는 것과 같아요!
const NotificationsList: React.FC = () => {
  // 알림 필터 상태
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'task' | 'event' | 'team' | 'system'>('all');
  
  // 샘플 알림 데이터 (실제로는 API에서 가져올 것)
  // 이건 테스트를 위한 가짜 데이터예요.
  // 실제 서비스에서는 서버에서 진짜 알림 데이터를 가져오게 됩니다!
  const sampleNotifications: Notification[] = [
    {
      id: '1',
      type: 'task',
      title: '새 업무 보고서 댓글',
      content: '김개발님이 "4월 프로젝트 진행 보고서"에 댓글을 남겼습니다: "좋은 보고서네요. 다음 단계는 어떻게 진행할 예정인가요?"',
      createdAt: '2025-04-17T10:30:00',
      isRead: false,
      source: {
        id: 'report-123',
        type: 'report',
        url: '/reports/123'
      }
    },
    {
      id: '2',
      type: 'event',
      title: '회의 일정 변경',
      content: '오늘 예정된 "주간 개발팀 회의"가 14:00에서 15:30으로 변경되었습니다.',
      createdAt: '2025-04-17T09:15:00',
      isRead: true,
      source: {
        id: 'event-456',
        type: 'event',
        url: '/calendar?event=456'
      }
    },
    {
      id: '3',
      type: 'team',
      title: '팀원 추가',
      content: '정모션님이 디자인팀에 새로 합류했습니다. 환영해주세요!',
      createdAt: '2025-04-16T16:45:00',
      isRead: false,
      source: {
        id: 'team-2',
        type: 'team',
        url: '/teams/2'
      }
    },
    {
      id: '4',
      type: 'system',
      title: '시스템 업데이트 안내',
      content: 'WorkVision이 새로운 버전으로 업데이트되었습니다. 새로운 기능: 팀 관리, 알림 시스템이 추가되었습니다.',
      createdAt: '2025-04-16T10:00:00',
      isRead: true,
      source: {
        id: 'system-update',
        type: 'system',
        url: '/settings/updates'
      }
    },
    {
      id: '5',
      type: 'task',
      title: '업무 할당',
      content: '박디자인님이 "메인 페이지 디자인 리뉴얼" 업무를 할당했습니다. 마감일: 2025-04-25',
      createdAt: '2025-04-15T14:20:00',
      isRead: false,
      source: {
        id: 'task-789',
        type: 'report',
        url: '/tasks/789'
      }
    },
    {
      id: '6',
      type: 'event',
      title: '일정 알림',
      content: '내일 "분기별 성과 발표회"가 예정되어 있습니다. 시간: 10:00, 장소: 대회의실',
      createdAt: '2025-04-15T09:30:00',
      isRead: true,
      source: {
        id: 'event-567',
        type: 'event',
        url: '/calendar?event=567'
      }
    },
    {
      id: '7',
      type: 'team',
      title: '팀 공지사항',
      content: '다음 주부터 개발팀 스탠드업 미팅이 매일 오전 10시에 진행됩니다.',
      createdAt: '2025-04-14T17:00:00',
      isRead: true,
      source: {
        id: 'team-1',
        type: 'team',
        url: '/teams/1'
      }
    },
    {
      id: '8',
      type: 'system',
      title: '비밀번호 변경 안내',
      content: '보안을 위해 90일마다 비밀번호를 변경해주세요. 마지막 변경일로부터 85일이 지났습니다.',
      createdAt: '2025-04-14T08:00:00',
      isRead: false,
      source: {
        id: 'system-security',
        type: 'system',
        url: '/settings/security'
      }
    }
  ];
  
  // 필터링된 알림 목록
  const filteredNotifications = sampleNotifications
    .filter(notification => {
      if (filter === 'unread') return !notification.isRead;
      if (filter === 'read') return notification.isRead;
      return true;
    })
    .filter(notification => {
      if (typeFilter === 'all') return true;
      return notification.type === typeFilter;
    });
  
  // 날짜별로 알림 그룹화
  const groupByDate = (notifications: Notification[]) => {
    const groups: { [key: string]: Notification[] } = {};
    
    notifications.forEach(notification => {
      const date = new Date(notification.createdAt).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(notification);
    });
    
    return Object.entries(groups).map(([date, items]) => ({
      date,
      notifications: items
    }));
  };
  
  const groupedNotifications = groupByDate(filteredNotifications);
  
  // 알림 읽음 처리 함수 (실제로는 API 호출 필요)
  const markAsRead = (id: string) => {
    console.log(`Mark notification ${id} as read`);
    // 실제 구현에서는 API 호출 후 상태 업데이트
  };
  
  // 모든 알림 읽음 처리 함수 (실제로는 API 호출 필요)
  const markAllAsRead = () => {
    console.log('Mark all notifications as read');
    // 실제 구현에서는 API 호출 후 상태 업데이트
  };
  
  return (
    <div className="notifications-list">
      {/* 알림 필터 및 액션 */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === 'all' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFilter('all')}
          >
            전체
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === 'unread' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFilter('unread')}
          >
            안 읽음 ({sampleNotifications.filter(n => !n.isRead).length})
          </button>
          <button
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              filter === 'read' 
                ? 'bg-primary-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFilter('read')}
          >
            읽음
          </button>
        </div>
        
        <div className="flex space-x-2">
          <select
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 border-none focus:ring-2 focus:ring-primary-500"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
          >
            <option value="all">모든 유형</option>
            <option value="task">업무</option>
            <option value="event">일정</option>
            <option value="team">팀</option>
            <option value="system">시스템</option>
          </select>
          
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
            onClick={markAllAsRead}
          >
            모두 읽음 표시
          </button>
        </div>
      </div>
      
      {/* 알림 통계 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-500 font-medium">전체 알림</p>
          <p className="text-2xl font-bold text-blue-700">{sampleNotifications.length}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <p className="text-sm text-red-500 font-medium">안 읽은 알림</p>
          <p className="text-2xl font-bold text-red-700">
            {sampleNotifications.filter(n => !n.isRead).length}
          </p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <p className="text-sm text-green-500 font-medium">오늘 알림</p>
          <p className="text-2xl font-bold text-green-700">
            {sampleNotifications.filter(n => 
              new Date(n.createdAt).toDateString() === new Date().toDateString()
            ).length}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <p className="text-sm text-purple-500 font-medium">지난 7일</p>
          <p className="text-2xl font-bold text-purple-700">
            {sampleNotifications.filter(n => {
              const date = new Date(n.createdAt);
              const now = new Date();
              const diffTime = Math.abs(now.getTime() - date.getTime());
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              return diffDays <= 7;
            }).length}
          </p>
        </div>
      </div>
      
      {/* 알림 목록 */}
      <div className="space-y-8">
        {groupedNotifications.length > 0 ? (
          groupedNotifications.map(group => (
            <div key={group.date} className="space-y-4">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                {new Date(group.date).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long'
                })}
              </h3>
              <div className="space-y-3">
                {group.notifications.map(notification => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={() => markAsRead(notification.id)}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🔔</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">알림이 없습니다</h3>
            <p className="text-gray-500">선택한 필터에 해당하는 알림이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsList;
