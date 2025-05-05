"use client"

import Image from "next/image";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "./ui/button";

const NavBar: React.FC = () => {


  return (
   <div className="h-20 font-mono mb-5 container">
     <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeIn" }}
      className="fixed top-0 left-0 w-full z-50 "
    >
      <div className="flex justify-around items-center py-4 h-20  bg-white" >
   
          <div className="relative w-fit">
          <div>
          <Image alt="logo" src="/images/logo.png" width={100} height={100}   />
          </div>
          </div>
    
        <nav>
          <ul className="flex gap-x-6">
            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">Browse</li>
            <li className="cursor-pointer">Dashboard</li>
            <li className="cursor-pointer">Find Friends</li>
            {/* <li className="cursor-pointer">Find Therapist</li> */}
            <li className="cursor-pointer">My Sessions</li>
          </ul>
        </nav>
        <div>
          <ul className="flex gap-x-4">
         
            <Button className="cursor-pointer p-5 bg-[#3B7385] text-md hover:bg-[#305763] rounded-xl">Sign In</Button>

      
              <Button className="cursor-pointer bg-[#3B7385] text-md p-5 hover:bg-[#305763] rounded-xl" >
              Sign Up
              </Button>
     
          </ul>
        </div>
      </div>
    </motion.div>
   </div>
  );
};

export default NavBar;
