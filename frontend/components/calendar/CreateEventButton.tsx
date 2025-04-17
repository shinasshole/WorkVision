"use client";

import React, { useState } from 'react';

// 이벤트 타입 옵션
// 일정의 종류를 정의해요.
// 실생활에서도 회의, 업무, 알림, 마감일 등 일정의 종류를 구분하는 것과 같아요!
const eventTypeOptions = [
  { value: 'meeting', label: '회의', color: 'bg-blue-500' },
  { value: 'task', label: '업무', color: 'bg-green-500' },
  { value: 'reminder', label: '알림', color: 'bg-yellow-500' },
  { value: 'deadline', label: '마감일', color: 'bg-red-500' }
];

// 일정 생성 버튼 컴포넌트
// 새로운 일정을 추가할 수 있는 버튼과 모달을 포함한 컴포넌트예요.
// 마치 수첩에 새 일정을 적기 위해 펜을 들고 준비하는 것과 같습니다!
const CreateEventButton: React.FC = () => {
  // 모달 열림/닫힘 상태 관리
  // useState는 컴포넌트가 기억해야 할 정보를 저장하는 방법이에요.
  // 마치 스위치를 켜고 끄는 것처럼 모달 창을 열고 닫는 상태를 기억합니다!
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 폼 데이터 상태 관리
  // 사용자가 입력한 일정 정보를 저장해요.
  // 마치 메모장에 일정 정보를 적어두는 것과 같습니다!
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    type: 'meeting',
    location: '',
    description: '',
    participants: ''
  });
  
  // 모달 열기
  const openModal = () => {
    // 오늘 날짜를 기본값으로 설정
    const today = new Date().toISOString().split('T')[0];
    setFormData({
      ...formData,
      date: today
    });
    setIsModalOpen(true);
  };
  
  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  // 입력 필드 변경 처리
  // 사용자가 폼에 정보를 입력할 때마다 상태를 업데이트해요.
  // 마치 메모장에 정보를 수정하는 것과 같습니다!
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // 폼 제출 처리
  // 사용자가 일정 추가 버튼을 클릭했을 때 실행돼요.
  // 마치 메모장에 적은 내용을 달력에 옮겨 적는 것과 같습니다!
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 여기서 API 호출하여 이벤트 생성 (실제 구현 시)
    console.log('새 일정 생성:', formData);
    
    // 성공적으로 생성 후 모달 닫기
    closeModal();
    
    // 폼 초기화
    setFormData({
      title: '',
      date: '',
      startTime: '',
      endTime: '',
      type: 'meeting',
      location: '',
      description: '',
      participants: ''
    });
    
    // 실제 구현에서는 여기서 성공 메시지를 표시할 수 있음
    alert('일정이 생성되었습니다!');
  };
  
  return (
    <>
      {/* 일정 생성 버튼 */}
      <button
        onClick={openModal}
        className="btn btn-primary flex items-center"
      >
        <span className="mr-1">➕</span> 일정 추가
      </button>
      
      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            {/* 모달 헤더 */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">새 일정 추가</h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="text-xl">✖</span>
              </button>
            </div>
            
            {/* 모달 본문 - 폼 */}
            <form onSubmit={handleSubmit} className="p-4">
              <div className="space-y-4">
                {/* 제목 */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    제목 *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="input"
                    placeholder="일정 제목을 입력하세요"
                  />
                </div>
                
                {/* 날짜 */}
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    날짜 *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="input"
                  />
                </div>
                
                {/* 시간 */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                      시작 시간
                    </label>
                    <input
                      type="time"
                      id="startTime"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </div>
                  <div>
                    <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                      종료 시간
                    </label>
                    <input
                      type="time"
                      id="endTime"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      className="input"
                    />
                  </div>
                </div>
                
                {/* 일정 타입 */}
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    일정 유형 *
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="input"
                  >
                    {eventTypeOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* 장소 */}
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    장소
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="장소를 입력하세요"
                  />
                </div>
                
                {/* 참여자 */}
                <div>
                  <label htmlFor="participants" className="block text-sm font-medium text-gray-700 mb-1">
                    참여자
                  </label>
                  <input
                    type="text"
                    id="participants"
                    name="participants"
                    value={formData.participants}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="참여자 이름을 쉼표로 구분하여 입력하세요"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    예: 홍길동, 김철수, 이영희
                  </p>
                </div>
                
                {/* 설명 */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    설명
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="input"
                    placeholder="일정에 대한 상세 설명을 입력하세요"
                  />
                </div>
              </div>
              
              {/* 제출 버튼 */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full btn btn-primary"
                >
                  일정 생성
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateEventButton;
