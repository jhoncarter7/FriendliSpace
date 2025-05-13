
import React from 'react'
import Card from '../components/Card';
import { mockFriends } from '@/data/mockdata';
import axios from 'axios';
import { Api } from '@/lib/api';



const FriendList = async () => {
  const resp = await axios.get(`${Api.FRIENDLIST}`, {
    withCredentials: true
  });
  const friendList = resp.data.data;
  const pagination = resp.data.pagination;
  console.log("friendList", friendList)
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 px-2 md:px-8 lg:px-16'>
        {friendList?.map((item: any, id: any) =>

          <Card key={id} profileImg={item?.user?.profile?.avatarUrl}
            name={item?.user?.profile?.displayName}
            rating={item?.user?.friendProfile?.averageRating}
            sessions={item?.user?.friendProfile?.totalSessions}
            ratePerMin={item?.user?.friendProfile?.perMinuteRate}
            specialties={item.specialties as []}
            bio={item?.user?.profile?.bio}
            
                
                />
        )}
      </div>
    </div>
  )
}

export default FriendList