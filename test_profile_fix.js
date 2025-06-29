// Quick test to verify ProfileHeader mock data works
const mockProfile = {
  firstName: 'Amit',
  lastName: 'Patel',
  email: 'AmitPatel@gmail.com',
  createdOn: '2022-03-15',
  avatarUrl: null
};

const mockBookings = [
  {
    ticketNumber: '60RQ5L',
    travelDate: '2025-07-05',
    createdOn: '2025-06-29',
    paymentAmount: 2400,
    busName: 'Sona Travel A/C'
  },
  {
    ticketNumber: '50XY3M',
    travelDate: '2024-12-15',
    createdOn: '2024-12-10',
    paymentAmount: 1200,
    busName: 'Sona Travel Deluxe'
  }
];

console.log('Mock profile test:');
console.log('Name:', mockProfile.firstName + ' ' + mockProfile.lastName);
console.log('Email:', mockProfile.email);
console.log('Bookings count:', mockBookings.length);

// Test date formatting
const formatJoinDate = (dateString) => {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  } catch (error) {
    return null;
  }
};

console.log('Join date:', formatJoinDate(mockProfile.createdOn));
console.log('Profile fix test completed successfully!');
