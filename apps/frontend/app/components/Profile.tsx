"use client";
import { IconClock, IconStarFilled } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import OverView from "./OverView";
import Review from "./Review";

const data = Array.from({ length: 2 }, (_, i) => i + 1);
const content = ["Overview", "Reviews"];
const Profile = (friend: any) => {
  const [active, setActive] = React.useState(0);
  const {id, name, avatar, bio, interests, ratePerMinute, rating, totalSessions, specialties} = friend.friend

  return (
    <div className=" rounded-lg px-6 py-4 border-[1px] shadow-md ">
      <div className="flex justify-between pb-6">
        <div className="flex gap-4 items-center">
          <Image
            src={avatar}
            width={50}
            height={50}
            alt="profile image"
            className="rounded-full w-16 h-16 object-cover"
          />
          <div className="flex flex-col gap-2">
            <h1>{name}</h1>
            <div className="flex gap-2">
              {interests.map((item:any) => (
                <div
                  key={item}
                  className="rounded-2xl bg-amber-300 py-1 px-2 text-sm"
                >
                 {item}
                </div>
              ))}
            </div>
            <div className="flex gap-x-2 items-center text-sm text-gray-500">
              <IconClock stroke={2} size={16} />
              <span>$ {ratePerMinute}/min</span>
            </div>
          </div>
        </div>
        <div className="flex gap-x-1">
          <IconStarFilled stroke={2} className="text-yellow-400 " />
          <span>{rating}</span>
          <span>({totalSessions} sessions)</span>
        </div>
      </div>
      <hr />
      <ul className="flex gap-x-6 pt-6">
        {content.map((item, id) => (
          <li key={id} onClick={() => setActive(id)} className="cursor-pointer">
            {item}
            {active === id && <hr className="border-green-500 border-1" />}
          </li>
        ))}
      </ul>
      <div>
        {active === 0 ? (
          <div>
            <OverView  interest={interests}  about={bio} specialties={specialties}/>
          </div>
        ) : (
         <div>
          <Review/>
         </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
