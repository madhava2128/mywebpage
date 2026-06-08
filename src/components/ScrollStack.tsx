'use client';
import React, { useLayoutEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import './ScrollStack.css';


export interface ScrollStackItemProps {
    itemClassName?: string;
    children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
    <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

interface ScrollStackProps {
    className?: string;
    children: ReactNode;
    itemDistance?: number;
    itemScale?: number;
    itemStackDistance?: number;
    stackPosition?: string;
    scaleEndPosition?: string;
    baseScale?: number;
    scaleDuration?: number;
    rotationAmount?: number;
    blurAmount?: number;
    useWindowScroll?: boolean;
    onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
    children,
    className = '',
    itemDistance = 100,
    itemScale = 0.03,
    itemStackDistance = 30,
    stackPosition = '20%',
    scaleEndPosition = '10%',
    baseScale = 0.85,
    scaleDuration = 0.5,
    rotationAmount = 0,
    blurAmount = 0,
    useWindowScroll = false,
    onStackComplete
}) => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const stackCompletedRef = useRef(false);
    const animationFrameRef = useRef<number | null>(null);
    const cardsRef = useRef<HTMLElement[]>([]);
    const lastTransformsRef = useRef(new Map<number, any>());
    const isUpdatingRef = useRef(false);
    const cardOffsetsRef = useRef<number[]>([]);
    const endElementOffsetRef = useRef<number>(0);

    const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
        if (scrollTop < start) return 0;
        if (scrollTop > end) return 1;
        return (scrollTop - start) / (end - start);
    }, []);

    const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
        if (typeof value === 'string' && value.includes('%')) {
            return (parseFloat(value) / 100) * containerHeight;
        }
        return parseFloat(value as string);
    }, []);

    const getScrollData = useCallback(() => {
        if (useWindowScroll) {
            return {
                scrollTop: window.scrollY,
                containerHeight: window.innerHeight,
                scrollContainer: document.documentElement
            };
        } else {
            const scroller = scrollerRef.current;
            return {
                scrollTop: scroller!.scrollTop,
                containerHeight: scroller!.clientHeight,
                scrollContainer: scroller!
            };
        }
    }, [useWindowScroll]);

    const getElementOffset = useCallback(
        (element: HTMLElement) => {
            if (useWindowScroll) {
                const rect = element.getBoundingClientRect();
                return rect.top + window.scrollY;
            } else {
                return element.offsetTop;
            }
        },
        [useWindowScroll]
    );

    const calculateOffsets = useCallback(() => {
        if (!cardsRef.current.length) return;

        const endElement = useWindowScroll
            ? (document.querySelector('.scroll-stack-end') as HTMLElement)
            : (scrollerRef.current?.querySelector('.scroll-stack-end') as HTMLElement);

        endElementOffsetRef.current = endElement ? getElementOffset(endElement) : 0;
        cardOffsetsRef.current = cardsRef.current.map((card) => getElementOffset(card));
    }, [useWindowScroll, getElementOffset]);

    const updateCardTransforms = useCallback(() => {
        if (!cardsRef.current.length || isUpdatingRef.current) return;

        isUpdatingRef.current = true;

        const { scrollTop, containerHeight } = getScrollData();
        const stackPositionPx = parsePercentage(stackPosition, containerHeight);
        const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

        const endElementTop = endElementOffsetRef.current;

        cardsRef.current.forEach((card, i) => {
            if (!card) return;

            const cardTop = cardOffsetsRef.current[i] || 0;
            const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
            const triggerEnd = cardTop - scaleEndPositionPx;

            const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
            const targetScale = baseScale + i * itemScale;
            const scale = 1 - scaleProgress * (1 - targetScale);
            const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

            let blur = 0;
            if (blurAmount) {
                let topCardIndex = 0;
                for (let j = 0; j < cardsRef.current.length; j++) {
                    const jCardTop = cardOffsetsRef.current[j] || 0;
                    const jTriggerStart = jCardTop - stackPositionPx - itemStackDistance * j;
                    if (scrollTop >= jTriggerStart) {
                        topCardIndex = j;
                    }
                }

                if (i < topCardIndex) {
                    const depthInStack = topCardIndex - i;
                    blur = Math.max(0, depthInStack * blurAmount);
                }
            }

            const newTransform = {
                scale: scale,
                rotation: rotation,
                blur: blur
            };

            const lastTransform = lastTransformsRef.current.get(i);
            const hasChanged =
                !lastTransform ||
                Math.abs(lastTransform.scale - newTransform.scale) > 0.0001 ||
                Math.abs(lastTransform.rotation - newTransform.rotation) > 0.01 ||
                Math.abs(lastTransform.blur - newTransform.blur) > 0.01;

            if (hasChanged) {
                const transform = `scale(${newTransform.scale}) rotate(${newTransform.rotation}deg) translateZ(0)`;
                const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

                card.style.transform = transform;
                card.style.filter = filter;

                lastTransformsRef.current.set(i, newTransform);
            }

            if (i === cardsRef.current.length - 1) {
                const pinStart = triggerStart;
                const pinEnd = endElementTop - containerHeight / 2;
                const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
                if (isInView && !stackCompletedRef.current) {
                    stackCompletedRef.current = true;
                    onStackComplete?.();
                } else if (!isInView && stackCompletedRef.current) {
                    stackCompletedRef.current = false;
                }
            }
        });

        isUpdatingRef.current = false;
    }, [
        itemScale,
        itemStackDistance,
        stackPosition,
        scaleEndPosition,
        baseScale,
        rotationAmount,
        blurAmount,
        onStackComplete,
        calculateProgress,
        parsePercentage,
        getScrollData
    ]);

    const handleScroll = useCallback(() => {
        if (!animationFrameRef.current) {
            animationFrameRef.current = requestAnimationFrame(() => {
                updateCardTransforms();
                animationFrameRef.current = null;
            });
        }
    }, [updateCardTransforms]);

    useLayoutEffect(() => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        const cards = Array.from(
            useWindowScroll
                ? document.querySelectorAll('.scroll-stack-card')
                : scroller.querySelectorAll('.scroll-stack-card')
        ) as HTMLElement[];

        cardsRef.current = cards;
        const transformsCache = lastTransformsRef.current;

        cards.forEach((card, i) => {
            if (i < cards.length - 1) {
                card.style.marginBottom = `${itemDistance}px`;
            }
            card.style.willChange = 'transform, filter';
            card.style.transformOrigin = 'top center';
            card.style.backfaceVisibility = 'hidden';
            
            // Native CSS Pinning
            card.style.position = 'sticky';
            card.style.top = `calc(${stackPosition} + ${itemStackDistance * i}px)`;
            
            card.style.transform = 'translateZ(0)';
            card.style.webkitTransform = 'translateZ(0)';
            card.style.perspective = '1000px';
            card.style.webkitPerspective = '1000px';
        });

        // Small timeout to ensure DOM layout is settled before calculating offsets
        setTimeout(() => {
            calculateOffsets();
            updateCardTransforms();
        }, 50);

        window.addEventListener('resize', calculateOffsets);
        
        if (useWindowScroll) {
            window.addEventListener('scroll', handleScroll, { passive: true });
        } else {
            scroller.addEventListener('scroll', handleScroll, { passive: true });
        }

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            window.removeEventListener('resize', calculateOffsets);
            if (useWindowScroll) {
                window.removeEventListener('scroll', handleScroll);
            } else {
                scroller.removeEventListener('scroll', handleScroll);
            }
            
            stackCompletedRef.current = false;
            cardsRef.current = [];
            transformsCache.clear();
            isUpdatingRef.current = false;
        };
    }, [
        itemDistance,
        itemStackDistance,
        stackPosition,
        useWindowScroll,
        calculateOffsets,
        handleScroll,
        updateCardTransforms
    ]);

    return (
        <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
            <div className="scroll-stack-inner">
                {children}
                {/* Spacer so the last pin can release cleanly */}
                <div className="scroll-stack-end" />
            </div>
        </div>
    );
};

export default ScrollStack;
