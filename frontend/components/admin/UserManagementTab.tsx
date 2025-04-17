"use client";

import React, { useState } from 'react';

// 사용자 타입 정의
// 각 사용자가 어떤 정보를 가지고 있는지 정의해요.
// 마치 직원 카드에 들어갈 정보를 정리하는 것과 같아요!
type User = {
  id: string;
  name: string;
  email: string;
  position: string;
  team: string;
  status: 'active' | 'inactive' | 'pending';
  role: 'admin' | 'manager' | 'member';
  lastLogin: string;
  joinDate: string;
};

// 사용자 관리 탭 컴포넌트
// 시스템 사용자들을 관리하는 컴포넌트예요.
// 마치 회사의 인사팀이 직원 정보를 관리하는 것과 같아요!
const UserManagementTab: React.FC = () => {
  // 사용자 목록 상태 (실제로는 API에서 가져올 것)
  // 이건 테스트를 위한 가짜 데이터예요.
  // 실제 서비스에서는 서버에서 진짜 사용자 데이터를 가져오게 됩니다!
  const [users, setUsers] = useState<User[]>([
    {
      id: 'u1',
      name: '김개발',
      email: 'kim@workvision.com',
      position: '개발팀장',
      team: '개발팀',
      status: 'active',
      role: 'admin',
      lastLogin: '2025-04-17T10:30:00',
      joinDate: '2023-01-15'
    },
    {
      id: 'u2',
      name: '이프론트',
      email: 'lee@workvision.com',
      position: '프론트엔드 개발자',
      team: '개발팀',
      status: 'active',
      role: 'member',
      lastLogin: '2025-04-17T09:15:00',
      joinDate: '2023-03-20'
    },
    {
      id: 'u9',
      name: '박디자인',
      email: 'park.d@workvision.com',
      position: '디자인팀장',
      team: '디자인팀',
      status: 'active',
      role: 'manager',
      lastLogin: '2025-04-16T16:45:00',
      joinDate: '2023-01-20'
    },
    {
      id: 'u14',
      name: '최마케팅',
      email: 'choi.m@workvision.com',
      position: '마케팅팀장',
      team: '마케팅팀',
      status: 'active',
      role: 'manager',
      lastLogin: '2025-04-16T14:20:00',
      joinDate: '2023-02-01'
    },
    {
      id: 'u20',
      name: '이기획',
      email: 'lee.p@workvision.com',
      position: '기획팀장',
      team: '기획팀',
      status: 'inactive',
      role: 'manager',
      lastLogin: '2025-04-10T11:30:00',
      joinDate: '2023-01-10'
    },
    {
      id: 'u8',
      name: '윤인턴',
      email: 'yoon@workvision.com',
      position: '인턴 개발자',
      team: '개발팀',
      status: 'pending',
      role: 'member',
      lastLogin: '',
      joinDate: '2025-04-17'
    }
  ]);
  
  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState('');
  
  // 필터 상태
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'pending'>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'manager' | 'member'>('all');
  const [teamFilter, setTeamFilter] = useState<string>('all');
  
  // 정렬 상태
  const [sortField, setSortField] = useState<keyof User>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // 사용자 추가 모달 상태
  const [showAddModal, setShowAddModal] = useState(false);
  
  // 팀 목록 (중복 제거)
  const teams = Array.from(new Set(users.map(user => user.team)));
  
  // 검색 및 필터링된 사용자 목록
  const filteredUsers = users.filter(user => {
    // 검색어 필터링
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.team.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 상태 필터링
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    // 역할 필터링
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    
    // 팀 필터링
    const matchesTeam = teamFilter === 'all' || user.team === teamFilter;
    
    return matchesSearch && matchesStatus && matchesRole && matchesTeam;
  }).sort((a, b) => {
    // 정렬
    const fieldA = a[sortField];
    const fieldB = b[sortField];
    
    if (fieldA < fieldB) return sortDirection === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
  
  // 정렬 핸들러
  const handleSort = (field: keyof User) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // 사용자 상태에 따른 배지 색상
  const getStatusBadgeClass = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // 사용자 역할에 따른 배지 색상
  const getRoleBadgeClass = (role: User['role']) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      case 'member':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ko-KR');
  };
  
  // 시간 포맷팅 함수
  const formatDateTime = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('ko-KR');
  };
  
  return (
    <div className="user-management-tab">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-800">사용자 관리</h2>
        <button
          className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          onClick={() => setShowAddModal(true)}
        >
          + 사용자 추가
        </button>
      </div>
      
      {/* 검색 및 필터 */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">검색</label>
            <div className="relative">
              <input
                type="text"
                id="search"
                placeholder="이름, 이메일, 직책, 팀으로 검색..."
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
              <option value="pending">대기 중</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="teamFilter" className="block text-sm font-medium text-gray-700 mb-1">팀</label>
            <select
              id="teamFilter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
            >
              <option value="all">모든 팀</option>
              {teams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* 사용자 통계 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <p className="text-sm text-blue-500 font-medium">전체 사용자</p>
          <p className="text-2xl font-bold text-blue-700">{users.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <p className="text-sm text-green-500 font-medium">활성 사용자</p>
          <p className="text-2xl font-bold text-green-700">
            {users.filter(u => u.status === 'active').length}
          </p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
          <p className="text-sm text-yellow-500 font-medium">대기 중</p>
          <p className="text-2xl font-bold text-yellow-700">
            {users.filter(u => u.status === 'pending').length}
          </p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <p className="text-sm text-gray-500 font-medium">비활성</p>
          <p className="text-2xl font-bold text-gray-700">
            {users.filter(u => u.status === 'inactive').length}
          </p>
        </div>
      </div>
      
      {/* 사용자 목록 테이블 */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    이름
                    {sortField === 'name' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  이메일
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  직책 / 팀
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태 / 역할
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('joinDate')}
                >
                  <div className="flex items-center">
                    가입일
                    {sortField === 'joinDate' && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  마지막 로그인
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  액션
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.position}</div>
                      <div className="text-sm text-gray-500">{user.team}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(user.status)}`}>
                        {user.status === 'active' && '활성'}
                        {user.status === 'inactive' && '비활성'}
                        {user.status === 'pending' && '대기 중'}
                      </span>
                      <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeClass(user.role)}`}>
                        {user.role === 'admin' && '관리자'}
                        {user.role === 'manager' && '매니저'}
                        {user.role === 'member' && '멤버'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.joinDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateTime(user.lastLogin)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 mr-3">
                        편집
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        {user.status === 'active' ? '비활성화' : '활성화'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    검색 조건에 맞는 사용자가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagementTab;
