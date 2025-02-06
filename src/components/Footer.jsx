import Link from "next/link"
import { Youtube, Twitter, Instagram } from "lucide-react"
import { Old_Standard_TT } from "next/font/google"

const oldStandardTT = Old_Standard_TT({
  weight: "700",
  variable: "--font-old-standard-tt",
  subsets: ["latin"],
})

export default function Footer() {
  return (
    <footer className="w-full py-12 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Link href="/collection" className="block hover:underline text-center sm:text-left">
              COLLECTIONS
            </Link>
            <Link href="/cart" className="block hover:underline text-center sm:text-left">
              SHOP
            </Link>
            <Link href="/contact" className="block hover:underline text-center sm:text-left">
              CONTACT US
            </Link>
          </div>
          <div className="space-y-4">
            <Link href="/story" className="block hover:underline text-center sm:text-left">
              STORY
            </Link>
            <Link href="/sustainability" className="block hover:underline text-center sm:text-left">
              SUSTAINABILITY
            </Link>
            <Link href="/about" className="block hover:underline text-center sm:text-left">
              ABOUT US
            </Link>
          </div>

          <div className="flex justify-center sm:justify-start items-center gap-6 mt-6 sm:mt-0">
            <Link href="#" className="hover:opacity-70">
              <Youtube className="h-6 w-6" />
              <span className="sr-only">YouTube</span>
            </Link>
            <Link href="#" className="hover:opacity-70">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="hover:opacity-70">
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
          <div className="flex justify-center items-center gap-6 mt-6 sm:mt-0">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 w-20 bg-slate-400 text-center rounded-md opacity-40 pt-10">
                Image {i + 1}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 md:mt-24">
          <div className="relative text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center lg:gap-96 md:gap-5 gap-4 text-sm">
              <Link href="/return-policy" className="hover:underline cursor-pointer text-xl">
                RETURN POLICY
              </Link>
              <Link href="/terms" className="hover:underline cursor-pointer text-xl">
                TERMS OF SERVICE
              </Link>
              <Link href="/privacy" className="hover:underline cursor-pointer text-xl mb-2">
                PRIVACY POLICY
              </Link>
            </div>

            <h1
              className={`${oldStandardTT.variable} text-4xl sm:text-5xl md:text-6xl lg:text-[180px] xl:text-[180px] font-serif tracking-[auto] sm:tracking-[auto] md:tracking-[auto] lg:tracking-[auto] xl:tracking-[auto] font-bold`}
            >
              <span className="relative z-10">G</span>
              <span className="relative z-10">U</span>
              <span className="relative z-10">L</span>
              <span className="relative z-10">B</span>
              <span className="relative z-10">H</span>
              <span className="relative z-10">A</span>
              <span className="relative z-10">H</span>
              <span className="relative z-10">A</span>
              <span className="relative z-10">R</span>
            </h1>
          </div>
        </div>
      </div>
    </footer>
  )
}
