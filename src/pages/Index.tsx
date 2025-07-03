
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, User, Search, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const userTypes = [
    {
      id: 'consumer',
      title: '소비자',
      description: '맛집 탐색, 예약 관리, 리뷰 작성으로 완벽한 외식 경험',
      icon: Users,
      color: 'bg-blue-500 hover:bg-blue-600',
      features: ['실시간 테이블 확인', '빠른 예약', '맛집 탐색', '리뷰 작성', '컬렉션 관리']
    },
    {
      id: 'business-owner',
      title: '자영업자',
      description: '매장 관리와 고객 소통을 위한 비즈니스 도구',
      icon: User,
      color: 'bg-green-500 hover:bg-green-600',
      features: ['예약 관리', '리뷰 확인', '방문자 통계']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">맛</span>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">맛집 플랫폼</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/restaurants" className="text-gray-600 hover:text-gray-900 transition-colors">
                식당 찾기
              </Link>
              <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                로그인
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            당신만의 <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">맛집 경험</span>을 만들어보세요
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            소비자부터 자영업자까지. 각자의 니즈에 맞춘 특별한 맛집 플랫폼을 경험해보세요.
          </p>
          
          {/* Quick Actions */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Link to="/restaurants">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 text-lg">
                <Search className="mr-2 h-5 w-5" />
                식당 찾기
              </Button>
            </Link>
            <Link to="/map">
              <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg">
                <MapPin className="mr-2 h-5 w-5" />
                지도에서 보기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">당신에게 맞는 서비스를 선택하세요</h2>
            <p className="text-lg text-gray-600">각 사용자 유형에 특화된 기능을 제공합니다</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {userTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <Card key={type.id} className="relative group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 ${type.color} rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{type.title}</CardTitle>
                    <CardDescription className="text-gray-600">{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="space-y-3 mb-6">
                      {type.features.map((feature, index) => (
                        <div key={index} className="flex items-center justify-center text-sm text-gray-600">
                          <Star className="h-4 w-4 text-yellow-400 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Link to={`/dashboard/${type.id}`}>
                      <Button className={`w-full ${type.color} text-white transition-all duration-300`}>
                        시작하기
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">주요 기능</h2>
            <p className="text-lg text-gray-600">모든 사용자가 공통으로 이용할 수 있는 핵심 기능들</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Search, title: '스마트 검색', desc: '키워드, 카테고리, 지역 기반' },
              { icon: MapPin, title: '위치 기반', desc: '내 주변 맛집 실시간 확인' },
              { icon: Star, title: '리뷰 시스템', desc: '신뢰할 수 있는 평점과 후기' },
              { icon: Users, title: '실시간 정보', desc: '테이블 현황과 웨이팅 정보' }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow duration-300">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">맛</span>
            </div>
            <span className="ml-2 text-xl font-bold">맛집 플랫폼</span>
          </div>
          <p className="text-gray-400">모든 사람이 더 나은 맛집 경험을 할 수 있도록</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
