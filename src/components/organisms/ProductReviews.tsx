
import React, { useState } from 'react';
import { Star, ThumbsUp, Flag, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

interface ProductReviewsProps {
  productId: string;
}

const mockReviews: Review[] = [
  {
    id: '1',
    userName: 'राजेश पटेल',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
    rating: 5,
    title: 'Excellent tractor for my farm',
    comment: 'Been using this tractor for 6 months now. Very reliable and fuel efficient. The power steering makes long hours of work much easier.',
    date: '2024-01-15',
    verified: true,
    helpful: 12,
    images: [
      'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300&h=200&fit=crop',
    ],
  },
  {
    id: '2',
    userName: 'सुनीता देवी',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=64&h=64&fit=crop&crop=face',
    rating: 4,
    title: 'Good value for money',
    comment: 'The tractor performs well in most conditions. Service support could be better in rural areas.',
    date: '2024-01-10',
    verified: true,
    helpful: 8,
  },
  {
    id: '3',
    userName: 'अमित शर्मा',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
    rating: 5,
    title: 'Highly recommended',
    comment: 'Perfect for medium-sized farms. The build quality is excellent and maintenance is easy.',
    date: '2024-01-05',
    verified: true,
    helpful: 15,
  },
];

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [sortBy, setSortBy] = useState<'newest' | 'helpful' | 'rating'>('newest');

  const averageRating = mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: mockReviews.filter(review => review.rating === rating).length,
    percentage: (mockReviews.filter(review => review.rating === rating).length / mockReviews.length) * 100,
  }));

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateString));
  };

  return (
    <div className="space-y-8">
      {/* Review Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Overall Rating */}
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex items-center justify-center space-x-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-6 w-6 ${
                  star <= Math.floor(averageRating)
                    ? 'text-yellow-400 fill-current'
                    : star <= averageRating
                    ? 'text-yellow-400 fill-current opacity-50'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-gray-600">Based on {mockReviews.length} reviews</p>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center space-x-2">
              <span className="text-sm font-medium w-12">{rating} stars</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-8">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Button */}
      <div className="text-center">
        <Button className="bg-green-500 hover:bg-green-600 focus-ring">
          Write a Review
        </Button>
      </div>

      {/* Sort Options */}
      <div className="flex items-center space-x-4 border-b border-gray-200 pb-4">
        <span className="font-medium text-gray-700">Sort by:</span>
        <div className="flex space-x-2">
          {[
            { value: 'newest', label: 'Newest' },
            { value: 'helpful', label: 'Most Helpful' },
            { value: 'rating', label: 'Highest Rating' },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setSortBy(option.value as typeof sortBy)}
              className={`px-3 py-1 rounded-full text-sm transition-colors focus-ring ${
                sortBy === option.value
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div key={review.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              {/* Avatar */}
              <Avatar className="w-12 h-12">
                <AvatarImage src={review.userAvatar} />
                <AvatarFallback className="font-hindi">
                  {review.userName.charAt(0)}
                </AvatarFallback>
              </Avatar>

              {/* Review Content */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-medium text-gray-900 font-hindi">
                    {review.userName}
                  </h4>
                  {review.verified && (
                    <Badge variant="secondary" className="text-xs">
                      Verified Purchase
                    </Badge>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {formatDate(review.date)}
                  </span>
                </div>

                {/* Review Title */}
                <h5 className="font-semibold text-gray-900 mb-2">
                  {review.title}
                </h5>

                {/* Review Comment */}
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {review.comment}
                </p>

                {/* Review Images */}
                {review.images && review.images.length > 0 && (
                  <div className="flex space-x-2 mb-4">
                    {review.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                      />
                    ))}
                  </div>
                )}

                {/* Review Actions */}
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-green-600 focus-ring rounded">
                    <ThumbsUp className="h-4 w-4" />
                    <span>Helpful ({review.helpful})</span>
                  </button>
                  <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600 focus-ring rounded">
                    <Flag className="h-4 w-4" />
                    <span>Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" className="focus-ring">
          Load More Reviews
        </Button>
      </div>
    </div>
  );
}
