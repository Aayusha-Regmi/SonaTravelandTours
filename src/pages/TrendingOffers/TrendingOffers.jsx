import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import API_URLS from '../../config/api';
import FloatingActionBar from '../../components/common/FloatingActionBar';
import { useSocialActions } from '../../hooks/useSocialActions';

const TrendingOffers = () => {
	const { isVisible, socialActions } = useSocialActions();
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

	const handleCopy = async (code, idx) => {
		try {
			// Check if the modern Clipboard API is available
			if (navigator.clipboard && window.isSecureContext) {
				await navigator.clipboard.writeText(code);
			} else {
				// Fallback method for older browsers or non-secure contexts
				const textArea = document.createElement('textarea');
				textArea.value = code;
				textArea.style.position = 'fixed';
				textArea.style.left = '-999999px';
				textArea.style.top = '-999999px';
				document.body.appendChild(textArea);
				textArea.focus();
				textArea.select();
				
				// For mobile devices, ensure the text is selected
				if (textArea.setSelectionRange) {
					textArea.setSelectionRange(0, code.length);
				}
				
				document.execCommand('copy');
				document.body.removeChild(textArea);
			}
			
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
		} catch (error) {
			console.error('Failed to copy text: ', error);
			
			// Additional fallback - create a temporary input element
			try {
				const input = document.createElement('input');
				input.type = 'text';
				input.value = code;
				input.style.position = 'absolute';
				input.style.left = '-9999px';
				input.style.opacity = '0';
				document.body.appendChild(input);
				
				input.focus();
				input.select();
				input.setSelectionRange(0, code.length);
				
				const successful = document.execCommand('copy');
				document.body.removeChild(input);
				
				if (successful) {
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
				} else {
					throw new Error('Copy command failed');
				}
			} catch (fallbackError) {
				console.error('Fallback copy also failed: ', fallbackError);
				toast.error('Unable to copy. Please copy manually: ' + code, {
					position: "top-right",
					autoClose: 4000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});
			}
		}
	};

	return (
		<>
			<Header />
			{/* Hero Section with Modern Gradient */}
			<section className="relative pt-20 sm:pt-24 md:pt-32 pb-10 sm:pb-16 md:pb-20 overflow-hidden min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50/30">
				{/* Animated Background Elements - Responsive */}
				<div className="absolute inset-0">
					<div className="absolute top-10 sm:top-20 left-4 sm:left-20 w-48 h-48 sm:w-96 sm:h-96 bg-gradient-to-r from-blue-200/20 to-indigo-300/20 rounded-full blur-3xl animate-pulse"></div>
					<div className="absolute top-1/4 sm:top-1/3 right-4 sm:right-20 w-40 h-40 sm:w-80 sm:h-80 bg-gradient-to-r from-purple-200/30 to-pink-300/30 rounded-full blur-3xl animate-bounce" style={{animationDelay: '1s'}}></div>
					<div className="absolute bottom-1/3 sm:bottom-1/4 left-1/6 sm:left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-r from-emerald-200/25 to-teal-300/25 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
					<div className="absolute bottom-10 sm:bottom-20 right-1/4 sm:right-1/3 w-36 h-36 sm:w-72 sm:h-72 bg-gradient-to-r from-orange-200/20 to-amber-300/20 rounded-full blur-3xl animate-bounce" style={{animationDelay: '3s'}}></div>
				</div>

				<div className="relative z-10 container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
					{/* Section Header - Responsive */}
					<div className="text-center mb-10 sm:mb-16 md:mb-20 relative">
						<div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8 border border-blue-200/50 backdrop-blur-sm">
							<span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></span>
							<span className="text-blue-600 font-semibold text-xs sm:text-sm uppercase tracking-wide">Special Offers</span>
						</div>
						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6 tracking-tight leading-tight px-2">
							Trending Offers
						</h1>
						<p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-medium px-4">
							Discover exclusive deals and special discounts crafted just for you. 
							<span className="block mt-2 text-sm sm:text-base md:text-lg text-gray-500">Save more on your next adventure with our limited-time offers!</span>
						</p>
					</div>

					{/* First Booking Premium Card - Responsive */}
					<div className="mb-12 sm:mb-16 md:mb-20">
						{isLoadingOffers ? (
							<div className="relative bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl p-1 shadow-2xl animate-pulse">
								<div className="bg-white/95 backdrop-blur-xl rounded-[15px] sm:rounded-[22px] p-4 sm:p-6 lg:p-8 xl:p-12">
									<div className="flex flex-col lg:flex-row items-center justify-between">
										<div className="flex-1 lg:pr-12 w-full">
											<div className="h-6 sm:h-8 bg-gray-200 rounded-lg mb-3 sm:mb-4 w-32 sm:w-48"></div>
											<div className="h-8 sm:h-12 bg-gray-200 rounded-lg mb-4 sm:mb-6 w-48 sm:w-72"></div>
											<div className="h-4 sm:h-6 bg-gray-200 rounded mb-3 sm:mb-4 w-40 sm:w-56"></div>
											<div className="h-10 sm:h-14 bg-gray-200 rounded-2xl w-48 sm:w-64"></div>
										</div>
										<div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gray-200 rounded-2xl mt-6 sm:mt-8 lg:mt-0"></div>
									</div>
								</div>
							</div>
						) : firstBookingOffer ? (
							<div className="relative bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl p-1 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
								{/* Exclusive Badge - Responsive */}
								<div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-20">
									<div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 sm:px-6 py-1 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-lg animate-bounce border-2 border-white/50">
										🌟 EXCLUSIVE OFFER
									</div>
								</div>

								<div className="bg-white/95 backdrop-blur-xl rounded-[15px] sm:rounded-[22px] p-4 sm:p-6 lg:p-8 xl:p-12 relative overflow-hidden">
									{/* Background Pattern */}
									<div className="absolute inset-0 opacity-5">
										<div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full transform translate-x-16 sm:translate-x-32 -translate-y-16 sm:-translate-y-32"></div>
									</div>

									<div className="flex flex-col lg:flex-row items-center justify-between relative z-10">
										<div className="flex-1 lg:pr-8 xl:pr-12 w-full">
											<div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
												<div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
													<span className="text-lg sm:text-xl md:text-2xl">🆕</span>
												</div>
												<div className="flex-1">
													<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
														First Booking Special
													</h2>
													<p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium">Welcome aboard discount</p>
												</div>
											</div>

											<div className="mb-6 sm:mb-8">
												<div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-transparent bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text mb-2">
													{firstBookingOffer.discountAmount > 0 ? `Rs. ${firstBookingOffer.discountAmount} OFF` : 
													 firstBookingOffer.discountUpperLimit > 0 ? `Up to Rs. ${firstBookingOffer.discountUpperLimit} OFF` : 'Special Discount'}
												</div>
												<p className="text-sm sm:text-base text-gray-600 leading-relaxed">
													{firstBookingOffer.description || 'Get an exclusive discount on your very first booking with Sona Travel. Start your journey with savings!'}
												</p>
												<div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs sm:text-sm text-gray-500">
													<svg className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
													</svg>
													<span className="break-words">Valid until {new Date(firstBookingOffer.couponExpDate).toLocaleDateString('en-US', { 
														year: 'numeric', 
														month: 'long', 
														day: 'numeric' 
													})}</span>
												</div>
											</div>

											<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
												<div className="flex items-center bg-gray-100 rounded-xl sm:rounded-2xl px-3 sm:px-6 py-2 sm:py-4 border-2 border-dashed border-gray-300 flex-1 sm:flex-none">
													<span className="text-lg sm:text-xl md:text-2xl font-black text-gray-800 tracking-wider break-all select-all">
														{firstBookingOffer.couponCode}
													</span>
													{copiedIdx === -1 && (
														<svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 ml-2 animate-bounce flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
														</svg>
													)}
												</div>
												<button
													onClick={() => handleCopy(firstBookingOffer.couponCode, -1)}
													className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl font-bold shadow-lg hover:shadow-xl transform active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base touch-manipulation"
													type="button"
												>
													{copiedIdx === -1 ? (
														<>
															<svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
															</svg>
															<span>Copied!</span>
														</>
													) : (
														<>
															<svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<rect x="9" y="9" width="13" height="13" rx="2"/>
																<path d="M5 15V5a2 2 0 0 1 2-2h10"/>
															</svg>
															<span>Copy Code</span>
														</>
													)}
												</button>
											</div>
										</div>

										<div className="mt-6 sm:mt-8 lg:mt-0 lg:ml-6 xl:ml-8 flex-shrink-0">
											<div className="relative">
												<div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 bg-gradient-to-br from-emerald-100 to-blue-100 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl border border-white/50">
													<img 
														src="/images/img_group_green_600.svg" 
														alt="First Booking Offer" 
														className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 object-contain drop-shadow-xl" 
													/>
												</div>
												<div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-xl shadow-lg animate-pulse">
													🎁
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						) : null}
					</div>

					{/* Offers Grid - Responsive */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
						{isLoadingOffers ? (
							Array.from({ length: 6 }).map((_, index) => (
								<div key={index} className="group animate-pulse">
									<div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
										<div className="h-32 sm:h-40 bg-gray-200"></div>
										<div className="p-3 sm:p-5">
											<div className="h-3 bg-gray-200 rounded mb-2 w-16"></div>
											<div className="h-4 sm:h-5 bg-gray-200 rounded mb-2 w-24 sm:w-28"></div>
											<div className="h-3 sm:h-4 bg-gray-200 rounded mb-3 w-16 sm:w-20"></div>
											<div className="h-8 sm:h-12 bg-gray-200 rounded mb-4"></div>
											<div className="h-8 sm:h-10 bg-gray-200 rounded-xl"></div>
										</div>
									</div>
								</div>
							))
						) : offers.length > 0 ? (
							offers.map((offer, idx) => {
								const displayOffer = {
									title: offer.title,
									subtitle: offer.discountAmount > 0 ? `Rs. ${offer.discountAmount} OFF` : `Up to Rs. ${offer.discountUpperLimit} OFF`,
									promo: offer.couponCode,
									image: offer.couponImageUrl || '/images/img_bestplacestovsitinkathmandunepal71683x1024_1_487x388.png',
									type: offer.couponType?.toLowerCase() || 'special offer',
								};

								return (
									<div key={offer.couponId} className="group hover:scale-105 transition-all duration-300 h-full">
										<div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 relative h-full flex flex-col">
											{/* Hot Badge - Responsive */}
											<div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold shadow-lg">
												🔥 HOT
											</div>

											{/* Image - Responsive Fixed Height */}
											<div className="h-32 sm:h-40 overflow-hidden relative flex-shrink-0">
												<img
													src={displayOffer.image}
													alt={displayOffer.title}
													className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
													onError={(e) => {
														e.target.src = '/images/img_bestplacestovsitinkathmandunepal71683x1024_1_487x388.png';
													}}
												/>
												<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
											</div>

											{/* Content - Responsive Compact */}
											<div className="p-3 sm:p-4 flex flex-col flex-1">
												<div className="mb-2 sm:mb-3">
													<span className="inline-block bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-1 sm:mb-2">
														{displayOffer.type}
													</span>
													<h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 leading-tight line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
														{displayOffer.title}
													</h3>
													<div className="text-sm sm:text-base font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
														{displayOffer.subtitle}
													</div>
												</div>

												<p className="text-gray-600 mb-2 sm:mb-3 line-clamp-2 leading-relaxed text-xs min-h-[2rem] sm:min-h-[2.5rem]">
													{offer.description || 'Special discount offer for limited time. Book now and save more on your journey!'}
												</p>

												<div className="flex items-center text-xs text-gray-500 mb-2 sm:mb-3 gap-1">
													<svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
													</svg>
													<span className="truncate">Valid until {new Date(offer.couponExpDate).toLocaleDateString('en-US', { 
														year: 'numeric', 
														month: 'short', 
														day: 'numeric' 
													})}</span>
												</div>

												{/* Copy Section - Responsive Compact */}
												<div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-gray-200 mt-auto">
													<div className="flex items-center justify-between gap-2">
														<div className="flex-1 min-w-0">
															<span className="text-xs text-gray-500 font-medium">Promo Code</span>
															<div className="flex items-center gap-1 mt-0.5 sm:mt-1">
																<span className="text-xs sm:text-sm font-black text-gray-900 tracking-wider truncate select-all">
																	{displayOffer.promo}
																</span>
																{copiedIdx === idx && (
																	<svg className="w-3 h-3 text-green-500 animate-bounce flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
																	</svg>
																)}
															</div>
														</div>
														<button
															onClick={() => handleCopy(displayOffer.promo, idx)}
															className={`px-2 sm:px-3 py-2 sm:py-1.5 rounded-md sm:rounded-lg font-bold transition-all duration-200 transform active:scale-95 text-xs flex-shrink-0 touch-manipulation min-h-[32px] sm:min-h-[28px] ${
																copiedIdx === idx 
																	? 'bg-green-500 text-white shadow-lg' 
																	: 'bg-blue-500 hover:bg-blue-600 text-white shadow-md hover:shadow-lg'
															}`}
															type="button"
														>
															{copiedIdx === idx ? 'Copied!' : 'Copy'}
														</button>
													</div>
												</div>
											</div>

											{/* Decorative Elements - Responsive */}
											<div className="absolute top-2 sm:top-3 right-2 sm:right-3 text-sm sm:text-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300">
												🎯
											</div>
										</div>
									</div>
								);
							})
						) : (
							<div className="col-span-full flex flex-col items-center justify-center py-12 sm:py-16">
								<div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-lg text-center max-w-sm mx-auto">
									<div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
										<svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
									</div>
									<h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">No Offers Available</h3>
									<p className="text-gray-600 leading-relaxed text-sm">
										We're working on bringing you amazing deals. Check back soon for exclusive offers and discounts!
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</section>
			<Footer />
			<FloatingActionBar
				isVisible={isVisible}
				socialActions={socialActions}
			/>
		</>
	);
};

export default TrendingOffers;
