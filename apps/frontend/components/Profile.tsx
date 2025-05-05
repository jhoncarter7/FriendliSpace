import { IconClock } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

const data = Array.from({ length: 2 }, (_, i) => i + 1);

const Profile = () => {
  return (
    <div>
      <div>
        <Image
          src="/images/profile.jpg"
          width={50}
          height={50}
          alt="profile image"
          className="rounded-full w-16 h-16"
        />
        <div>
          <h1>Name</h1>
          <div className="flex gap-2">
            {data.map((item) => (
              <div key={item} className="rounded-2xl bg-amber-300">
                {item}
              </div>
            ))}
          </div>
          <div className="flex gap-x-2 items-center text-sm text-gray-500">
            <IconClock stroke={2} size={16} />
            <span>rate/min</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
