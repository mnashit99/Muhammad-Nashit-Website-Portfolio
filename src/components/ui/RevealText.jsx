import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export const RevealText = ({
  children,
  className = "",
  tag = "h2",
  delay = 0,
  stagger = 0.04,
}) => {
  const containerRef = useRef(null);
  const Tag = tag;

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const words = containerRef.current.querySelectorAll(".reveal-word");
      if (!words.length) return;

      gsap.fromTo(
        words,
        {
          y: "110%",
          opacity: 0,
          rotateX: 25,
        },
        {
          y: "0%",
          opacity: 1,
          rotateX: 0,
          duration: 1.0,
          stagger,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  // If children is a string, split into words wrapped in overflow-hidden spans
  if (typeof children === "string") {
    const words = children.split(" ");
    return (
      <Tag ref={containerRef} className={`${className} perspective-500`}>
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden pb-1 align-bottom mr-[0.25em]"
          >
            <span className="reveal-word inline-block will-change-transform">
              {word}
            </span>
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={containerRef} className={className}>
      {children}
    </Tag>
  );
};
