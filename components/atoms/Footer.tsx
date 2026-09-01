const KEYS = [
  { num: "120", label: "REVIEWS", href: "#reviews", color: "bg-pink-400" },
  { num: "150", label: "FOR YOU", href: "#foryou", color: "bg-green-400" },
  { num: "180", label: "SCHEDULE", href: "#schedule", color: "bg-yellow-400" },
  { num: "199", label: "SEARCH", href: "#search", color: "bg-cyan-400" },
];

export default function Footer() {
  return (
    <footer className="lg:py-20 md:pb-20 w-full py-7 px-5 lg:px-20 text-white bg-green-800">
      <div className="w-full flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col gap-y-7 items-start">
          {/* <img src="/images/svg/stryda-logo-main-white.svg" 
              className='w-auto h-9 lg:h-10'
              alt=""/> */}
          <div className="lg:text-sm text-sm flex flex-col gap-y-1 py-1">
            <span>© Poplock in collab with dadaman industries.</span>
            <div className="flex flex-row gap-x-1 lg:gap-x-3">
              <span className="text-[#828387] font-semibold">
                All rights reserved. Made with love.
              </span>
              {/* <img src="/images/svg/sweden.svg" className='w-3 lg:w-auto' alt="" /> */}
            </div>
          </div>
          <div className="flex gap-y-1 flex-col">
            {/* <span className="text-xs lg:text-xs text-[#828387] font-semibold py-1">
              Secure payment methods with
            </span> */}
            {/* <img src="/images/payment-providers@2x.png" 
                className='w-72 lg:w-[288px] h-10 lg:h-10'
                alt="" /> */}
          </div>
        </div>
        <div>
          <ul className="grid grid-flow-row mt-12 gap-y-12 md:mt-0 md:auto-cols-max  md:grid-flow-col gap-x-16">
            {/* <li className='flex flex-col gap-y-4'>
                  <strong className='flex gap-x-[2px] lg:gap-x-1  text-white text-[16px] md:text-[15px]'>
                    <span className='bg-[#f3c351] block flex-shrink-0 mr-2 w-1 h-6 bg-main'></span>
                    Company
                  </strong>
                  <ul className='grid gap-y-3 text-[15px] md:text-sm text-[#828387] text-left pl-3 items-center'>
                    <li>
                      <a href="">Jobs</a>
                    </li>
                    <li>
                      <a href="">Investor</a>
                    </li>
                  </ul>
                </li> */}
            {/* <li className="flex flex-col gap-y-4">
              <strong className="flex gap-x-[2px] lg:gap-x-1 text-white text-[16px] md:text-[15px]">
                <span className="bg-[#f3c351] block flex-shrink-0 mr-2 w-1 h-6 bg-main"></span>
                Further Information
              </strong>
              <ul className="grid gap-y-3 text-[15px] md:text-sm text-[#828387] pl-3 items-center text-left">
                <li>
                  <a href="">Terms of service</a>
                </li>
                <li>
                  <a href="">Privacy policy</a>
                </li>
                <li>
                  <a href="">Developer terms</a>
                </li>
                <li>
                  <a href="">Support & FAQ</a>
                </li>
                <li>
                  <a href="">How it works</a>
                </li>
              </ul>
            </li> */}
            <li className="flex flex-col gap-y-4">
              {/* <strong className="flex gap-x-[2px] lg:gap-x-1 text-white text-[16px] md:text-[15px]">
                <span className="bg-[#f3c351] block flex-shrink-0 mr-2 w-1 h-6 bg-main"></span>
                Social
              </strong> */}
              <ul className="md:grid flex gap-x-3 md:gap-x-0 md:gap-y-3 pl-3 items-center">
                {/* <li>
                      <a href=""><FontAwesomeIcon icon={faDiscord} className='w-[22px] h-[22px]'/></a>
                    </li>
                    <li>
                      <a href=""><FontAwesomeIcon icon={faYoutube} className='w-[20px] h-[20px]'/></a>
                    </li>
                    <li>
                      <a href=""><FontAwesomeIcon icon={faTwitter} className='w-[20px] h-[20px]'/></a>
                    </li>
                    <li>
                      <a href=""><FontAwesomeIcon icon={faInstagram} className='w-[20px] h-[20px]'/></a>
                    </li>
                    <li>
                      <a href=""><FontAwesomeIcon icon={faTiktok} className='lg:w-[24px] w-[20px] h-[20px] lg:h-[24px]'/></a>
                    </li>
                    <li>
                      <a href=""><FontAwesomeIcon icon={faLinkedin} className='w-[22px] h-[22px]'/></a>
                    </li> */}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
