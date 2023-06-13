import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import githubIcon from './images/github-icon.png';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <footer className="w-full mt-auto bg-[#AFD7CA] p-4">
      <div className="container flex flex-col md:flex-row justify-center md:justify-between items-center">
        <div className="order-2 md:order-1">
          <div className="flex mt-3 items-center">
            <a href="https://github.com/terrinmack" target="_blank" rel="noopener noreferrer">
              <img src={githubIcon} alt="GitHub Icon 1" className="hover:scale-105 w-12 h-12 mx-1" />
            </a>
            <a href="https://github.com/tykervella" target="_blank" rel="noopener noreferrer">
              <img src={githubIcon} alt="GitHub Icon 2" className="hover:scale-105 w-12 h-12 mx-1" />
            </a>
            <a href="https://github.com/jacksonmaltby" target="_blank" rel="noopener noreferrer">
              <img src={githubIcon} alt="GitHub Icon 3" className="hover:scale-105 w-12 h-12 mx-1" />
            </a>
            <a href="https://github.com/marleyschneiderr" target="_blank" rel="noopener noreferrer">
              <img src={githubIcon} alt="GitHub Icon 4" className="hover:scale-105 w-12 h-12 mx-1" />
            </a>
          </div>
        </div>
        {location.pathname !== '/' && (
        <div className="order-1 md:order-2">
          <button className="btn bg-white py-3 px-5 md:py-3 md:px-6 text-md lg:text-xl hover:scale-105 hover:bg-[#0B3C49] hover:text-white !important" onClick={() => navigate(-1)}>
            &larr; Go Back
          </button>
        </div>
      )}
      <a href="/Contact" className="md:order-3">
        <button className="btn bg-white hover:scale-105 hover:text-white text-black py-3 px-5 md:py-3 md:px-6 text-md lg:text-xl">
          Contact Us
        </button>
      </a>
    </div>
  </footer>
);  
};

export default Footer;