import Header from "@/components/Header";
import Image from "next/image";
import Footer from "@/components/Footer";
import TypewriterText from "@/components/TypewriterText";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col md:flex-row items-center justify-center min-h-[70vh] px-4 text-center md:text-left bg-background gap-4 max-w-7xl mx-auto">
        <div className="flex-1 max-w-xl">
          <TypewriterText />
          <h1 className="text-5xl font-bold mb-20 text-[var(--color-purple)]">
            HealthChallenge
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-semidark)] mb-8 text-justify">
            O HealthChallenge é uma aplicação dedicada à promoção da saúde e do bem-estar. Aqui você encontra informações, produtos e recursos para cuidar melhor do seu corpo e da sua qualidade de vida. Explore nossas soluções ortopédicas e descubra como podemos ajudar você a viver com mais conforto e saúde!
          </p>
        </div>
        <div className="flex-1 flex justify-center lg:ml-10 relative">
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
                "linear-gradient(to right, rgba(255,255,255, 0.99) 0.001%, rgba(255,255,255,0.15) 40%, rgba(128, 39, 108, 0.15) 100%)",
              opacity: 1,
              zIndex: 10,
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
