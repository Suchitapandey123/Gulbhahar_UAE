"use client"
import Image from "next/image"
import Link from "next/link"
import FooterInstagram from "./ui/FooterInstagram"
import FooterYouTube from "./ui/FooterYouTube"
import FooterTwritterX from "./ui/FooterTwitterX"
import Mastercard from "./ui/MasterCard"
import Visa from "./ui/Visa"
import UPI from "./ui/UPI"
import { usePathname } from "next/navigation"

export default function MainFooter() {
  const pathname = usePathname();
  if(pathname==='/'){
    return null;
  }
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full px-6 py-8 bg-footerBgColor">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <div className="space-y-4">
              <Link href="/" className="inline-block">
                <Image
                  src="/footerLogo.svg"
                  alt="Gulbhahar Logo"
                  width={248}
                  height={41}
                  className="h-10 w-auto"
                />
              </Link>
              <div className="flex space-x-3 justify-center">
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <FooterYouTube className="h-5 w-5"/>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                 <FooterTwritterX className="h-5 w-5"/>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <FooterInstagram className="h-5 w-5"/>
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:col-span-6 md:grid-cols-3">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider font-raleway">SHOP</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/collection" className="text-sm text-gray-600 hover:text-gray-900 font-raleway">
                    All collections
                  </Link>
                </li>
                <li>
                  <Link href="/collection" className="text-sm text-gray-600 hover:text-gray-900 font-raleway">
                    Limited Collections
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 font-raleway">
                    Discount
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 font-raleway">
                    Latest
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider font-raleway">COMPANY</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-gray-600 hover:text-gray-900 font-raleway">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 font-raleway">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 font-raleway">
                    Affiliates
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider font-raleway">SUPPORT</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 font-raleway">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 font-raleway">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 font-raleway">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 font-raleway">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 font-raleway">PAYMENT METHODS</h3>
            <div className="flex space-x-4 items-center">
              <Mastercard className="h-[37px] w-[63px]"/>
              <Visa className="w-[64px] h-[64px]"/>
              <UPI className="w-[131px] h-[37px]"/>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
        <p className="text-lg text-black text-center font-raleway ">
      Copyright © {currentYear} Gulbhahar. All rights reserved
    </p>
        </div>
      </div>
    </footer>
  )
}

