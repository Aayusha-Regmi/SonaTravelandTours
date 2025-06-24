import React from 'react';
import Button from '../../../components/ui/Button';

const Discounts = ({ discounts = [] }) => {
  if (discounts.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-6 text-center">
        <div className="max-w-sm mx-auto">
          <div className="w-12 h-12 mx-auto mb-3 bg-green-50 rounded-full flex items-center justify-center">
            <span className="text-lg">🎉</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2 font-opensans">
            Exclusive Offers
          </h3>
          <p className="text-gray-500 text-sm font-opensans mb-4">
            Discover special discounts and promotional offers just for you.
          </p>
          <Button variant="primary" className="h-9 px-4 text-sm">
            View Offers
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
        <h2 className="text-lg font-semibold text-gray-800 font-opensans">
          Available Discounts
        </h2>
        <Button variant="outline" className="h-8 px-3 text-xs">
          Browse All Offers
        </Button>
      </div>

      <div className="space-y-3">
        {discounts.map((discount, index) => (
          <div key={index} className="border border-green-100 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-blue-600 transform rotate-45 translate-x-6 -translate-y-6"></div>
            <div className="absolute top-1 right-1 text-white text-xs font-bold">
              {discount.percentage}%
            </div>
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="flex-1">
                <h4 className="font-medium text-gray-800 font-opensans text-sm mb-1">
                  {discount.title}
                </h4>
                <p className="text-gray-600 text-xs font-opensans mb-2">                  {discount.description}
                </p>
                
                <div className="flex flex-wrap gap-2 text-xs text-gray-500 font-opensans">
                  <span className="flex items-center gap-1">
                    📅 Until: {discount.validUntil}
                  </span>
                  <span className="flex items-center gap-1">
                    🎯 Min: ${discount.minSpend}
                  </span>
                  {discount.maxDiscount && (
                    <span className="flex items-center gap-1">
                      💰 Max: ${discount.maxDiscount}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <div className="bg-white border border-dashed border-blue-300 rounded-md px-3 py-1">
                  <div className="text-xs text-gray-500 font-opensans">Code</div>
                  <div className="font-bold text-blue-600 font-opensans tracking-wider text-sm">
                    {discount.code}
                  </div>
                </div>
                
                <div className="flex gap-1">
                  <Button variant="outline" size="small" className="h-7 px-2 text-xs">
                    Copy
                  </Button>
                  <Button variant="primary" size="small" className="h-7 px-2 text-xs">
                    Use
                  </Button>
                </div>
              </div>
            </div>
            
            {discount.termsAndConditions && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-400 font-opensans">
                  Terms: {discount.termsAndConditions}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discounts;
