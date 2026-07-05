"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { Icon } from "./Icon";

export type Slide = { src: string; label: string };

const GAP = 16;
const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const SPRING = { type: "spring", stiffness: 300, damping: 30 };
const NO_TRANSITION = { duration: 0 };

function CarouselItem({
  item,
  index,
  itemWidth,
  trackItemOffset,
  x,
  transition,
}: {
  item: Slide;
  index: number;
  itemWidth: number;
  trackItemOffset: number;
  x: any;
  transition: any;
}) {
  const range = [
    -(index + 1) * trackItemOffset,
    -index * trackItemOffset,
    -(index - 1) * trackItemOffset,
  ];
  const outputRange = [42, 0, -42];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });
  const [broken, setBroken] = useState(false);
  const showImg = Boolean(item.src) && !broken;
  const itemStyle = { width: itemWidth, rotateY: rotateY };

  return (
    <motion.div className="cr-item" style={itemStyle} transition={transition}>
      <div className="cr-bar">
        <i />
        <i />
        <i />
        <span className="cr-url">{item.label}</span>
      </div>
      <div className="cr-shot">
        {showImg ? (
          <img
            src={item.src}
            alt={item.label}
            draggable={false}
            onError={() => setBroken(true)}
          />
        ) : (
          <div className="cr-ph">
            <Icon slug="terminal" />
            <span>{item.label}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function Carousel({
  slides,
  autoplay = true,
  autoplayDelay = 3500,
  pauseOnHover = true,
  loop = true,
}: {
  slides: Slide[];
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
}) {
  const items = slides;
  const useLoop = loop && items.length > 1;

  const wrapRef = useRef<HTMLDivElement>(null);
  const [baseWidth, setBaseWidth] = useState(0);
  useEffect(() => {
    const measure = () => {
      if (wrapRef.current) setBaseWidth(wrapRef.current.clientWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const containerPadding = 16;
  const itemWidth = Math.max(0, baseWidth - containerPadding * 2);
  const trackItemOffset = itemWidth + GAP;

  const itemsForRender = useMemo(() => {
    if (!useLoop) return items;
    if (items.length === 0) return [];
    return [items[items.length - 1], ...items, items[0]];
  }, [items, useLoop]);

  const [position, setPosition] = useState(useLoop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return;
    const el = containerRef.current;
    const enter = () => setIsHovered(true);
    const leave = () => setIsHovered(false);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return;
    if (pauseOnHover && isHovered) return;
    const timer = setInterval(() => {
      setPosition((prev) => Math.min(prev + 1, itemsForRender.length - 1));
    }, autoplayDelay);
    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

  useEffect(() => {
    const start = useLoop ? 1 : 0;
    setPosition(start);
    x.set(-start * trackItemOffset);
  }, [items.length, useLoop, trackItemOffset, x]);

  useEffect(() => {
    if (!useLoop && position > itemsForRender.length - 1) {
      setPosition(Math.max(0, itemsForRender.length - 1));
    }
  }, [itemsForRender.length, useLoop, position]);

  const effectiveTransition = isJumping ? NO_TRANSITION : SPRING;

  const handleAnimationStart = () => setIsAnimating(true);

  const handleAnimationComplete = () => {
    if (!useLoop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }
    const lastCloneIndex = itemsForRender.length - 1;
    if (position === lastCloneIndex) {
      setIsJumping(true);
      const target = 1;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }
    if (position === 0) {
      setIsJumping(true);
      const target = items.length;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }
    setIsAnimating(false);
  };

  const handleDragEnd = (_e: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const direction =
      offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD
        ? 1
        : offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD
          ? -1
          : 0;
    if (direction === 0) return;
    setPosition((prev) => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  const dragConstraints = {
    left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
    right: 0,
  };
  const dragProps = useLoop ? {} : { dragConstraints };

  const activeIndex =
    items.length === 0
      ? 0
      : useLoop
        ? (position - 1 + items.length) % items.length
        : Math.min(position, items.length - 1);

  const containerStyle = { width: baseWidth ? baseWidth : "100%" };
  const trackStyle = {
    width: itemWidth,
    gap: GAP,
    perspective: 1000,
    perspectiveOrigin:
      (position * trackItemOffset + itemWidth / 2).toString() + "px 50%",
    x,
  };
  const trackAnimate = { x: -(position * trackItemOffset) };

  return (
    <div className="cr" ref={wrapRef}>
      <div className="cr-container" ref={containerRef} style={containerStyle}>
        <motion.div
          className="cr-track"
          drag={isAnimating ? false : "x"}
          {...dragProps}
          style={trackStyle}
          onDragEnd={handleDragEnd}
          animate={trackAnimate}
          transition={effectiveTransition}
          onAnimationStart={handleAnimationStart}
          onAnimationComplete={handleAnimationComplete}
        >
          {itemsForRender.map((item, index) => (
            <CarouselItem
              key={index}
              item={item}
              index={index}
              itemWidth={itemWidth}
              trackItemOffset={trackItemOffset}
              x={x}
              transition={effectiveTransition}
            />
          ))}
        </motion.div>
        {items.length > 1 ? (
          <div className="cr-dots">
            {items.map((_, index) => {
              const dotAnimate = { scale: activeIndex === index ? 1.25 : 1 };
              const dotTransition = { duration: 0.15 };
              const cls = "cr-dot" + (activeIndex === index ? " on" : "");
              return (
                <motion.button
                  type="button"
                  key={index}
                  className={cls}
                  aria-label={"Go to slide " + (index + 1)}
                  animate={dotAnimate}
                  transition={dotTransition}
                  onClick={() => setPosition(useLoop ? index + 1 : index)}
                />
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
