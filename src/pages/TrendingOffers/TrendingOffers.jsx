import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const offers = [
	{
		title: 'UNLOCK A YEAR OF SAVINGS',
		subtitle: 'Up to 10% Discount',
		promo: 'Sona12345',
		image: '/images/img_bestplacestovsitinkathmandunepal71683x1024_1_487x388.png',
		badge: '🎉',
	},
	{
		title: 'Biggest Discount',
		subtitle: 'Up to 20%!',
		promo: 'Sona12345',
		image: '/images/img_busroadgenerativeai22087319731_1.png',
		badge: '🔥',
	},
	{
		title: 'Maha Shivratri Festival',
		subtitle: '20% Discount',
		promo: 'Sona12345',
		image: '/images/img_848280_1.png',
		badge: '🕉️',
	},
	{
		title: 'Maha Shivratri Festival',
		subtitle: '20% Discount',
		promo: 'Sona12345',
		image: '/images/img_70ic901408727_1.png',
		badge: '🌸',
	},
	{
		title: 'Maha Shivratri Festival',
		subtitle: '20% Discount',
		promo: 'Sona12345',
		image: '/images/img_70ic901408727_2.png',
		badge: '🎊',
	},
	{
		title: 'UNLOCK A YEAR OF SAVINGS',
		subtitle: 'Up to 10% Discount',
		promo: 'Sona12345',
		image: '/images/img_bestplacestovsitinkathmandunepal71683x1024_1.png',
		badge: '🎁',
	},
	{
		title: 'Maha Shivratri Festival',
		subtitle: '20% Discount',
		promo: 'Sona12345',
		image: '/images/img_0abbf7cdb76b927242203afc7b581e30_1.png',
		badge: '✨',
	},
	{
		title: 'Biggest Discount',
		subtitle: 'Up to 20%!',
		promo: 'Sona12345',
		image: '/images/img_frame_1000005189_1.png',
		badge: '💥',
	},
	{
		title: 'Biggest Discount',
		subtitle: 'Up to 20%!',
		promo: 'Sona12345',
		image: '/images/img_frame_1000005191.svg',
		badge: '⭐',
	},
];

