"use client"
import { IconClock, IconStarFilled, IconMessage, IconUserCircle } from "@tabler/icons-react";
import Image from "next/image";
import React, { FC } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface CardProps {
  id: string
  profileImg: string;
  name: string;
  rating: number;
  sessions: number;
  ratePerMin: number;
  bio: string;
  specialties: string[];
}

const Card: FC<CardProps> = ({id, profileImg, name, rating, sessions, ratePerMin, specialties, bio}) => {
  const navigate = useRouter();
  
  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      {/* Header with background accent */}
      <div className="relative h-24 bg-gradient-to-r from-[#3B7385] to-[#5c9fb7]">
        <div className="absolute -bottom-12 left-6 ring-4 ring-white rounded-full overflow-hidden shadow-lg">
          <Image
            alt={`${name}'s profile photo`}
            src={profileImg ?? "https://avatar.iran.liara.run/public/24"}
            width={80}
            height={80}
            className="w-24 h-24 object-cover"
          />
        </div>
        
        {/* Rating badge */}
        <motion.div 
          className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1 flex items-center gap-1 shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <IconStarFilled size={16} className="text-yellow-400" />
          <span className="font-semibold">{rating?.toFixed(1) || "New"}</span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="pt-16 px-6 pb-6">
        {/* Name and price */}
        <div className="mb-4 flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <IconClock size={14} />
              <span>{sessions ?? 0} sessions completed</span>
            </div>
          </div>
          <div className="bg-[#f8fafc] px-3 py-1 rounded-lg text-[#3B7385] font-semibold">
            ${ratePerMin}/min
          </div>
        </div>

        {/* Bio with truncation */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 line-clamp-2">
            {bio || "No bio available"}
          </p>
        </div>

        {/* Specialties */}
        <div className="flex gap-2 flex-wrap mb-6">
          {specialties?.slice(0, 3).map((item, id) => (
            <motion.span
              key={id}
              className="bg-[#f0f7fa] text-[#3B7385] px-3 py-1 text-xs font-medium rounded-full border border-[#e1eef3]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
            </motion.span>
          ))}
          {specialties?.length > 3 && (
            <span className="bg-[#f0f7fa] text-[#3B7385] px-3 py-1 text-xs font-medium rounded-full border border-[#e1eef3]">
              +{specialties.length - 3} more
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <motion.div 
            className="flex-1"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button 
              className="w-full py-5 bg-[#3B7385] hover:bg-[#2a5561] transition-colors rounded-xl shadow-sm flex items-center justify-center gap-2"
              onClick={() => navigate.push(`/chat/${id}`)}
            >
              <IconMessage size={18} />
              Connect
            </Button>
          </motion.div>
          
          <motion.div
            className="flex-1"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              className="w-full py-5 bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-xl shadow-sm flex items-center justify-center gap-2"
              onClick={() => navigate.push(`/profile/${id}`)}
            >
              <IconUserCircle size={18} />
              View Profile
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
