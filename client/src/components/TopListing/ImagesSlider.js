import React, { useState } from 'react';
import { SliderData } from './SliderData';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length === 0) {
    return null;
  }

  return (
    <div className="slider">
     
      {slides.map((slide, index) => (
        <div className={index === current ? 'slide active' : 'slide'} key={index}>
          {index === current && (
            <div className="slide-content">
              <div className="arrows">
                {index > 0 && (
                   <button className="prev-btn" onClick={prevSlide}>
                   <FiChevronLeft />
                 </button>
                )}
              </div>
              <img src={slide.image} alt='travel image' className='topListing' />
              <div className="arrows">
                {index < length - 1 && (
                   <button className="next-btn" onClick={nextSlide}>
                   <FiChevronRight />
                 </button>
                )}
              </div>
            </div>
          )}
        </div>
      ))}

     
    </div>
  );
};

export default ImageSlider;
