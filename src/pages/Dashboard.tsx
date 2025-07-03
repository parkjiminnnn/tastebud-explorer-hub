
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Users, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ConsumerDashboard from '@/components/dashboard/ConsumerDashboard';
import BusinessOwnerDashboard from '@/components/dashboard/BusinessOwnerDashboard';
import QuickActions from '@/components/dashboard/QuickActions';

const Dashboard = () => {
  const { userType } = useParams();
  const [reservations, setReservations] = useState([
    {
      id: 1,
      restaurant: '맛있는 한식당',
      date: '오늘',
      time: '12:30',
      people: 2,
      status: '예약 확정'
    },
    {
      id: 2,
      restaurant: '이탈리안 레스토랑',
      date: '내일',
      time: '19:00',
      people: 4,
      status: '예약 대기'
    }
  ]);

  const userTypes = {
    'consumer': {
      title: '소비자 대시보드',
      icon: Users,
      color: 'bg-blue-500',
      description: '맛집 탐색, 예약 관리, 리뷰 작성으로 완벽한 외식 경험'
    },
    'office-worker': {
      title: '소비자 대시보드',
      icon: Users,
      color: 'bg-blue-500',
      description: '맛집 탐색, 예약 관리, 리뷰 작성으로 완벽한 외식 경험'
    },
    'blogger': {
      title: '소비자 대시보드',
      icon: Users,
      color: 'bg-blue-500',
      description: '맛집 탐색, 예약 관리, 리뷰 작성으로 완벽한 외식 경험'
    },
    'business-owner': {
      title: '자영업자 대시보드',
      icon: User,
      color: 'bg-green-500',
      description: '매장 관리와 고객 소통을 효율적으로'
    }
  };

  const currentUser = userTypes[userType as keyof typeof userTypes];

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">잘못된 접근입니다</h1>
          <Link to="/">
            <Button>홈으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (userType) {
      case 'consumer':
      case 'office-worker':
      case 'blogger':
        return <ConsumerDashboard reservations={reservations} setReservations={setReservations} />;
      case 'business-owner':
        return <BusinessOwnerDashboard />;
      default:
        return <div>잘못된 사용자 타입입니다.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader userType={userType} currentUser={currentUser} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            환영합니다! 👋
          </h1>
          <p className="text-lg text-gray-600">{currentUser.description}</p>
        </div>

        {/* Main Content */}
        {renderContent()}

        {/* Quick Actions */}
        <QuickActions userType={userType} />
      </div>
    </div>
  );
};

export default Dashboard;
