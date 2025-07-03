
import React from 'react';
import { Calendar, Star, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BusinessOwnerDashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-green-500" />
            오늘의 예약
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600 mb-2">12건</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>점심 시간대</span>
              <span className="font-medium">5건</span>
            </div>
            <div className="flex justify-between">
              <span>저녁 시간대</span>
              <span className="font-medium">7건</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="mr-2 h-5 w-5 text-green-500" />
            리뷰 현황
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">4.5</div>
            <div className="text-sm text-gray-600">평균 별점</div>
            <div className="text-sm text-gray-600 mt-1">총 128개 리뷰</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart className="mr-2 h-5 w-5 text-green-500" />
            방문자 통계
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>오늘</span>
              <span className="font-medium">45명</span>
            </div>
            <div className="flex justify-between">
              <span>이번 주 평균</span>
              <span className="font-medium">38명</span>
            </div>
            <div className="flex justify-between">
              <span>지난 주 대비</span>
              <span className="text-green-600 font-medium">+12%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessOwnerDashboard;
