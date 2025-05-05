import { AnimatedTooltipPreview } from "@/components/AnimatedTooltipPreview";
import { Button } from "@/components/ui/button";
import {
  IconBulb,
  IconCarambola,
  IconHearts,
  IconPlayerPlay,
  IconStarFilled,
} from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <section className="mx-auto container">
      <div className=" xl:w-[52%] md:w-4/6 w-full mx-auto text-center">
        <p className="text-xl font-semibold text-gray-600/90 ">
          Begin your healing!!
        </p>
        <h1 className="text-3xl sm:text-5xl md:text-6xl/tight font-semibold  ">
          A safe space for healing & personal growth
        </h1>
      </div>

      <div className="flex items-center justify-center gap-x-4 md:w-1/2 mx-auto pt-5">
        <Button className="cursor-pointer bg-[#3B7385] text-md p-5 hover:bg-[#305763] rounded-xl">
          Get Started
        </Button>
        <div className="flex gap-x-2 text-gray-600 font-semibold items-center">
          <div className="rounded-full p-2 shadow-lg cursor-pointer">
            <IconPlayerPlay stroke={2} />
          </div>
          <p>Watch Video</p>
        </div>
      </div>

      <div className="pt-12 flex gap-x-6 md:w-1/2  justify-center align-middle mx-auto ">
        <div className="my-auto">
          <AnimatedTooltipPreview />
        </div>
        <div className="">
          <p className="font-semibold text-gray-400 text-sm pb-1 ">
            Our Happy Guests
          </p>
          <p className="flex gap-x-2 font-semibold">
            {" "}
            <span>
              <IconStarFilled stroke={2} />
            </span>{" "}
            <span> 4.8 </span> <span>(2,382 reviews)</span>
          </p>
        </div>
      </div>

      <section className="w-[95%] mx-auto overflow-hidden rounded-2xl">
        <Image
          alt=""
          src="/images/hero.avif"
          width={1920}
          height={300}
          className="w-full object-contain h-auto"
        />
      </section>

      {/* introduction */}
      <div className="pt-12 md:pt-22 mx-auto text-center">
        <p className="text-lg font-semibold text-gray-400/90 pb-4">
          Introduction
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl/tight lg:text-6xl/tight font-semibold  xl:w-[63%] md:9/12 lg:w-5/6 w-full mx-auto">
          Welcome to a space dedicated to your well-being.
        </h1>
        <div className="flex justify-between gap-x-4 w-full sm:w-11/12  lg:w-4/5 mx-auto pt-18">
          <div className="space-y-4 p-2">
            <div className="flex items-center justify-center w-12 h-12 bg-[#3B7385] rounded-3xl  mx-auto">
              <IconHearts className="text-white" strokeWidth={2} size={24} />
            </div>
            <p className="text-xl font-medium text-gray-600/90">
              Training programs and coaching sessions tailored to your workforce
              & ideas.
            </p>
          </div>
          <div  className="space-y-4 p-2">
            <div className="flex items-center justify-center w-12 h-12 bg-[#3B7385] rounded-3xl mx-auto">
              <IconCarambola className="text-white" stroke={2} />
            </div>
            <p className="text-xl font-medium text-gray-600/90">
              Comprehensive and engaging sessions designed to meet the unique
              needs of team.
            </p>
          </div>
          <div  className="space-y-4 p-2">
            <div className="flex items-center justify-center w-12 h-12 bg-[#3B7385] rounded-3xl  mx-auto">
              <IconBulb className="text-white" stroke={2} />
            </div>
            <p className="text-xl font-medium text-gray-600/90">
              Innovative strategies and ideas crafted to individuals and
              organizational success.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
