
import React from 'react'
import Card from '../components/Card';
import { mockFriends } from '@/data/mockdata';



const page = () => {
  
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
       { mockFriends.map((item, id) =>
    
        <Card key={id}  profileImg={item.avatar} name={item.name} rate={item.rating} sessions={item.totalSessions}  ratePerMin={item.ratePerMinute} specialties={item.specialties as  []} bio={item.bio}/>
       )}
        </div>
    </div>
  )
}

export default page