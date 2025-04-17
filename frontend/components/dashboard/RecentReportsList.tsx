import React from 'react';
import { RiFileTextLine, RiChat3Line } from 'react-icons/ri';

// 업무 보고 항목의 타입 정의
// 타입스크립트는 프로그램에서 사용할 데이터의 형태를 미리 정의하는 것이에요.
// 마치 요리를 할 때 필요한 재료와 양을 미리 정해두는 레시피와 같아요!
type ReportItem = {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  project: string;
  date: string;
  commentsCount: number;
};

// 최근 업무 보고 목록 컴포넌트의 속성 타입 정의
type RecentReportsListProps = {
  reports: ReportItem[];
};

// 최근 업무 보고 목록 컴포넌트
// 이 컴포넌트는 최근에 작성된 업무 보고들을 목록 형태로 보여줍니다.
// 마치 학교 게시판에 최근 공지사항을 정리해서 보여주는 것과 비슷해요!
const RecentReportsList: React.FC<RecentReportsListProps> = ({ reports }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">최근 업무 보고</h2>
        <a href="/reports" className="text-sm text-primary-500 hover:text-primary-600">
          모두 보기
        </a>
      </div>
      
      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
            <div className="flex items-start">
              {/* 아이콘 */}
              <div className="mt-1 mr-3 p-2 bg-blue-50 rounded-md">
                <RiFileTextLine className="text-blue-500" />
              </div>
              
              {/* 보고서 내용 */}
              <div className="flex-1">
                <a 
                  href={`/reports/${report.id}`}
                  className="text-gray-800 font-medium hover:text-primary-500"
                >
                  {report.title}
                </a>
                
                <div className="flex items-center mt-1 text-sm">
                  {/* 작성자 정보 */}
                  <div className="flex items-center">
                    <img 
                      src={report.author.avatar} 
                      alt={report.author.name}
                      className="w-5 h-5 rounded-full mr-1"
                    />
                    <span className="text-gray-600">{report.author.name}</span>
                  </div>
                  
                  {/* 구분점 */}
                  <span className="mx-2 text-gray-300">•</span>
                  
                  {/* 프로젝트 이름 */}
                  <span className="text-gray-500">{report.project}</span>
                  
                  {/* 구분점 */}
                  <span className="mx-2 text-gray-300">•</span>
                  
                  {/* 날짜 */}
                  <span className="text-gray-500">{report.date}</span>
                  
                  {/* 댓글 수 */}
                  <div className="flex items-center ml-auto">
                    <RiChat3Line className="text-gray-400 mr-1" />
                    <span className="text-gray-500">{report.commentsCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentReportsList;