const TrendingOffers = () => {
	const [copiedIdx, setCopiedIdx] = useState(null);

	const handleCopy = (code, idx) => {
		navigator.clipboard.writeText(code);
		setCopiedIdx(idx);
		setTimeout(() => setCopiedIdx(null), 1200);
	};

	return (
		<>
			<Header />
			<div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-emerald-50/40 pb-16 pt-28 overflow-hidden">
				<div className="relative z-10 p-4 md:p-8 max-w-6xl mx-auto">
					{/* Redesigned Header/Intro Section */}
					<div className="text-center mb-14 relative">
						{/* Animated HOT DEALS Badge with Sparkles and Glow */}
						<div className="flex justify-center mb-4 relative">
							<div className="relative inline-block">
								<span className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-orange-500 via-pink-500 to-yellow-400 text-white text-3xl font-extrabold shadow-2xl border-4 border-white/80 ring-4 ring-orange-200/40 animate-bounce-slow select-none drop-shadow-[0_0_16px_rgba(255,186,73,0.7)]">
									HOT
									<span className="ml-2">🔥</span>
								</span>
								{/* Sparkles */}
								<span className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-300/80 rounded-full blur-md opacity-70 animate-pulse" />
								<span className="absolute -bottom-2 -left-2 w-4 h-4 bg-pink-300/70 rounded-full blur-sm opacity-60 animate-pulse delay-200" />
								<span className="absolute top-1/2 left-full -translate-y-1/2 ml-2 w-3 h-3 bg-orange-400/80 rounded-full blur-[2px] opacity-80 animate-ping" />
								{/* Extra sparkles for more festivity */}
								<span className="absolute -top-4 left-1/2 w-3 h-3 bg-pink-200/80 rounded-full blur-[1.5px] opacity-80 animate-pulse delay-300" />
								<span className="absolute bottom-0 right-1/2 w-2.5 h-2.5 bg-orange-200/80 rounded-full blur-[1.5px] opacity-80 animate-pulse delay-500" />
							</div>
						</div>
						{/* Glassmorphism Container with animated border */}
						<div className="inline-block bg-white/50 backdrop-blur-3xl rounded-3xl px-10 py-8 border border-gray-200/40 shadow-2xl hover:shadow-3xl transition-all duration-700 relative overflow-visible before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-r before:from-orange-300/30 before:via-pink-200/20 before:to-yellow-200/20 before:animate-borderShimmer before:z-[-1]">
							{/* Decorative Confetti */}
							<div className="absolute -top-6 left-1/4 w-8 h-8 bg-gradient-to-tr from-yellow-200 via-pink-200 to-orange-200 rounded-full blur-md opacity-60 animate-float" />
							<div className="absolute -bottom-6 right-1/4 w-10 h-10 bg-gradient-to-tr from-pink-200 via-orange-200 to-yellow-200 rounded-full blur-md opacity-50 animate-float delay-300" />
							<div className="absolute top-2 right-10 w-4 h-4 bg-orange-300/70 rounded-full blur-[2px] opacity-70 animate-pulse delay-200" />
							<div className="absolute bottom-2 left-10 w-3 h-3 bg-pink-300/70 rounded-full blur-[2px] opacity-70 animate-pulse delay-400" />
							<h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent mb-3 drop-shadow-lg tracking-tight">
								Trending Offers for You
							</h2>
							<p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto font-medium flex items-center justify-center gap-2">
								<span className="text-2xl">🎊</span>
								<span>Snag the hottest travel deals and exclusive discounts! <span className="font-bold text-orange-500">Book now</span> and celebrate savings on your next journey.</span>
								<span className="text-2xl">🥳</span>
							</p>
						</div>
					</div>

					{/* Unique 1st Booking Discount Card (before the grid) */}
					<div className="mb-12">
						<div className="relative flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-green-200 via-emerald-100 to-yellow-100 rounded-3xl shadow-2xl border-4 border-green-300/60 px-8 py-10 md:py-14 md:px-16 overflow-hidden animate-glow-card">
							{/* Floating Ribbon */}
							<div className="absolute -top-4 -left-4 z-20">
								<span className="inline-block px-6 py-2 bg-gradient-to-r from-green-400 via-yellow-300 to-emerald-400 text-white font-bold text-base rounded-2xl shadow-lg ring-2 ring-green-200/60 animate-bounce-slow tracking-widest">EXCLUSIVE</span>
							</div>
							{/* Animated Glow */}
							<div className="absolute inset-0 rounded-3xl pointer-events-none z-0 animate-glow bg-gradient-to-br from-green-300/30 via-yellow-200/20 to-emerald-200/20 blur-2xl opacity-70"></div>
							{/* Festive Confetti */}
							<div className="absolute inset-0 pointer-events-none z-0">
								{[...Array(18)].map((_, i) => (
									<span
										key={i}
										className="absolute rounded-full animate-pulse"
										style={{
											left: `${6 + (i * 7) % 90}%`,
											top: `${10 + (i % 5) * 15}%`,
											width: `${12 + (i % 3) * 6}px`,
											height: `${12 + (i % 2) * 8}px`,
											background: 'linear-gradient(135deg, #34d399 60%, #fbbf24 100%)',
											opacity: 0.13 + 0.09 * (i % 4),
											filter: 'blur(2px)',
											animationDelay: `${i * 0.13}s`,
										}}
									/>
								))}
							</div>
							{/* Badge and Illustration */}
							<div className="flex flex-col items-center md:items-start z-10">
								<div className="mb-4 md:mb-6 flex items-center gap-3 relative">
									{/* Confetti Burst Behind Badge */}
									<span className="absolute -left-6 -top-6 w-16 h-16 bg-gradient-to-tr from-yellow-200 via-green-200 to-emerald-200 rounded-full blur-2xl opacity-60 animate-pulse z-0"></span>
									<span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-green-400 via-yellow-400 to-emerald-400 text-white text-4xl font-extrabold shadow-2xl border-4 border-white/90 ring-4 ring-green-200/40 animate-bounce drop-shadow-xl z-10">
										🆕
									</span>
									<span className="text-2xl md:text-3xl font-bold text-green-700 drop-shadow-lg tracking-tight z-10">1st Booking Discount</span>
								</div>
								<div className="text-lg md:text-xl font-semibold text-green-900 mb-2">Get <span className="text-green-600 font-extrabold">25% OFF</span> on Your First Ride!</div>
								<div className="flex items-center gap-3 mt-2">
									<span className={`relative px-6 py-3 rounded-full bg-white/80 backdrop-blur-xl border-2 border-green-300 font-extrabold tracking-wider text-xl text-green-700 shadow-inner animate-pulse flex items-center ${copiedIdx === -1 ? 'text-green-600 border-green-400/80 bg-green-50/80' : ''}`}>
										SONA-FIRST25
										{/* Shimmer animation */}
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
										onClick={() => handleCopy('SONA-FIRST25', -1)}
										aria-label="Copy promo code SONA-FIRST25"
									>
										{copiedIdx === -1 ? (
											<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
										) : (
											<svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
										)}
									</button>
								</div>
								<div className="mt-4 text-green-700/80 text-base md:text-lg flex items-center gap-2">
									<span className="text-2xl">🎁</span> <span>Use this code on your very first booking and enjoy a special welcome from Sona Travel!</span>
								</div>
							</div>
							{/* Illustration or Icon */}
							<div className="hidden md:block ml-10 z-10">
								<div className="rounded-2xl border-2 border-green-200 shadow-xl bg-white/70 p-2">
									<img src="/images/img_group_green_600.svg" alt="First Booking" className="w-40 h-40 object-contain drop-shadow-2xl" />
								</div>
							</div>
						</div>
					</div>

					{/* Masonry/Patterned Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-12">
						{offers.map((offer, idx) => (
							<div
								key={idx}
								className="relative group rounded-3xl overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-white/60 via-orange-50/50 to-pink-50/50 hover:shadow-3xl hover:scale-[1.045] transition-all duration-500 flex flex-col h-[480px] min-h-[480px] border-[3px] border-transparent hover:border-orange-300/70 before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-orange-200/40 before:via-pink-200/30 before:to-yellow-100/20 before:blur-2xl before:opacity-90 before:pointer-events-none"
							>
								{/* Image with overlay and floating badge */}
								<div className="relative w-full h-56 md:h-60 overflow-hidden flex-shrink-0">
									<img
										src={offer.image}
										alt={offer.title}
										className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
									{offer.badge && (
										<div className="absolute -top-7 right-7 z-30">
											{/* Animated gradient ring around badge */}
											<span className="absolute -inset-2 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-400 to-orange-400 opacity-70 blur-[2px] animate-borderShimmer"></span>
											<span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-orange-400 via-pink-400 to-yellow-400 text-white text-3xl font-bold shadow-2xl border-4 border-white/90 ring-4 ring-orange-200/40 animate-bounce drop-shadow-xl relative">
												{offer.badge}
											</span>
										</div>
									)}
									{/* Decorative sparkle */}
									<div className="absolute left-5 bottom-5 w-8 h-8 bg-gradient-to-tr from-yellow-200/80 via-pink-200/60 to-orange-200/60 rounded-full blur-md opacity-70 animate-pulse"></div>
								</div>
								{/* Card Content */}
								<div className="relative z-10 px-8 py-7 flex flex-col gap-3 bg-white/60 backdrop-blur-3xl rounded-b-3xl shadow-xl flex-1 justify-end border-t border-orange-100/60">
									<div className="flex flex-col gap-1">
										<span className="text-gray-900 text-2xl md:text-3xl font-extrabold tracking-wide leading-tight mb-1 drop-shadow-sm">
											{offer.title}
										</span>
										<span className="text-orange-500 text-lg md:text-xl font-semibold mb-2">
											{offer.subtitle}
										</span>
									</div>
									<div className="flex items-center gap-2 mt-auto">
										<div className="relative flex items-center">
											<span className={`px-5 py-2 rounded-full bg-white/70 backdrop-blur-xl border border-orange-200/60 font-extrabold tracking-wider text-lg shadow-inner text-orange-500 group-hover:shadow-orange-200/60 transition-all duration-300 shimmer-promo relative ${copiedIdx === idx ? 'text-green-600 border-green-400/80 bg-green-50/80' : ''}`}>{offer.promo}
												{/* Shimmer animation */}
												<span className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-orange-200/60 to-transparent opacity-0 group-hover:opacity-80 animate-shimmer pointer-events-none" />
											</span>
											<button
												type="button"
												className={`absolute -right-7 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-400 text-white rounded-full p-2 shadow-lg border-2 border-white/80 hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400/60 ${copiedIdx === idx ? 'bg-green-500 border-green-300' : ''}`}
												onClick={() => handleCopy(offer.promo, idx)}
												aria-label={`Copy promo code ${offer.promo}`}
											>
												{copiedIdx === idx ? (
													<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
												) : (
													<svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
												)}
											</button>
										</div>
									</div>
								</div>
								{/* Soft shadow at bottom */}
								<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-gradient-to-t from-orange-200/60 via-pink-200/40 to-transparent rounded-b-3xl blur-lg opacity-60 pointer-events-none"></div>
								{/* Animated border shimmer */}
								<div className="pointer-events-none absolute inset-0 rounded-3xl border-4 border-transparent group-hover:border-orange-300/60 group-hover:animate-borderShimmer"></div>
								{/* Animated Confetti Overlay - now last and z-50 */}
								<div className="pointer-events-none absolute inset-0 z-50 flex flex-wrap items-start justify-start opacity-80">
									{[...Array(7)].map((_, i) => (
										<span
											key={i}
											className={`absolute rounded-full animate-pulse`}
											style={{
												left: `${10 + i * 12}%`,
												top: `${8 + (i % 3) * 18}%`,
												width: `${8 + (i % 2) * 6}px`,
												height: `${8 + (i % 2) * 6}px`,
												background: `linear-gradient(135deg, #fbbf24 60%, #f472b6 100%)`,
												opacity: 0.18 + 0.08 * (i % 3),
												filter: 'blur(1.5px)',
												animationDelay: `${i * 0.3}s`,
											}}
										/>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default TrendingOffers;
