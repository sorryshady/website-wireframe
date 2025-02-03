import React, { useRef, useState, useCallback, useEffect } from "react";

interface TextTrialProps {
  children: string;
  className?: string;
  playOnMount?: boolean;
  disableHover?: boolean;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;

const TextTrial = ({
  children,
  className = "",
  playOnMount = false,
  disableHover = false,
}: TextTrialProps) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [displayText, setDisplayText] = useState(children);

  const stopScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(children);
  }, [children]);

  const scramble = useCallback(() => {
    let pos = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const scrambled = children
        .split("")
        .map((char, index) => {
          if (char === " " || pos / CYCLES_PER_LETTER > index) return char;
          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          return CHARS[randomCharIndex];
        })
        .join("");

      setDisplayText(scrambled);
      pos++;

      if (pos >= children.length * CYCLES_PER_LETTER) stopScramble();
    }, SHUFFLE_TIME);
  }, [children, stopScramble]);

  // Play animation on mount if enabled
  useEffect(() => {
    if (playOnMount) {
      scramble();
    }
  }, [playOnMount, scramble]);

  return (
    <span
      className={`inline-block font-mono ${className}`}
      {...(!disableHover && {
        onMouseEnter: scramble,
        onMouseLeave: stopScramble,
      })}
    >
      {displayText}
    </span>
  );
};

export default TextTrial;
