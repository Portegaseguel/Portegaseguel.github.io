import {
    Children,
    isValidElement,
    useEffect,
    useRef,
    type ReactNode,
  } from 'react';
  
  type AnimatedTitleProps = {
    children: ReactNode;
    className?: string;
  };
  
  export default function AnimatedTitle({
    children,
    className = '',
  }: AnimatedTitleProps) {
    const titleRef =
      useRef<HTMLHeadingElement | null>(null);
  
    useEffect(() => {
      const element = titleRef.current;
  
      if (!element) {
        return;
      }
  
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            element.classList.add('is-visible');
            observer.unobserve(element);
          }
        },
        {
          threshold: 0.35,
        }
      );
  
      observer.observe(element);
  
      return () => {
        observer.disconnect();
      };
    }, []);
  
    const items = Children.toArray(children);
  
    return (
      <h2
        ref={titleRef}
        className={`animated-title ${className}`}
      >
        {items.map((item, index) => {
          if (
            isValidElement(item) &&
            item.type === 'br'
          ) {
            return item;
          }
  
          return (
            <span
              className="animated-title-line"
              style={{
                transitionDelay:
                  `${index * 90}ms`,
              }}
              key={index}
            >
              {item}
            </span>
          );
        })}
      </h2>
    );
  }