import React, { FC } from 'react'




interface OverViewIF {
  interest: String[],

  about: String,
  specialties: String[]
  
}
const OverView: FC<OverViewIF> = ({interest,about, specialties}) => {
  console.log("specialties", specialties) 
  return (
    <div className='space-y-3 '>
      <div className='pt-3'>
        <h1 className='text-xl font-semibold'>About</h1>
        <p className='text-sm'>{about}</p>
      </div>
      <div>
        <h1 className='text-xl font-semibold pb-2'>Interest</h1>
       <div className='flex gap-2'>
       {interest.map((item, id) => (
              <div key={id} className="rounded-2xl bg-amber-300 py-1 px-2 text-xs">
               {item}
              </div>
            ))}
       </div>
      </div>
      <div>
        <h1 className='text-xl font-semibold pb-1'>Specialities</h1>
        <div>
        {specialties.map((item, id) => (
          <div key={id}>
            <h3 className='font-medium'>{item}</h3>
            {/* <p className='text-sm'>{item?.description}</p> */}

          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default OverView