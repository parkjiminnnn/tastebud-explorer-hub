
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Clock, Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Restaurants = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '한식', '중식', '일식', '양식', '카페', '술집'];

  const restaurants = [
    {
      id: 1,
      name: '맛있는 한식당',
      category: '한식',
      rating: 4.5,
      reviewCount: 128,
      address: '서울시 강남구 역삼동',
      distance: '0.3km',
      waitingTime: '10분',
      availableSeats: 3,
      image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=250&fit=crop',
      priceRange: '₩15,000 - ₩25,000',
      openNow: true
    },
    {
      id: 2,
      name: '이탈리안 레스토랑',
      category: '양식',
      rating: 4.8,
      reviewCount: 89,
      address: '서울시 마포구 홍대입구',
      distance: '0.8km',
      waitingTime: '없음',
      availableSeats: 7,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=250&fit=crop',
      priceRange: '₩25,000 - ₩40,000',
      openNow: true
    },
    {
      id: 3,
      name: '분위기 좋은 카페',
      category: '카페',
      rating: 4.3,
      reviewCount: 205,
      address: '서울시 종로구 인사동',
      distance: '1.2km',
      waitingTime: '5분',
      availableSeats: 12,
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=250&fit=crop',
      priceRange: '₩8,000 - ₩15,000',
      openNow: true
    },
    {
      id: 4,
      name: '전통 일식집',
      category: '일식',
      rating: 4.6,
      reviewCount: 67,
      address: '서울시 서초구 서초동',
      distance: '2.1km',
      waitingTime: '20분',
      availableSeats: 0,
      image: 'https://images.unsplash.com/photo-1579027989054-b72d69ae8b5c?w=400&h=250&fit=crop',
      priceRange: '₩30,000 - ₩50,000',
      openNow: false
    }
  ];

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
              <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
                <ArrowLeft className="h-5 w-5 mr-1" />
                뒤로
              </Link>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">맛</span>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">맛집 찾기</span>
              </div>
            </div>
            <Link to="/map">
              <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                <MapPin className="mr-2 h-4 w-4" />
                지도에서 보기
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="식당명이나 음식 종류를 검색하세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
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

        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {selectedCategory === '전체' ? '전체 식당' : selectedCategory} ({filteredRestaurants.length}개)
          </h2>
          <p className="text-gray-600">내 주변의 맛집을 찾아보세요</p>
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <div className="relative">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    restaurant.openNow ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {restaurant.openNow ? '영업중' : '영업종료'}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs">
                    {restaurant.distance}
                  </span>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {restaurant.name}
                    </CardTitle>
                    <p className="text-sm text-gray-500">{restaurant.category}</p>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{restaurant.rating}</span>
                    <span className="ml-1 text-xs text-gray-500">({restaurant.reviewCount})</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {restaurant.address}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    웨이팅: {restaurant.waitingTime}
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2" />
                    <span className={restaurant.availableSeats > 0 ? 'text-green-600' : 'text-red-600'}>
                      잔여석: {restaurant.availableSeats}석
                    </span>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {restaurant.priceRange}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link to={`/restaurant/${restaurant.id}`} className="flex-1">
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                      상세보기
                    </Button>
                  </Link>
                  {restaurant.availableSeats > 0 && restaurant.openNow && (
                    <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                      예약
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-600">다른 키워드로 검색해보세요</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
