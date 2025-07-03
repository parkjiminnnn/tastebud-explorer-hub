
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  userType: string;
  currentUser: {
    title: string;
    icon: React.ComponentType<any>;
    color: string;
    description: string;
  };
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ currentUser }) => {
  const IconComponent = currentUser.icon;

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
              <ArrowLeft className="h-5 w-5 mr-1" />
              홈으로
            </Link>
            <div className="flex items-center">
              <div className={`w-8 h-8 ${currentUser.color} rounded-lg flex items-center justify-center`}>
                <IconComponent className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">{currentUser.title}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/restaurants">
              <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                식당 찾기
              </Button>
            </Link>
            <Button variant="outline">
              설정
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
