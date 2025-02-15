import Link from "next/link"
import { Old_Standard_TT } from "next/font/google"
import YouTubeIcon from "./ui/YouTubeIcon"
import TwitterX from "./ui/TwitterX"
import Instagram from "./ui/Instagram"
import Image from "next/image"

const oldStandardTT = Old_Standard_TT({
  weight: "700",
  variable: "--font-old-standard-tt",
  subsets: ["latin"],
})

export default function Footer() {
  return (
    <footer className="w-full py-10 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 lg:mb-12">
          <div className="space-y-3 lg:-ml-12">
            <Link href="/collection" className="block hover:underline text-center sm:text-left font-raleway text-[20px]">
              COLLECTIONS
            </Link>
            <Link href="/cart" className="block hover:underline text-center sm:text-left font-raleway text-[22px]">
              SHOP
            </Link>
            <Link href="/contact" className="block hover:underline text-center sm:text-left font-raleway text-[22px]">
              CONTACT US
            </Link>
          </div>
          <div className="space-y-3 lg:-ml-20">
            <Link href="/story" className="block hover:underline text-center sm:text-left font-raleway text-[22px]">
              STORY
            </Link>
            <Link href="/sustainability" className="block hover:underline text-center sm:text-left font-raleway text-[22px]">
              SUSTAINABILITY
            </Link>
            <Link href="/about" className="block hover:underline text-center sm:text-left font-raleway text-[22px]">
              ABOUT US
            </Link>
          </div>
          <div className="flex justify-center sm:justify-start items-center gap-3 lg:mt-6 mt-2 sm:mt-0">
            <Link href="#" className="hover:opacity-70">
               <YouTubeIcon/>
            </Link>
            <Link href="#" className="hover:opacity-70">
              <TwitterX/>
            </Link>
            <Link href="#" className="hover:opacity-70">
              <Instagram/>
            </Link>
          </div>
          <div className="flex justify-center items-center gap-4 mt-6 sm:mt-0">
            <Image href="./foot.svg" className="h-32 w-20 bg-slateColor text-center rounded-md  pt-10"/>
            <Image href="./foot2.svg" className="h-32 w-20 bg-slateColor text-center rounded-md  pt-10"/>
            <Image href="./foot3.svg" className="h-32 w-20 bg-slateColor text-center rounded-md  pt-10"/>
          </div>
        </div>
        <div className="lg:mt-5 md:mt-24 mt-1">
          <div className="relative text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center lg:gap-[378px] md:gap-5 gap-5 text-sm lg:-mb-8 mt-7">
              <Link href="#" className="hover:underline cursor-pointer text-xl font-raleway">
                RETURN POLICY
              </Link>
              <Link href="#" className="hover:underline cursor-pointer text-xl font-raleway font-extralight">
                TERMS OF SERVICE
              </Link>
              <Link href="#" className="hover:underline cursor-pointer text-xl lg:mb-2 font-raleway ">
                PRIVACY POLICY
              </Link>
            </div>

            <h1
              className={`${oldStandardTT.variable} w-full max-w-7xl lg:mt-5  sm:text-6xl lg:-ml-20 md:text-7xl lg:text-[210px]  tracking-[auto] sm:tracking-[auto] md:tracking-[auto] lg:tracking-[auto] xl:tracking-[auto] font-extralight stroke-black text-center text-5xl`}
            >
              <span className="relative z-10 text-customRed leading-[247.2px]">G</span>
              <span className="relative z-10 text-customRed leading-[247.2px]">U</span>
              <span className="relative z-10 text-customRed leading-[247.2px]">L</span>
              <span className="relative z-10 text-customRed leading-[247.2px]">B</span>
              <span className="relative z-10 text-customRed leading-[247.2px]">H</span>
              <span className="relative z-10 text-customRed leading-[247.2px]">A</span>
              <span className="relative z-10 text-customRed leading-[247.2px]">H</span>
              <span className="relative z-10 text-customRed leading-[247.2px]">A</span>
              <span className="relative z-10 text-customRed leading-[247.2px]">R</span>
            </h1>
          </div>
        </div>
      </div>
    </footer>
  )
}
