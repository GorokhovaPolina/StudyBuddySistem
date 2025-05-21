import { StudyBuddy, StudySession, Connection, Message } from '../contexts/UserContext';

export const mockStudyBuddies: StudyBuddy[] = [
  {
    id: 'buddy-1',
    fullName: 'Alex Johnson',
    university: 'Stanford University',
    major: 'Computer Science',
    yearOfStudy: '3',
    bio: 'I\'m passionate about algorithms and machine learning. Looking for study partners for advanced programming courses and AI research projects.',
    subjects: ['Algorithms', 'Machine Learning', 'Data Structures', 'Artificial Intelligence'],
    availability: ['Weekday evenings', 'Weekend afternoons'],
    location: 'Palo Alto, CA',
    learningPreferences: ['Visual learning', 'Practice problems', 'Group discussions']
  },
  {
    id: 'buddy-2',
    fullName: 'Sarah Williams',
    university: 'Harvard University',
    major: 'Biology',
    yearOfStudy: '2',
    bio: 'Pre-med student interested in neuroscience and molecular biology. I enjoy teaching concepts to others as a way to reinforce my own understanding.',
    subjects: ['Organic Chemistry', 'Molecular Biology', 'Neuroscience', 'Biochemistry'],
    availability: ['Weekday mornings', 'Weekend mornings', 'Weekend afternoons'],
    location: 'Cambridge, MA',
    learningPreferences: ['Flashcards', 'Teaching others', 'Lab work']
  },
  {
    id: 'buddy-3',
    fullName: 'Michael Chen',
    university: 'MIT',
    major: 'Physics',
    yearOfStudy: '4',
    bio: 'Studying theoretical physics with a focus on quantum mechanics. Looking for study partners to discuss complex concepts and problems.',
    subjects: ['Quantum Mechanics', 'Electromagnetism', 'Mathematical Physics', 'Thermodynamics'],
    availability: ['Weekday afternoons', 'Weekday evenings'],
    location: 'Cambridge, MA',
    learningPreferences: ['Problem-solving', 'Whiteboarding', 'Conceptual discussions']
  },
  {
    id: 'buddy-4',
    fullName: 'Emily Rodriguez',
    university: 'UCLA',
    major: 'Psychology',
    yearOfStudy: '3',
    bio: 'Focusing on developmental psychology and cognitive science. I love to create comprehensive study guides and share resources.',
    subjects: ['Cognitive Psychology', 'Developmental Psychology', 'Research Methods', 'Statistics'],
    availability: ['Weekday mornings', 'Weekend evenings'],
    location: 'Los Angeles, CA',
    learningPreferences: ['Study guides', 'Group discussions', 'Practice exams']
  },
  {
    id: 'buddy-5',
    fullName: 'David Kim',
    university: 'Columbia University',
    major: 'Economics',
    yearOfStudy: '2',
    bio: 'Studying macroeconomics and financial markets. I prefer collaborative study sessions with a focus on real-world applications.',
    subjects: ['Macroeconomics', 'Microeconomics', 'Financial Markets', 'Game Theory'],
    availability: ['Weekday evenings', 'Weekend afternoons', 'Weekend evenings'],
    location: 'New York, NY',
    learningPreferences: ['Case studies', 'Data analysis', 'Group projects']
  },
  {
    id: 'buddy-6',
    fullName: 'Olivia Thompson',
    university: 'University of Michigan',
    major: 'English Literature',
    yearOfStudy: '4',
    bio: 'Specializing in Victorian literature and creative writing. I enjoy deep discussions about literary analysis and theory.',
    subjects: ['Victorian Literature', 'Creative Writing', 'Literary Theory', 'Poetry'],
    availability: ['Weekday afternoons', 'Weekend mornings'],
    location: 'Ann Arbor, MI',
    learningPreferences: ['Reading groups', 'Writing workshops', 'Critical analysis']
  },
  {
    id: 'buddy-7',
    fullName: 'James Wilson',
    university: 'University of Chicago',
    major: 'Mathematics',
    yearOfStudy: '3',
    bio: 'Focused on abstract algebra and number theory. Looking for study partners who enjoy tackling challenging problems together.',
    subjects: ['Abstract Algebra', 'Number Theory', 'Real Analysis', 'Topology'],
    availability: ['Weekday evenings', 'Weekend afternoons'],
    location: 'Chicago, IL',
    learningPreferences: ['Problem sets', 'Study groups', 'Proof writing']
  },
  {
    id: 'buddy-8',
    fullName: 'Sophia Garcia',
    university: 'UC Berkeley',
    major: 'Environmental Science',
    yearOfStudy: '2',
    bio: 'Passionate about sustainability and conservation. I enjoy field work and data collection for environmental research.',
    subjects: ['Ecology', 'Environmental Policy', 'Climate Science', 'Conservation Biology'],
    availability: ['Weekday mornings', 'Weekend mornings', 'Weekend afternoons'],
    location: 'Berkeley, CA',
    learningPreferences: ['Field work', 'Data analysis', 'Group projects']
  },
  {
    id: 'buddy-9',
    fullName: 'Ryan Patel',
    university: 'NYU',
    major: 'Business Administration',
    yearOfStudy: '4',
    bio: 'Specializing in entrepreneurship and marketing. I have a background in startups and enjoy discussing business strategy.',
    subjects: ['Marketing', 'Entrepreneurship', 'Finance', 'Business Strategy'],
    availability: ['Weekday evenings', 'Weekend afternoons'],
    location: 'New York, NY',
    learningPreferences: ['Case studies', 'Group discussions', 'Practical applications']
  }
];

