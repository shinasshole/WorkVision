"use client";

import React from 'react';

// 팀 타입 정의
// 각 팀이 어떤 정보를 가지고 있는지 정의해요.
// 마치 조직도에서 각 부서의 정보를 정의하는 것과 같아요!
type Team = {
  id: string;
  name: string;
  description: string;
  leader: {
    id: string;
    name: string;
    position: string;
    avatar: string;
  };
  memberCount: number;
  color: string;
  members: TeamMember[];
};

// 팀원 타입 정의
// 각 팀원이 어떤 정보를 가지고 있는지 정의해요.
// 마치 직원 카드에 들어갈 정보를 정리하는 것과 같아요!
type TeamMember = {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  avatar: string;
  joinDate: string;
  skills: string[];
};

// 팀 카드 프롭스 타입 정의
// 팀 카드 컴포넌트가 어떤 속성을 받을지 정의해요.
// 마치 레고 블록의 연결 부분을 정의하는 것과 같아요!
type TeamCardProps = {
  team: Team;
  isOpen: boolean;
  onToggle: () => void;
};

// 팀원 카드 컴포넌트
// 각 팀원의 정보를 카드 형태로 보여주는 컴포넌트예요.
// 마치 명함을 디자인하는 것과 같아요!
const MemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start">
        <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden mr-4">
          {member.avatar ? (
            <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary-500 text-white font-bold">
              {member.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{member.name}</h3>
          <p className="text-sm text-gray-500">{member.position}</p>
          
          <div className="mt-2 space-y-1 text-sm">
            <p className="flex items-center text-gray-600">
              <span className="mr-1">📧</span> {member.email}
            </p>
            <p className="flex items-center text-gray-600">
              <span className="mr-1">📱</span> {member.phone}
            </p>
            <p className="flex items-center text-gray-600">
              <span className="mr-1">📅</span> 입사일: {new Date(member.joinDate).toLocaleDateString()}
            </p>
          </div>
          
          <div className="mt-3">
            <div className="flex flex-wrap gap-1.5">
              {member.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 팀 카드 컴포넌트
// 팀 정보와 구성원을 아코디언 형식으로 보여주는 컴포넌트예요.
// 마치 폴더를 열고 닫으면서 내용을 확인하는 것과 같아요!
const TeamCard: React.FC<TeamCardProps> = ({ team, isOpen, onToggle }) => {
  // 팀 색상에 따른 스타일 클래스 설정
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          header: 'bg-blue-50 border-blue-200',
          title: 'text-blue-800',
          icon: 'text-blue-500',
          count: 'bg-blue-100 text-blue-800',
          gradient: 'from-blue-50'
        };
      case 'green':
        return {
          header: 'bg-green-50 border-green-200',
          title: 'text-green-800',
          icon: 'text-green-500',
          count: 'bg-green-100 text-green-800',
          gradient: 'from-green-50'
        };
      case 'purple':
        return {
          header: 'bg-purple-50 border-purple-200',
          title: 'text-purple-800',
          icon: 'text-purple-500',
          count: 'bg-purple-100 text-purple-800',
          gradient: 'from-purple-50'
        };
      case 'orange':
        return {
          header: 'bg-orange-50 border-orange-200',
          title: 'text-orange-800',
          icon: 'text-orange-500',
          count: 'bg-orange-100 text-orange-800',
          gradient: 'from-orange-50'
        };
      default:
        return {
          header: 'bg-gray-50 border-gray-200',
          title: 'text-gray-800',
          icon: 'text-gray-500',
          count: 'bg-gray-100 text-gray-800',
          gradient: 'from-gray-50'
        };
    }
  };
  
  const colorClasses = getColorClasses(team.color);
  
  return (
    <div className="team-card border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* 팀 헤더 (항상 표시) */}
      <div 
        className={`p-4 ${colorClasses.header} border-b cursor-pointer`}
        onClick={onToggle}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h2 className={`text-xl font-bold ${colorClasses.title}`}>{team.name}</h2>
            <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${colorClasses.count}`}>
              {team.memberCount}명
            </span>
          </div>
          <div className={`${colorClasses.icon} text-xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            {isOpen ? '▲' : '▼'}
          </div>
        </div>
        
        <div className="mt-2 flex items-start">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden mr-2">
              {team.leader.avatar ? (
                <img src={team.leader.avatar} alt={team.leader.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary-500 text-white font-bold">
                  {team.leader.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">{team.leader.name}</p>
              <p className="text-xs text-gray-500">{team.leader.position}</p>
            </div>
          </div>
          
          <p className="ml-6 text-sm text-gray-600 line-clamp-1">{team.description}</p>
        </div>
      </div>
      
      {/* 팀원 목록 (아코디언 내용) */}
      <div 
        className={`transition-all duration-300 overflow-hidden bg-gradient-to-b ${colorClasses.gradient} to-white`}
        style={{ 
          maxHeight: isOpen ? `${team.members.length * 150}px` : '0',
          opacity: isOpen ? 1 : 0
        }}
      >
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">팀원 목록</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.members.map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
