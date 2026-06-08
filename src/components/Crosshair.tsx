import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

const getMousePos = (e: MouseEvent, container: HTMLElement | null) => {
  if (container) {
    const bounds = container.getBoundingClientRect();
    return {
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top
    };
  }
  return { x: e.clientX, y: e.clientY };
};

interface CrosshairProps {
  color?: string;
  containerRef?: React.RefObject<HTMLElement | null> | null;
}

const Crosshair: React.FC<CrosshairProps> = ({ color = 'rgba(124, 58, 237, 0.3)', containerRef = null }) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const lineHorizontalRef = useRef<HTMLDivElement>(null);
  const lineVerticalRef = useRef<HTMLDivElement>(null);
  const filterXRef = useRef<SVGFETurbulenceElement>(null);
  const filterYRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    let mouse = { x: 0, y: 0 };
    let animationFrameId: number;

    const handleMouseMove = (ev: MouseEvent) => {
      mouse = getMousePos(ev, containerRef?.current ?? null);

      if (containerRef?.current) {
        const bounds = containerRef.current.getBoundingClientRect();
        if (
          ev.clientX < bounds.left ||
          ev.clientX > bounds.right ||
          ev.clientY < bounds.top ||
          ev.clientY > bounds.bottom
        ) {
          gsap.to([lineHorizontalRef.current, lineVerticalRef.current], { opacity: 0, duration: 0.3 });
        } else {
          gsap.to([lineHorizontalRef.current, lineVerticalRef.current], { opacity: 1, duration: 0.3 });
        }
      }
    };

    const target = containerRef?.current || window;
    const eventTarget = target as EventTarget;
    eventTarget.addEventListener('mousemove', handleMouseMove as EventListener);

    const renderedStyles = {
      tx: { previous: 0, current: 0, amt: 0.15 },
      ty: { previous: 0, current: 0, amt: 0.15 }
    };

    gsap.set([lineHorizontalRef.current, lineVerticalRef.current], { opacity: 0 });

    const onMouseMove = () => {
      renderedStyles.tx.previous = renderedStyles.tx.current = mouse.x;
      renderedStyles.ty.previous = renderedStyles.ty.current = mouse.y;

      gsap.to([lineHorizontalRef.current, lineVerticalRef.current], {
        duration: 0.9,
        ease: 'Power3.easeOut',
        opacity: 1
      });

      animationFrameId = requestAnimationFrame(render);

      eventTarget.removeEventListener('mousemove', onMouseMove as EventListener);
    };

    eventTarget.addEventListener('mousemove', onMouseMove as EventListener);

    const primitiveValues = { turbulence: 0 };

    const tl = gsap
      .timeline({
        paused: true,
        onStart: () => {
          if (lineHorizontalRef.current && lineVerticalRef.current) {
            lineHorizontalRef.current.style.filter = `url(#filter-noise-x)`;
            lineVerticalRef.current.style.filter = `url(#filter-noise-y)`;
          }
        },
        onUpdate: () => {
          if (filterXRef.current && filterYRef.current) {
            filterXRef.current.setAttribute('baseFrequency', primitiveValues.turbulence.toString());
            filterYRef.current.setAttribute('baseFrequency', primitiveValues.turbulence.toString());
          }
        },
        onComplete: () => {
          if (lineHorizontalRef.current && lineVerticalRef.current) {
            lineHorizontalRef.current.style.filter = lineVerticalRef.current.style.filter = 'none';
          }
        }
      })
      .to(primitiveValues, {
        duration: 0.5,
        ease: 'power1',
        startAt: { turbulence: 1 },
        turbulence: 0
      });

    const enter = () => tl.restart();
    const leave = () => tl.progress(1).kill();

    const render = () => {
      renderedStyles.tx.current = mouse.x;
      renderedStyles.ty.current = mouse.y;

      for (const key in renderedStyles) {
        const k = key as 'tx' | 'ty';
        renderedStyles[k].previous = lerp(
          renderedStyles[k].previous,
          renderedStyles[k].current,
          renderedStyles[k].amt
        );
      }

      if (lineHorizontalRef.current && lineVerticalRef.current) {
        gsap.set(lineVerticalRef.current, { x: renderedStyles.tx.previous });
        gsap.set(lineHorizontalRef.current, { y: renderedStyles.ty.previous });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const containerEl = containerRef?.current || document;
    // Query links, buttons, and custom interactive components
    const interactiveElements = containerEl.querySelectorAll('a, button, [role="button"], .card-hover, .card');

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    return () => {
      eventTarget.removeEventListener('mousemove', handleMouseMove as EventListener);
      eventTarget.removeEventListener('mousemove', onMouseMove as EventListener);
      cancelAnimationFrame(animationFrameId);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, [containerRef, color]);

  return (
    <div
      ref={cursorRef}
      className="cursor-crosshair"
      style={{
        position: containerRef ? 'absolute' : 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10000
      }}
    >
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
        <defs>
          <filter id="filter-noise-x">
            <feTurbulence type="fractalNoise" baseFrequency="0.000001" numOctaves="1" ref={filterXRef} />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
          <filter id="filter-noise-y">
            <feTurbulence type="fractalNoise" baseFrequency="0.000001" numOctaves="1" ref={filterYRef} />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
        </defs>
      </svg>
      <div
        ref={lineHorizontalRef}
        style={{
          position: 'absolute',
          width: '100%',
          height: '1px',
          background: color,
          pointerEvents: 'none',
          transform: 'translateY(-50%)',
          opacity: 0
        }}
      ></div>
      <div
        ref={lineVerticalRef}
        style={{
          position: 'absolute',
          height: '100%',
          width: '1px',
          background: color,
          pointerEvents: 'none',
          transform: 'translateX(-50%)',
          opacity: 0
        }}
      ></div>
    </div>
  );
};

export default Crosshair;
