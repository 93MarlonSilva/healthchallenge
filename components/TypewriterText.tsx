"use client";

import Typewriter from "typewriter-effect";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TypewriterText() {
  const { t } = useLanguage();

  return (
    <div className="text-3xl md:text-5xl font-bold mb-4 md:mt-10 text-[var(--color-purple)]">
      <Typewriter
        options={{
          strings: [t('welcome')],
          autoStart: true,
          loop: false,
          deleteSpeed: 999999,
          cursor: "|",
          wrapperClassName: "text-[var(--color-purple)]",
          delay: 50,
          cursorClassName: "typewriter-cursor"
        }}
      />
      <style jsx global>{`
        .typewriter-cursor {
          display: none;
        }
      `}</style>
    </div>
  );
} 