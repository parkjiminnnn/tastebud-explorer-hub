import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Map = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '한식', '중식', '일식', '양식', '카페', '술집', '아시안'];

  // Expanded mock restaurant data with coordinates
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
    },
    {
      id: 4,
      name: '전통 일식집',
      category: '일식',
      rating: 4.6,
      reviewCount: 67,
      address: '서울시 서초구 서초동',
      distance: '2.1km',
      availableSeats: 0,
      lat: 37.4849,
      lng: 127.0164,
      image: 'https://images.unsplash.com/photo-1579027989054-b72d69ae8b5c?w=300&h=200&fit=crop'
    },
    {
      id: 5,
      name: '중화요리 맛집',
      category: '중식',
      rating: 4.4,
      reviewCount: 156,
      address: '서울시 용산구 이태원동',
      distance: '1.5km',
      availableSeats: 8,
      lat: 37.5344,
      lng: 126.9945,
      image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=300&h=200&fit=crop'
    },
    {
      id: 6,
      name: '프렌치 비스트로',
      category: '양식',
      rating: 4.7,
      reviewCount: 92,
      address: '서울시 성동구 성수동',
      distance: '2.3km',
      availableSeats: 5,
      lat: 37.5447,
      lng: 127.0557,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop'
    },
    {
      id: 7,
      name: '서울식 냉면집',
      category: '한식',
      rating: 4.2,
      reviewCount: 234,
      address: '서울시 중구 명동',
      distance: '1.8km',
      availableSeats: 15,
      lat: 37.5703,
      lng: 126.9834,
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=200&fit=crop'
    },
    {
      id: 8,
      name: '힙스터 브런치 카페',
      category: '카페',
      rating: 4.6,
      reviewCount: 178,
      address: '서울시 마포구 합정동',
      distance: '1.1km',
      availableSeats: 9,
      lat: 37.5503,
      lng: 126.9138,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=200&fit=crop'
    },
    {
      id: 9,
      name: '전통 술집',
      category: '술집',
      rating: 4.3,
      reviewCount: 87,
      address: '서울시 종로구 종로3가',
      distance: '1.9km',
      availableSeats: 6,
      lat: 37.5703,
      lng: 126.9911,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop'
    },
    {
      id: 10,
      name: '타이 레스토랑',
      category: '아시안',
      rating: 4.5,
      reviewCount: 143,
      address: '서울시 강남구 신사동',
      distance: '0.9km',
      availableSeats: 11,
      lat: 37.5237,
      lng: 127.0202,
      image: 'https://images.unsplash.com/photo-1559847844-d558cfc41b1d?w=300&h=200&fit=crop'
    },
    {
      id: 11,
      name: '고급 스테이크 하우스',
      category: '양식',
      rating: 4.9,
      reviewCount: 73,
      address: '서울시 강남구 청담동',
      distance: '1.7km',
      availableSeats: 2,
      lat: 37.5172,
      lng: 127.0473,
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop'
    },
    {
      id: 12,
      name: '현대식 한정식',
      category: '한식',
      rating: 4.8,
      reviewCount: 95,
      address: '서울시 서대문구 신촌동',
      distance: '2.5km',
      availableSeats: 4,
      lat: 37.5596,
      lng: 126.9370,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop'
    }
  ];

  // 필터링된 식당 목록
  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.category.includes(searchTerm);
    const matchesCategory = selectedCategory === '전체' || restaurant.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

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

            {/* Category Filter */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">카테고리</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                {filteredRestaurants.length}개의 식당이 있습니다
              </p>
            </div>

            {/* Restaurant List */}
            <div className="space-y-4">
              {filteredRestaurants.map((restaurant) => (
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

            {/* No results message */}
            {filteredRestaurants.length === 0 && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
                <p className="text-gray-600">다른 키워드나 카테고리를 선택해보세요</p>
              </div>
            )}
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative">
          {/* 서울 지도 이미지 */}
          <div className="w-full h-full relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop" 
              alt="서울 지도"
              className="w-full h-full object-cover"
            />
            
            {/* Map overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10"></div>

            {/* Mock Map Markers - 필터링된 식당만 표시 */}
            <div className="absolute inset-0">
              {filteredRestaurants.map((restaurant, index) => (
                <div
                  key={restaurant.id}
                  className={`absolute w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 shadow-lg ${
                    selectedRestaurant?.id === restaurant.id 
                      ? 'bg-orange-500 scale-125 ring-4 ring-white' 
                      : 'bg-red-500 hover:bg-red-600'
                  } transition-all duration-200`}
                  style={{
                    left: `${20 + (index % 4) * 20}%`,
                    top: `${25 + Math.floor(index / 4) * 15}%`
                  }}
                  onClick={() => setSelectedRestaurant(restaurant)}
                >
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
              ))}
            </div>

            {/* Map Legend */}
            <div className="absolute top-6 right-6 bg-white rounded-lg shadow-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">범례</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
                  <span>식당 위치</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-full mr-2"></div>
                  <span>선택된 식당</span>
                </div>
              </div>
              
              {/* 선택된 카테고리 표시 */}
              {selectedCategory !== '전체' && (
                <div className="mt-3 pt-3 border-t">
                  <div className="text-xs text-gray-600">필터:</div>
                  <div className="text-sm font-medium text-orange-600">{selectedCategory}</div>
                </div>
              )}
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