export const mockStudySessions: StudySession[] = [
  {
    id: 'session-1',
    title: 'Algorithms Review',
    date: '2025-06-15T15:00:00',
    duration: 2,
    subject: 'Computer Science',
    buddyId: 'buddy-1',
    mode: 'online',
    notes: 'Focus on dynamic programming and graph algorithms',
    completed: false
  },
  {
    id: 'session-2',
    title: 'Organic Chemistry Preparation',
    date: '2025-06-18T10:00:00',
    duration: 3,
    subject: 'Chemistry',
    buddyId: 'buddy-2',
    mode: 'in-person',
    location: 'University Library, Room 305',
    notes: 'Reviewing mechanisms for midterm exam',
    completed: false
  },
  {
    id: 'session-3',
    title: 'Quantum Mechanics Problem Set',
    date: '2025-05-10T14:00:00',
    duration: 2.5,
    subject: 'Physics',
    buddyId: 'buddy-3',
    mode: 'online',
    notes: 'Work through problem set #4, focus on wave functions',
    completed: true
  },
  {
    id: 'session-4',
    title: 'Research Methods Discussion',
    date: '2025-05-05T11:00:00',
    duration: 1.5,
    subject: 'Psychology',
    buddyId: 'buddy-4',
    mode: 'in-person',
    location: 'Psychology Building, Study Room 2',
    notes: 'Discuss experimental design for final project',
    completed: true
  }
];

export const mockConnections: Connection[] = [
  {
    id: 'buddy-1',
    name: 'Alex Johnson',
    subject: 'Computer Science',
    status: 'active'
  },
  {
    id: 'buddy-2',
    name: 'Sarah Williams',
    subject: 'Biology',
    status: 'active'
  },
  {
    id: 'buddy-3',
    name: 'Michael Chen',
    subject: 'Physics',
    status: 'active'
  },
  {
    id: 'buddy-4',
    name: 'Emily Rodriguez',
    subject: 'Psychology',
    status: 'pending',
    message: 'Hi! I noticed we\'re both interested in cognitive psychology. Would you like to study together for the upcoming exam?'
  },
  {
    id: 'buddy-7',
    name: 'James Wilson',
    subject: 'Mathematics',
    status: 'pending',
    message: 'Hello! I see you\'re also studying abstract algebra. I\'ve been working on some challenging problems and would love to collaborate.'
  }
];

export const mockMessages: Message[] = [
  {
    id: 'msg-1',
    senderId: 'buddy-1',
    recipientId: 'user-1',
    content: 'Hey! Are we still on for our algorithms study session tomorrow?',
    timestamp: '2025-06-14T14:25:00',
    read: true
  },
  {
    id: 'msg-2',
    senderId: 'user-1',
    recipientId: 'buddy-1',
    content: 'Yes, definitely! I\'ve been working through the practice problems. Do you want to focus on anything specific?',
    timestamp: '2025-06-14T14:30:00',
    read: true
  },
  {
    id: 'msg-3',
    senderId: 'buddy-1',
    recipientId: 'user-1',
    content: 'I\'m struggling a bit with dynamic programming. Could we spend some extra time on that?',
    timestamp: '2025-06-14T14:32:00',
    read: true
  },
  {
    id: 'msg-4',
    senderId: 'user-1',
    recipientId: 'buddy-1',
    content: 'Sure! I found some great resources on dynamic programming that we can go through together.',
    timestamp: '2025-06-14T14:35:00',
    read: true
  },
  {
    id: 'msg-5',
    senderId: 'buddy-1',
    recipientId: 'user-1',
    content: 'That sounds perfect. Thanks for being so helpful! See you online at 3 PM tomorrow.',
    timestamp: '2025-06-14T14:40:00',
    read: false
  },
  {
    id: 'msg-6',
    senderId: 'buddy-2',
    recipientId: 'user-1',
    content: 'Hi! I just found out our Organic Chemistry exam got moved up a week. Do you want to meet earlier than planned?',
    timestamp: '2025-06-14T16:10:00',
    read: false
  },
  {
    id: 'msg-7',
    senderId: 'buddy-3',
    recipientId: 'user-1',
    content: 'Thanks for the help with the quantum mechanics problems last week. I got an A on the assignment!',
    timestamp: '2025-05-15T09:20:00',
    read: true
  },
  {
    id: 'msg-8',
    senderId: 'user-1',
    recipientId: 'buddy-3',
    content: 'That\'s awesome news! Congratulations! Those problems were definitely challenging.',
    timestamp: '2025-05-15T10:05:00',
    read: true
  }
];