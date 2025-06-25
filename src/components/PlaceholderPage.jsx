import React from 'react';
import Header from './common/Header';
import Footer from './common/Footer';

const PlaceholderPage = ({ title, description }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex items-center justify-center py-20">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                 Coming Soon - This feature is under development
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PlaceholderPage;
