import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../components/ui/Button';
import api from '../../../services/api';

const Discounts = () => {
  const [appliedCoupons, setAppliedCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch applied coupons on component mount
  useEffect(() => {
    const fetchAppliedCoupons = async () => {
      try {
        setLoading(true);
        setError(null);
        const couponsData = await api.getAppliedCoupons();
        setAppliedCoupons(couponsData);
      } catch (err) {
        console.error('Error fetching applied coupons:', err);
        setError('Failed to load applied coupons. Please try again.');
        toast.error('Failed to load applied coupons', {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedCoupons();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  // Format rebate amount
  const formatRebateAmount = (amount) => {
    if (!amount) return 'N/A';
    return `Rs. ${amount}`;
  };

  // Get status color classes
  const getStatusColorClasses = (status) => {
    switch (status?.toLowerCase()) {
      case 'claimed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'expired':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Get status dot color
  const getStatusDotColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'claimed':
        return 'bg-green-400';
      case 'pending':
        return 'bg-yellow-400';
      case 'expired':
        return 'bg-red-400';
      default:
        return 'bg-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your discount coupons...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Coupons</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              variant="primary"
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Modern Table Container */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Modern Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead className="bg-gradient-to-r from-gray-50 to-slate-50">
              <tr>
                <th className="px-8 py-4 text-left w-64">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Coupon Code</span>
                </th>
                <th className="px-6 py-4 text-left w-40">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Rebate Amount</span>
                </th>
                <th className="px-6 py-4 text-left w-36">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Applied Date</span>
                </th>
                <th className="px-6 py-4 text-left w-36">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Travel Date</span>
                </th>
                <th className="px-6 py-4 text-left w-36">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Ticket Number</span>
                </th>
                <th className="px-6 py-4 text-left w-28">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</span>
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100/50">
              {appliedCoupons.map((coupon, index) => (
                <tr 
                  key={`${coupon.userId}-${coupon.appliedCouponCode}-${index}`} 
                  className="hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30 transition-all duration-200"
                >
                  {/* Coupon Code */}
                  <td className="px-8 py-4 w-64">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                      <div>
                        <div className="bg-gradient-to-r from-gray-100 to-gray-50 border-2 border-dashed border-gray-300 rounded-lg px-3 py-2 inline-block">
                          <span className="font-mono font-bold text-gray-800 tracking-wider text-sm whitespace-nowrap">
                            {coupon.appliedCouponCode}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Rebate Amount */}
                  <td className="px-6 py-4 w-40">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-emerald-600 whitespace-nowrap">{formatRebateAmount(coupon.rebateAmount)}</span>
                      <span className="text-xs text-gray-500 font-medium whitespace-nowrap">SAVED</span>
                    </div>
                  </td>

                  {/* Applied Date */}
                  <td className="px-6 py-4 w-36">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-700 font-medium text-sm whitespace-nowrap">{formatDate(coupon.appliedDate)}</span>
                    </div>
                  </td>

                  {/* Travel Date */}
                  <td className="px-6 py-4 w-36">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-700 font-medium text-sm whitespace-nowrap">{formatDate(coupon.travelDate)}</span>
                    </div>
                  </td>

                  {/* Ticket Number */}
                  <td className="px-6 py-4 w-36">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                      <span className="text-gray-700 font-mono font-medium text-sm whitespace-nowrap">{coupon.ticketNumber || 'N/A'}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 w-28">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border whitespace-nowrap ${getStatusColorClasses(coupon.status)}`}>
                      <span className={`w-2 h-2 rounded-full ${getStatusDotColor(coupon.status)}`}></span>
                      {coupon.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-8 py-6 border-t border-gray-100/50 bg-gradient-to-r from-gray-50/50 to-white/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              Showing <span className="font-semibold">{appliedCoupons.length}</span> applied coupon{appliedCoupons.length !== 1 ? 's' : ''}
            </div>
            
            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-600 whitespace-nowrap">
                Total Savings: <span className="font-bold text-emerald-600 text-base">
                  Rs. {appliedCoupons.reduce((total, coupon) => total + (coupon.rebateAmount || 0), 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {appliedCoupons.length === 0 && (
        <div className="text-center py-16">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mt-6 mb-2">
            No Applied Coupons
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            You haven't applied any discount coupons yet. Start booking and save with our amazing discount offers!
          </p>
        </div>
      )}
    </div>
  );
};

export default Discounts;
