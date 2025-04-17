"use client";

import React from 'react';
import Link from 'next/link';

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

// 알림 카드 프롭스 타입 정의
// 알림 카드 컴포넌트가 어떤 속성을 받을지 정의해요.
// 마치 레고 블록의 연결 부분을 정의하는 것과 같아요!
type NotificationCardProps = {
  notification: Notification;
  onMarkAsRead: () => void;
};

// 알림 카드 컴포넌트
// 각 알림의 정보를 카드 형태로 보여주는 컴포넌트예요.
// 마치 하나의 편지를 예쁘게 봉투에 담아 보여주는 것과 같아요!
const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onMarkAsRead }) => {
  // 알림 타입에 따른 아이콘과 색상 설정
  const getTypeInfo = (type: string) => {
    switch (type) {
      case 'task':
        return {
          icon: '📋',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800'
        };
      case 'event':
        return {
          icon: '📅',
          bgColor: 'bg-purple-50',
          borderColor: 'border-purple-200',
          textColor: 'text-purple-800'
        };
      case 'team':
        return {
          icon: '👥',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-800'
        };
      case 'system':
        return {
          icon: '⚙️',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          textColor: 'text-orange-800'
        };
      default:
        return {
          icon: '🔔',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-800'
        };
    }
  };
  
  const typeInfo = getTypeInfo(notification.type);
  
  // 시간 포맷팅 함수
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // 알림 클릭 핸들러
  const handleClick = () => {
    if (!notification.isRead) {
      onMarkAsRead();
    }
  };
  
  return (
    <Link 
      href={notification.source.url}
      className={`block ${!notification.isRead ? 'bg-primary-50' : 'bg-white'} border ${
        !notification.isRead ? 'border-primary-200' : 'border-gray-200'
      } rounded-lg p-4 hover:shadow-md transition-shadow relative overflow-hidden`}
      onClick={handleClick}
    >
      {!notification.isRead && (
        <div className="absolute top-0 right-0 w-3 h-3 bg-primary-500 rounded-full m-2"></div>
      )}
      
      <div className="flex items-start">
        <div className={`flex-shrink-0 w-10 h-10 ${typeInfo.bgColor} ${typeInfo.borderColor} border rounded-full flex items-center justify-center mr-4`}>
          <span className="text-lg">{typeInfo.icon}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className={`text-base font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'} truncate`}>
              {notification.title}
            </h3>
            <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
              {formatTime(notification.createdAt)}
            </span>
          </div>
          
          <p className={`mt-1 text-sm ${!notification.isRead ? 'text-gray-800' : 'text-gray-600'}`}>
            {notification.content}
          </p>
          
          <div className="mt-2 flex items-center">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${typeInfo.bgColor} ${typeInfo.textColor}`}>
              {notification.type === 'task' && '업무'}
              {notification.type === 'event' && '일정'}
              {notification.type === 'team' && '팀'}
              {notification.type === 'system' && '시스템'}
            </span>
            
            <button 
              className="ml-auto text-xs text-gray-500 hover:text-primary-500"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onMarkAsRead();
              }}
            >
              {notification.isRead ? '읽음 취소' : '읽음 표시'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NotificationCard;
