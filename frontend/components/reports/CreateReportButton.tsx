"use client";

import React, { useState } from 'react';

// 태그 입력 컴포넌트
// 여러 태그를 입력하고 관리하는 컴포넌트예요.
// 마치 라벨을 붙이는 것처럼 보고서에 태그를 추가할 수 있어요!
const TagInput: React.FC<{
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 엔터 키를 누르거나 쉼표를 입력하면 태그 추가
    if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
      e.preventDefault();
      // 쉼표 제거하고 공백 제거
      const newTag = inputValue.replace(/,/g, '').trim();
      // 이미 존재하지 않는 태그만 추가
      if (newTag && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue('');
    }
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  return (
    <div className="flex flex-wrap items-center border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent">
      {tags.map((tag, index) => (
        <div key={index} className="flex items-center bg-primary-100 text-primary-800 rounded-full px-3 py-1 m-1">
          <span className="mr-1">#{tag}</span>
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="text-primary-500 hover:text-primary-700 focus:outline-none"
          >
            ✕
          </button>
        </div>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder={tags.length ? "" : "태그 입력 후 Enter (쉼표로 구분)"}
        className="flex-grow border-none focus:outline-none focus:ring-0 p-1 min-w-[120px]"
      />
    </div>
  );
};

// 업무 보고 작성 버튼 및 모달 컴포넌트
// 새로운 업무 보고를 작성할 수 있는 버튼과 모달 창이에요.
// 마치 일기장을 열고 새로운 일기를 쓰는 것과 같아요!
const CreateReportButton: React.FC = () => {
  // 모달 표시 여부 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 폼 상태 관리
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  
  // 모달 열기
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  // 모달 닫기 및 폼 초기화
  const closeModal = () => {
    setIsModalOpen(false);
    setTitle('');
    setContent('');
    setTags([]);
  };
  
  // 폼 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 여기서는 콘솔에 출력만 하지만, 실제로는 API 호출을 통해 서버에 데이터를 전송할 것입니다.
    console.log({
      title,
      content,
      tags,
      createdAt: new Date().toISOString(),
      author: {
        name: '홍길동', // 실제로는 로그인한 사용자 정보를 사용
        team: '개발팀',
        avatar: '',
      }
    });
    
    // 모달 닫기 및 폼 초기화
    closeModal();
    
    // 실제 구현에서는 여기서 성공 메시지를 표시하거나 페이지를 새로고침할 수 있습니다.
    alert('업무 보고가 등록되었습니다.');
  };
  
  return (
    <>
      {/* 업무 보고 작성 버튼 */}
      <button
        onClick={openModal}
        className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
      >
        <span className="mr-2">✏️</span>
        <span>보고서 작성</span>
      </button>
      
      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">업무 보고 작성</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                {/* 제목 입력 */}
                <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                    제목
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="보고서 제목을 입력하세요"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                
                {/* 내용 입력 */}
                <div className="mb-4">
                  <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
                    내용
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="업무 보고 내용을 입력하세요"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[200px]"
                    required
                  />
                </div>
                
                {/* 태그 입력 */}
                <div className="mb-6">
                  <label htmlFor="tags" className="block text-gray-700 font-medium mb-2">
                    태그
                  </label>
                  <TagInput tags={tags} setTags={setTags} />
                </div>
                
                {/* 버튼 영역 */}
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    등록하기
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateReportButton;
