import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { mockStudyBuddies, mockStudySessions, mockConnections, mockMessages } from '../data/mockData';

export interface StudyBuddy {
  id: string;
  fullName: string;
  email?: string;
  university?: string;
  major?: string;
  yearOfStudy?: string;
  bio?: string;
  subjects?: string[];
  availability?: string[];
  location?: string;
  learningPreferences?: string[];
  avatar?: string;
}

export interface StudySession {
  id: string;
  title: string;
  date: string;
  duration: number;
  subject: string;
  buddyId?: string;
  mode: 'online' | 'in-person';
  location?: string;
  notes?: string;
  completed?: boolean;
}

export interface Connection {
  id: string;
  name: string;
  avatar?: string;
  subject: string;
  status: 'pending' | 'active' | 'rejected';
  message?: string;
}

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface UserContextType {
  user: StudyBuddy | null;
  potentialBuddies: StudyBuddy[];
  studySessions: StudySession[];
  connections: Connection[];
  messages: Message[];
  updateUser: (userData: Partial<StudyBuddy>) => void;
  createStudySession: (session: Omit<StudySession, 'id'>) => void;
  sendConnectionRequest: (buddyId: string) => void;
  sendMessage: (message: Message) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user: authUser, isAuthenticated } = useAuth();
  const [user, setUser] = useState<StudyBuddy | null>(null);
  const [potentialBuddies, setPotentialBuddies] = useState<StudyBuddy[]>(mockStudyBuddies);
  const [studySessions, setStudySessions] = useState<StudySession[]>(mockStudySessions);
  const [connections, setConnections] = useState<Connection[]>(mockConnections);
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  useEffect(() => {
    if (isAuthenticated && authUser) {
      // Initialize user data when authenticated
      const storedUserData = localStorage.getItem('studyBuddyUserData');
      
      if (storedUserData) {
        try {
          const parsedUserData = JSON.parse(storedUserData);
          setUser({
            ...parsedUserData,
            id: authUser.id,
            fullName: authUser.fullName,
            email: authUser.email
          });
        } catch (error) {
          console.error('Failed to parse stored user data', error);
          initializeNewUser();
        }
      } else {
        initializeNewUser();
      }
    } else {
      setUser(null);
    }
  }, [isAuthenticated, authUser]);

  const initializeNewUser = () => {
    if (!authUser) return;
    
    const newUser: StudyBuddy = {
      id: authUser.id,
      fullName: authUser.fullName,
      email: authUser.email,
      subjects: [],
      availability: [],
      learningPreferences: []
    };
    
    setUser(newUser);
    localStorage.setItem('studyBuddyUserData', JSON.stringify(newUser));
  };

  const updateUser = (userData: Partial<StudyBuddy>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('studyBuddyUserData', JSON.stringify(updatedUser));
  };

  const createStudySession = (session: Omit<StudySession, 'id'>) => {
    const newSession: StudySession = {
      ...session,
      id: `session-${Date.now()}`
    };
    
    setStudySessions(prev => [...prev, newSession]);
  };

  const sendConnectionRequest = (buddyId: string) => {
    const buddy = potentialBuddies.find(b => b.id === buddyId);
    if (!buddy) return;
    
    const newConnection: Connection = {
      id: buddyId,
      name: buddy.fullName,
      avatar: buddy.avatar,
      subject: buddy.subjects?.[0] || 'General Studies',
      status: 'pending',
      message: 'I would like to connect and study together!'
    };
    
    // Check if connection already exists
    if (!connections.some(conn => conn.id === buddyId)) {
      setConnections(prev => [...prev, newConnection]);
    }
  };

  const sendMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        potentialBuddies, 
        studySessions, 
        connections, 
        messages,
        updateUser, 
        createStudySession, 
        sendConnectionRequest, 
        sendMessage 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};