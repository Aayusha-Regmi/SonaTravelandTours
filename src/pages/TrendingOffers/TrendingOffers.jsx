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
		type: 'year',
	},
	{
		title: 'Biggest Discount',
		subtitle: 'Up to 20%!',
		promo: 'Sona12345',
		image: '/images/img_busroadgenerativeai22087319731_1.png',
		badge: '🔥',
		type: 'big',
	},
	{
		title: 'Maha Shivratri Festival',
		subtitle: '20% Discount',
		promo: 'Sona12345',
		image: '/images/img_848280_1.png',
		badge: '🕉️',
		type: 'festival',
	},
	{
		title: 'Maha Shivratri Festival',
		subtitle: '20% Discount',
		promo: 'Sona12345',
		image: '/images/img_70ic901408727_1.png',
		badge: '🌸',
		type: 'festival',
	},
	{
		title: 'Manson Offer',
		subtitle: '15% Discount',
		promo: 'MANSON15',
		image: '/images/img_70ic901408727_2.png',
		badge: '🌧️',
		type: 'manson',
	},
	{
		title: 'UNLOCK A YEAR OF SAVINGS',
		subtitle: 'Up to 10% Discount',
		promo: 'Sona12345',
		image: '/images/img_bestplacestovsitinkathmandunepal71683x1024_1.png',
		badge: '🎁',
		type: 'year',
	},
	{
		title: 'Maha Shivratri Festival',
		subtitle: '20% Discount',
		promo: 'Sona12345',
		image: '/images/img_0abbf7cdb76b927242203afc7b581e30_1.png',
		badge: '✨',
		type: 'festival',
	},
	{
		title: 'Biggest Discount',
		subtitle: 'Up to 20%!',
		promo: 'Sona12345',
		image: '/images/img_frame_1000005189_1.png',
		badge: '💥',
		type: 'big',
	},
	{
		title: 'Biggest Discount',
		subtitle: 'Up to 20%!',
		promo: 'Sona12345',
		image: '/images/img_frame_1000005191.svg',
		badge: '⭐',
		type: 'big',
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
								<div className="text-lg md:text-xl font-semibold text-green-900 mb-2">Get <span className="text-green-600 font-extrabold">25% OFF</span> on Your First Ride!</div>
								<div className="flex items-center gap-3 mt-2">
									<span className={`relative px-6 py-3 rounded-full bg-white/80 backdrop-blur-xl border-2 border-green-300 font-extrabold tracking-wider text-xl text-green-700 shadow-inner animate-pulse flex items-center ${copiedIdx === -1 ? 'text-green-600 border-green-400/80 bg-green-50/80' : ''}`}>
										SONA-FIRST25
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
					{/* Offers Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-12">
						{offers.map((offer, idx) => (
							<div
								key={idx}
								className={`relative rounded-2xl overflow-hidden shadow-xl border border-gray-500/30 flex flex-col h-[420px] min-h-[420px] group
        ${offer.type === 'festival' ? 'bg-gradient-to-br from-pink-100/80 to-yellow-100/80' : ''}
        ${offer.type === 'big' ? 'bg-gradient-to-br from-orange-100/80 to-pink-100/80' : ''}
        ${offer.type === 'year' ? 'bg-gradient-to-br from-blue-100/80 to-emerald-100/80' : ''}
        ${offer.type === 'manson' ? 'bg-gradient-to-br from-blue-200/80 to-green-100/80' : ''}
        ${!offer.type ? 'bg-gradient-to-br from-white/80 to-blue-50/80' : ''}`}
							>
								{/* HOT! Badge */}
								<span className="absolute top-4 left-4 z-20 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-bold shadow-lg tracking-widest animate-pulse select-none">
									HOT!
								</span>
								{/* Image */}
								<div className="w-full h-40 overflow-hidden flex-shrink-0">
									<img
										src={offer.image}
										alt={offer.title}
										className="w-full h-full object-cover object-center rounded-t-2xl"
									/>
								</div>
								{/* Card Content */}
								<div className="flex flex-col flex-1 justify-between px-7 py-6 bg-white/80">
									<div>
										<span className="block text-gray-400 text-sm font-semibold mb-1 uppercase tracking-wide">
											{offer.title.includes('Maha Shivratri') ? 'Maha Shivratri' : offer.title.includes('UNLOCK') ? 'UNLOCK A YEAR OF' : ''}
										</span>
										<span className="block text-gray-900 text-2xl font-extrabold mb-1 leading-tight">
											{offer.title}
										</span>
										<span className="block text-orange-500 text-lg font-bold mb-4">
											{offer.subtitle}
										</span>
									</div>
									<div className="mt-auto">
										<div className="flex items-center justify-between bg-blue-50/80 rounded-xl px-4 py-3 mt-2 border border-blue-200/40">
											<span className="text-gray-700 text-base font-semibold">
												Promo Code:
												<span className="ml-2 font-bold text-gray-900">{offer.promo}</span>
											</span>
											<button
												type="button"
												className={`ml-4 px-5 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/60 ${copiedIdx === idx ? 'bg-green-500' : ''}`}
												onClick={() => handleCopy(offer.promo, idx)}
												aria-label={`Copy promo code ${offer.promo}`}
											>
												{copiedIdx === idx ? 'Copied!' : 'Copy'}
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<Footer />
			</section>
		</>
	);
};

export default TrendingOffers;
