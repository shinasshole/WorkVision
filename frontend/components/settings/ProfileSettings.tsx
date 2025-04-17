"use client";

import React, { useState } from 'react';

// 프로필 설정 컴포넌트
// 사용자의 개인 정보를 관리하는 설정 화면이에요.
// 마치 자신의 명함을 디자인하는 것과 같아요!
const ProfileSettings: React.FC = () => {
  // 사용자 프로필 상태 (실제로는 API에서 가져올 것)
  // 이건 테스트를 위한 가짜 데이터예요.
  // 실제 서비스에서는 서버에서 진짜 사용자 정보를 가져오게 됩니다!
  const [profile, setProfile] = useState({
    name: '홍길동',
    email: 'hong@workvision.com',
    position: '개발팀 / 선임 개발자',
    phone: '010-1234-5678',
    bio: '10년차 웹 개발자로 프론트엔드와 백엔드 개발을 담당하고 있습니다. React, Node.js, TypeScript를 주로 사용합니다.',
    profileImage: '',
    joinDate: '2023-01-15'
  });
  
  // 프로필 변경 핸들러
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // 프로필 저장 핸들러 (실제로는 API 호출 필요)
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('프로필 저장:', profile);
    // 실제 구현에서는 API 호출
    alert('프로필이 저장되었습니다.');
  };
  
  return (
    <div className="profile-settings">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">프로필 설정</h2>
      
      <form onSubmit={handleSaveProfile} className="space-y-6">
        {/* 프로필 이미지 */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
              {profile.profileImage ? (
                <img src={profile.profileImage} alt="프로필 이미지" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-gray-400">{profile.name.charAt(0)}</span>
              )}
            </div>
            <button
              type="button"
              className="absolute bottom-0 right-0 bg-primary-500 text-white p-1.5 rounded-full shadow-md hover:bg-primary-600 transition-colors"
            >
              📷
            </button>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900">{profile.name}</h3>
            <p className="text-sm text-gray-500">{profile.position}</p>
            <p className="text-xs text-gray-400">가입일: {new Date(profile.joinDate).toLocaleDateString()}</p>
          </div>
        </div>
        
        {/* 기본 정보 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-md font-medium text-gray-800 mb-4">기본 정보</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">이름</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">직책</label>
              <input
                type="text"
                id="position"
                name="position"
                value={profile.position}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        
        {/* 자기소개 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-md font-medium text-gray-800 mb-4">자기소개</h3>
          
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">소개</label>
            <textarea
              id="bio"
              name="bio"
              value={profile.bio}
              onChange={handleProfileChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
        
        {/* 비밀번호 변경 */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-md font-medium text-gray-800 mb-4">비밀번호 변경</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">현재 비밀번호</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">새 비밀번호</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">새 비밀번호 확인</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* 저장 버튼 */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          >
            변경사항 저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
