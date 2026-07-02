import React from 'react';
import { galleryItems } from '../data/siteData.js';
import SectionTitle from './SectionTitle.jsx';

function Gallery() {
  return (
    <section className="gallery-section section-anchor" id="gallery">
      <div className="page-container">
        <SectionTitle>Gallery</SectionTitle>
        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <article className="gallery-card" key={item.title}>
              <img src={item.src} alt={item.title} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
