import React from 'react';
import Button from '../../../components/ui/Button';

const MyReviews = ({ reviews = [] }) => {
  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-6 text-center">
        <div className="max-w-sm mx-auto">
          <div className="w-12 h-12 mx-auto mb-3 bg-yellow-50 rounded-full flex items-center justify-center">
            <span className="text-lg">⭐</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 font-opensans">
            Share Your Experiences
          </h3>
          <p className="text-gray-500 text-sm font-opensans mb-4">
            Help other travelers by reviewing your trips and experiences.
          </p>
          <Button variant="outline" className="h-9 px-4 text-sm">
            Write a Review
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
        <h2 className="text-lg font-semibold text-gray-800 font-opensans">
          My Reviews
        </h2>
        <Button variant="primary" className="h-8 px-3 text-xs">
          Write New Review
        </Button>
      </div>

      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="border border-gray-100 rounded-lg p-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 font-opensans mb-2 text-sm">
                  {review.destination}
                </h4>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}                    >
                      ⭐
                    </span>
                  ))}
                  <span className="ml-1 text-xs text-gray-500 font-opensans">
                    {review.rating}/5
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-opensans">
                  Visited on: {review.visitDate}
                </p>
              </div>
              <div className="flex gap-1">
                <Button variant="outline" size="small" className="h-7 px-2 text-xs">
                  Edit
                </Button>
                <Button variant="outline" size="small" className="h-7 px-2 text-xs text-red-600 hover:bg-red-50">
                  Delete
                </Button>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm font-opensans leading-relaxed">
              {review.comment}
            </p>
            
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-400 font-opensans">
                Posted on {review.postedDate}
              </span>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  👍 {review.helpful || 0}
                </span>
                <span className="flex items-center gap-1">
                  👁️ {review.views || 0}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
