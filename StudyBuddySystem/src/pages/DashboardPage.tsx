import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { Calendar, Clock, Users, MessageSquare, ChevronRight, UserPlus, AlertCircle, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const DashboardPage: React.FC = () => {
  const { user, studySessions, connections } = useUser();
  const [activeTab, setActiveTab] = useState('upcoming');

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          <p className="text-center text-gray-700">
            Please log in to view your dashboard.
          </p>
          <Link 
            to="/login" 
            className="mt-4 block w-full text-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const upcomingSessions = studySessions.filter(
    session => new Date(session.date) >= new Date()
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const pastSessions = studySessions.filter(
    session => new Date(session.date) < new Date()
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  const pendingConnections = connections.filter(
    connection => connection.status === 'pending'
  );
  
  const activeConnections = connections.filter(
    connection => connection.status === 'active'
  );

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.fullName}!</h1>
          <p className="text-gray-600 mt-2">Your study dashboard and activity overview</p>
        </div>
        
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                <Calendar className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Upcoming Sessions</p>
                <p className="text-xl font-bold text-gray-800">{upcomingSessions.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                <Clock className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Hours Studied</p>
                <p className="text-xl font-bold text-gray-800">{pastSessions.reduce((total, session) => total + session.duration, 0)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Active Buddies</p>
                <p className="text-xl font-bold text-gray-800">{activeConnections.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Unread Messages</p>
                <p className="text-xl font-bold text-gray-800">4</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Upcoming Study Sessions */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Study Sessions</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  activeTab === 'upcoming' 
                    ? 'bg-indigo-100 text-indigo-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Upcoming
              </button>
              <button 
                onClick={() => setActiveTab('past')}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  activeTab === 'past' 
                    ? 'bg-indigo-100 text-indigo-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Past
              </button>
            </div>
          </div>
          
          {activeTab === 'upcoming' ? (
            <>
              {upcomingSessions.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {upcomingSessions.map((session) => (
                    <div key={session.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="bg-indigo-100 text-indigo-800 rounded-lg p-3">
                          <Calendar className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{session.title}</h3>
                          <p className="text-gray-600">{session.subject}</p>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{format(new Date(session.date), 'MMM d, yyyy • h:mm a')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0 flex items-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          session.mode === 'online' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {session.mode}
                        </span>
                        <button className="ml-4 text-indigo-600 hover:text-indigo-500">
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No upcoming study sessions</p>
                  <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors inline-flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule a Session
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {pastSessions.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {pastSessions.map((session) => (
                    <div key={session.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                          <Calendar className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{session.title}</h3>
                          <p className="text-gray-600">{session.subject}</p>
                          <div className="mt-1 flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{format(new Date(session.date), 'MMM d, yyyy • h:mm a')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0 flex items-center">
                        {session.completed ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Check className="h-3 w-3 mr-1" />
                            Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                            Missed
                          </span>
                        )}
                        <button className="ml-4 text-indigo-600 hover:text-indigo-500">
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500">No past study sessions</p>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Study Buddies */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Connections */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Your Study Buddies</h2>
            
            {activeConnections.length > 0 ? (
              <div className="space-y-4">
                {activeConnections.map((connection) => (
                  <div 
                    key={connection.id} 
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {connection.avatar ? (
                          <img src={connection.avatar} alt={connection.name} className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-gray-700 font-medium text-sm">
                            {connection.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{connection.name}</h3>
                        <p className="text-sm text-gray-500">{connection.subject}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-full">
                        <Calendar className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-full">
                        <MessageSquare className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">You don't have any study buddies yet</p>
                <Link 
                  to="/find-buddies" 
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors inline-flex items-center"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Find Study Buddies
                </Link>
              </div>
            )}
          </div>
          
          {/* Pending Connections */}
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Pending Requests</h2>
            
            {pendingConnections.length > 0 ? (
              <div className="space-y-4">
                {pendingConnections.map((connection) => (
                  <div 
                    key={connection.id} 
                    className="p-4 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {connection.avatar ? (
                          <img src={connection.avatar} alt={connection.name} className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-gray-700 font-medium text-sm">
                            {connection.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{connection.name}</h3>
                        <p className="text-sm text-gray-500">{connection.subject}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-sm">
                      <p className="text-gray-600">{connection.message}</p>
                    </div>
                    
                    <div className="mt-4 flex space-x-3">
                      <button className="flex-1 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors text-sm">
                        Accept
                      </button>
                      <button className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm">
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No pending requests</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;