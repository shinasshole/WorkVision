"use client";

import React from 'react';

// 이벤트 타입 정의
// 각 일정이 어떤 정보를 가지고 있는지 정의해요.
// 마치 수첩에 일정을 기록할 때 필요한 항목들을 미리 정해두는 것과 같아요!
type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'task' | 'reminder' | 'deadline';
  participants?: string[];
  location?: string;
};

// 이벤트 카드 컴포넌트
// 각 일정을 카드 형태로 보여주는 컴포넌트예요.
// 마치 포스트잇에 일정을 적어 붙여놓은 것처럼 시각적으로 표현합니다!
const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  // 이벤트 타입에 따른 아이콘과 색상 설정
  const getEventTypeInfo = (type: Event['type']) => {
    switch (type) {
      case 'meeting':
        return { 
          icon: '👥', 
          bgColor: 'bg-blue-50', 
          borderColor: 'border-blue-200',
          textColor: 'text-blue-700',
          gradientFrom: 'from-blue-50',
          gradientTo: 'to-white'
        };
      case 'task':
        return { 
          icon: '📋', 
          bgColor: 'bg-green-50', 
          borderColor: 'border-green-200',
          textColor: 'text-green-700',
          gradientFrom: 'from-green-50',
          gradientTo: 'to-white'
        };
      case 'reminder':
        return { 
          icon: '⏰', 
          bgColor: 'bg-yellow-50', 
          borderColor: 'border-yellow-200',
          textColor: 'text-yellow-700',
          gradientFrom: 'from-yellow-50',
          gradientTo: 'to-white'
        };
      case 'deadline':
        return { 
          icon: '⏱️', 
          bgColor: 'bg-red-50', 
          borderColor: 'border-red-200',
          textColor: 'text-red-700',
          gradientFrom: 'from-red-50',
          gradientTo: 'to-white'
        };
      default:
        return { 
          icon: '📅', 
          bgColor: 'bg-gray-50', 
          borderColor: 'border-gray-200',
          textColor: 'text-gray-700',
          gradientFrom: 'from-gray-50',
          gradientTo: 'to-white'
        };
    }
  };
  
  const typeInfo = getEventTypeInfo(event.type);
  
  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // 오늘, 내일 표시
    if (date.toDateString() === today.toDateString()) {
      return '오늘';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return '내일';
    }
    
    // 그 외 날짜는 MM월 DD일 형식으로 표시
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };
  
  return (
    <div className={`p-4 rounded-lg border-l-4 ${typeInfo.borderColor} ${typeInfo.bgColor} mb-4 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer bg-gradient-to-r ${typeInfo.gradientFrom} ${typeInfo.gradientTo}`}>
      <div className="flex items-start">
        <div className="mt-1 mr-3 text-xl">
          {typeInfo.icon}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className={`font-medium ${typeInfo.textColor} text-base`}>{event.title}</h3>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-600">
              {formatDate(event.date)}
            </span>
          </div>
          <div className="text-sm text-gray-600 mt-2">
            <p className="flex items-center">
              <span className="mr-1">🕒</span> {event.time}
            </p>
            {event.location && (
              <p className="mt-1.5 flex items-center"> 
                <span className="mr-1">📍</span> {event.location}
              </p>
            )}
            {event.participants && event.participants.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1.5 flex items-center">
                  <span className="mr-1">👤</span> 참여자:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {event.participants.map((participant, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-white rounded-full text-xs border border-gray-200 shadow-sm"
                    >
                      {participant}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 이벤트 목록 컴포넌트
// 여러 일정을 목록 형태로 보여주는 컴포넌트예요.
// 마치 할 일 목록을 정리해서 보여주는 것과 같습니다!
const EventsList: React.FC = () => {
  // 샘플 이벤트 데이터 (실제로는 API에서 가져올 것)
  // 이건 테스트를 위한 가짜 데이터예요.
  // 실제 서비스에서는 서버에서 진짜 일정 데이터를 가져오게 됩니다!
  const events: Event[] = [
    {
      id: '1',
      title: '팀 주간 회의',
      date: '2025-04-18',
      time: '10:00 - 11:00',
      type: 'meeting',
      participants: ['김팀장', '이대리', '박사원'],
      location: '회의실 A'
    },
    {
      id: '2',
      title: '프로젝트 계획서 제출',
      date: '2025-04-19',
      time: '17:00',
      type: 'deadline'
    },
    {
      id: '3',
      title: '클라이언트 미팅',
      date: '2025-04-20',
      time: '14:00 - 15:30',
      type: 'meeting',
      participants: ['김팀장', '외부 고객'],
      location: '미팅룸 C'
    },
    {
      id: '4',
      title: '월간 보고서 작성',
      date: '2025-04-22',
      time: '종일',
      type: 'task'
    },
    {
      id: '5',
      title: '마케팅 전략 회의',
      date: '2025-04-25',
      time: '11:00 - 12:00',
      type: 'meeting',
      participants: ['김팀장', '마케팅팀'],
      location: '회의실 B'
    }
  ];
  
  // 오늘 날짜 구하기
  const today = new Date();
  const formattedToday = today.toISOString().split('T')[0];
  
  // 오늘 이후의 이벤트만 필터링하고 날짜순으로 정렬
  const upcomingEvents = events
    .filter(event => event.date >= formattedToday)
    .sort((a, b) => a.date.localeCompare(b.date));
  
  return (
    <div className="events-list">
      {upcomingEvents.length > 0 ? (
        <div>
          <div className="mb-4 pb-2 border-b border-gray-100">
            <p className="text-sm text-gray-500">총 {upcomingEvents.length}개의 일정이 있습니다.</p>
          </div>
          {upcomingEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <div className="text-5xl mb-3">📅</div>
          <p className="text-gray-500 mb-1">다가오는 일정이 없습니다.</p>
          <p className="text-sm text-gray-400">새 일정을 추가해보세요!</p>
        </div>
      )}
    </div>
  );
};

export default EventsList;
