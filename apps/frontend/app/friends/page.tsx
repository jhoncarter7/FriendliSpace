"use client";

import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import axios from 'axios';
import { Api } from '@/lib/api';
import { IconSearch, IconFilter, IconStar, IconMap, IconGridDots, IconList, IconChevronRight, IconChevronLeft } from '@tabler/icons-react';
import { Button } from '../components/ui/button';
import { CardAction } from '../components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '../components/ui/input';

const FriendList = () => {
  const [friendList, setFriendList] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchFriendList = async () => {
      setIsLoading(true);
      try {
        const resp = await axios.get(`${Api.FRIENDLIST}`, {
          withCredentials: true
        });
        setFriendList(resp.data.data);
        setPagination(resp.data.pagination);
      } catch (error) {
        console.error("Failed to fetch friends:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFriendList();
  }, []);
  
  const filterOptions = [
    { id: 'mental-health', label: 'Mental Health' },
    { id: 'career', label: 'Career' },
    { id: 'relationships', label: 'Relationships' },
    { id: 'finance', label: 'Finance' },
    { id: 'fitness', label: 'Fitness' }
  ];
  
  return (
    <div className="bg-gradient-to-b from-[#f8f9fb] to-white min-h-screen">
      {/* Hero section with animation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-[#3B7385] text-white py-16 px-4 md:px-8 lg:px-16 mb-8 rounded-b-3xl overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              d="M0,0 L100,0 L100,100 L0,100 Z" 
              fill="url(#grid)" 
              stroke="white" 
              strokeWidth="0.5"
            />
          </svg>
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
        </div>
        
        <motion.div 
          className="relative z-10 max-w-5xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Find Your Perfect Friend
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl mb-8 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Connect with professionals who can help you navigate life's challenges.
          </motion.p>
          
          <motion.div 
            className="flex flex-col md:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="flex flex-1 relative">
              <Input 
                type="text" 
                placeholder="Search by name, specialty, or keyword..." 
                className="w-full py-6 px-5 pl-12 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2a5561] border-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IconSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            </div>
            <Button className="bg-white text-[#3B7385] hover:bg-[#f0f0f0] py-2 px-6 rounded-xl flex items-center justify-center font-medium h-12 border-0">
              <IconFilter className="mr-2" size={18} />
              Filters
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Filter chips */}
      <motion.div 
        className="container mx-auto px-4 md:px-8 lg:px-16 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        <div className="flex flex-wrap gap-3">
          {filterOptions.map((filter) => (
            <motion.div
              key={filter.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(activeFilter === filter.id ? null : filter.id)}
              className={`px-4 py-2 rounded-full cursor-pointer transition-all duration-200 ${
                activeFilter === filter.id 
                  ? 'bg-[#3B7385] text-white' 
                  : 'bg-white text-[#3B7385] border border-[#3B7385]'
              }`}
            >
              {filter.label}
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      {/* Main content */}
      <motion.div 
        className="container mx-auto px-4 md:px-8 lg:px-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        {/* Controls and stats */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600">Showing {friendList?.length || 0} friends</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 shadow-sm border-0 rounded-xl bg-white">
              <span className="text-gray-600">Sort by:</span>
              <select 
                className="bg-transparent border-none text-[#3B7385] font-medium focus:outline-none cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Rating</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="sessions">Most Sessions</option>
              </select>
            </div>
            
            <CardAction className="flex p-0 shadow-sm border-0">
              <Button 
                variant="ghost" 
                className={`px-3 py-2 ${viewMode === 'grid' ? 'text-[#3B7385]' : 'text-gray-400'}`}
                aria-label="Grid view"
                onClick={() => setViewMode('grid')}
              >
                <IconGridDots size={20} />
              </Button>
              <Button 
                variant="ghost"
                className={`px-3 py-2 ${viewMode === 'list' ? 'text-[#3B7385]' : 'text-gray-400'}`}
                aria-label="List view"
                onClick={() => setViewMode('list')}
              >
                <IconList size={20} />
              </Button>
            </CardAction>
          </div>
        </motion.div>
        
        {/* Friend cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-lg h-64 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div 
              key={viewMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "flex flex-col gap-4"
              }
            >
              {friendList?.map((item: any, id: number) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: id * 0.1 }}
                  whileHover={{ y: -2,  }}
                >
                  <Card
                    id={item.userId}
                    profileImg={item?.user?.profile?.avatarUrl}
                    name={item?.user?.profile?.displayName}
                    rating={item?.user?.friendProfile?.averageRating}
                    sessions={item?.user?.friendProfile?.totalSessions}
                    ratePerMin={item?.user?.friendProfile?.perMinuteRate}
                    specialties={item.specialties as []}
                    bio={item?.user?.profile?.bio}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
        
        {/* Pagination */}
        {pagination && (
          <motion.div 
            className="flex justify-center mt-12 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-[#3B7385] hover:text-white hover:border-[#3B7385] transition-colors"
              >
                <IconChevronLeft size={16} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-[#3B7385] text-white flex items-center justify-center"
              >
                1
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-[#3B7385] hover:text-white hover:border-[#3B7385] transition-colors"
              >
                2
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-[#3B7385] hover:text-white hover:border-[#3B7385] transition-colors"
              >
                3
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-[#3B7385] hover:text-white hover:border-[#3B7385] transition-colors"
              >
                <IconChevronRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default FriendList;