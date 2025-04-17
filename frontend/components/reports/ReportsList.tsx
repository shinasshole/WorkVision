"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// 업무 보고 타입 정의
// 각 업무 보고가 어떤 정보를 가지고 있는지 정의해요.
// 마치 신문 기사의 구성 요소를 정의하는 것과 같아요!
type Report = {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    team: string;
    avatar: string;
  };
  createdAt: string;
  tags: string[];
  likes: number;
  comments: number;
};

// 날짜 포맷팅 함수
// 날짜를 보기 좋게 변환해주는 함수예요.
// 마치 시계가 시간을 알려주듯이, 이 함수는 날짜를 읽기 쉬운 형태로 알려줍니다!
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // 오늘, 어제 표시
  if (date.toDateString() === today.toDateString()) {
    return '오늘';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return '어제';
  }
  
  // 년-월-일 형식으로 표시
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

// 시간 포맷팅 함수
// 시간을 보기 좋게 변환해주는 함수예요.
// 마치 디지털 시계처럼 시간을 읽기 쉬운 형태로 보여줍니다!
const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

// 날짜를 ISO 형식으로 변환하는 함수
// 날짜를 컴퓨터가 이해하기 쉬운 형식으로 변환해요.
// 마치 여러 나라 언어를 하나의 공통 언어로 번역하는 것과 같아요!
const formatDateForInput = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// 업무 보고 카드 컴포넌트
// 각 업무 보고를 카드 형태로 보여주는 컴포넌트예요.
// 마치 신문 기사 하나를 디자인하는 것과 같아요!
const ReportCard: React.FC<{ report: Report }> = ({ report }) => {
  return (
    <div className="border-b border-gray-200 pb-6 mb-6 last:border-0 last:mb-0 last:pb-0">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden mr-3">
            {report.author.avatar ? (
              <img src={report.author.avatar} alt={report.author.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary-500 text-white font-bold">
                {report.author.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{report.author.name}</h3>
            <p className="text-sm text-gray-500">{report.author.team}</p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          <span className="font-medium">{formatDate(report.createdAt)}</span>
          <span className="mx-1">·</span>
          <span>{formatTime(report.createdAt)}</span>
        </div>
      </div>
      
      <Link href={`/reports/${report.id}`} className="block group">
        <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
          {report.title}
        </h2>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {report.content}
        </p>
      </Link>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {report.tags.map((tag, index) => (
          <span 
            key={index} 
            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center text-sm text-gray-500">
        <button className="flex items-center mr-4 hover:text-primary-500 transition-colors">
          <span className="mr-1">👍</span>
          <span>{report.likes}</span>
        </button>
        <button className="flex items-center hover:text-primary-500 transition-colors">
          <span className="mr-1">💬</span>
          <span>{report.comments}</span>
        </button>
      </div>
    </div>
  );
};

// 날짜 그룹 컴포넌트
// 같은 날짜의 보고서들을 그룹으로 묶어서 보여주는 컴포넌트예요.
// 마치 달력에서 같은 날짜의 일정을 모아보는 것과 같아요!
const DateGroup: React.FC<{ date: string; reports: Report[] }> = ({ date, reports }) => {
  return (
    <div className="mb-8 last:mb-0">
      <div className="flex items-center mb-4">
        <div className="h-px flex-grow bg-gray-200"></div>
        <h3 className="mx-4 font-bold text-gray-500">{date}</h3>
        <div className="h-px flex-grow bg-gray-200"></div>
      </div>
      <div className="space-y-6">
        {reports.map(report => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
};

// 업무 보고 목록 컴포넌트
// 여러 업무 보고를 목록 형태로 보여주는 컴포넌트예요.
// 마치 신문의 기사 목록을 정리해서 보여주는 것과 같아요!
const ReportsList: React.FC = () => {
  // 샘플 보고서 데이터 (실제로는 API에서 가져올 것)
  // 이건 테스트를 위한 가짜 데이터예요.
  // 실제 서비스에서는 서버에서 진짜 업무 보고 데이터를 가져오게 됩니다!
  const sampleReports: Report[] = [
    {
      id: '1',
      title: '4월 마케팅 캠페인 중간 보고',
      content: '이번 달 진행 중인 마케팅 캠페인의 중간 성과를 보고드립니다. 소셜 미디어 광고의 CTR이 예상보다 15% 높게 나타났으며, 이메일 마케팅의 오픈율도 전월 대비 10% 상승했습니다. 특히 인스타그램 스토리 광고가 가장 높은 전환율을 보이고 있어 해당 채널에 리소스를 추가 투입할 예정입니다.',
      author: {
        name: '김마케팅',
        team: '마케팅팀',
        avatar: '',
      },
      createdAt: '2025-04-17T09:30:00',
      tags: ['마케팅', '캠페인', '중간보고'],
      likes: 12,
      comments: 5,
    },
    {
      id: '2',
      title: '신규 프로젝트 킥오프 미팅 결과',
      content: '오늘 진행된 신규 프로젝트 킥오프 미팅 결과를 공유드립니다. 프로젝트 범위와 일정, 담당자 배정이 완료되었습니다. 개발팀은 다음 주부터 기술 검토를 시작하고, 디자인팀은 와이어프레임 작업에 착수할 예정입니다. 첫 번째 스프린트는 4월 20일부터 시작하며, 2주 단위로 진행됩니다.',
      author: {
        name: '박프로',
        team: '기획팀',
        avatar: '',
      },
      createdAt: '2025-04-17T14:15:00',
      tags: ['프로젝트', '킥오프', '회의록'],
      likes: 8,
      comments: 3,
    },
    {
      id: '3',
      title: '신규 기능 개발 완료 및 QA 요청',
      content: '사용자 프로필 관리 기능 개발이 완료되었습니다. 프로필 이미지 업로드, 개인정보 수정, 알림 설정 기능이 포함되어 있습니다. 현재 개발 서버에 배포 완료된 상태이며, QA팀의 테스트를 요청드립니다. 테스트 계정 정보와 테스트 시나리오는 첨부 문서를 참고해주세요.',
      author: {
        name: '이개발',
        team: '개발팀',
        avatar: '',
      },
      createdAt: '2025-04-16T17:45:00',
      tags: ['개발', '기능', 'QA'],
      likes: 5,
      comments: 7,
    },
    {
      id: '4',
      title: '고객 피드백 분석 결과',
      content: '지난 달 수집된 고객 피드백을 분석한 결과를 공유드립니다. 가장 많이 요청된 기능은 다크 모드 지원(23%)과 파일 공유 기능 개선(18%)입니다. 또한 모바일 앱의 로딩 속도에 대한 불만이 증가하고 있어 최적화가 필요합니다. 상세 분석 결과는 첨부된 보고서를 참고해주세요.',
      author: {
        name: '최고객',
        team: '고객지원팀',
        avatar: '',
      },
      createdAt: '2025-04-15T11:20:00',
      tags: ['고객', '피드백', '분석'],
      likes: 15,
      comments: 9,
    },
    {
      id: '5',
      title: '3월 재무 보고서',
      content: '3월 재무 결과를 보고드립니다. 매출은 전월 대비 8% 증가했으며, 운영 비용은 5% 감소했습니다. 특히 신규 서비스의 매출 기여도가 증가하고 있어 긍정적입니다. 다만, 마케팅 비용이 예산 대비 10% 초과되어 다음 달 예산 조정이 필요합니다. 상세 내용은 첨부된 재무제표를 참고해주세요.',
      author: {
        name: '정재무',
        team: '재무팀',
        avatar: '',
      },
      createdAt: '2025-04-10T16:30:00',
      tags: ['재무', '보고서', '월간'],
      likes: 7,
      comments: 4,
    },
    {
      id: '6',
      title: '신입사원 교육 프로그램 계획',
      content: '다음 달 입사 예정인 신입사원들을 위한 교육 프로그램 계획을 공유드립니다. 2주간의 기본 교육 후 4주간의 부서별 실무 교육으로 구성되어 있습니다. 특히 이번에는 멘토링 시스템을 강화하여 각 신입사원마다 전담 멘토를 배정할 예정입니다. 부서별 교육 담당자는 다음 주까지 세부 커리큘럼을 제출해주시기 바랍니다.',
      author: {
        name: '한인사',
        team: '인사팀',
        avatar: '',
      },
      createdAt: '2025-04-05T10:15:00',
      tags: ['인사', '교육', '신입사원'],
      likes: 10,
      comments: 6,
    },
    {
      id: '7',
      title: '2025년 1분기 마케팅 성과 분석',
      content: '2025년 1분기 마케팅 활동의 성과를 분석한 결과를 공유드립니다. 디지털 마케팅 채널의 ROI가 전년 동기 대비 12% 상승했으며, 특히 유튜브 광고의 성과가 두드러졌습니다. 반면, 페이스북 광고의 효율은 감소 추세를 보이고 있어 2분기에는 채널 믹스 조정이 필요합니다. 상세 데이터는 첨부된 보고서를 참고해주세요.',
      author: {
        name: '김마케팅',
        team: '마케팅팀',
        avatar: '',
      },
      createdAt: '2025-04-03T15:45:00',
      tags: ['마케팅', '분석', '분기보고'],
      likes: 14,
      comments: 8,
    }
  ];
  
  // 검색 기능을 위한 상태
  const [searchTerm, setSearchTerm] = useState('');
  
  // 날짜 필터링을 위한 상태
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  // 필터 초기화 함수
  const resetFilters = () => {
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
  };
  
  // 검색어와 날짜에 따라 보고서 필터링
  const filteredReports = sampleReports.filter(report => {
    const matchesSearch = 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // 날짜 필터링
    const reportDate = new Date(report.createdAt);
    const matchesStartDate = !startDate || new Date(startDate) <= reportDate;
    const matchesEndDate = !endDate || new Date(endDate) >= reportDate;
    
    return matchesSearch && matchesStartDate && matchesEndDate;
  });
  
  // 날짜별로 보고서 그룹화
  const groupByDate = (reports: Report[]) => {
    const groups: Record<string, Report[]> = {};
    
    reports.forEach(report => {
      const date = formatDate(report.createdAt);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(report);
    });
    
    // 날짜 기준으로 정렬 (최신순)
    return Object.entries(groups).sort((a, b) => {
      if (a[0] === '오늘') return -1;
      if (b[0] === '오늘') return 1;
      if (a[0] === '어제') return -1;
      if (b[0] === '어제') return 1;
      return new Date(b[0]).getTime() - new Date(a[0]).getTime();
    });
  };
  
  const groupedReports = groupByDate(filteredReports);
  
  return (
    <div className="reports-list">
      {/* 검색 및 필터 영역 */}
      <div className="mb-6 space-y-4">
        {/* 검색 바 */}
        <div className="relative">
          <input
            type="text"
            placeholder="제목, 내용, 태그로 검색..."
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </span>
        </div>
        
        {/* 날짜 필터 */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              시작 날짜
            </label>
            <input
              type="date"
              id="startDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={endDate || undefined}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              종료 날짜
            </label>
            <input
              type="date"
              id="endDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || undefined}
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              필터 초기화
            </button>
          </div>
        </div>
        
        {/* 필터 결과 요약 */}
        <div className="text-sm text-gray-500 flex justify-between items-center">
          <span>
            {filteredReports.length}개의 보고서 {(searchTerm || startDate || endDate) ? '(필터링됨)' : ''}
          </span>
          {(searchTerm || startDate || endDate) && (
            <div className="flex gap-2">
              {searchTerm && (
                <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs">
                  검색어: {searchTerm}
                </span>
              )}
              {startDate && (
                <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs">
                  시작일: {startDate}
                </span>
              )}
              {endDate && (
                <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs">
                  종료일: {endDate}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* 보고서 목록 */}
      {groupedReports.length > 0 ? (
        groupedReports.map(([date, reports]) => (
          <DateGroup key={date} date={date} reports={reports} />
        ))
      ) : (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <div className="text-5xl mb-3">📋</div>
          <p className="text-gray-500 mb-1">검색 결과가 없습니다.</p>
          <p className="text-sm text-gray-400">다른 검색어를 입력하거나 날짜 필터를 조정해보세요.</p>
        </div>
      )}
    </div>
  );
};

export default ReportsList;
