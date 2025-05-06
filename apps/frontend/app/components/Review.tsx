import { IconStarFilled } from '@tabler/icons-react';
import React from 'react'
const reviews = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Alex M.',
    rating: 5,
    date: '2 weeks ago',
    content: 'Great conversation! Really helped me work through some difficult emotions I was having. Looking forward to our next session.',
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Priya L.',
    rating: 4,
    date: '1 month ago',
    content: 'Very insightful and patient. Took the time to really understand my situation before offering advice.',
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Rahul P.',
    rating: 5,
    date: '2 months ago',
    content: 'Exactly what I needed. The anonymity features made me feel comfortable opening up.',
  },
];

const Review = () => {
  return (
    <div>
      <div>
                      <div className="flex items-center mb-6">
                        <div className="flex items-center text-yellow-500 mr-4">
                          <IconStarFilled className="fill-current w-6 h-6 mr-1" />
                          <span className="font-bold text-2xl">4.9</span>
                        </div>
                        <div className="text-gray-600">
                          Based on 127  sessions
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        {reviews.map((review) => (
                          <div key={review.id} className="border-b pb-6">
                            <div className="flex justify-between mb-2">
                              <div className="font-medium">{review.userName}</div>
                              <div className="text-gray-500 text-sm">{review.date}</div>
                            </div>
                            <div className="flex text-yellow-400 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <IconStarFilled 
                                  key={i} 
                                  className={`w-4 h-4 ${i < review.rating ? 'fill-current' : ''}`} 
                                />
                              ))}
                            </div>
                            <p className="text-gray-700">{review.content}</p>
                          </div>
                             ))}
                             </div>
                           </div>
                         
    </div>
  )
}

export default Review