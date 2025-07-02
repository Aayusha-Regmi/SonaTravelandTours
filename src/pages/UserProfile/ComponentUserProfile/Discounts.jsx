import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

const Discounts = ({ discounts = [] }) => {

  // Static data for demonstration
  const staticDiscounts = [
    {
      id: 1,
      name: "Holiday Discount",
      amount: "18%",
      date: "6/15/2024",
      promoCode: "Sona12345",
      status: "Active"
    },
    {
      id: 2,
      name: "Holiday Discount",
      amount: "18%",
      date: "6/15/2024",
      promoCode: "Sona12345",
      status: "Active"
    },
    {
      id: 3,
      name: "Holiday Discount",
      amount: "18%",
      date: "6/15/2024",
      promoCode: "Sona12345",
      status: "Expired"
    },
    {
      id: 4,
      name: "Holiday Discount",
      amount: "18%",
      date: "6/15/2024",
      promoCode: "Sona12345",
      status: "Expired"
    },
    {
      id: 5,
      name: "Holiday Discount",
      amount: "18%",
      date: "6/15/2024",
      promoCode: "Sona12345",
      status: "Expired"
    },
    {
      id: 6,
      name: "Holiday Discount",
      amount: "18%",
      date: "6/15/2024",
      promoCode: "Sona12345",
      status: "Expired"
    },
    {
      id: 7,
      name: "Holiday Discount",
      amount: "18%",
      date: "6/15/2024",
      promoCode: "Sona12345",
      status: "Expired"
    },
    {
      id: 8,
      name: "Holiday Discount",
      amount: "18%",
      date: "6/15/2024",
      promoCode: "Sona12345",
      status: "Expired"
    },
    {
      id: 9,
      name: "Holiday Discount",
      amount: "18%",
      date: "6/15/2024",
      promoCode: "Sona12345",
      status: "Expired"
    },
    {
      id: 10,
      name: "Holiday Discount",
      amount: "18%",
      date: "6/15/2024",
      promoCode: "Sona12345",
      status: "Expired"
    }
  ];

  const displayDiscounts = discounts.length > 0 ? discounts : staticDiscounts;

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
                <th className="px-6 py-4 text-left">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</span>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</span>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</span>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Promo Code</span>
                </th>
                <th className="px-6 py-4 text-left">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</span>
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-100/50">
              {displayDiscounts.map((discount, index) => (
                <tr 
                  key={discount.id} 
                  className="hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-indigo-50/30 transition-all duration-200"
                >
                  {/* Name */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{discount.name}</div>
                        <div className="text-xs text-gray-500">Special Offer</div>
                      </div>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-emerald-600">{discount.amount}</span>
                      <span className="text-sm text-gray-500 font-medium">OFF</span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-700 font-medium">{discount.date}</span>
                    </div>
                  </td>

                  {/* Promo Code */}
                  <td className="px-6 py-5">
                    <div className="bg-gradient-to-r from-gray-100 to-gray-50 border-2 border-dashed border-gray-300 rounded-lg px-3 py-2 inline-block">
                      <span className="font-mono font-bold text-gray-800 tracking-wider text-sm">
                        {discount.promoCode}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                      discount.status === 'Active' 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-red-100 text-red-700 border border-red-200'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        discount.status === 'Active' ? 'bg-green-400' : 'bg-red-400'
                      }`}></span>
                      {discount.status}
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
              Showing <span className="font-semibold">{displayDiscounts.length}</span> discount codes
            </div>
            
            <div className="flex items-center gap-2">
              <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200">
                Previous
              </button>
              <button className="px-3 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-all duration-200">
                1
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200">
                2
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {displayDiscounts.length === 0 && (
        <div className="text-center py-16">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mt-6 mb-2">
            No Discounts Available
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Start creating amazing discount offers for your customers. Great deals are just a click away!
          </p>
        </div>
      )}
    </div>
  );
};

export default Discounts;
