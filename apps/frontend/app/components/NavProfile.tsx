"use client";

import { authStore } from "@/lib/store/store";
import { useStore } from "@tanstack/react-store";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { Api } from "@/lib/api";
import { GetUserProfileType } from "@repo/common/types"
export default function NavProfile() {
  const { isAuthenticated, user, logout } = useStore(authStore, (s) => s);
  const navigate = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [profile, setProfile] = useState<GetUserProfileType["profile"] | null>(null)
  useEffect(() => {
    const fetchUserProfile = async () => {
      const resp = await axios.get(`${Api.GETCURRENTUSERPROFILE}`, { withCredentials: true })

      setProfile(resp.data.profile)
    }
    fetchUserProfile()
  }, [])
  const logoutHandler = () => {
    logout();
    navigate.push("/signin");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowDropdown(true)}
    >
      <div className="cursor-pointer p-2 rounded-full hover:bg-gray-100">
        <Image src={profile?.avatarUrl as string} width={100} height={100} alt="Profile" className="w-8 h-8 rounded-full" />
      </div>
      {showDropdown && (
        <div
          className="absolute space-y-2 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div className="px-4 py-2 text-sm text-gray-700">
            Hello, {profile?.displayName}
            {/* Hello, {profile?.user?.name} */}
          </div>
          <div className="border-t border-gray-200" />
          <Button
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 bg-white hover:bg-gray-100"
            onClick={() => navigate.push("/updateProfile")}
          >
            Profile
          </Button>
          <Button
            className="cursor-pointer p-5 rounded-xl mx-auto"
            onClick={logoutHandler}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}
