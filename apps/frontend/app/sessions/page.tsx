"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IconCalendarEvent, 
  IconClock, 
  IconVideo, 
  IconPhone, 
  IconMessage, 
  IconChevronLeft, 
  IconChevronRight,
  IconFilter,
  IconCheck,
  IconX,
  IconLoader
} from '@tabler/icons-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import axios from 'axios';
import { Api } from '@/lib/api';
import { toast } from 'react-toastify';
import { useStore } from '@tanstack/react-store';
import { authStore } from '@/lib/store/store';

interface Session {
  id: string;
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  communicationType: 'VIDEO' | 'VOICE' | 'TEXT';
  createdAt: string;
  startTime?: string;
  endTime?: string;
  durationMinutes?: number;
  seeker: {
    id: string;
    profile: {
      displayName: string;
      avatarUrl?: string;
    };
  };
  friend: {
    id: string;
    profile: {
      displayName: string;
      avatarUrl?: string;
    };
  };
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  limit: number;
}

const SessionsPage = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useStore(authStore, (state) => state);

  const fetchSessions = async (page = 1, status?: string) => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10'
      });
      
      if (status && status !== 'all') {
        if (status === 'upcoming') {
          params.append('status', 'PENDING');
        } else if (status === 'completed') {
          params.append('status', 'COMPLETED');
        }
      }

      const response = await axios.get(`${Api.GET_SESSIONS}?${params}`, {
        withCredentials: true
      });

      setSessions(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      toast.error('Failed to fetch sessions');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions(currentPage, activeTab);
  }, [currentPage, activeTab]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ACTIVE':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <IconClock className="w-4 h-4" />;
      case 'ACTIVE':
        return <IconLoader className="w-4 h-4 animate-spin" />;
      case 'COMPLETED':
        return <IconCheck className="w-4 h-4" />;
      case 'CANCELLED':
        return <IconX className="w-4 h-4" />;
      default:
        return <IconClock className="w-4 h-4" />;
    }
  };

  const getCommunicationIcon = (type: string) => {
    switch (type) {
      case 'VIDEO':
        return <IconVideo className="w-4 h-4" />;
      case 'VOICE':
        return <IconPhone className="w-4 h-4" />;
      case 'TEXT':
        return <IconMessage className="w-4 h-4" />;
      default:
        return <IconVideo className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getOtherParticipant = (session: Session) => {
    return user?.id === session.seeker.id ? session.friend : session.seeker;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Sessions</h1>
        <p className="text-gray-600">Manage your therapy sessions and track your progress</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          {[
            { key: 'all', label: 'All Sessions' },
            { key: 'upcoming', label: 'Upcoming' },
            { key: 'completed', label: 'Completed' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key as any);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-white text-[#3B7385] shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sessions List */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <IconLoader className="w-8 h-8 animate-spin text-[#3B7385]" />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {sessions.length === 0 ? (
              <Card className="p-8 text-center">
                <IconCalendarEvent className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions found</h3>
                <p className="text-gray-600">
                  {activeTab === 'upcoming' 
                    ? "You don't have any upcoming sessions scheduled."
                    : activeTab === 'completed'
                    ? "You haven't completed any sessions yet."
                    : "You don't have any sessions yet."
                  }
                </p>
              </Card>
            ) : (
              sessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 bg-[#3B7385] rounded-full flex items-center justify-center text-white font-semibold">
                          {getOtherParticipant(session).profile.avatarUrl ? (
                            <img
                              src={getOtherParticipant(session).profile.avatarUrl}
                              alt={getOtherParticipant(session).profile.displayName}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            getOtherParticipant(session).profile.displayName.charAt(0).toUpperCase()
                          )}
                        </div>

                        {/* Session Info */}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Session with {getOtherParticipant(session).profile.displayName}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <div className="flex items-center space-x-1">
                              <IconCalendarEvent className="w-4 h-4" />
                              <span>{formatDate(session.createdAt)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {getCommunicationIcon(session.communicationType)}
                              <span>{session.communicationType}</span>
                            </div>
                            {session.durationMinutes && (
                              <div className="flex items-center space-x-1">
                                <IconClock className="w-4 h-4" />
                                <span>{formatDuration(session.durationMinutes)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        {/* Status Badge */}
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(session.status)}`}>
                          {getStatusIcon(session.status)}
                          <span>{session.status}</span>
                        </span>

                        {/* Action Buttons */}
                        {session.status === 'PENDING' && (
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              Reschedule
                            </Button>
                            <Button size="sm" className="bg-[#3B7385] hover:bg-[#305763]">
                              Join
                            </Button>
                          </div>
                        )}
                        {session.status === 'COMPLETED' && (
                          <Button size="sm" variant="outline">
                            Leave Review
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <IconChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <span className="text-sm text-gray-600">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(pagination.totalPages, currentPage + 1))}
            disabled={currentPage === pagination.totalPages}
          >
            Next
            <IconChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SessionsPage;