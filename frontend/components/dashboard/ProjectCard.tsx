import React from 'react';
import { RiArrowRightLine, RiTeamLine, RiCalendarLine } from 'react-icons/ri';

// 프로젝트 카드에 표시할 데이터의 타입을 정의합니다
// 타입스크립트는 마치 요리 재료를 미리 준비해두는 것과 같아요.
// 어떤 정보가 필요한지 미리 정해두면, 나중에 실수로 빠뜨리거나 잘못된 정보를 넣는 것을 방지할 수 있어요!
type ProjectCardProps = {
  id: string;
  name: string;
  description: string;
  progress: number;
  teamMembers: number;
  dueDate: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
};

// 상태에 따른 색상과 텍스트를 매핑하는 객체
// 이것은 마치 색깔 팔레트를 미리 준비해두는 것과 같아요.
// 각 상태에 맞는 색상과 텍스트를 미리 정의해두면, 코드가 더 깔끔해지고 일관성이 유지돼요!
const statusConfig = {
  'planning': { color: 'bg-blue-100 text-blue-800', text: '기획 중' },
  'in-progress': { color: 'bg-green-100 text-green-800', text: '진행 중' },
  'completed': { color: 'bg-purple-100 text-purple-800', text: '완료됨' },
  'on-hold': { color: 'bg-yellow-100 text-yellow-800', text: '보류 중' },
};

// 프로젝트 카드 컴포넌트
// 이 컴포넌트는 하나의 프로젝트 정보를 카드 형태로 보여줍니다
// 마치 명함처럼 중요한 정보를 한눈에 볼 수 있게 정리해주는 역할을 해요!
const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  description,
  progress,
  teamMembers,
  dueDate,
  status,
}) => {
  const { color, text } = statusConfig[status];
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
      {/* 상태 배지 */}
      <div className="flex justify-between items-start mb-3">
        <span className={`text-xs px-2 py-1 rounded-full ${color}`}>
          {text}
        </span>
      </div>
      
      {/* 프로젝트 제목 및 설명 */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
      
      {/* 진행률 바 */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>진행률</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary-500 h-2 rounded-full" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      {/* 프로젝트 정보 */}
      <div className="flex justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center">
          <RiTeamLine className="mr-1" />
          <span>{teamMembers}명</span>
        </div>
        <div className="flex items-center">
          <RiCalendarLine className="mr-1" />
          <span>{dueDate}</span>
        </div>
      </div>
      
      {/* 상세보기 링크 */}
      <a 
        href={`/projects/${id}`}
        className="flex items-center text-sm text-primary-500 font-medium hover:text-primary-600"
      >
        상세보기
        <RiArrowRightLine className="ml-1" />
      </a>
    </div>
  );
};

export default ProjectCard;
