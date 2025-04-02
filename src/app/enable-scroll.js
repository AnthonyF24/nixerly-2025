"use client";

// Force enable scrolling on the document
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    // Force enable scrolling by adding our own styles that override any others
    const style = document.createElement('style');
    style.innerHTML = `
      html, body {
        height: auto !important;
        min-height: 100% !important;
        overflow: auto !important;
        overflow-y: auto !important;
        position: static !important;
      }
      
      #__next, main, div {
        overflow: visible !important;
        min-height: auto !important;
        height: auto !important;
      }
    `;
    style.setAttribute('id', 'force-scroll-styles');
    document.head.appendChild(style);
    
    // Also modify the style attributes directly
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    
    console.log('Scroll enabler activated');
  });
} 