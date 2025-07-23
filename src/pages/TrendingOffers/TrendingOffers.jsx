import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import API_URLS from '../../config/api';
import FloatingActionBar from '../Home/ComponentHome/UI/FloatingActionBar';
import { useSocialActions } from '../../hooks/useSocialActions';

const TrendingOffers = () => {
	const { handleSocialClick } = useSocialActions();
	const [offers, setOffers] = useState([]);
	const [firstBookingOffer, setFirstBookingOffer] = useState(null);
	const [isLoadingOffers, setIsLoadingOffers] = useState(true);
	const [copiedIdx, setCopiedIdx] = useState(null);

	useEffect(() => {
		// Fetch offers from API
		const fetchOffers = async () => {
			try {
				setIsLoadingOffers(true);
				console.log('Fetching offers from:', API_URLS.COUPONS.GET_COUPONS);
				
				const response = await fetch(API_URLS.COUPONS.GET_COUPONS);
				console.log('Response status:', response.status);
				
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				
				const data = await response.json();
				console.log('Full API response:', data);
				
				if (data.success && data.data) {
					console.log('Raw offers data:', data.data);
					console.log('Number of offers received:', data.data.length);
					
					// Find SONAFIRST offer for first booking card
					const firstBookingCoupon = data.data.find(offer => 
						offer.couponCode === 'SONAFIRST'
					);
					
					if (firstBookingCoupon) {
						console.log('Found SONAFIRST coupon:', firstBookingCoupon);
						setFirstBookingOffer(firstBookingCoupon);
					} else {
						console.log('First Booking coupon not found in API response');
						// Fallback data
						setFirstBookingOffer({
							couponCode: 'SONAFIRST',
							title: 'GET DISCOUNTS ON YOUR FIRST BOOKING',
							discountAmount: 100,
							couponExpDate: '2025-01-11T00:00:00.000Z'
						});
					}
					
					// Filter active offers only (excluding SONAFIRST for the grid)
					const now = new Date();
					console.log('Current date:', now.toISOString());
					
					const activeOffers = data.data.filter(offer => {
						const initDate = new Date(offer.couponInitDate);
						const expDate = new Date(offer.couponExpDate);
						
						console.log(`Offer ${offer.couponCode}:`, {
							initDate: initDate.toISOString(),
							expDate: expDate.toISOString(),
							isActive: now >= initDate && now <= expDate
						});
						
						// Exclude SONAFIRST and SonaTest from grid
						if (offer.couponCode === 'SonaTest') {
							return false;
						}
						
						// Show all other offers for now (you can enable filtering later)
						return true; // Change to: return now >= initDate && now <= expDate;
					});
					
					console.log('Active offers after filtering:', activeOffers);
					console.log('Number of active offers:', activeOffers.length);
					
					setOffers(activeOffers);
				} else {
					console.log('API response structure issue:', data);
					setOffers([]);
					setFirstBookingOffer(null);
				}
			} catch (error) {
				console.error('Error fetching offers:', error);
				setOffers([]);
				setFirstBookingOffer(null);
			} finally {
				setIsLoadingOffers(false);
			}
		};

		fetchOffers();
	}, []);

	const handleCopy = (code, idx) => {
		navigator.clipboard.writeText(code);
		setCopiedIdx(idx);
		setTimeout(() => setCopiedIdx(null), 1200);
		toast.success(`Copied "${code}" to clipboard!`, {
			position: "top-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
		});
	};

	return (
		<>
			<Header />
			{/* Hero Section with Animated Pastel Blobs (same as About Us) */}
			<section className="relative pt-32 pb-4 overflow-hidden min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-emerald-50/40">
				{/* Animated Background Elements */}
				<div className="absolute inset-0">
					<div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-100/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse"></div>
					<div className="absolute top-1/3 right-20 w-64 h-64 bg-gradient-to-r from-orange-100/40 to-amber-200/40 rounded-full blur-3xl animate-bounce" style={{animationDelay: '1s'}}></div>
					<div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-100/25 to-teal-200/25 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
					<div className="absolute bottom-20 right-1/3 w-56 h-56 bg-gradient-to-r from-purple-100/30 to-pink-200/30 rounded-full blur-3xl animate-bounce" style={{animationDelay: '3s'}}></div>
				</div>
				<div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto">
					{/* Section Header */}
					<div className="text-center mb-14 relative">
						<h2 className="text-5xl font-black bg-gradient-to-r from-gray-800 via-blue-600 to-orange-600 bg-clip-text text-transparent mb-2 drop-shadow-lg tracking-tight font-display">
							Trending Offers for You
						</h2>
						<p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto font-medium flex items-center justify-center gap-2 mt-2">
							Explore the Latest Discounts and Special Deals Tailored Just for You. Don&apos;t Miss Out on Amazing Savings for Your Next Journey!
						</p>
					</div>
					{/* 1st Time Booking Big Card */}
					<div className="mb-12">
						{isLoadingOffers ? (
							// Loading skeleton for first booking card
							<div className="relative flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-green-200 via-emerald-100 to-yellow-100 rounded-3xl shadow-2xl border-4 border-green-300/60 px-8 py-10 md:py-14 md:px-16 overflow-visible animate-pulse">
								<div className="flex flex-col items-center md:items-start z-10">
									<div className="mb-4 md:mb-6 flex items-center gap-3 relative">
										<div className="w-16 h-16 bg-green-300 rounded-full"></div>
										<div className="h-8 bg-green-300 rounded w-48"></div>
									</div>
									<div className="h-6 bg-green-300 rounded mb-2 w-32"></div>
									<div className="h-5 bg-green-300 rounded mb-4 w-64"></div>
									<div className="h-4 bg-green-300 rounded mb-4 w-40"></div>
									<div className="h-12 bg-green-300 rounded-full w-48"></div>
								</div>
								<div className="hidden md:block ml-10 z-10">
									<div className="w-40 h-40 bg-green-300 rounded-2xl"></div>
								</div>
							</div>
						) : firstBookingOffer ? (
							<div className="relative flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-green-200 via-emerald-100 to-yellow-100 rounded-3xl shadow-2xl border-4 border-green-300/60 px-8 py-10 md:py-14 md:px-16 overflow-visible animate-glow-card">
								{/* Overlay EXCLUSIVE Ribbon - overlaying the card, not inside padding */}
								<div className="absolute -top-7 left-1/2 -translate-x-1/2 z-40 rotate-[-8deg]">
									<span className="inline-block px-8 py-2 bg-gradient-to-r from-green-400 via-yellow-300 to-emerald-400 text-white font-bold text-base rounded-2xl shadow-2xl ring-2 ring-green-200/60 tracking-widest drop-shadow-xl animate-pulse">
										EXCLUSIVE
									</span>
								</div>
								{/* Animated Glow */}
								<div className="absolute inset-0 rounded-3xl pointer-events-none z-0 animate-glow bg-gradient-to-br from-green-300/30 via-yellow-200/20 to-emerald-200/20 blur-2xl opacity-70"></div>
								{/* Badge and Illustration */}
								<div className="flex flex-col items-center md:items-start z-10">
									<div className="mb-4 md:mb-6 flex items-center gap-3 relative">
										<span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-green-400 via-yellow-400 to-emerald-400 text-white text-4xl font-extrabold shadow-2xl border-4 border-white/90 ring-4 ring-green-200/40 animate-bounce drop-shadow-xl z-10">
											🆕
										</span>
										<span className="text-2xl md:text-3xl font-bold text-green-700 drop-shadow-lg tracking-tight z-10">1st Booking Discount</span>
									</div>
									<div className='flex gap-4'>
									<div className="text-lg md:text-xl font-semibold text-green-900 mb-2">
										{firstBookingOffer.discountAmount > 0 ? ` Get Rs. ${firstBookingOffer.discountAmount} OFF on Your First Ride.` : 
										 firstBookingOffer.discountUpperLimit > 0 ? `Up to Rs. ${firstBookingOffer.discountUpperLimit} OFF` : 'Special Discount'}  
										 
									</div>
									
									<div className="text-sm text-green-700/80 mt-1">
										Valid till: {new Date(firstBookingOffer.couponExpDate).toLocaleDateString('en-US', { 
											year: 'numeric', 
											month: 'short', 
											day: 'numeric' 
										})}
									</div>
									</div>
									<div className="flex items-center gap-3 mt-2">
										<span className={`relative px-6 py-3 rounded-full bg-white/80 backdrop-blur-xl border-2 border-green-300 font-extrabold tracking-wider text-xl text-green-700 shadow-inner animate-pulse flex items-center ${copiedIdx === -1 ? 'text-green-600 border-green-400/80 bg-green-50/80' : ''}`}>
											{firstBookingOffer.couponCode}
											<span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-green-200/60 to-transparent opacity-0 group-hover:opacity-80 animate-shimmer pointer-events-none" />
											{copiedIdx === -1 && (
												<span className="ml-2 text-green-600 animate-bounce">
													<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
												</span>
											)}
										</span>
										<button
											type="button"
											className={`bg-gradient-to-r from-green-400 via-yellow-400 to-emerald-400 text-white rounded-full p-3 shadow-lg border-2 border-white/80 hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400/60 ${copiedIdx === -1 ? 'bg-green-500 border-green-300' : ''}`}
											onClick={() => handleCopy(firstBookingOffer.couponCode, -1)}
											aria-label={`Copy promo code ${firstBookingOffer.couponCode}`}
										>
											{copiedIdx === -1 ? (
												<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
											) : (
												<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
											)}
										</button>
									</div>
									<div className="mt-4 text-green-700/80 text-base md:text-lg flex items-center gap-2">
										<span className="text-2xl">🎁</span> 
										<span>{firstBookingOffer.description || 'Use this code on your very first booking and enjoy a special welcome from Sona Travel!'}</span>
									</div>
								</div>
								{/* Illustration or Icon */}
								<div className="hidden md:block ml-10 z-10">
									<div className="rounded-2xl border-2 border-green-200 shadow-xl bg-white/70 p-2">
										<img src="/images/img_group_green_600.svg" alt="First Booking" className="w-40 h-40 object-contain drop-shadow-2xl" />
									</div>
								</div>
							</div>
						) : (
							// Hide first booking card if no SONAFIRST offer found
							<div className="hidden"></div>
						)}
					</div>
					{/* Offers Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-12">
						{isLoadingOffers ? (
							// Loading skeleton
							Array.from({ length: 9 }).map((_, index) => (
								<div 
									key={index}
									className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-300/40 flex flex-col h-[420px] min-h-[420px] animate-pulse bg-gradient-to-br from-white/90 to-blue-50/80"
								>
									<div className="w-full h-40 bg-gray-200 rounded-t-2xl"></div>
									<div className="flex flex-col flex-1 justify-between px-7 py-6 bg-white/80 rounded-b-2xl">
										<div>
											<div className="h-3 bg-gray-200 rounded mb-2 w-20"></div>
											<div className="h-6 bg-gray-200 rounded mb-2 w-32"></div>
											<div className="h-5 bg-gray-200 rounded mb-4 w-24"></div>
										</div>
										<div className="mt-auto">
											<div className="h-12 bg-gray-200 rounded-xl"></div>
										</div>
									</div>
								</div>
							))
						) : offers.length > 0 ? (
							offers.map((offer, idx) => {
								// Map API data to display format
								const displayOffer = {
									title: offer.title,
									subtitle: offer.discountAmount > 0 ? `Rs. ${offer.discountAmount} OFF` : `Up to Rs. ${offer.discountUpperLimit} OFF`,
									promo: offer.couponCode,
									image: offer.couponImageUrl || '/images/img_bestplacestovsitinkathmandunepal71683x1024_1_487x388.png',
									badge: '🔥',
									type: offer.couponType?.toLowerCase() || 'offer',
								};

								let bgClass = '';
								if (displayOffer.type.includes('festival')) {
									bgClass = 'bg-gradient-to-br from-pink-100/90 via-yellow-100/80 to-orange-100/70';
								} else if (displayOffer.type.includes('big') || displayOffer.type.includes('discount')) {
									bgClass = 'bg-gradient-to-br from-orange-200/90 via-pink-100/80 to-yellow-100/70';
								} else if (displayOffer.type.includes('year') || displayOffer.type.includes('annual')) {
									bgClass = 'bg-gradient-to-br from-blue-100/90 via-emerald-100/80 to-white/80';
								} else if (displayOffer.type.includes('season') || displayOffer.type.includes('monsoon')) {
									bgClass = 'bg-gradient-to-br from-blue-200/90 via-green-100/80 to-emerald-100/70';
								} else {
									bgClass = 'bg-gradient-to-br from-white/90 to-blue-50/80';
								}

								return (
									<div
										key={offer.couponId}
										className={`relative rounded-2xl overflow-hidden shadow-xl border border-gray-300/40 flex flex-col h-[420px] min-h-[420px] group ${bgClass}`}
									>
										{/* HOT! Badge */}
										<span className="absolute top-4 left-4 z-20 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-bold shadow-lg tracking-widest animate-pulse select-none">
											HOT!
										</span>
										{/* Image */}
										<div className="w-full h-40 overflow-hidden flex-shrink-0 rounded-t-2xl">
											<img
												src={displayOffer.image}
												alt={displayOffer.title}
												className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
												onError={(e) => {
													e.target.src = '/images/img_bestplacestovsitinkathmandunepal71683x1024_1_487x388.png';
												}}
											/>
										</div>
										{/* Card Content */}
										<div className="flex flex-col flex-1 justify-between px-7 py-6 bg-white/80 rounded-b-2xl">
											<div>
												<span className="block text-gray-400 text-xs font-semibold mb-1 uppercase tracking-widest">
													{displayOffer.type || 'Special Offer'}
												</span>
												<span className="block text-gray-900 text-2xl font-extrabold mb-1 leading-tight truncate">
													{displayOffer.title}
												</span>
												<span className="block text-orange-500 text-lg font-bold mb-4">
													{displayOffer.subtitle}
												</span>
												{/* Description */}
												<span className="block text-gray-600 text-sm mb-4 line-clamp-2">
													{offer.description}
												</span>
												{/* Expiration Date */}
												<span className="block text-gray-500 text-xs mb-2">
													Valid till: {new Date(offer.couponExpDate).toLocaleDateString('en-US', { 
														year: 'numeric', 
														month: 'short', 
														day: 'numeric' 
													})}
												</span>
											</div>
											<div className="mt-auto">
												<div className="flex items-center justify-between bg-blue-50/80 rounded-xl px-4 py-3 mt-2 border border-blue-200/40">
													<span className="text-gray-700 text-base font-semibold">
														Promo Code:
														<span className="ml-2 font-bold text-gray-900 tracking-wider">{displayOffer.promo}</span>
													</span>
													<button
														type="button"
														className={`ml-4 px-5 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/60 ${copiedIdx === idx ? 'bg-green-500' : ''}`}
														onClick={() => handleCopy(displayOffer.promo, idx)}
														aria-label={`Copy promo code ${displayOffer.promo}`}
													>
														{copiedIdx === idx ? 'Copied!' : 'Copy'}
													</button>
												</div>
											</div>
										</div>
										{/* Badge Icon */}
										{displayOffer.badge && (
											<span className="absolute top-4 right-4 text-3xl drop-shadow-lg select-none">
												{displayOffer.badge}
											</span>
										)}
									</div>
								);
							})
						) : (
							// No offers available
							<div className="col-span-full text-center py-12">
								<div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-300/40 shadow-xl">
									<div className="text-gray-600 text-xl mb-2">No available Offers, Stay Tuned</div>
								</div>
							</div>
						)}
					</div>
				</div>
				<Footer />
				<FloatingActionBar handleSocialClick={handleSocialClick} />
			</section>
		</>
	);
};

export default TrendingOffers;
