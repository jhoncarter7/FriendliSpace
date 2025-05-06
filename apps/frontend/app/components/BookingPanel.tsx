"use client"
import React, { useState } from 'react'
import { Card } from './ui/card'
import { IconBadge4k, IconCalendarEvent, IconFlag, IconHeadphones, IconHeart, IconVideo } from '@tabler/icons-react';
import Toggle from './ui/toggle';
import { Button } from './ui/button';

interface BookingPanelIF{
    name: string,
     rate: number,
     ratePerMinute: number
}
const BookingPanel: React.FC<BookingPanelIF> = ({name, rate, ratePerMinute}) => {
  console.log("ratePerMinute", ratePerMinute)
    const formattedRate = rate.toFixed(2);  

  const [blurFace, setBlurFace] = useState(false);
  const [modifyVoice, setModifyVoice] = useState(false);

  const [communicationType, setCommunicationType] = useState<'text' | 'voice' | 'video'>('video');
  return (
    <div className=''>
    <Card className="p-6 sticky top-24">
      <h2 className="text-xl font-semibold mb-4">Connect with {name}</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Communication Type
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button
            className={`flex flex-col items-center justify-center py-3 px-2 rounded-lg border ${
              communicationType === 'text'
                ? ' border-primary text-primary'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setCommunicationType('text')}
          >
            <IconBadge4k  className="h-5 w-5 mb-1" />
            <span className="text-xs">Text</span>
          </button>
          <button
            className={`flex flex-col items-center justify-center py-3 px-2 rounded-lg border ${
              communicationType === 'voice'
                ? ' border-primary text-primary'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setCommunicationType('voice')}
          >
            <IconHeadphones  className="h-5 w-5 mb-1" />
            <span className="text-xs">Voice</span>
          </button>
          <button
            className={`flex flex-col items-center justify-center py-3 px-2 rounded-lg border ${
              communicationType === 'video'
                ? ' border-primary text-primary'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setCommunicationType('video')}
          >
            <IconVideo  className="h-5 w-5 mb-1" />
            <span className="text-xs">Video</span>
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-3">Privacy Settings</h3>
        <div className="space-y-3">
          {communicationType === 'video' && (
            <Toggle
              isChecked={blurFace}
              onChange={setBlurFace}
              label="Blur my face"
              color="accent"
            //   className='bg-primary'
            />
          )}
          {(communicationType === 'voice' || communicationType === 'video') && (
            <Toggle
              isChecked={modifyVoice}
              onChange={setModifyVoice}
              label="Modify my voice"
              color="primary"
            />
          )}
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="font-medium mb-2">Rate</h3>
        <div className="flex items-baseline">
          <span className="font-bold">{ratePerMinute}</span>
          <span className="text-gray-600 ml-1">per minute</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          You're only charged for the time you use
        </p>
      </div>
      
      <Button
        className="mb-3 w-full"
      >
        Start Session Now
      </Button>
      <Button
        variant="outline"
        className="mb-6 w-full"
        
      >
        <IconCalendarEvent  className="h-4 w-4 mr-2" />
      
        Schedule for Later
      </Button>
      <div className="flex justify-between text-gray-600">
        <button className="flex items-center hover:text-primary-600 ">
          <IconHeart  className="h-4 w-4 mr-1" />
          <span className="text-sm">Save</span>
        </button>
        <button className="flex items-center hover:text-error-600">
          <IconFlag className="h-4 w-4 mr-1" />
          <span className="text-sm">Report</span>
        </button>
      </div>
    </Card>
  </div>
  )
}

export default BookingPanel