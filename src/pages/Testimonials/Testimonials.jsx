import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const Testimonials = () => {  const testimonials = [    {
      id: 1,
      name: "Mr. Jaleshwar Pandit",
      position: "Founder of Sona Group of Companies",
      image: "/images/jaleshwar.png",
      testimonial: "As founders of our company, we are united by a shared mission to revolutionise the travel industry. Our collective expertise and shared vision empower us to navigate challenges, seize opportunities, and continuously strive for growth and improvement. I am proud to collaborate with such visionary individuals, and I am confident that our combined efforts will continue to propel our company to new heights of success.",
      social: {
        linkedin: "https://www.linkedin.com/in/jaleshwar-prajapati-80600b191/",
        twitter: "#",
        instagram: "#"
      }
    },    {
      id: 2,
      name: "Mr. Daya Shankar Prajapati",
      position: "Co-Founder and CEO",
      image: "/images/dayashankar.png",
      testimonial: "As CEO of the company, I am profoundly dedicated to realizing our vision of redefining travel experiences. Together with my fellow founders, we are driven by a passion for innovation and a commitment to exceeding expectations. With a focus on creativity, integrity, and customer satisfaction, we have built a company culture that fosters excellence at every level.",
      social: {
        linkedin: "https://www.linkedin.com/in/dayashankar-prajapati/",
        twitter: "#",
        instagram: "#"
      }
    },    {
      id: 3,
      name: "Mr. Raju Kumar Prajapati",
      position: "Business Head (Kathmandu)",
      image: "/images/raju.png",
      testimonial: "As a business head of the company, I am dedicated to providing insightful analysis and strategic guidance to drive informed decision-making. With a keen eye for detail and a deep understanding of financial principles, I conduct thorough evaluations to optimize resource allocation and maximize profitability.",
      social: {
        linkedin: "https://www.linkedin.com/in/raju-prajapati-65752714b/",
        twitter: "#",
        instagram: "#"
      }
    },
    {
      id: 4,
      name: "Ms. Sandhya Subedi",
      position: "Product Manager",
      image: "/images/Sandhya.jpeg",
      testimonial: "As a product manager for our company, I take great pride in ensuring that our offerings meet the highest standards of quality and innovation. With a keen focus on user needs and market trends, I strive to create products that not only delight our customers but also drive business success. Whether it's through meticulous planning, cross-functional collaboration, or a commitment to continuous improvement, I am dedicated to delivering exceptional value at every stage of the product lifecycle.",
      social: {
        linkedin: "https://www.linkedin.com/in/sandhya-subedi-6b35142a7/",
        twitter: "#",
        instagram: "#"
      }
    },    {
      id: 5,
      name: "Mr. Rohit Jha",
      position: "Software Engineer",
      image: "/images/rohit.jpeg",
      testimonial: "As a software engineer at Sona Travel & Tours, I am committed to building reliable, scalable, and user-friendly systems that enhance our customers' travel experience. I take pride in creating solutions that streamline operations and improve efficiency. Collaborating with a talented and supportive team, I continuously strive to innovate and contribute to the company's digital growth.",
      social: {
        linkedin: "https://www.linkedin.com/in/jrohitofficial/",
        twitter: "https://x.com/jrohitofficial_",
        instagram: "https://www.instagram.com/jrohitofficial_/"
      }
    },    {
      id: 6,
      name: "Ms. Aayusha Regmi",
      position: "Software Engineer",
      image: "/images/Aayusha.jpeg",
      testimonial: "As a software engineer at Sona Travel & Tours, I am passionate about leveraging technology to improve user experiences and streamline our travel systems. I enjoy solving complex problems and bringing innovative ideas to life through clean, efficient code. Working in a collaborative environment motivates me to grow professionally and contribute meaningfully to the company's mission.",      social: {
        linkedin: "https://www.linkedin.com/in/aayusha-regmi/",
        twitter: "#",
        instagram: "#"
      }
    }
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <Header />
        {/* Hero Section */}
      <section className="relative pt-32 pb-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-100/30 to-indigo-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 right-20 w-64 h-64 bg-gradient-to-r from-purple-100/40 to-pink-200/40 rounded-full blur-3xl animate-bounce" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-100/25 to-teal-200/25 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-1/3 w-56 h-56 bg-gradient-to-r from-orange-100/30 to-amber-200/30 rounded-full blur-3xl animate-bounce" style={{animationDelay: '3s'}}></div>
        </div>        <div className="container mx-auto px-4 relative z-10">
          {/* Hero Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-gray-200/60 rounded-full px-6 py-3 mb-6">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-blue-600 font-medium">HEAR FROM OUR TEAM</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Testimonials
            </h1>              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Discover what our dedicated team members have to say about working at Sona Travel & Tours. Our staff 
              testimonials highlight their experiences, the positive work environment, and the passion they have for 
              delivering exceptional service.
            </p>
          </div>
        </div>
      </section>      {/* Main Content Section */}
      <section className="py-8 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Testimonials Section */}            <div className="mb-10">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                  What Our Team Says
                </h2>
                <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-4"></div>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Real experiences and perspectives from our dedicated professionals
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (                  <div 
                    key={testimonial.id}
                    className="group relative transform transition-all duration-700 hover:scale-[1.03]"
                    style={{ 
                      animationDelay: `${index * 0.15}s`,
                      animation: 'fadeInUp 0.8s ease-out forwards'
                    }}
                  >
                    {/* Glowing Background Effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-[2rem] blur-sm opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    
                    <div className="relative bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 border border-white/40 shadow-2xl hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.25)] transition-all duration-700 h-full flex flex-col">                      {/* Animated Gradient Border */}
                      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" style={{padding: '2px'}}>
                        <div className="w-full h-full bg-white/90 backdrop-blur-xl rounded-[calc(2rem-2px)]"></div>
                      </div>                      {/* Floating Badge with Animation */}
                      <div className="absolute -top-4 -right-4 z-50">
                        <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-2xl text-xs font-bold shadow-xl transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
                          <span className="relative z-50">TEAM</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl animate-pulse opacity-50 z-40"></div>
                        </div>
                      </div>
                      
                      {/* Enhanced Quote Mark */}
                      <div className="absolute top-6 right-8 z-30">
                        <div className="text-7xl text-blue-200/40 font-serif transform group-hover:scale-110 group-hover:text-blue-300/60 transition-all duration-500 group-hover:rotate-12">
                          "
                        </div>
                        <div className="absolute top-2 right-2 w-8 h-8 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-md animate-pulse"></div>
                      </div>                      {/* Enhanced Profile Section */}
                      <div className="relative z-30 flex flex-col items-center mb-8 text-center">
                        <div className="relative mb-6 group/profile">
                          {/* Profile Image Container with 3D Effect */}
                          <div className="relative w-28 h-28 transform group-hover:scale-110 transition-transform duration-500">
                            {/* Outer Glow Ring */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500 animate-spin-slow"></div>
                            
                            {/* Middle Ring */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                            
                            {/* Main Image Container */}
                            <div className="relative w-full h-full bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-full shadow-2xl flex items-center justify-center overflow-hidden border-4 border-white group-hover:border-blue-200 transition-colors duration-300">
                              <img 
                                src={testimonial.image} 
                                alt={testimonial.name}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                              />
                              {/* Image Overlay Effect */}
                              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            
                            {/* Status Indicator with Pulse */}
                            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-3 border-white flex items-center justify-center shadow-lg">
                              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                            </div>
                            
                            {/* Floating Particles */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              <div className="absolute top-2 right-4 w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                              <div className="absolute bottom-4 left-2 w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                              <div className="absolute top-6 left-6 w-1 h-1 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                            </div>
                          </div>
                        </div>
                          {/* Enhanced Name and Position */}
                        <div className="mb-5">
                          <h3 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-blue-700 transition-colors duration-300">
                            {testimonial.name}
                          </h3>
                          <div className="relative">
                            <p className="text-blue-600 font-semibold text-sm mb-4 px-4 py-2 bg-blue-50/80 rounded-full border border-blue-200/50">
                              {testimonial.position}
                            </p>
                          </div>
                          
                          {/* Enhanced Social Media Links */}
                          <div className="flex justify-center space-x-4">
                            <a 
                              href={testimonial.social.linkedin}
                              className="relative w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white hover:scale-125 hover:rotate-12 hover:shadow-xl transition-all duration-300 group/social"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                              </svg>
                              <div className="absolute inset-0 bg-blue-400 rounded-xl blur-md opacity-0 group-hover/social:opacity-50 transition-opacity duration-300"></div>
                            </a>
                            
                            <a 
                              href={testimonial.social.twitter}
                              className="relative w-10 h-10 bg-gradient-to-r from-sky-400 to-blue-500 rounded-xl flex items-center justify-center text-white hover:scale-125 hover:rotate-12 hover:shadow-xl transition-all duration-300 group/social"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                              </svg>
                              <div className="absolute inset-0 bg-sky-400 rounded-xl blur-md opacity-0 group-hover/social:opacity-50 transition-opacity duration-300"></div>
                            </a>
                            
                            <a 
                              href={testimonial.social.instagram}
                              className="relative w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-white hover:scale-125 hover:rotate-12 hover:shadow-xl transition-all duration-300 group/social"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                              </svg>
                              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl blur-md opacity-0 group-hover/social:opacity-50 transition-opacity duration-300"></div>
                            </a>
                          </div>
                        </div>
                      </div>                      {/* Enhanced Testimonial Content */}
                      <div className="relative z-30 flex-1">
                        <div className="relative">
                          <p className="text-gray-700 leading-relaxed italic text-center text-base group-hover:text-gray-800 transition-colors duration-300">
                            "{testimonial.testimonial}"
                          </p>
                          {/* Text Highlight Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/30 to-blue-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                        </div>
                      </div>                      {/* Enhanced Bottom Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-indigo-500/0 to-purple-500/5 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none z-20"></div>
                      
                      {/* Corner Decorations */}
                      <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300 animate-pulse z-30"></div>
                      <div className="absolute bottom-4 right-4 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300 animate-pulse z-30" style={{animationDelay: '0.5s'}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>      <Footer />
      
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(60px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes animate-spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: animate-spin-slow 8s linear infinite;
        }
        
        .group:hover .animate-spin-slow {
          animation-duration: 2s;
        }
      `}</style>
    </div>
  );
};

export default Testimonials;
