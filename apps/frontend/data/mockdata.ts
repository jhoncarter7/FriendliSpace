

export const specialties = [
  {
    id: '1',
    name: 'Emotional Support',
    description: 'Active listening, empathy, non-judgmental conversation'
  },
  {
    id: '2',
    name: 'Career Advice',
    description: 'Resume review, interview prep, professional guidance'
  },
  {
    id: '3',
    name: 'Life Coaching',
    description: 'Goal setting, accountability, motivation'
  },
  {
    id: '4',
    name: 'Stress Management',
    description: 'Stress relief techniques, coping strategies'
  },
  {
    id: '5',
    name: 'Mindfulness',
    description: 'Guided breathing, meditation prompts'
  },
  {
    id: '6',
    name: 'Companion Role-Play',
    description: 'Platonic role-based interaction, virtual dating simulations'
  }
];

export const mockFriends = [
  {
    id: '1',
    name: 'Sarah Chen',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Certified life coach with 5+ years of experience helping people overcome challenges and find purpose.',
    interests: ['psychology', 'meditation', 'yoga', 'reading'],
    specialties: [specialties[0], specialties[2], specialties[4]],
    rating: 4.9,
    ratePerMinute: 0.75,
    availability: [
      { day: 'Monday', startTime: '09:00', endTime: '17:00' },
      { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
      { day: 'Friday', startTime: '09:00', endTime: '17:00' },
    ],
    isOnline: true,
    totalSessions: 237,
    createdAt: new Date('2022-05-10')
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Former HR manager turned career coach. I help people navigate career transitions and ace interviews.',
    interests: ['career development', 'networking', 'technology', 'business'],
    specialties: [specialties[1], specialties[2]],
    rating: 4.7,
    ratePerMinute: 0.90,
    availability: [
      { day: 'Tuesday', startTime: '10:00', endTime: '19:00' },
      { day: 'Thursday', startTime: '10:00', endTime: '19:00' },
      { day: 'Saturday', startTime: '12:00', endTime: '16:00' },
    ],
    isOnline: false,
    totalSessions: 189,
    createdAt: new Date('2022-03-15')
  },
  {
    id: '3',
    name: 'Jamie Taylor',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Compassionate listener with a background in psychology. I specialize in anxiety and stress management.',
    interests: ['mental health', 'art therapy', 'nature', 'animals'],
    specialties: [specialties[0], specialties[3], specialties[4]],
    rating: 4.8,
    ratePerMinute: 0.65,
    availability: [
      { day: 'Monday', startTime: '16:00', endTime: '22:00' },
      { day: 'Wednesday', startTime: '16:00', endTime: '22:00' },
      { day: 'Sunday', startTime: '10:00', endTime: '18:00' },
    ],
    isOnline: true,
    totalSessions: 312,
    createdAt: new Date('2022-08-05')
  },
  {
    id: '4',
    name: 'David Kim',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Professional companion with expertise in creating comfortable, engaging conversations for all types of people.',
    interests: ['movies', 'travel', 'cooking', 'languages'],
    specialties: [specialties[5], specialties[0]],
    rating: 4.6,
    ratePerMinute: 0.80,
    availability: [
      { day: 'Tuesday', startTime: '18:00', endTime: '23:00' },
      { day: 'Thursday', startTime: '18:00', endTime: '23:00' },
      { day: 'Saturday', startTime: '15:00', endTime: '23:00' },
    ],
    isOnline: true,
    totalSessions: 156,
    createdAt: new Date('2022-10-20')
  },
  {
    id: '5',
    name: 'Aisha Johnson',
    avatar: 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Mindfulness instructor and meditation guide. I help people find peace in their busy lives.',
    interests: ['meditation', 'spirituality', 'nature', 'wellness'],
    specialties: [specialties[4], specialties[3], specialties[2]],
    rating: 4.9,
    ratePerMinute: 0.70,
    availability: [
      { day: 'Monday', startTime: '07:00', endTime: '14:00' },
      { day: 'Wednesday', startTime: '07:00', endTime: '14:00' },
      { day: 'Friday', startTime: '07:00', endTime: '14:00' },
    ],
    isOnline: false,
    totalSessions: 275,
    createdAt: new Date('2022-06-12')
  }
];