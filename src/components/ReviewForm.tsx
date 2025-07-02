
import React, { useState } from 'react';
import { Star, Link as LinkIcon, Camera, X, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReviewFormProps {
  onSubmit: (reviewData: any) => void;
  onCancel: () => void;
  userType?: string;
}

const ReviewForm = ({ onSubmit, onCancel, userType = 'user' }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [blogLink, setBlogLink] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !comment.trim()) {
      alert('별점과 리뷰 내용을 입력해주세요.');
      return;
    }

    const reviewData = {
      rating,
      comment,
      images,
      ...(userType === 'blogger' && blogLink && { blogLink }),
      date: new Date().toISOString().split('T')[0],
      user: userType === 'blogger' ? '장은영' : '박지민' // Mock user based on type
    };

    onSubmit(reviewData);
  };

  const handleImageAdd = () => {
    // Mock image upload - in real app, this would handle file upload
    const mockImageUrl = `https://images.unsplash.com/photo-${Date.now()}?w=200&h=150&fit=crop`;
    setImages([...images, mockImageUrl]);
  };

  const handleImageRemove = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>리뷰 작성</span>
          {userType === 'blogger' && (
            <span className="px-2 py-1 text-xs bg-purple-100 text-purple-600 rounded-full">
              블로거
            </span>
          )}
        </CardTitle>
        
        {/* Reward Message */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4 mt-4">
          <div className="flex items-center text-orange-700">
            <Gift className="h-5 w-5 mr-2" />
            <span className="font-medium">리뷰 작성 리워드</span>
          </div>
          <p className="text-sm text-orange-600 mt-1">
            리뷰를 작성하시면 포인트 적립과 특별 할인 쿠폰을 드려요! 
            {userType === 'blogger' && ' 블로거 회원은 추가 혜택이 있습니다.'}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <Label className="text-base font-medium">별점</Label>
            <div className="flex items-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-8 w-8 cursor-pointer transition-colors ${
                    star <= (hoverRating || rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
              <span className="ml-3 text-sm text-gray-600">
                {rating > 0 ? `${rating}점` : '별점을 선택해주세요'}
              </span>
            </div>
          </div>

          {/* Review Content */}
          <div>
            <Label htmlFor="comment" className="text-base font-medium">
              리뷰 내용
            </Label>
            <Textarea
              id="comment"
              placeholder="식당에 대한 솔직한 후기를 작성해주세요..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mt-2 min-h-[120px]"
              required
            />
          </div>

          {/* Blog Link (Only for bloggers) */}
          {userType === 'blogger' && (
            <div>
              <Label htmlFor="blogLink" className="text-base font-medium flex items-center">
                <LinkIcon className="h-4 w-4 mr-2" />
                블로그 링크 (선택사항)
              </Label>
              <Input
                id="blogLink"
                type="url"
                placeholder="https://your-blog.com/restaurant-review"
                value={blogLink}
                onChange={(e) => setBlogLink(e.target.value)}
                className="mt-2"
              />
              <p className="text-sm text-gray-500 mt-1">
                블로그에 작성한 상세 리뷰 링크를 공유해보세요
              </p>
            </div>
          )}

          {/* Images */}
          <div>
            <Label className="text-base font-medium">사진 (선택사항)</Label>
            <div className="mt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleImageAdd}
                className="mb-4"
              >
                <Camera className="h-4 w-4 mr-2" />
                사진 추가
              </Button>
              
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`리뷰 사진 ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleImageRemove(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white">
              리뷰 등록하고 리워드 받기
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              취소
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
