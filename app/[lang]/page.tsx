'use client';

import { useTranslation } from 'react-i18next';
import Header from "@/components/Header";
import Image from "next/image";
import Footer from "@/components/Footer";
import TypewriterText from "@/components/TypewriterText";
import '@/app/i18n';
import { useEffect, useState } from 'react';

export default function Home() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative overflow-hidden">
      <Header />
      <div className="relative">
        <main className="flex flex-col md:flex-row items-center justify-center min-h-[80vh] px-4 text-center md:text-left bg-background gap-4 max-w-7xl mx-auto mt-10 rounded-2xl shadow-2xl overflow-hidden relative z-20">
          <div className="flex-1 max-w-xl relative z-30">
            <TypewriterText />
            <h1 className="text-5xl font-bold mb-20 text-[var(--color-purple)]">
              HealthChallenge
            </h1>
            <p className="text-lg md:text-xl text-[var(--color-semidark)] mb-8 text-justify">
              {t('homeDescription')}
            </p>
          </div>

          {/* Imagem à frente */}
          <div className="flex-1 flex justify-center lg:ml-10 relative" style={{ zIndex: 20 }}>
            <Image
              src="/assets/images/home.png"
              alt="Health Challenge"
              width={700}
              height={500}
              className="object-contain rounded-r-2xl"
              priority
            />
            <div
              className="absolute inset-0 rounded-r-2xl pointer-events-none"
              style={{
                background:
                "linear-gradient(to right, rgba(255,255,255, 0.99) 0.001%, rgba(255,255,255,0.01) 40%, rgba(128, 39, 108, 0.1) 100%)",
                opacity: 1,
                zIndex: 10,
              }}
            />
          </div>
        </main>

        {/* 🟣 Ajustado: Único degradê roxo, full-width, subindo suavemente */}
        <div
          className="absolute bottom-10 left-6 right-6 rounded-[150px] h-[60vh] pointer-events-none z-0"
          style={{
            background:
              "linear-gradient(to top, rgba(128, 39, 108, 0.15) 0%, rgba(128, 39, 108, 0.05) 50%, transparent 100%)",
          }}
        />
      </div>
      <Footer />
    </div>
  );
}