import HomePage from "./homepage/page";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";

export default async function Home(){
  const cookieStore=await cookies();
  return(
    <>
    <HomePage/>
    <Footer/>
    </>
  )
}