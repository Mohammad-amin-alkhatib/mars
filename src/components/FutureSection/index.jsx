import React, { useState, useEffect, useRef } from 'react';
import styles from "./buildFutureSection.module.scss";

const BuildFutureSection = ({ title, description, images = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (isPaused || images.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, images.length]);

  if (!images || images.length === 0) return null;

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getVisibleImages = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      const index = (activeIndex + i + images.length) % images.length;
      visible.push({ img: images[index], index, position: i });
    }
    return visible;
  };

  return (
    <div className={styles['build-future-section']}>
      <div className={styles['content-wrapper']}>
        <div className={styles['text-section']}>
          <h2 className={styles['section-title']}>{title}</h2>
          <p className={styles['section-description']}>{description}</p>
        </div>

        <div className={styles['carousel-wrapper']}>
          <div 
            className={styles['carousel-container']}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            ref={carouselRef}
          >
            <div className={styles['carousel-track']}>
              {getVisibleImages().map(({ img, index, position }) => (
                <div
                  key={`${index}-${position}`}
                  className={`${styles['carousel-slide']} ${position === 0 ? styles.active : ''} ${position < 0 ? styles.left : ''} ${position > 0 ? styles.right : ''}`}
                  onClick={() => position !== 0 && goToSlide(index)}
                >
                  <div className={styles['image-container']}>
                    <img
                      src={`/${img}`}
                      alt={`Slide ${index + 1}`}
                      onError={(e) => {
                        console.error(`Failed to load: ${img}`);
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-family="sans-serif" font-size="18"%3EImage not found%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    {position === 0 && (
                      <div className={styles['slide-number']}>
                        {activeIndex + 1} / {images.length}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles['carousel-controls']}>
            <button onClick={prevSlide} className={styles['control-btn']}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <div className={styles['dots-container']}>
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${index === activeIndex ? styles.active : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button onClick={nextSlide} className={styles['control-btn']}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildFutureSection;