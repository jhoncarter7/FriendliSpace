import Card from '@/components/Card'
import React from 'react'

// generate some dummy array data
const data = Array.from({ length: 10 }, (_, i) => i + 1);

const page = () => {
  return (
    <div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4'>
       { data.map((item) =>
    
        <Card key={item} />
       )}
        </div>
    </div>
  )
}

export default page