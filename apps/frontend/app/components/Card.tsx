"use client"
import { IconClock, IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import React, { FC } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";



interface CardProps {
  profileImg: string;
  name: string;
  rating: number;
  sessions: number;
  ratePerMin: number;
  bio: string;
  specialties: string[];
}

const Card: FC<CardProps> = ({ profileImg, name, rating, sessions, ratePerMin, specialties, bio}) => {
  const navigate = useRouter();
  console.log("bio", rating, ratePerMin)
  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4 flex flex-col gap-4">
      {/* 1 */}
      <div className="flex gap-2 justify-between">
        <div className="flex gap-x-4">
          <Image
            alt="image"
            src={profileImg ?? "https://avatar.iran.liara.run/public/24"}
            width={50}
            height={50}
            className="rounded-full w-16 h-16 object-cover"
          />
          <div>
            <h3>{name}</h3>
            <div className="flex gap-x-2 items-center text-sm text-gray-500">
              <IconClock stroke={2} size={16} />
              <span>${ratePerMin}/min</span> .<span>{sessions ?? 0} sessions</span>
            </div>
          </div>
        </div>
        <div className="flex gap-1 ">
          <IconStarFilled stroke={2} className="text-yellow-400" />
          <span className="font-semibold">{rating}</span>
        </div>
      </div>

      {/* 2 */}
      <div>
        <p className="text-sm ">
          {bio}
        </p>
      </div>
      {/* 3 */}
      <div className="flex gap-2 flex-wrap">
        {specialties?.map((item, id) => (
          <span
            key={id}
            className="bg-gray-200 px-2 py-1 text-xs rounded-2xl "
          >
            {item}
          </span>
        ))}
      </div>
      {/* 4 */}
      <div className="flex gap-2 justify-between">
        <Button className="w-5/12 bg-[#3B7385]">Connect</Button>
        <Button
          className="w-5/12 bg-white text-black border"
          onClick={() => navigate.push("/profile/1")}
        >
          View Profile
        </Button>
      </div>
    </div>
  );
};

export default Card;
