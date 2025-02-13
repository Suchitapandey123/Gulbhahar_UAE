// 'use client';

// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

// const Breadcrumb = ({data}) => {
//   const [isClient, setIsClient] = useState(false);
//   const router = useRouter();
//   const path = router.pathname;

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isClient) {
//     return null;
//   }

//   console.log(data.name)

//   return (
//     <nav aria-label="breadcrumb">
//         <div className='flex items-center mt-12 gap-1'>
//           <span><Link href="/" className='text-black font-raleway text-lg'>Home</Link></span> &nbsp;
//           <span>&gt;</span> 
//           <span><Link href="/collection" className='text-customRed text-lg mRed font-raleway'>Collection</Link></span>
//           <span>&gt;</span>
//           <span><Link href="/collection" className='text-customRed text-lg mRed font-raleway'>{data.name}</Link></span>
//         </div>
//     </nav>
//   );
// };

// export default Breadcrumb;
