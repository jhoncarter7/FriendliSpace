import { AnimatedTooltipPreview } from "@/components/AnimatedTooltipPreview";
import { Button } from "@/components/ui/button";
import { IconPlayerPlay, IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

const Home = () => {
  return (
    <section className="mx-auto container">
      <div className=" xl:w-1/2 lg:w-4/6 md:w-5/6 w-full mx-auto text-center">
        <p className="text-xl font-semibold text-gray-600/90 ">
          Begin your healing!!
        </p>
        <h1 className="text-3xl sm:text-5xl md:text-6xl/snug font-semibold  ">
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
      <Image alt="" src="/images/hero.avif" width={1920} height={300} className="w-full object-contain h-auto"/>
      </section>
    </section>
  );
};

export default Home;
