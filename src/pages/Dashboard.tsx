import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, User, Camera, Star, Calendar, BarChart, Clock, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { userType } = useParams();
  const { toast } = useToast();
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

  const [editingReservation, setEditingReservation] = useState(null);
  const [editForm, setEditForm] = useState({ date: '', time: '', people: '' });

  const userTypes = {
    'office-worker': {
      title: '일반인 대시보드',
      icon: Users,
      color: 'bg-blue-500',
      description: '빠른 예약과 실시간 정보를 확인하세요'
    },
    'business-owner': {
      title: '자영업자 대시보드',
      icon: User,
      color: 'bg-green-500',
      description: '매장 관리와 고객 소통을 효율적으로'
    },
    'blogger': {
      title: '블로거 대시보드',
      icon: Camera,
      color: 'bg-purple-500',
      description: '맛집 탐색과 리뷰 작성으로 컨텐츠 제작'
    }
  };

  const currentUser = userTypes[userType as keyof typeof userTypes];
  const IconComponent = currentUser?.icon || Users;

  const handleEditReservation = (reservation) => {
    setEditingReservation(reservation);
    setEditForm({
      date: reservation.date,
      time: reservation.time,
      people: reservation.people.toString()
    });
  };

  const handleSaveReservation = () => {
    setReservations(prev => prev.map(res => 
      res.id === editingReservation.id 
        ? { ...res, date: editForm.date, time: editForm.time, people: parseInt(editForm.people) }
        : res
    ));
    
    toast({
      title: "예약이 수정되었습니다",
      description: `${editingReservation.restaurant} 예약이 성공적으로 변경되었습니다.`,
    });
    
    setEditingReservation(null);
  };

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

  // 각 사용자 타입별 컨텐츠
  const renderOfficeWorkerContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-blue-500" />
            내 예약 현황
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reservations.map((reservation) => (
              <div key={reservation.id} className="p-3 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium">{reservation.restaurant}</div>
                    <div className="text-sm text-gray-600">{reservation.date} {reservation.time} - {reservation.people}명</div>
                    <div className={`text-xs mt-1 ${reservation.status === '예약 확정' ? 'text-green-600' : 'text-blue-600'}`}>
                      {reservation.status}
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditReservation(reservation)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>예약 수정</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="restaurant">식당</Label>
                          <Input id="restaurant" value={reservation.restaurant} disabled />
                        </div>
                        <div>
                          <Label htmlFor="date">날짜</Label>
                          <Input 
                            id="date" 
                            value={editForm.date}
                            onChange={(e) => setEditForm(prev => ({ ...prev, date: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="time">시간</Label>
                          <Input 
                            id="time" 
                            value={editForm.time}
                            onChange={(e) => setEditForm(prev => ({ ...prev, time: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="people">인원</Label>
                          <Input 
                            id="people" 
                            type="number"
                            value={editForm.people}
                            onChange={(e) => setEditForm(prev => ({ ...prev, people: e.target.value }))}
                          />
                        </div>
                        <Button onClick={handleSaveReservation} className="w-full">
                          저장
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5 text-blue-500" />
            실시간 테이블 정보
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>맛있는 한식당</span>
              <span className="text-green-600 font-medium">3석 available</span>
            </div>
            <div className="flex justify-between">
              <span>이탈리안 레스토랑</span>
              <span className="text-green-600 font-medium">7석 available</span>
            </div>
            <div className="flex justify-between">
              <span>전통 일식집</span>
              <span className="text-red-600 font-medium">만석</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="mr-2 h-5 w-5 text-blue-500" />
            최근 방문 기록
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>맛있는 한식당</span>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm">4.5</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>분위기 좋은 카페</span>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm">4.3</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBusinessOwnerContent = () => (
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

  const renderBloggerContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Camera className="mr-2 h-5 w-5 text-purple-500" />
            내 리뷰 활동
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>총 리뷰 수</span>
              <span className="font-bold text-purple-600">24개</span>
            </div>
            <div className="flex justify-between">
              <span>이번 달</span>
              <span className="font-medium">5개</span>
            </div>
            <div className="flex justify-between">
              <span>평균 별점</span>
              <span className="font-medium">4.2</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="mr-2 h-5 w-5 text-purple-500" />
            내 컬렉션
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="p-2 border rounded">
              <div className="font-medium">강남 맛집 모음</div>
              <div className="text-sm text-gray-600">8개 식당</div>
            </div>
            <div className="p-2 border rounded">
              <div className="font-medium">데이트 코스</div>
              <div className="text-sm text-gray-600">5개 식당</div>
            </div>
            <div className="p-2 border rounded">
              <div className="font-medium">혼밥 추천</div>
              <div className="text-sm text-gray-600">3개 식당</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5 text-purple-500" />
            최근 방문 예정
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="font-medium">신상 카페 탐방</div>
              <div className="text-sm text-gray-600">홍대 신규 오픈</div>
              <div className="text-xs text-purple-600 mt-1">블로그 포스팅 예정</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (userType) {
      case 'office-worker':
        return renderOfficeWorkerContent();
      case 'business-owner':
        return renderBusinessOwnerContent();
      case 'blogger':
        return renderBloggerContent();
      default:
        return <div>잘못된 사용자 타입입니다.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
      </div>
    </div>
  );
};

export default Dashboard;
