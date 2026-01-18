import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Logo = ({ isScrolled, pathname }) => {
  return (
    <div className="flex-1 flex items-center justify-center md:flex-initial">
      <Link href="/" className="relative group">
        <div className="relative flex items-center justify-center px-1 sm:px-6 md:px-8 sm:py-1">
          {/* Logo Image */}
          <div
            className={`
              w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 sm:mr-2 md:mr-3
              flex items-center justify-center transition-all duration-700 ease-out transform relative z-10
              ${pathname === "/" ? "group-hover:scale-105" : ""}
              opacity-100 translate-y-0
            `}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              sizes="(max-width: 600px) 28px, (max-width: 708px) 36px, (max-width: 980px) 42px, 50px"
              className="object-contain"
              priority
            />
          </div>

          {/* GULBHAHAR Text Logo */}
          <span
            className={`
              text-xl sm:text-2xl md:text-4xl lg:text-5xl font-normal sm:tracking-[0.2em]
              transition-all duration-700 ease-out transform relative z-10
              ${pathname === "/" ? "group-hover:scale-105 group-hover:tracking-[0.2em]" : ""}
              ${
                pathname !== "/"
                  ? "text-[#800000]"
                  : isScrolled
                  ? "text-[#800000]"
                  : "text-white"
              }
              opacity-100 translate-y-0
            `}
            style={{ fontFamily: "Old Standard TT, serif" }}
          >
            GULBHAHAR
          </span>

          {/* Effects */}
          <LogoEffects isScrolled={isScrolled} pathname={pathname} />
        </div>
      </Link>
    </div>
  );
};

const LogoEffects = ({ isScrolled, pathname }) => {
  const showEffects = pathname !== "/" || isScrolled;

  return (
    <>
      {/* Magical Particles */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          showEffects ? "opacity-100" : "opacity-0"
        }`}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-red-400/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out"
            style={{
              left: `${20 + i * 8}%`,
              top: `${30 + (i % 3) * 15}%`,
              transitionDelay: `${i * 100}ms`,
            }}
          />
        ))}
      </div>

      {/* Golden Dust Effect */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
          showEffects ? "opacity-100" : "opacity-0"
        }`}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={`dust-${i}`}
            className="absolute w-0.5 h-0.5 bg-yellow-400/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-1200 ease-out animate-pulse"
            style={{
              left: `${25 + i * 10}%`,
              top: `${20 + (i % 4) * 12}%`,
              transitionDelay: `${200 + i * 150}ms`,
              animationDelay: `${i * 300}ms`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      {/* Pulsing Glow */}
      <div
        className={`absolute left-2 right-2 top-1/2 transform -translate-y-1/2 h-12 pointer-events-none transition-opacity duration-500 ${
          showEffects ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-all duration-800 ease-out">
          <div className="w-full h-full bg-gradient-to-r from-red-400/10 via-red-600/20 to-red-400/10 blur-md animate-pulse"></div>
        </div>
      </div>

      {/* Floating Sparkles */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          showEffects ? "opacity-100" : "opacity-0"
        }`}
      >
        {[...Array(4)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute opacity-0 group-hover:opacity-100 transition-all duration-800 ease-out"
            style={{
              left: `${30 + i * 15}%`,
              top: `${15 + (i % 2) * 8}%`,
              transitionDelay: `${500 + i * 200}ms`,
            }}
          >
            <div
              className="w-1 h-1 bg-yellow-300 rounded-full relative animate-ping"
              style={{
                animationDelay: `${i * 400}ms`,
                animationDuration: "2s",
              }}
            >
              <div className="absolute inset-0 bg-yellow-300 rounded-full animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Logo;
