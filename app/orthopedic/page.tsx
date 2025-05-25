import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Orthopedic() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-[60vh] py-8">
        <Image
          src="/assets/images/orthopedic.png"
          alt="Orthopedic"
          width={600}
          height={400}
          className="max-w-full h-auto"
        />
      </main>
      <Footer />
    </>
  );
}
