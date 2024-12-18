import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#A020F0] p-8 md:px-[5rem] ">
      <div className="bg-white rounded-lg shadow-lg">
        <div  className="flex justify-center">
        <Image
        src="/images/logo.png" 
        alt="Logo" 
        width={400} 
        height={100} 
       
        />
        </div>
        <div>
            <p className="text-2xl md:text-4xl font-extrabold px-6 md:px-[6rem] py-[2rem] text-center md:text-left">Welcome to the SpringBoard UK Study Fair 2025!</p>
            <p className="text-base md:text-xl px-6 md:px-[6rem] font-medium leading-relaxed text-justify">SpringBoard4Education Cambodia is delighted to welcome you to the registration portal of our SpringBoard UK Study Fair 2025, which will be organized here in Phnom Penh, Cambodia to offer a special chance for students and families who are interested in studying in the UK to connect with delegates representing many of the UK universities and colleges. Listed below are the event details.</p>
            <div className="px-6 md:px-[7rem] pt-6 md:pt-7">
              <ul className="list-disc space-y-2 pl-5 text-base md:text-lg">
              <li><span className="font-semibold">Date:</span> 15th February 2025</li>
              <li><span className="font-semibold">Time:</span> 9:00AM - 5:00PM</li>
              <li><span className="font-semibold">Venue:</span> <a href="https://maps.google.com/?q=Hyatt+Regency+Phnom+Penh" 
                  className="text-[#A020F0] hover:underline" target="_blank">
                  Hyatt Regency Phnom Penh </a> </li>
                 
              </ul>
    
            </div>
            <p className="text-base md:text-xl px-6 md:px-[6rem] pt-6 font-medium leading-relaxed text-justify">The event will serve as a great platform for students/guardians to have direct conversation with many delegates from different colleges and universities in the UK, allowing them to discover more information about course options, admission process, tuition fee, scholarship, accommodation, VISA process, etc. Most importantly, participants will have the chance to receive free-of-charge consultation provided by our experienced team who will help provide useful insight on how to make your study abroad dream a reality.
            We are looking forward to welcoming all of the enthusiastic and potential participants who aim to pursue their higher education in the UK!</p>
           
               <p className="text-xl font-extrabold px-[6rem] whitespace-nowrap py-[3rem]">***Free Entry</p>
        
           
            <p className="text-base md:text-xl font-medium px-6 md:px-[6rem] text-justify ">***Any further information, please contact us: 010 961 861 / 017 961 861 / 070 234 603</p>
            <p className="font-semibold px-6 md:px-[6rem] text-base md:text-xl pt-6 ">Email:
                <a href="mailto:central@springboard4education.com " className="text-[#A020F0] hover:underline">
                central@springboard4education.com </a>
            </p>
            <p className="font-semibold px-6 md:px-[6rem] text-base md:text-xl pt-2">Website:
            <a href="https://www.springboard4education.com/" className="text-[#A020F0] hover:underline">
            www.springboard4education.com </a>
            </p>
     
          

         </div>
         <div className="flex justify-center items-center">
         <Link href={'/register'} className="inline-block bg-[#A020F0] my-[3rem] text-white px-6 py-3 rounded-md text-center text-sm md:text-lg font-bold hover:bg-[#8b1cc4] transition duration-300">Register with us</Link>
         </div>
      </div>
     
    </div>
  );
}
