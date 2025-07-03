
import React, { useState } from 'react';
import { Clock, Users, Camera, Star, Edit3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ConsumerDashboardProps {
  reservations: Array<{
    id: number;
    restaurant: string;
    date: string;
    time: string;
    people: number;
    status: string;
  }>;
  setReservations: React.Dispatch<React.SetStateAction<any[]>>;
}

const ConsumerDashboard: React.FC<ConsumerDashboardProps> = ({ reservations, setReservations }) => {
  const { toast } = useToast();
  const [editingReservation, setEditingReservation] = useState(null);
  const [editForm, setEditForm] = useState({ date: '', time: '', people: '' });

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

  return (
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
            <Camera className="mr-2 h-5 w-5 text-blue-500" />
            내 리뷰 활동
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>총 리뷰 수</span>
              <span className="font-bold text-blue-600">24개</span>
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
            <Star className="mr-2 h-5 w-5 text-blue-500" />
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Camera className="mr-2 h-5 w-5 text-blue-500" />
            최근 방문 예정
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="font-medium">신상 카페 탐방</div>
              <div className="text-sm text-gray-600">홍대 신규 오픈</div>
              <div className="text-xs text-blue-600 mt-1">블로그 포스팅 예정</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsumerDashboard;
