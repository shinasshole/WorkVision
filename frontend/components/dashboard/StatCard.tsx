import React from 'react';

// 통계 카드 컴포넌트의 속성 타입 정의
// 타입스크립트는 코드에서 사용할 데이터의 형태를 미리 정의하는 것이에요.
// 마치 요리를 할 때 필요한 재료와 양을 미리 정해두는 레시피와 같아요!
type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  bgColor?: string;
  textColor?: string;
};

// 통계 카드 컴포넌트
// 이 컴포넌트는 중요한 수치 정보를 시각적으로 표현합니다.
// 마치 자동차의 계기판처럼 중요한 정보를 한눈에 볼 수 있게 해주는 역할을 해요!
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  bgColor = 'bg-white',
  textColor = 'text-gray-800'
}) => {
  return (
    <div className={`rounded-lg shadow-sm border border-gray-100 p-5 ${bgColor}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <h3 className={`text-2xl font-bold ${textColor}`}>{value}</h3>
          
          {/* 변화량 표시 (있는 경우) */}
          {change && (
            <div className="flex items-center mt-2">
              <span className={`text-xs font-medium ${
                change.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {change.isPositive ? '+' : ''}{change.value}%
              </span>
              <span className="text-xs text-gray-500 ml-1">지난 주 대비</span>
            </div>
          )}
        </div>
        
        {/* 아이콘 */}
        <div className="p-2 rounded-md bg-opacity-20 bg-gray-100">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
