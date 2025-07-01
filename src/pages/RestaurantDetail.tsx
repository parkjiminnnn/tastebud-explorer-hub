
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Clock, Users, Camera, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const RestaurantDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - 실제로는 API에서 가져올 데이터
  const restaurant = {
    id: 1,
    name: '맛있는 한식당',
    category: '한식',
    rating: 4.5,
    reviewCount: 128,
    address: '서울시 강남구 역삼동 123-45',
    phone: '02-1234-5678',
    distance: '0.3km',
    waitingTime: '10분',
    availableSeats: 3,
    images: [
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop',
      'https://images.unsplash.com/photo-1563379091339-03246954d735?w=800&h=400&fit=crop'
    ],
    priceRange: '₩15,000 - ₩25,000',
    openNow: true,
    hours: {
      weekday: '11:00 - 22:00',
      weekend: '11:00 - 23:00'
    },
    description: '전통 한식의 깊은 맛을 현대적으로 재해석한 음식을 제공하는 레스토랑입니다.',
    features: ['웨이팅 공간', '주차 가능', '단체석', '포장 가능'],
    menu: [
      { name: '비빔밥', price: '₩12,000', popular: true },
      { name: '불고기 정식', price: '₩18,000', popular: true },
      { name: '갈비탕', price: '₩15,000', popular: false },
      { name: '냉면', price: '₩10,000', popular: false },
      { name: '김치찌개', price: '₩13,000', popular: false }
    ]
  };

  const reviews = [
    {
      id: 1,
      user: '박지민',
      rating: 5,
      date: '2024-01-15',
      comment: '정말 맛있어요! 직장 동료들과 함께 갔는데 모두 만족했습니다.',
      images: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=150&fit=crop']
    },
    {
      id: 2,
      user: '장은영',
      rating: 4,
      date: '2024-01-10',
      comment: '분위기도 좋고 음식도 정갈해요. 블로그에 리뷰 올릴 예정입니다.',
      images: []
    },
    {
      id: 3,
      user: '임준혁',
      rating: 5,
      date: '2024-01-05',
      comment: '사장님이 정말 친절하시고 음식도 맛있어요. 재방문 의사 100%',
      images: []
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
                <span className="ml-2 text-xl font-bold text-gray-900">{restaurant.name}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="border-gray-300">
                <Camera className="mr-2 h-4 w-4" />
                사진
              </Button>
              <Button variant="outline" className="border-gray-300">
                <Edit className="mr-2 h-4 w-4" />
                리뷰 작성
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Image Gallery */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-96">
            <div className="md:col-span-2">
              <img 
                src={restaurant.images[0]} 
                alt={restaurant.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-rows-2 gap-4">
              <img 
                src={restaurant.images[1]} 
                alt={restaurant.name}
                className="w-full h-full object-cover rounded-lg"
              />
              <img 
                src={restaurant.images[2]} 
                alt={restaurant.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">개요</TabsTrigger>
                <TabsTrigger value="menu">메뉴</TabsTrigger>
                <TabsTrigger value="reviews">리뷰</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>식당 정보</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">{restaurant.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">기본 정보</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                            {restaurant.address}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-gray-400" />
                            평일: {restaurant.hours.weekday}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-gray-400" />
                            주말: {restaurant.hours.weekend}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">편의시설</h4>
                        <div className="flex flex-wrap gap-2">
                          {restaurant.features.map((feature, index) => (
                            <span key={index} className="px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="menu" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>메뉴</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {restaurant.menu.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50">
                          <div className="flex items-center">
                            <span className="font-medium">{item.name}</span>
                            {item.popular && (
                              <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs">
                                인기
                              </span>
                            )}
                          </div>
                          <span className="font-semibold text-orange-600">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>리뷰 ({reviews.length}개)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <span className="font-medium">{review.user}</span>
                              <div className="flex items-center ml-3">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <p className="text-gray-600 mb-3">{review.comment}</p>
                          {review.images.length > 0 && (
                            <div className="flex gap-2">
                              {review.images.map((image, index) => (
                                <img
                                  key={index}
                                  src={image}
                                  alt="리뷰 사진"
                                  className="w-20 h-20 object-cover rounded-lg"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Restaurant Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>실시간 정보</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    restaurant.openNow ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {restaurant.openNow ? '영업중' : '영업종료'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">웨이팅 시간</span>
                  <span className="font-semibold">{restaurant.waitingTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">잔여석</span>
                  <span className={`font-semibold ${restaurant.availableSeats > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {restaurant.availableSeats}석
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">가격대</span>
                  <span className="font-semibold">{restaurant.priceRange}</span>
                </div>
              </CardContent>
            </Card>

            {/* Rating */}
            <Card>
              <CardHeader>
                <CardTitle>평점</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">{restaurant.rating}</div>
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(restaurant.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-600">{restaurant.reviewCount}개의 리뷰</div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                예약하기
              </Button>
              <Button variant="outline" className="w-full border-orange-300 text-orange-600 hover:bg-orange-50">
                전화걸기
              </Button>
              <Button variant="outline" className="w-full border-gray-300">
                길찾기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
