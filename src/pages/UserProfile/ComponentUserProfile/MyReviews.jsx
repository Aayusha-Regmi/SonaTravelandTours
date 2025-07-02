import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

const MyReviews = ({ reviews = [] }) => {
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [displayReviewsState, setDisplayReviewsState] = useState([]);
  const [editedReview, setEditedReview] = useState({});
  const [showWriteModal, setShowWriteModal] = useState(false);
  const [newReview, setNewReview] = useState({
    destination: '',
    busOperator: '',
    rating: 5,
    comment: '',
    visitDate: '',
  });

  // Static data for demonstration
  const staticReviews = [
    {
      id: 1,
      destination: "Kathmandu to Pokhara",
      busOperator: "Sona Travel",
      rating: 5,
      comment: "Excellent service! The bus was comfortable, clean, and on time. The driver was professional and the journey was smooth. I would definitely recommend this service to other travelers.",
      visitDate: "2024-06-15",
      postedDate: "2024-06-16",
      helpful: 24,
      views: 156,
      verified: true,
      images: 2
    },
    {
      id: 2,
      destination: "Kathmandu to Chitwan",
      busOperator: "Sona Travel",
      rating: 4,
      comment: "Good experience overall. The bus was comfortable and the staff was friendly. However, there was a slight delay in departure but they kept us informed.",
      visitDate: "2024-05-20",
      postedDate: "2024-05-21",
      helpful: 18,
      views: 89,
      verified: true,
      images: 1
    },
    {
      id: 3,
      destination: "Kathmandu to Lumbini",
      busOperator: "Sona Travel",
      rating: 5,
      comment: "Amazing journey to the birthplace of Buddha. The tour guide was knowledgeable and the bus facilities were top-notch. Highly recommended for spiritual travelers.",
      visitDate: "2024-04-10",
      postedDate: "2024-04-12",
      helpful: 31,
      views: 203,
      verified: true,
      images: 3
    },
    {
      id: 4,
      destination: "Pokhara to Jomsom",
      busOperator: "Sona Travel",
      rating: 4,
      comment: "Scenic mountain route with breathtaking views. The bus was well-maintained for mountain roads. Safety measures were excellent.",
      visitDate: "2024-03-28",
      postedDate: "2024-03-30",
      helpful: 15,
      views: 67,
      verified: false,
      images: 0
    }
  ];

  // Initialize display reviews state
  React.useEffect(() => {
    const initialReviews = reviews.length > 0 ? reviews : staticReviews;
    setDisplayReviewsState(initialReviews);
  }, [reviews]);

  const displayReviews = displayReviewsState;

  // Handle edit functionality
  const handleEdit = (id) => {
    const reviewToEdit = displayReviews.find(review => review.id === id);
    if (reviewToEdit) {
      setEditedReview({ ...reviewToEdit });
      setEditingId(id);
    }
  };

  // Handle save edit
  const handleSaveEdit = (id) => {
    setDisplayReviewsState(prevReviews => 
      prevReviews.map(review => 
        review.id === id ? { ...editedReview } : review
      )
    );
    setEditingId(null);
    setEditedReview({});
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedReview({});
  };

  // Handle delete functionality
  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this review? This action cannot be undone.');
    
    if (confirmDelete) {
      setDeletingId(id);
      setTimeout(() => {
        setDisplayReviewsState(prevReviews => 
          prevReviews.filter(review => review.id !== id)
        );
        setDeletingId(null);
      }, 1500);
    }
  };

  // Handle input changes during editing
  const handleInputChange = (field, value) => {
    setEditedReview(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle helpful vote
  const handleHelpful = (id) => {
    setDisplayReviewsState(prevReviews =>
      prevReviews.map(review =>
        review.id === id 
          ? { ...review, helpful: review.helpful + 1 }
          : review
      )
    );
  };

  // Handle write new review
  const handleWriteReview = () => {
    setShowWriteModal(true);
  };

  // Handle new review input changes
  const handleNewReviewChange = (field, value) => {
    setNewReview(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle save new review
  const handleSaveNewReview = () => {
    const newId = Math.max(...displayReviews.map(r => r.id), 0) + 1;
    const reviewToAdd = {
      id: newId,
      ...newReview,
      postedDate: new Date().toISOString().split('T')[0],
      helpful: 0,
      views: 0,
      verified: false,
      images: 0
    };
    
    setDisplayReviewsState(prev => [reviewToAdd, ...prev]);
    setNewReview({
      destination: '',
      busOperator: '',
      rating: 5,
      comment: '',
      visitDate: '',
    });
    setShowWriteModal(false);
  };

  // Handle cancel new review
  const handleCancelNewReview = () => {
    setNewReview({
      destination: '',
      busOperator: '',
      rating: 5,
      comment: '',
      visitDate: '',
    });
    setShowWriteModal(false);
  };

  if (displayReviews.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center py-16">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mt-6 mb-2">
            Share Your Travel Experiences
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Help fellow travelers by sharing your honest reviews and experiences from your journeys.
          </p>
          <Button variant="primary" className="px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg" onClick={handleWriteReview}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Write Your First Review
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">My Reviews</h2>
          <p className="text-gray-600">Your travel experiences and feedback</p>
        </div>
        <Button variant="primary" className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg" onClick={handleWriteReview}>
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Write New Review
        </Button>
      </div>

      {/* Reviews Grid */}
      <div className="space-y-6">
        {displayReviews.map((review, index) => (
          <div key={review.id || index} className="group relative">
            {/* 3D Card Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-all duration-500 transform group-hover:scale-105"></div>
            
            <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl border border-white/30 shadow-xl p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
              {/* Header Section */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-5H8z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      {editingId === review.id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editedReview.destination || ''}
                            onChange={(e) => handleInputChange('destination', e.target.value)}
                            className="w-full font-bold text-gray-800 text-lg bg-white border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Destination"
                          />
                          <input
                            type="text"
                            value={editedReview.busOperator || ''}
                            onChange={(e) => handleInputChange('busOperator', e.target.value)}
                            className="w-full text-sm text-gray-600 bg-white border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Bus Operator"
                          />
                        </div>
                      ) : (
                        <div>
                          <h4 className="font-bold text-gray-800 text-lg">{review.destination}</h4>
                          <p className="text-sm text-gray-600">{review.busOperator}</p>
                        </div>
                      )}
                    </div>
                    {review.verified && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        Verified
                      </div>
                    )}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2">
                    {editingId === review.id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">Rating:</span>
                        <select
                          value={editedReview.rating || 5}
                          onChange={(e) => handleInputChange('rating', parseInt(e.target.value))}
                          className="bg-white border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                          {[1, 2, 3, 4, 5].map(rating => (
                            <option key={rating} value={rating}>{rating} Star{rating !== 1 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          ))}
                        </div>
                        <span className="font-semibold text-gray-700">{review.rating}/5</span>
                      </>
                    )}
                  </div>
                  
                  {/* Dates */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Traveled: {review.visitDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Posted: {review.postedDate}
                    </span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                {editingId !== review.id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(review.id)}
                      className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 text-sm font-medium shadow-lg flex items-center gap-1"
                      title="Edit Review"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      disabled={deletingId === review.id}
                      className={`px-3 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 text-sm font-medium shadow-lg flex items-center gap-1 ${
                        deletingId === review.id 
                          ? 'bg-gray-300 cursor-not-allowed text-gray-600' 
                          : 'bg-red-500 text-white hover:bg-red-600'
                      }`}
                      title="Delete Review"
                    >
                      {deletingId === review.id ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Deleting...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
              
              {/* Review Content */}
              <div className="mb-4">
                {editingId === review.id ? (
                  <div className="space-y-3">
                    <textarea
                      value={editedReview.comment || ''}
                      onChange={(e) => handleInputChange('comment', e.target.value)}
                      className="w-full text-gray-700 bg-white border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 leading-relaxed resize-vertical"
                      rows={4}
                      placeholder="Share your travel experience..."
                    />
                    
                    {/* Edit Action Buttons */}
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleSaveEdit(review.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 transform hover:scale-105 text-sm font-medium shadow-lg flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 transform hover:scale-105 text-sm font-medium shadow-lg flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                )}
              </div>
              
              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleHelpful(review.id)}
                    className="flex items-center gap-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 text-sm font-medium"
                  >
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    {review.helpful}
                  </button>
                  <span className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {review.views} views
                  </span>
                  {review.images > 0 && (
                    <span className="flex items-center gap-2 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {review.images} photos
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review Modal */}
      {showWriteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Write New Review</h2>
                <button
                  onClick={handleCancelNewReview}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mt-2">Share your travel experience to help other travelers</p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Route Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Route/Destination *
                  </label>
                  <input
                    type="text"
                    value={newReview.destination}
                    onChange={(e) => handleNewReviewChange('destination', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="e.g., Kathmandu to Pokhara"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bus Operator *
                  </label>
                  <input
                    type="text"
                    value={newReview.busOperator}
                    onChange={(e) => handleNewReviewChange('busOperator', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="e.g., Sona Travel"
                    required
                  />
                </div>
              </div>

              {/* Travel Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Travel Date *
                </label>
                <input
                  type="date"
                  value={newReview.visitDate}
                  onChange={(e) => handleNewReviewChange('visitDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating *
                </label>
                <div className="flex items-center gap-4">
                  <select
                    value={newReview.rating}
                    onChange={(e) => handleNewReviewChange('rating', parseInt(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5].map(rating => (
                      <option key={rating} value={rating}>{rating} Star{rating !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-6 h-6 ${i < newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Comment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review *
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => handleNewReviewChange('comment', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-vertical"
                  rows={5}
                  placeholder="Share your detailed experience about the journey, service quality, comfort, punctuality, etc."
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Minimum 50 characters recommended for a helpful review
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={handleCancelNewReview}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNewReview}
                disabled={!newReview.destination || !newReview.busOperator || !newReview.comment || !newReview.visitDate}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  !newReview.destination || !newReview.busOperator || !newReview.comment || !newReview.visitDate
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white hover:from-yellow-700 hover:to-orange-700 transform hover:scale-105 shadow-lg'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Publish Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
