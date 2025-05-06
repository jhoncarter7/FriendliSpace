"use client"

import BookingPanel from '@/app/components/BookingPanel';
import Profile from '@/app/components/Profile';
import { mockFriends } from '@/data/mockdata';
import { useParams } from 'next/navigation';
import React from 'react'
// import Profile from '../../../components/profile'

const ProfileDetails = () => {
      const { profileId } = useParams<{ profileId: string }>();
      const friend = mockFriends.find(f => f.id === profileId[0]);
    
  return (
    <div className='md:flex justify-between mx-auto px-1 md:px-4 lg:px-8 gap-x-2 md:gap-x-4 lg:gap-x-6 space-y-5'>
       <div className='md:w-4/6'>
       <Profile friend={friend}/>
       </div>
       <div className='md:w-2/5'>
        <BookingPanel name={friend?.name || ''} rate={friend?.rating ?? 0} ratePerMinute={friend?.ratePerMinute ?? 0} />
       </div>
    </div>
  )
}

export default ProfileDetails