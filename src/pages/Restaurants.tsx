import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Clock, Users, ArrowLeft, Filter, X, Percent, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Restaurants = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [ratingFilter, setRatingFilter] = useState([0]);
  const [waitingTimeFilter, setWaitingTimeFilter] = useState('전체');
  const [availableSeatsOnly, setAvailableSeatsOnly] = useState(false);
  const [couponOnly, setCouponOnly] = useState(false);

  const categories = ['전체', '한식', '중식', '일식', '양식', '카페', '술집', '아시안'];
  const waitingTimeOptions = ['전체', '없음', '10분 이하', '20분 이하', '30분 이하'];

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
      openNow: true,
      hasCoupon: true,
      couponText: '20% 할인',
      couponType: 'discount'
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
      openNow: true,
      hasCoupon: false
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
      openNow: true,
      hasCoupon: true,
      couponText: '음료 1+1',
      couponType: 'promotion'
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
      openNow: false,
      hasCoupon: false
    },
    {
      id: 5,
      name: '중화요리 맛집',
      category: '중식',
      rating: 4.4,
      reviewCount: 156,
      address: '서울시 용산구 이태원동',
      distance: '1.5km',
      waitingTime: '15분',
      availableSeats: 8,
      image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=250&fit=crop',
      priceRange: '₩18,000 - ₩30,000',
      openNow: true,
      hasCoupon: true,
      couponText: '첫 방문 15% 할인',
      couponType: 'discount'
    },
    {
      id: 6,
      name: '프렌치 비스트로',
      category: '양식',
      rating: 4.7,
      reviewCount: 92,
      address: '서울시 성동구 성수동',
      distance: '2.3km',
      waitingTime: '없음',
      availableSeats: 5,
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop',
      priceRange: '₩35,000 - ₩55,000',
      openNow: true,
      hasCoupon: false
    },
    {
      id: 7,
      name: '서울식 냉면집',
      category: '한식',
      rating: 4.2,
      reviewCount: 234,
      address: '서울시 중구 명동',
      distance: '1.8km',
      waitingTime: '5분',
      availableSeats: 15,
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=250&fit=crop',
      priceRange: '₩12,000 - ₩18,000',
      openNow: true,
      hasCoupon: false
    },
    {
      id: 8,
      name: '힙스터 브런치 카페',
      category: '카페',
      rating: 4.6,
      reviewCount: 178,
      address: '서울시 마포구 합정동',
      distance: '1.1km',
      waitingTime: '10분',
      availableSeats: 9,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=250&fit=crop',
      priceRange: '₩15,000 - ₩25,000',
      openNow: true,
      hasCoupon: true,
      couponText: '브런치 세트 10% 할인',
      couponType: 'discount'
    },
    {
      id: 9,
      name: '전통 술집',
      category: '술집',
      rating: 4.3,
      reviewCount: 87,
      address: '서울시 종로구 종로3가',
      distance: '1.9km',
      waitingTime: '없음',
      availableSeats: 6,
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=250&fit=crop',
      priceRange: '₩20,000 - ₩35,000',
      openNow: true,
      hasCoupon: false
    },
    {
      id: 10,
      name: '타이 레스토랑',
      category: '아시안',
      rating: 4.5,
      reviewCount: 143,
      address: '서울시 강남구 신사동',
      distance: '0.9km',
      waitingTime: '12분',
      availableSeats: 11,
      image: 'https://images.unsplash.com/photo-1559847844-d558cfc41b1d?w=400&h=250&fit=crop',
      priceRange: '₩22,000 - ₩38,000',
      openNow: true,
      hasCoupon: true,
      couponText: '런치 메뉴 25% 할인',
      couponType: 'discount'
    },
    {
      id: 11,
      name: '고급 스시집',
      category: '일식',
      rating: 4.9,
      reviewCount: 45,
      address: '서울시 강남구 청담동',
      distance: '3.2km',
      waitingTime: '30분',
      availableSeats: 0,
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=250&fit=crop',
      priceRange: '₩80,000 - ₩120,000',
      openNow: true,
      hasCoupon: false
    },
    {
      id: 12,
      name: '로컬 피자집',
      category: '양식',
      rating: 4.1,
      reviewCount: 298,
      address: '서울시 서대문구 홍제동',
      distance: '2.8km',
      waitingTime: '없음',
      availableSeats: 18,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=250&fit=crop',
      priceRange: '₩20,000 - ₩35,000',
      openNow: true,
      hasCoupon: true,
      couponText: '피자 2판 주문시 콜라 무료',
      couponType: 'promotion'
    }
  ];

  const getWaitingTimeInMinutes = (waitingTime: string) => {
    if (waitingTime === '없음') return 0;
    const match = waitingTime.match(/(\d+)분/);
    return match ? parseInt(match[1]) : 0;
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.category.includes(searchTerm);
    const matchesCategory = selectedCategory === '전체' || restaurant.category === selectedCategory;
    const matchesRating = restaurant.rating >= ratingFilter[0];
    
    let matchesWaitingTime = true;
    if (waitingTimeFilter !== '전체') {
      const restaurantWaitingMinutes = getWaitingTimeInMinutes(restaurant.waitingTime);
      switch (waitingTimeFilter) {
        case '없음':
          matchesWaitingTime = restaurantWaitingMinutes === 0;
          break;
        case '10분 이하':
          matchesWaitingTime = restaurantWaitingMinutes <= 10;
          break;
        case '20분 이하':
          matchesWaitingTime = restaurantWaitingMinutes <= 20;
          break;
        case '30분 이하':
          matchesWaitingTime = restaurantWaitingMinutes <= 30;
          break;
      }
    }
    
    const matchesAvailableSeats = !availableSeatsOnly || restaurant.availableSeats > 0;
    const matchesCoupon = !couponOnly || restaurant.hasCoupon;
    
    return matchesSearch && matchesCategory && matchesRating && matchesWaitingTime && matchesAvailableSeats && matchesCoupon;
  });

  const resetFilters = () => {
    setRatingFilter([0]);
    setWaitingTimeFilter('전체');
    setAvailableSeatsOnly(false);
    setCouponOnly(false);
  };

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
          <div className="flex flex-wrap gap-2 mb-4">
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

          {/* Filter Toggle Button */}
          <div className="flex justify-between items-center mb-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-gray-300 text-gray-600"
            >
              <Filter className="mr-2 h-4 w-4" />
              필터 {showFilters ? '닫기' : '열기'}
            </Button>
            
            {(ratingFilter[0] > 0 || waitingTimeFilter !== '전체' || availableSeatsOnly || couponOnly) && (
              <Button
                variant="ghost"
                onClick={resetFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="mr-1 h-4 w-4" />
                필터 초기화
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">상세 필터</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    최소 별점: {ratingFilter[0]}점 이상
                  </label>
                  <Slider
                    value={ratingFilter}
                    onValueChange={setRatingFilter}
                    max={5}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0점</span>
                    <span>5점</span>
                  </div>
                </div>

                {/* Waiting Time Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    웨이팅 시간
                  </label>
                  <Select value={waitingTimeFilter} onValueChange={setWaitingTimeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="웨이팅 시간 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {waitingTimeOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Available Seats Filter */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    잔여석 있는 곳만 보기
                  </label>
                  <Switch
                    checked={availableSeatsOnly}
                    onCheckedChange={setAvailableSeatsOnly}
                  />
                </div>

                {/* Coupon Filter */}
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    할인/쿠폰 있는 곳만 보기
                  </label>
                  <Switch
                    checked={couponOnly}
                    onCheckedChange={setCouponOnly}
                  />
                </div>
              </CardContent>
            </Card>
          )}
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
                {restaurant.hasCoupon && (
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
                      {restaurant.couponType === 'discount' ? (
                        <Percent className="h-3 w-3 mr-1" />
                      ) : (
                        <Tag className="h-3 w-3 mr-1" />
                      )}
                      {restaurant.couponText}
                    </span>
                  </div>
                )}
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
            <p className="text-gray-600">다른 키워드로 검색하거나 필터를 조정해보세요</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
