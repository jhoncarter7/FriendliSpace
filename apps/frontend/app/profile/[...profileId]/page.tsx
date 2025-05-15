"use client"

import BookingPanel from '@/app/components/BookingPanel';
import Profile from '@/app/components/Profile';
import { mockFriends } from '@/data/mockdata';
import { Api } from '@/lib/api';
import { GetUserProfileType } from '@repo/common/types';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useMemo, useState } from 'react'
// import Profile from '../../../components/profile'

const ProfileDetails = () => {
  const { profileId } = useParams<{ profileId: string }>();
  const [friendProf, setFriendProf] = useState<GetUserProfileType>()
  const friend = mockFriends.find(f => f.id === profileId[0]);
  console.log(profileId)
  useMemo(() => {
    const fetchfriendProfile = async () => {
      try {
        const resp = await axios.get(`${Api.GETUSERPROFILEBYID}/${profileId}/profile`, { withCredentials: true });
        if (resp.status === 200 ) {
          setFriendProf(resp.data);
        }
      } catch (error: any) {
        // Check if error is an AxiosError to provide more details
        if (axios.isAxiosError(error)) {
          console.error("API error:", error.response?.data || error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    }
    fetchfriendProfile()
  }, [])

  if (!friendProf) {
    return <div>Loading or error loading the profile...</div>;
  }

  const {id} = friendProf
  const { averageRating, hourlyRate, isVerified, perMinuteRate, specialties, totalReviews, totalSessions } = friendProf?.friendProfile
  const { avatarUrl, bio, displayName, gender, interests } = friendProf.profile;
  console.log(specialties, "hourlyRate")
  return (
    <div className='md:flex justify-between mx-auto px-1 md:px-4 lg:px-8 gap-x-2 md:gap-x-4 lg:gap-x-6 space-y-5'>
      <div className='md:w-4/6'>
        <Profile id={id} name={displayName} avatar={avatarUrl || ''} bio={bio} interests={interests} ratePerMinute={perMinuteRate} rating={averageRating} totalSessions={totalSessions} specialties={specialties} />
      </div>

      <div className='md:w-2/5'>
        <BookingPanel name={displayName || ''} rate={averageRating} ratePerMinute={perMinuteRate} />
      </div>
    </div>
  )
}

export default ProfileDetails