import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <>
      <style>{`        body {
          background: #f5f5f5;
        }.new_footer_area {
          background: #f5f5f5;
        }

        .new_footer_top {
          padding: 120px 0px 270px;
          position: relative;
          overflow-x: hidden;
        }

        .new_footer_area .footer_bottom {
          padding-top: 5px;
          padding-bottom: 50px;
        }        .footer_bottom {
          font-size: 14px;
          font-weight: 300;
          line-height: 20px;
          color: #5f5f5f;
          padding: 27px 0px;
          background: #f5f5f5;
          border-top: 1px solid #ececec;
        }

        .new_footer_top .company_widget p {
          font-size: 16px;
          font-weight: 300;
          line-height: 28px;
          color: #5f5f5f;
          margin-bottom: 20px;
        }

        .new_footer_top .company_widget .f_subscribe_two .btn_get {
          border-width: 1px;
          margin-top: 20px;
        }

        .btn_get_two:hover {
          background: transparent !important;
          color: #5e2ced !important;
        }

        .btn_get:hover {
          color: #fff !important;
          background: #6754e2 !important;
          border-color: #6754e2 !important;
          box-shadow: none !important;
        }

        a:hover, a:focus, .btn:hover, .btn:focus, button:hover, button:focus {
          text-decoration: none;
          outline: none;
        }

        .new_footer_top .f_widget.about-widget .f_list li a:hover {
          color: #5e2ced;
        }

        .new_footer_top .f_widget.about-widget .f_list li {
          margin-bottom: 11px;
        }

        .f_widget.about-widget .f_list li:last-child {
          margin-bottom: 0px;
        }

        .f_widget.about-widget .f_list li {
          margin-bottom: 15px;
        }

        .f_widget.about-widget .f_list {
          margin-bottom: 0px;
        }        .new_footer_top .f_social_icon a {
          width: 40px;
          height: 40px;
          line-height: 38px;
          background: #f8f9fa;
          border: 1px solid #ececec;
          font-size: 18px;
          border-radius: 8px;
          color: #5f5f5f;
        }

        .f_social_icon a {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          font-size: 18px;
          line-height: 38px;
          color: #5f5f5f;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #f8f9fa;
          border: 1px solid #ececec;
          text-align: center;
          transition: all 0.3s ease;
        }

        .btn_get_two {
          box-shadow: none;
          background: #5e2ced;
          border-color: #5e2ced;
          color: #fff;
          padding: 12px 24px;
          border-radius: 4px;
          border: 1px solid #5e2ced;
          cursor: pointer;
          transition: all 0.2s linear;
          font-size: 14px;
          font-weight: 500;
        }

        .btn_get_two:hover {
          background: transparent;
          color: #5e2ced;
        }        .new_footer_top .f_social_icon a:hover {
          background: #0a639d !important;
          border-color: #0a639d !important;
          color: white !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(10, 99, 157, 0.3);
        }

        .new_footer_top .f_social_icon a + a {
          margin-left: 8px;
        }

        .f_social_icon {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-top: 20px;
        }        .new_footer_top .f-title {
          margin-bottom: 30px;
          color: #3d3d3d;
        }

        .f_600 {
          font-weight: 600;
        }

        .f_size_18 {
          font-size: 18px;
        }

        h1, h2, h3, h4, h5, h6 {
          color: #3d3d3d;
        }

        .new_footer_top .f_widget.about-widget .f_list li a {
          color: #5f5f5f;
          text-decoration: none;
          transition: color 0.2s linear;
        }

        .new_footer_top .f_widget.about-widget .f_list li a:hover {
          color: #0a639d;
        }

        .new_footer_top .footer_bg {
          position: absolute;
          bottom: 0;
          background: url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEigB8iI5tb8WSVBuVUGc9UjjB8O0708X7Fdic_4O1LT4CmLHoiwhanLXiRhe82yw0R7LgACQ2IhZaTY0hhmGi0gYp_Ynb49CVzfmXtYHUVKgXXpWvJ_oYT8cB4vzsnJLe3iCwuzj-w6PeYq_JaHmy_CoGoa6nw0FBo-2xLdOPvsLTh_fmYH2xhkaZ-OGQ/s16000/footer_bg.png") no-repeat scroll center 0;
          width: 100%;
          height: 266px;
        }

        .new_footer_top .footer_bg .footer_bg_one {
          background: url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEia0PYPxwT5ifToyP3SNZeQWfJEWrUENYA5IXM6sN5vLwAKvaJS1pQVu8mOFFUa_ET4JuHNTFAxKURFerJYHDUWXLXl1vDofYXuij45JZelYOjEFoCOn7E6Vxu0fwV7ACPzArcno1rYuVxGB7JY6G7__e4_KZW4lTYIaHSLVaVLzklZBLZnQw047oq5-Q/s16000/volks.gif") no-repeat center center;
          width: 330px;
          height: 105px;
          background-size: 100%;
          position: absolute;
          bottom: 0;
          left: 30%;
          animation: myfirst 22s linear infinite;
        }

        .new_footer_top .footer_bg .footer_bg_two {
          background: url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhyLGwEUVwPK6Vi8xXMymsc-ZXVwLWyXhogZxbcXQYSY55REw_0D4VTQnsVzCrL7nsyjd0P7RVOI5NKJbQ75koZIalD8mqbMquP20fL3DxsWngKkOLOzoOf9sMuxlbyfkIBTsDw5WFUj-YJiI50yzgVjF8cZPHhEjkOP_PRTQXDHEq8AyWpBiJdN9SfQA/s16000/cyclist.gif") no-repeat center center;
          width: 88px;
          height: 100px;
          background-size: 100%;
          bottom: 0;
          left: 38%;
          position: absolute;
          animation: myfirst 30s linear infinite;
        }

        @-moz-keyframes myfirst {
          0% { left: -25%; }
          100% { left: 100%; }
        }

        @-webkit-keyframes myfirst {
          0% { left: -25%; }
          100% { left: 100%; }
        }

        @keyframes myfirst {
          0% { left: -25%; }
          100% { left: 100%; }
        }

        .f_subscribe_two {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .f_subscribe_two input {
          padding: 12px 15px;
          border: 1px solid #e2e2eb;
          border-radius: 4px;
          background: #fff;
          color: #6a7695;
          font-size: 14px;
          outline: none;
        }

        .f_subscribe_two input:focus {
          border-color: #5e2ced;
        }

        .f_list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .pl_70 {
          padding-left: 70px;
        }

        .f_400 {
          font-weight: 400;
        }

        .mb-0 {
          margin-bottom: 0;
        }

        .text-right {
          text-align: right;
        }

        .icon_heart:before {
          content: "❤️";
        }        @media (max-width: 768px) {
          .pl_70 {
            padding-left: 0;
          }
          .new_footer_top {
            padding: 60px 0px 200px;
          }
          .text-right {
            text-align: center;
            margin-top: 15px;
          }
          .f_widget {
            text-align: center;
            margin-bottom: 40px;
          }
          .company_widget {
            margin-bottom: 50px;
          }
          .f_social_icon {
            justify-content: center;
          }
        }        @media (max-width: 640px) {
          .f_social_icon {
            gap: 6px;
          }
          .f_social_icon a {
            width: 36px;
            height: 36px;
            font-size: 16px;
          }
          .company_widget .contact-info .email-info {
            font-size: 14px;
          }
          .company_widget .contact-info .phone-item {
            font-size: 14px;
            font-weight: 500;
          }
          .company_widget .contact-info .phone-numbers {
            gap: 2px;
          }
          
          /* Awards responsive styles */
          .certifications-awards {
            padding: 12px;
            margin-top: 20px;
          }
          
          .certifications-awards h4 {
            font-size: 12px;
            margin-bottom: 8px;
          }
          
          .certifications-awards .flex {
            gap: 4px;
          }
          
          .award-item .relative {
            padding: 4px;
          }
          
          .award-item img {
            height: 28px;
          }
          
          .iso-certification img {
            height: 32px;
          }
          
          /* Compact awards responsive */
          .certifications-awards-fullwidth {
            padding: 24px 0;
            margin-top: 20px;
          }
          
          .certifications-awards-fullwidth h4 {
            font-size: 20px;
            margin-bottom: 20px;
            letter-spacing: 0.8px;
          }
          
          .certifications-awards-fullwidth h4::after {
            width: 60px;
            height: 3px;
          }
          
          .certifications-awards-fullwidth .flex {
            gap: 10px;
            max-width: 100%;
          }
          
          .certifications-awards-fullwidth .iso-certification img {
            height: 24px;
          }
          
          .certifications-awards-fullwidth .award-item img {
            height: 20px;
          }
          
          .certifications-awards-fullwidth .award-item .relative {
            padding: 6px;
            border-radius: 10px;
          }
          
          .certifications-awards-fullwidth .iso-certification .absolute {
            padding: 3px 8px;
            font-size: 12px;
            -top: -3px;
            -right: -3px;
          }
        }.f_widget {
          text-align: center;
          padding: 0 15px;
        }        .f_widget .f-title {
          font-size: 18px;
          font-weight: 600;
          color: #3d3d3d;
          margin-bottom: 24px;
          text-transform: none;
        }

        .f_widget .f_list {
          text-align: center;
        }

        .f_widget .f_list li {
          text-align: center;
          margin-bottom: 12px;
        }

        .f_widget .f_list li a {
          font-size: 15px;
          font-weight: 400;
          line-height: 1.8;
          transition: all 0.3s ease;
          color: #5f5f5f;
        }

        .f_widget .f_list li a:hover {
          color: #0a639d;
        }

        .company_widget {
          text-align: center;
          padding: 0 20px;
        }
        
        .iso-certification {
          position: relative;
          padding: 10px;
          border-radius: 12px;
          background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
        }
        
        .iso-certification:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
        }
        
        .iso-certification img {
          transition: all 0.3s ease;
        }
        
        .iso-certification:hover img {
          transform: scale(1.05);
        }

        /* Awards Section Styles */
        .certifications-awards {
          background: linear-gradient(to bottom right, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 16px;
          padding: 20px;
          transition: all 0.3s ease;
        }
        
        .certifications-awards:hover {
          border-color: rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        /* Redesigned Certifications & Awards Styles */
        .certifications-awards-redesigned {
          padding: 24px 0;
          margin-top: 16px;
          position: relative;
        }
        
        .certifications-awards-redesigned .container {
          position: relative;
          z-index: 1;
        }
        
        .iso-card {
          position: relative;
        }
        
        .iso-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(10, 99, 157, 0.05), transparent);
          border-radius: 16px;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }
        
        .iso-card:hover::before {
          opacity: 1;
        }
        
        .awards-showcase {
          position: relative;
        }
        
        .awards-showcase::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 143, 31, 0.05), transparent);
          border-radius: 16px;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }
        
        .awards-showcase:hover::before {
          opacity: 1;
        }
        
        .award-mini {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .award-mini:hover {
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .certifications-awards-redesigned {
            padding: 40px 0;
            margin-top: 30px;
          }
          
          .certifications-awards-redesigned .grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          
          .certifications-awards-redesigned h4 {
            font-size: 20px;
          }
          
          .iso-card .absolute {
            -top: 2px;
            -right: 2px;
            width: 48px;
            height: 48px;
          }
          
          .awards-showcase .absolute {
            -top: 2px;
            -right: 2px;
            width: 48px;
            height: 48px;
          }
          
          .award-mini img {
            height: 24px;
          }
          
          /* Trust indicators responsive */
          .trust-indicators .inline-flex {
            flex-direction: column;
            gap: 16px;
            padding: 20px 16px;
          }
          
          .trust-indicators .w-px {
            display: none;
          }
          
          .trust-indicators .flex {
            justify-content: center;
            width: 100%;
          }
          
          .trust-indicators .text-left {
            text-align: center;
          }
        }
        
        @media (max-width: 640px) {
          .trust-indicators .inline-flex {
            grid-template-columns: 1fr 1fr;
            display: grid;
            gap: 12px;
          }
          
          .trust-indicators .flex {
            flex-direction: column;
            text-align: center;
            gap: 2px;
          }
          
          .trust-indicators .w-12 {
            width: 40px;
            height: 40px;
            margin: 0 auto;
          }
          
          .trust-indicators img {
            height: 24px;
          }
        }
        
        .awards-section h4 {
          color: #3d3d3d;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .awards-grid {
          gap: 8px;
        }
        
        .award-item {
          position: relative;
          overflow: hidden;
        }
        
        .award-item:nth-child(odd) .relative {
          background: linear-gradient(135deg, rgba(10, 99, 157, 0.1), rgba(255, 255, 255, 0.05));
        }
        
        .award-item:nth-child(even) .relative {
          background: linear-gradient(135deg, rgba(255, 143, 31, 0.1), rgba(255, 255, 255, 0.05));
        }
        
        .award-item .relative:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
        
        .award-item img {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .award-item:hover img {
          transform: scale(1.1);
          filter: brightness(1.1) contrast(1.1);
        }        .company_widget .contact-info {
          margin: 24px 0;
        }

        .company_widget .contact-info .email-info {
          margin: 8px 0 16px 0;
          font-size: 15px;
          font-weight: 500;
          color: #5f5f5f;
          line-height: 1.6;
        }

        .company_widget .contact-info .phone-numbers {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .company_widget .contact-info .phone-item {
          margin: 0;
          font-size: 15px;
          font-weight: 600;
          color: #0a639d;
          line-height: 1.4;
          transition: all 0.3s ease;
        }

        .company_widget .contact-info .phone-item:hover {
          color: #1a5f8a;
          transform: scale(1.02);
        }

        .company_widget .contact-info p {
          margin: 8px 0;
          font-size: 15px;
          font-weight: 500;
          color: #5f5f5f;
          line-height: 1.6;
        }

        .company_widget .logo-container {
          margin-bottom: 20px;
        }

        .f_social_icon {
          display: flex;
          justify-content: center;
          gap: 4px;
          flex-wrap: wrap;
        }
      `}</style>

      <footer className="new_footer_area bg_color">        
        <div className="new_footer_top">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">              
              {/* Company Info with Logo */}
              <div className="f_widget company_widget">
                <div className="logo-container">
                  <img 
                    src="/images/img_logo_with_name_png_2.png" 
                    alt="Sona Travel & Tours Logo" 
                    className="h-20 w-auto object-contain mx-auto"
                  />
                </div>
                <div className="contact-info">
                  <p className="email-info">info@sonatraveltours.com</p>
                  <div className="phone-numbers">
                    <p className="phone-item">(+977) 9802353260</p>
                    <p className="phone-item">(+977) 9802374215</p>
                  </div>
                </div>
                <div className="f_social_icon">
                  <a href="https://www.instagram.com/sonatravelandtours/" title="Instagram" className="social-link" target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" title="TikTok" className="social-link">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                    </svg>
                  </a>                  <a href="https://www.linkedin.com/company/sona-travel-and-tours/" title="LinkedIn" className="social-link" target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/sonatraveltours" title="Facebook" className="social-link" target="_blank" rel="noopener noreferrer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Information */}
              <div className="f_widget about-widget pl_70">
                <h3 className="f-title f_600 t_color f_size_18">Information</h3>
                <ul className="f_list">
                  <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
                  <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                  <li><Link to="/contact">Contact Us</Link></li>
                  <li><Link to="/visit-counters">Visit Our Counters</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/testimonials">Testimonials</Link></li>
                  <li><Link to="/faqs">FAQs</Link></li>
                </ul>
              </div>

              {/* Transportation */}
              <div className="f_widget about-widget pl_70">
                <h3 className="f-title f_600 t_color f_size_18">Transportation</h3>
                <ul className="f_list">
                  <li><Link to="/profile?tab=mybookings">My Bookings</Link></li>
                  <li><Link to="/routes">Bus Routes</Link></li>
                  <li><Link to="/insurance">Travel Insurance</Link></li>
                  <li><Link to="/live-track">Live Track</Link></li>
                </ul>
              </div>

              {/* Hotel & Tours */}
              <div className="f_widget about-widget pl_70">
                <h3 className="f-title f_600 t_color f_size_18">Hotel & Tours</h3>
                <ul className="f_list">
                  <li><Link to="/hotels">Hotels</Link></li>
                  <li><Link to="/tours">Tours</Link></li>
                </ul>
              </div>
            </div>
            
            {/* Redesigned Certifications & Awards Section */}
            <div className="certifications-awards-redesigned">
              <div className="container mx-auto px-4 max-w-6xl">
                {/* Section Header */}
                <div className="text-center mb-4">
                  <h4 className="text-xl font-bold bg-gradient-to-r from-[#0a639d] via-[#ff8f1f] to-[#0a639d] bg-clip-text text-transparent mb-1">
                    Certifications & Awards
                  </h4>
                </div>
                {/* Trust Indicators with Award Images */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg border border-gray-200 flex-wrap justify-center">
                    
                    {/* ISO Certification */}
                    <div className="flex items-center gap-3 group">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 xl:w-18 xl:h-18 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl flex items-center justify-center border border-green-200 group-hover:scale-110 transition-transform duration-300">
                        <img 
                          src="/images/iso-1-1-702x351-removebg-preview.png" 
                          alt="ISO Certified" 
                          className="h-8 lg:h-10 xl:h-12 w-auto object-contain"
                        />
                      </div>
                      
                    </div>
                    
                    <div className="w-px h-12 lg:h-16 xl:h-18 bg-gray-300 hidden sm:block"></div>
                    
                    {/* Award 1 */}
                    <div className="flex items-center gap-3 group">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 xl:w-18 xl:h-18 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center border border-blue-200 group-hover:scale-110 transition-transform duration-300">
                        <img 
                          src="/images/Award1.png" 
                          alt="Excellence Award" 
                          className="h-8 lg:h-10 xl:h-12 w-auto object-contain"
                        />
                      </div>
                    </div>
                    
                    <div className="w-px h-12 lg:h-16 xl:h-18 bg-gray-300 hidden md:block"></div>
                    
                    {/* Award 2 */}
                    <div className="flex items-center gap-3 group">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 xl:w-18 xl:h-18 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl flex items-center justify-center border border-orange-200 group-hover:scale-110 transition-transform duration-300">
                        <img 
                          src="/images/Award2.png" 
                          alt="Quality Service Award" 
                          className="h-8 lg:h-10 xl:h-12 w-auto object-contain"
                        />
                      </div>
                    </div>
                    
                    <div className="w-px h-12 lg:h-16 xl:h-18 bg-gray-300 hidden lg:block"></div>
                    
                    {/* Award 3 */}
                    <div className="flex items-center gap-3 group">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 xl:w-18 xl:h-18 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl flex items-center justify-center border border-purple-200 group-hover:scale-110 transition-transform duration-300">
                        <img 
                          src="/images/Award3.png" 
                          alt="Customer Choice Award" 
                          className="h-8 lg:h-10 xl:h-12 w-auto object-contain"
                        />
                      </div>
                    </div>
                    
                    <div className="w-px h-12 lg:h-16 xl:h-18 bg-gray-300 hidden xl:block"></div>
                    
                    {/* Award 4 */}
                    <div className="flex items-center gap-3 group">
                      <div className="w-12 h-12 lg:w-16 lg:h-16 xl:w-18 xl:h-18 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex items-center justify-center border border-emerald-200 group-hover:scale-110 transition-transform duration-300">
                        <img 
                          src="/images/Award4.png" 
                          alt="Innovation Award" 
                          className="h-8 lg:h-10 xl:h-12 w-auto object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Animated Background */}
          <div className="footer_bg">
            <div className="footer_bg_one"></div>
            <div className="footer_bg_two"></div>
          </div>
        </div>
          {/* Footer Bottom */}
        <div className="footer_bottom">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
              <div>
                <p className="mb-0 f_400 text-center lg:text-left">© 2025 Sona Travel & Tours. All rights reserved.</p>
              </div>              <div className="text-center lg:text-right">
                <p className="mb-0">Developed by Sona Consolidate</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;