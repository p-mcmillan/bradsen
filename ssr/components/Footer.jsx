import React, { useState, useEffect } from 'react';
import { navLinks } from '../constants/index';
import { Link } from 'react-router-dom';
import { agentInfo, backgroundImages } from '../constants/index';

const Footer = () => {
  const [email, setEmail] = useState('');
  const { name, phoneLink, phone } = agentInfo;

  const subject = 'info';
  const body = 'Hello,';

  useEffect(() => {
    const obfuscateEmail = (user, domain, extension) => {
      const obfuscatedEmail = `${user}[at]${domain}.${extension}`;
      const mailtoLink = `mailto:${user}@${domain}.${extension}?subject=${subject}&body=${body}`;
      return <a href={mailtoLink}>{obfuscatedEmail}</a>;
    };

    setEmail(obfuscateEmail('tylerbradsen', 'gmail', 'com'));
  }, []);

  return (
    <footer className="relative text-white px-4 sm:px-8 lg:px-16 py-6 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-100"
        style={{
          backgroundImage: `url(${backgroundImages.footer})`,
        }}
      />

      {/* Foreground content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto">
        {/* Top CTA */}
        <div className="max-w-xl mx-auto mb-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold leading-snug">
            Your Dream Home <br /> Awaits – Let’s Make It Happen
          </h2>
          <p className="text-gray-300 mt-4 text-sm">
            Whether you’re buying, selling, or investing, I am here to guide
            you. Every step of the way. Start your journey today!
          </p>
          <div className="flex flex-col min-[834px]:flex-row min-[834px]:justify-center items-center gap-4 mt-6">
            <Link to="/listings">
              <button className="bg-white text-black font-semibold py-2 px-6 rounded-full">
                Explore Properties
              </button>
            </Link>
            <Link to="/contact-me">
              <button className="border border-white py-2 px-6 rounded-full font-semibold text-white">
                Get Expert Advice
              </button>
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col min-[834px]:flex-row justify-center items-center text-gray-300 text-sm gap-2 min-[834px]:gap-6 mb-8 text-center min-[834px]:text-left">
          <div>{email}</div>
          <a href={`tel:${phoneLink}`}>{phone}</a>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 min-[834px]:gap-x-6 text-sm text-white mb-10">
          {navLinks.map((link, idx) => (
            <a key={idx} href={link.to} className="hover:underline">
              {link.title}
            </a>
          ))}
        </div>

        {/* Westmar Logo */}
        {/* <div className="flex justify-center mb-6">
          <a
            href="https://westmar.ca/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={backgroundImages.wmLogo}
              alt="Macdonald Realty Westmar Logo"
              className="h-12 opacity-70"
            />
          </a>
        </div> */}

        {/* Legal */}
        <div className="text-gray-400 text-xs text-center mt-8 mb-4">
          © {new Date().getFullYear()} Bradsen. All rights reserved.
        </div>

        <div className="flex flex-col min-[834px]:flex-row justify-center items-center gap-2 min-[834px]:gap-4 text-xs text-gray-400 mb-6">
          <a href="/privacy-policy">Privacy Policy</a>
          {/* <span className="hidden min-[834px]:inline">|</span>
          <a href="#">Terms of Service</a>
          <span className="hidden min-[834px]:inline">|</span>
          <a href="#">Cookies Settings</a> */}
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 min-[834px]:gap-6 text-xl text-white">
          <ion-icon name="logo-instagram"></ion-icon>
          <ion-icon name="logo-twitter"></ion-icon>
          <ion-icon name="logo-linkedin"></ion-icon>
          <ion-icon name="logo-youtube"></ion-icon>
          <ion-icon name="logo-facebook"></ion-icon>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
