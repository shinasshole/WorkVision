"use client";

import React, { useState } from 'react';

// 캘린더 날짜 셀 타입 정의
// 타입스크립트로 각 날짜 셀의 데이터 구조를 정의해요.
// 이건 마치 달력의 각 칸에 어떤 정보가 들어갈지 미리 계획하는 것과 같아요!
type CalendarDayType = {
  date: number;
  isCurrentMonth: boolean;
  events: CalendarEvent[];
  isToday: boolean;
};

// 캘린더 이벤트 타입 정의
// 각 일정 항목이 어떤 정보를 가지고 있는지 정의해요.
// 실제 생활에서 일정표에 적는 내용과 비슷하게 생각하면 됩니다!
type CalendarEvent = {
  id: string;
  title: string;
  time: string;
  type: 'meeting' | 'task' | 'reminder' | 'deadline';
  color: string;
};

// 캘린더 뷰 컴포넌트
// 이 컴포넌트는 월간 캘린더를 표시해요.
// 실제 벽에 걸린 달력처럼 날짜를 보여주고 각 날짜에 일정을 표시합니다!
const CalendarView: React.FC = () => {
  // 현재 표시할 연도와 월을 상태로 관리
  // useState는 컴포넌트가 기억해야 할 정보를 저장하는 방법이에요.
  // 마치 메모장에 현재 보고 있는 달력의 년도와 월을 적어두는 것과 같습니다!
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    return {
      year: now.getFullYear(),
      month: now.getMonth(),
    };
  });
  
  // 이전 달로 이동하는 함수
  const goToPreviousMonth = () => {
    setCurrentDate(prev => {
      const newMonth = prev.month - 1;
      if (newMonth < 0) {
        return { year: prev.year - 1, month: 11 };
      }
      return { ...prev, month: newMonth };
    });
  };
  
  // 다음 달로 이동하는 함수
  const goToNextMonth = () => {
    setCurrentDate(prev => {
      const newMonth = prev.month + 1;
      if (newMonth > 11) {
        return { year: prev.year + 1, month: 0 };
      }
      return { ...prev, month: newMonth };
    });
  };
  
  // 현재 날짜로 이동하는 함수
  const goToToday = () => {
    const now = new Date();
    setCurrentDate({
      year: now.getFullYear(),
      month: now.getMonth(),
    });
  };
  
  // 현재 월의 이름 가져오기
  const getMonthName = (month: number): string => {
    const monthNames = [
      '1월', '2월', '3월', '4월', '5월', '6월',
      '7월', '8월', '9월', '10월', '11월', '12월'
    ];
    return monthNames[month];
  };
  
  // 요일 이름 배열
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  
  // 캘린더 데이터 생성 함수
  // 이 함수는 현재 월의 모든 날짜와 이전/다음 달의 일부 날짜를 포함한 배열을 생성해요.
  // 실제로 달력을 만들기 위해 필요한 모든 날짜 정보를 계산합니다!
  const generateCalendarDays = (): CalendarDayType[][] => {
    const year = currentDate.year;
    const month = currentDate.month;
    
    // 현재 월의 첫 번째 날과 마지막 날 구하기
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // 현재 월의 첫 번째 날의 요일 (0: 일요일, 6: 토요일)
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    // 이전 달의 마지막 날 구하기
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate();
    
    const today = new Date();
    const isToday = (date: number): boolean => {
      return (
        today.getDate() === date &&
        today.getMonth() === month &&
        today.getFullYear() === year
      );
    };
    
    // 샘플 이벤트 데이터 (실제로는 API에서 가져올 것)
    // 이건 테스트를 위한 가짜 데이터예요.
    // 실제 서비스에서는 서버에서 진짜 일정 데이터를 가져오게 됩니다!
    const sampleEvents: Record<string, CalendarEvent[]> = {
      '5': [
        { id: '1', title: '팀 회의', time: '10:00', type: 'meeting', color: 'bg-blue-500' },
        { id: '2', title: '보고서 제출', time: '17:00', type: 'deadline', color: 'bg-red-500' }
      ],
      '10': [
        { id: '3', title: '프로젝트 검토', time: '14:00', type: 'task', color: 'bg-green-500' }
      ],
      '15': [
        { id: '4', title: '고객 미팅', time: '11:00', type: 'meeting', color: 'bg-purple-500' }
      ],
      '20': [
        { id: '5', title: '월간 보고', time: '09:00', type: 'meeting', color: 'bg-blue-500' }
      ],
      '25': [
        { id: '6', title: '마감일', time: '18:00', type: 'deadline', color: 'bg-red-500' }
      ]
    };
    
    // 캘린더 데이터 생성
    const calendarDays: CalendarDayType[][] = [];
    let week: CalendarDayType[] = [];
    
    // 이전 달의 날짜 추가
    for (let i = 0; i < firstDayOfWeek; i++) {
      const date = lastDayOfPrevMonth - firstDayOfWeek + i + 1;
      week.push({
        date,
        isCurrentMonth: false,
        events: [],
        isToday: false
      });
    }
    
    // 현재 달의 날짜 추가
    for (let date = 1; date <= lastDayOfMonth.getDate(); date++) {
      const dateKey = date.toString();
      week.push({
        date,
        isCurrentMonth: true,
        events: sampleEvents[dateKey] || [],
        isToday: isToday(date)
      });
      
      // 주가 끝나면 (토요일) 또는 월의 마지막 날이면 주 배열에 추가
      if (week.length === 7) {
        calendarDays.push(week);
        week = [];
      }
    }
    
    // 다음 달의 날짜 추가 (마지막 주 채우기)
    if (week.length > 0) {
      const remainingDays = 7 - week.length;
      for (let date = 1; date <= remainingDays; date++) {
        week.push({
          date,
          isCurrentMonth: false,
          events: [],
          isToday: false
        });
      }
      calendarDays.push(week);
    }
    
    return calendarDays;
  };
  
  // 캘린더 데이터 생성
  const calendarDays = generateCalendarDays();
  
  return (
    <div className="calendar-container">
      {/* 캘린더 헤더 */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold mr-3 text-gray-800 flex items-center">
            <span className="text-primary-500 mr-2">📅</span>
            {currentDate.year}년 {getMonthName(currentDate.month)}
          </h2>
          <button 
            onClick={goToToday}
            className="text-sm px-3 py-1.5 bg-primary-50 text-primary-600 rounded-md hover:bg-primary-100 transition-colors flex items-center font-medium"
          >
            <span className="mr-1">📅</span> 오늘
          </button>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={goToPreviousMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors border border-gray-200"
          >
            <span className="text-gray-600">◀</span>
          </button>
          <button 
            onClick={goToNextMonth}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors border border-gray-200"
          >
            <span className="text-gray-600">▶</span>
          </button>
        </div>
      </div>
      
      {/* 캘린더 그리드 */}
      <div className="calendar-grid">
        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 mb-2">
          {weekdays.map((day, index) => (
            <div 
              key={index} 
              className={`text-center py-3 font-medium ${
                index === 0 ? 'text-red-500' : index === 6 ? 'text-blue-500' : 'text-gray-600'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
        
        {/* 캘린더 날짜 */}
        <div className="border rounded-lg overflow-hidden shadow-sm">
          {calendarDays.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 border-b last:border-b-0">
              {week.map((day, dayIndex) => (
                <div 
                  key={`${weekIndex}-${dayIndex}`} 
                  className={`min-h-[100px] p-2 border-r last:border-r-0 transition-colors ${
                    !day.isCurrentMonth ? 'bg-gray-50' : ''
                  } ${day.isToday ? 'bg-primary-50 relative' : ''}`}
                >
                  {day.isToday && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">{day.date}</span>
                    </div>
                  )}
                  
                  <div className={`text-right mb-1 font-medium ${
                    day.isToday ? 'opacity-0' : 
                    !day.isCurrentMonth ? 'text-gray-400' : 
                    dayIndex === 0 ? 'text-red-500' : 
                    dayIndex === 6 ? 'text-blue-500' : 
                    'text-gray-700'
                  }`}>
                    {day.date}
                  </div>
                  
                  {/* 이벤트 표시 */}
                  <div className="space-y-1">
                    {day.events.map((event) => (
                      <div 
                        key={event.id}
                        className={`px-2 py-1 rounded-md text-xs text-white ${event.color} truncate shadow-sm hover:shadow-md transition-shadow cursor-pointer`}
                        title={`${event.title} - ${event.time}`}
                      >
                        {event.time} {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
