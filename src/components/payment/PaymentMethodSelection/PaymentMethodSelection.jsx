import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const PaymentMethodSelection = ({ 
  onMethodSelect, 
  selectedMethod, 
  isLoading = false,
  onClose 
}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Payment categories from the API documentation
  const paymentCategories = [
    {
      id: 'CARD',
      name: 'Card',
      description: 'Credit/Debit Cards',
      icon: '💳',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      id: 'WALLET',
      name: 'Wallet',
      description: 'Digital Wallets',
      icon: '📱',
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      id: 'MOBILE',
      name: 'Mobile',
      description: 'Mobile Banking',
      icon: '📲',
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100'
    },
    {
      id: 'INTERNET',
      name: 'Internet',
      description: 'Internet Banking',
      icon: '🏦',
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    }
  ];

  const fetchPaymentInstruments = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // For now, we'll use static data since we need to integrate with GetPaymentInstrumentDetails API
      // This would be replaced with actual API call
      const mockInstruments = {
        CARD: [
          { id: 'visa', name: 'Visa Card', code: 'VISA' },
          { id: 'mastercard', name: 'Mastercard', code: 'MASTERCARD' }
        ],
        WALLET: [
          { id: 'esewa', name: 'eSewa', code: 'ESEWA' },
          { id: 'khalti', name: 'Khalti', code: 'KHALTI' }
        ],
        MOBILE: [
          { id: 'nmb_mobile', name: 'NMB Mobile Banking', code: 'NMB_MOBILE' },
          { id: 'nic_mobile', name: 'NIC Mobile Banking', code: 'NIC_MOBILE' }
        ],
        INTERNET: [
          { id: 'nmb_internet', name: 'NMB Internet Banking', code: 'NMB_INTERNET' },
          { id: 'nic_internet', name: 'NIC Internet Banking', code: 'NIC_INTERNET' }
        ]
      };
      
      setPaymentMethods(mockInstruments[selectedCategory] || []);
    } catch (err) {
      setError('Failed to fetch payment methods');
      console.error('Error fetching payment methods:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchPaymentInstruments();
    }
  }, [selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.id);
    setError(null);
  };

  const handleMethodSelect = (method) => {
    if (!isLoading) {
      onMethodSelect({
        ...method,
        category: selectedCategory
      });
    }
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setPaymentMethods([]);
    setError(null);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 m-4 max-w-md w-full">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading payment methods...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 m-4 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            {selectedCategory && (
              <button
                onClick={handleBack}
                className="mr-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <h2 className="text-xl font-bold text-gray-900">
              {selectedCategory ? 'Select Payment Method' : 'Choose Payment Category'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-700">{error}</span>
            </div>
            <button
              onClick={() => selectedCategory ? fetchPaymentInstruments() : setError(null)}
              className="mt-2 text-red-600 hover:text-red-800 underline text-sm"
            >
              Try again
            </button>
          </div>
        )}

        {/* Category Selection */}
        {!selectedCategory && (
          <div>
            <p className="text-gray-600 mb-6 text-center">
              Select a payment category to view available options
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {paymentCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategorySelect(category)}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-colors ${category.color}`}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment Method Selection */}
        {selectedCategory && (
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {paymentCategories.find(cat => cat.id === selectedCategory)?.name} Payment Methods
              </h3>
              <p className="text-gray-600">
                Choose your preferred {paymentCategories.find(cat => cat.id === selectedCategory)?.description.toLowerCase()} method
              </p>
            </div>

            {paymentMethods.length > 0 ? (
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => handleMethodSelect(method)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedMethod?.id === method.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{method.name}</h4>
                        <p className="text-sm text-gray-600">Code: {method.code}</p>
                      </div>
                      {selectedMethod?.id === method.id && (
                        <div className="text-blue-600">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <p className="text-gray-500">No payment methods available for this category</p>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

PaymentMethodSelection.propTypes = {
  onMethodSelect: PropTypes.func.isRequired,
  selectedMethod: PropTypes.object,
  isLoading: PropTypes.bool,
  onClose: PropTypes.func.isRequired
};

export default PaymentMethodSelection;
