"use client";

import React, { useState } from 'react';

// 팀 타입 정의
// 각 팀이 어떤 정보를 가지고 있는지 정의해요.
// 마치 회사 조직도에서 각 부서의 정보를 정의하는 것과 같아요!
type Team = {
  id: string;
  name: string;
  description: string;
  leader: {
    id: string;
    name: string;
    position: string;
  };
  memberCount: number;
  createdAt: string;
  status: 'active' | 'inactive';
  color: string;
};

// 팀 관리 탭 컴포넌트
// 시스템의 팀 구조를 관리하는 컴포넌트예요.
// 마치 회사의 조직도를 관리하는 것과 같아요!
const TeamManagementTab: React.FC = () => {
  // 팀 목록 상태 (실제로는 API에서 가져올 것)
  // 이건 테스트를 위한 가짜 데이터예요.
  // 실제 서비스에서는 서버에서 진짜 팀 데이터를 가져오게 됩니다!
  const [teams, setTeams] = useState<Team[]>([
    {
      id: '1',
      name: '개발팀',
      description: '제품 개발 및 기술 지원을 담당하는 팀입니다. 웹/앱 개발, 서버 관리, 기술 지원 업무를 수행합니다.',
      leader: {
        id: 'u1',
        name: '김개발',
        position: '개발팀장',
      },
      memberCount: 8,
      createdAt: '2023-01-15',
      status: 'active',
      color: 'blue'
    },
    {
      id: '2',
      name: '디자인팀',
      description: '제품 디자인 및 사용자 경험을 담당하는 팀입니다. UI/UX 디자인, 그래픽 디자인, 브랜딩 업무를 수행합니다.',
      leader: {
        id: 'u9',
        name: '박디자인',
        position: '디자인팀장',
      },
      memberCount: 5,
      createdAt: '2023-01-20',
      status: 'active',
      color: 'purple'
    },
    {
      id: '3',
      name: '마케팅팀',
      description: '제품 마케팅 및 홍보를 담당하는 팀입니다. 디지털 마케팅, 콘텐츠 제작, 소셜 미디어 관리 업무를 수행합니다.',
      leader: {
        id: 'u14',
        name: '최마케팅',
        position: '마케팅팀장',
      },
      memberCount: 6,
      createdAt: '2023-02-01',
      status: 'active',
      color: 'green'
    },
    {
      id: '4',
      name: '기획팀',
      description: '제품 기획 및 전략을 담당하는 팀입니다. 제품 기획, 사용자 조사, 시장 분석 업무를 수행합니다.',
      leader: {
        id: 'u20',
        name: '이기획',
        position: '기획팀장',
      },
      memberCount: 4,
      createdAt: '2023-01-10',
      status: 'inactive',
      color: 'orange'
    },
    {
      id: '5',
      name: '고객지원팀',
      description: '고객 문의 응대 및 지원을 담당하는 팀입니다. 고객 서비스, 기술 지원, 피드백 관리 업무를 수행합니다.',
      leader: {
        id: 'u25',
        name: '정고객',
        position: '고객지원팀장',
      },
      memberCount: 3,
      createdAt: '2023-03-01',
      status: 'active',
      color: 'red'
    }
  ]);
  
  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState('');
  
  // 필터 상태
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  
  // 정렬 상태
  const [sortField, setSortField] = useState<keyof Team>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // 팀 추가 모달 상태
  const [showAddModal, setShowAddModal] = useState(false);
  
  // 검색 및 필터링된 팀 목록
  const filteredTeams = teams.filter(team => {
    // 검색어 필터링
    const matchesSearch = 
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.leader.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 상태 필터링
    const matchesStatus = statusFilter === 'all' || team.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    // 정렬
    if (sortField === 'memberCount' || sortField === 'createdAt') {
      const fieldA = a[sortField];
      const fieldB = b[sortField];
      
      if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    } else {
      const fieldA = String(a[sortField]).toLowerCase();
      const fieldB = String(b[sortField]).toLowerCase();
      
      if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    }
  });
  
  // 정렬 핸들러
  const handleSort = (field: keyof Team) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // 팀 색상에 따른 스타일 클래스 설정
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
          icon: 'text-blue-500',
          badge: 'bg-blue-100 text-blue-800'
        };
      case 'green':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
          icon: 'text-green-500',
          badge: 'bg-green-100 text-green-800'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          text: 'text-purple-800',
          icon: 'text-purple-500',
          badge: 'bg-purple-100 text-purple-800'
        };
      case 'orange':
        return {
          bg: 'bg-orange-50',
          border: 'border-orange-200',
          text: 'text-orange-800',
          icon: 'text-orange-500',
          badge: 'bg-orange-100 text-orange-800'
        };
      case 'red':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          icon: 'text-red-500',
          badge: 'bg-red-100 text-red-800'
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-800',
          icon: 'text-gray-500',
          badge: 'bg-gray-100 text-gray-800'
        };
    }
  };
  
  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };
  
  return (
    <div className="team-management-tab">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-800">팀 관리</h2>
        <button
          className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          onClick={() => setShowAddModal(true)}
        >
          + 팀 추가
        </button>
      </div>
      
      {/* 검색 및 필터 */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">검색</label>
            <div className="relative">
              <input
                type="text"
                id="search"
                placeholder="팀 이름, 설명, 팀장으로 검색..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
          </div>
          
          <div>
            <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">상태</label>
            <select
              id="statusFilter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="all">모든 상태</option>
              <option value="active">활성</option>
              <option value="inactive">비활성</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* 팀 통계 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-500 font-medium">전체 팀</p>
          <p className="text-2xl font-bold text-blue-700">{teams.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <p className="text-sm text-green-500 font-medium">활성 팀</p>
          <p className="text-2xl font-bold text-green-700">
            {teams.filter(t => t.status === 'active').length}
          </p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <p className="text-sm text-purple-500 font-medium">총 구성원</p>
          <p className="text-2xl font-bold text-purple-700">
            {teams.reduce((sum, team) => sum + team.memberCount, 0)}
          </p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
          <p className="text-sm text-orange-500 font-medium">평균 팀 규모</p>
          <p className="text-2xl font-bold text-orange-700">
            {(teams.reduce((sum, team) => sum + team.memberCount, 0) / teams.length).toFixed(1)}
          </p>
        </div>
      </div>
      
      {/* 팀 목록 */}
      <div className="space-y-4">
        {filteredTeams.length > 0 ? (
          filteredTeams.map(team => {
            const colorClasses = getColorClasses(team.color);
            
            return (
              <div 
                key={team.id} 
                className={`${colorClasses.bg} border ${colorClasses.border} rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className={`text-lg font-semibold ${colorClasses.text}`}>{team.name}</h3>
                      <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${
                        team.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {team.status === 'active' ? '활성' : '비활성'}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{team.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <span className="mr-1">👤</span>
                        <span className="font-medium">{team.leader.name}</span>
                        <span className="text-xs text-gray-500 ml-1">({team.leader.position})</span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="mr-1">👥</span>
                        <span>{team.memberCount}명</span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="mr-1">📅</span>
                        <span>생성일: {formatDate(team.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4 md:mt-0 space-x-2">
                    <button className="px-3 py-1.5 bg-white text-primary-600 border border-primary-300 rounded hover:bg-primary-50 transition-colors">
                      구성원 관리
                    </button>
                    <button className="px-3 py-1.5 bg-white text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                      편집
                    </button>
                    <button className={`px-3 py-1.5 bg-white ${
                      team.status === 'active' 
                        ? 'text-red-600 border border-red-300 hover:bg-red-50' 
                        : 'text-green-600 border border-green-300 hover:bg-green-50'
                    } rounded transition-colors`}>
                      {team.status === 'active' ? '비활성화' : '활성화'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="text-5xl mb-4">🏢</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">팀이 없습니다</h3>
            <p className="text-gray-500">검색 조건에 맞는 팀이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamManagementTab;
