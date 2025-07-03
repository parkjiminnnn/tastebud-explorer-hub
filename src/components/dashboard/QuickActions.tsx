
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Star, BarChart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface QuickActionsProps {
  userType: string;
}

const QuickActions: React.FC<QuickActionsProps> = ({ userType }) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">빠른 작업</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/restaurants">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900">식당 찾기</h3>
              <p className="text-sm text-gray-600 mt-1">내 주변 맛집 검색</p>
            </CardContent>
          </Card>
        </Link>
        
        {userType !== 'business-owner' && (
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">리뷰 작성</h3>
              <p className="text-sm text-gray-600 mt-1">방문한 식당 리뷰 남기기</p>
            </CardContent>
          </Card>
        )}
        
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <BarChart className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">통계 보기</h3>
            <p className="text-sm text-gray-600 mt-1">내 활동 통계 확인</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuickActions;
