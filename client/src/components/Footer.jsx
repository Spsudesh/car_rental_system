import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import Logo from './Logo'  


const Footer = () => {
  return (
     <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10 text-sm text-gray-500'>

            <div className='flex flex-col md:flex-row justify-between items-start gap-8 md:gap-6 pb-6 border-borderColor border-b'>
                {/* Logo & Description - Full width on mobile */}
                <div className='w-full md:w-auto'>
                    <Logo />
                    <p className='max-w-80 mt-3'>
                       Premium car rental service offering a wide range of vehicles for all your travel needs. Experience luxury and comfort on the road with us.
                    </p>
                    <div className='flex items-center gap-3 mt-6'>
                       <a href="#"><img src={assets.facebook_logo} alt='facebook' className = "w-5 h-5 "  /></a>
                       <a href="#"><img src={assets.instagram_logo} alt='instagram' className = "w-5 h-5 "  /></a>
                       <a href="#"><img src={assets.twitter_logo} alt='twitter' className = "w-5 h-5 "  /></a>
                       <a href="#"><img src={assets.gmail_logo} alt='gmail' className = "w-5 h-5 "  /></a>
                       
                    </div>
                </div>

                {/* Quick Links, Resources, Contact - Aligned horizontally */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 w-full md:w-auto'>
                    <div>
                        <h2 className='text-base font-medium text-gray-800 uppercase'>Quick Links</h2>
                        <ul className='mt-3 flex flex-col gap-1.5'>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/cars">Browse Cars</Link></li>
                            <li><a href="#">About Us</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h2 className='text-base font-medium text-gray-800 uppercase'>Resources</h2>
                        <ul className='mt-3 flex flex-col gap-1.5'>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Terms of Services</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Insurance</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h2 className='text-base font-medium text-gray-800 uppercase'>Contact</h2>
                        <ul className='mt-3 flex flex-col gap-1.5'>
                            <li>Near RIT collage </li>
                            <li>Ishwarpur Tal:walwa Dist:sangli</li>
                            <li>+91 1234567890</li>
                            <li>example@gmail.com</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} All rights reserved.</p>
            </div>
        </div>
  )
}

export default Footer
