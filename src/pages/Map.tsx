
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Map = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  // Mock restaurant data with coordinates
  const restaurants = [
    {
      id: 1,
      name: '맛있는 한식당',
      category: '한식',
      rating: 4.5,
      reviewCount: 128,
      address: '서울시 강남구 역삼동',
      distance: '0.3km',
      availableSeats: 3,
      lat: 37.5665,
      lng: 126.9780,
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      name: '이탈리안 레스토랑',
      category: '양식',
      rating: 4.8,
      reviewCount: 89,
      address: '서울시 마포구 홍대입구',
      distance: '0.8km',
      availableSeats: 7,
      lat: 37.5563,
      lng: 126.9236,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop'
    },
    {
      id: 3,
      name: '분위기 좋은 카페',
      category: '카페',
      rating: 4.3,
      reviewCount: 205,
      address: '서울시 종로구 인사동',
      distance: '1.2km',
      availableSeats: 12,
      lat: 37.5735,
      lng: 126.9847,
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=300&h=200&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/restaurants" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
                <ArrowLeft className="h-5 w-5 mr-1" />
                목록으로
              </Link>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">맛</span>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">지도에서 찾기</span>
              </div>
            </div>
            <Link to="/restaurants">
              <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                목록으로 보기
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/3 bg-white border-r overflow-y-auto">
          <div className="p-4">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="식당명이나 음식 종류를 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            {/* Restaurant List */}
            <div className="space-y-4">
              {restaurants.map((restaurant) => (
                <Card 
                  key={restaurant.id} 
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedRestaurant?.id === restaurant.id ? 'ring-2 ring-orange-500' : ''
                  }`}
                  onClick={() => setSelectedRestaurant(restaurant)}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{restaurant.name}</h3>
                        <div className="flex items-center mb-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm font-medium">{restaurant.rating}</span>
                          <span className="ml-1 text-xs text-gray-500">({restaurant.reviewCount})</span>
                        </div>
                        <div className="text-xs text-gray-600 mb-1">{restaurant.address}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{restaurant.distance}</span>
                          <div className="flex items-center text-xs">
                            <Users className="h-3 w-3 mr-1" />
                            <span className={restaurant.availableSeats > 0 ? 'text-green-600' : 'text-red-600'}>
                              {restaurant.availableSeats}석
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative">
          {/* 실제 환경에서는 여기에 Google Maps나 Naver Maps API를 연동합니다 */}
          <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center relative">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">지도 영역</h3>
              <p className="text-gray-600">실제 서비스에서는 여기에 지도가 표시됩니다</p>
            </div>

            {/* Mock Map Markers */}
            <div className="absolute inset-0">
              {restaurants.map((restaurant, index) => (
                <div
                  key={restaurant.id}
                  className={`absolute w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                    selectedRestaurant?.id === restaurant.id 
                      ? 'bg-orange-500 scale-125' 
                      : 'bg-red-500 hover:bg-red-600'
                  } transition-all duration-200`}
                  style={{
                    left: `${30 + index * 20}%`,
                    top: `${40 + index * 15}%`
                  }}
                  onClick={() => setSelectedRestaurant(restaurant)}
                >
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
              ))}
            </div>

            {/* Selected Restaurant Info */}
            {selectedRestaurant && (
              <div className="absolute bottom-6 left-6 right-6">
                <Card className="shadow-xl">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img 
                        src={selectedRestaurant.image} 
                        alt={selectedRestaurant.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{selectedRestaurant.name}</h3>
                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm font-medium">{selectedRestaurant.rating}</span>
                          <span className="ml-1 text-xs text-gray-500">({selectedRestaurant.reviewCount})</span>
                          <span className="ml-3 text-sm text-gray-600">{selectedRestaurant.distance}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm">
                            <Users className="h-4 w-4 mr-1" />
                            <span className={selectedRestaurant.availableSeats > 0 ? 'text-green-600' : 'text-red-600'}>
                              잔여석: {selectedRestaurant.availableSeats}석
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Link to={`/restaurant/${selectedRestaurant.id}`}>
                              <Button size="sm" className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                                상세보기
                              </Button>
                            </Link>
                            <Button size="sm" variant="outline" className="border-orange-300 text-orange-600">
                              길찾기
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
