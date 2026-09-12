import gsap from 'gsap';

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const animateFadeIn = (element: Element | string, options: gsap.TweenVars = {}) => {
  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1 });
    return null;
  }
  return gsap.fromTo(element, 
    { opacity: 0 }, 
    { opacity: 1, duration: 0.6, ease: 'power2.out', ...options }
  );
};

export const animateSlideUp = (element: Element | string, options: gsap.TweenVars = {}) => {
  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1, y: 0 });
    return null;
  }
  return gsap.fromTo(element,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', ...options }
  );
};

export const animateStagger = (elements: Element[] | string, options: gsap.TweenVars = {}) => {
  if (prefersReducedMotion()) {
    gsap.set(elements, { opacity: 1, y: 0 });
    return null;
  }
  return gsap.fromTo(elements,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', ...options }
  );
};

export const animateScale = (element: Element | string, options: gsap.TweenVars = {}) => {
  if (prefersReducedMotion()) {
    gsap.set(element, { opacity: 1, scale: 1 });
    return null;
  }
  return gsap.fromTo(element,
    { opacity: 0, scale: 0.95 },
    { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)', ...options }
  );
};

export const animatePageEntrance = (container: Element | string) => {
  if (prefersReducedMotion()) {
    gsap.set(container, { opacity: 1, filter: 'blur(0px)' });
    return null;
  }
  
  const tl = gsap.timeline();
  tl.fromTo(container, 
    { opacity: 0, filter: 'blur(8px)' }, 
    { opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' }
  );
  return tl;
};

export const animateHover = (element: Element | string, isHovering: boolean, options: gsap.TweenVars = {}) => {
  if (prefersReducedMotion()) return null;
  
  return gsap.to(element, {
    y: isHovering ? -4 : 0,
    scale: isHovering ? 1.02 : 1,
    boxShadow: isHovering 
      ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 15px rgba(56, 189, 248, 0.15)' 
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    duration: 0.3,
    ease: 'power2.out',
    ...options
  });
};
