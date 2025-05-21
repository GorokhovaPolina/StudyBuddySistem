import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { Search, Filter, UserPlus, MessageSquare, X, CheckCircle } from 'lucide-react';

const FindBuddiesPage: React.FC = () => {
  const { potentialBuddies, user, sendConnectionRequest } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBuddies, setFilteredBuddies] = useState(potentialBuddies);
  const [filters, setFilters] = useState({
    subjects: [] as string[],
    availability: [] as string[],
    yearOfStudy: '',
    distance: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sentRequests, setSentRequests] = useState<Record<string, boolean>>({});

  // All unique subjects across all potential buddies
  const allSubjects = Array.from(
    new Set(potentialBuddies.flatMap(buddy => buddy.subjects || []))
  ).sort();

  // All unique availabilities
  const allAvailabilities = [
    'Weekday mornings',
    'Weekday afternoons',
    'Weekday evenings',
    'Weekend mornings',
    'Weekend afternoons',
    'Weekend evenings',
  ];

  // Years of study options
  const yearOptions = ['1', '2', '3', '4', '5+', 'Graduate'];

  // Distance options
  const distanceOptions = ['5 miles', '10 miles', '25 miles', '50+ miles', 'Remote only'];

  useEffect(() => {
    let result = potentialBuddies;
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        buddy => 
          buddy.fullName.toLowerCase().includes(query) ||
          buddy.major?.toLowerCase().includes(query) ||
          buddy.subjects?.some(subject => subject.toLowerCase().includes(query))
      );
    }
    
    // Apply subject filters
    if (filters.subjects.length > 0) {
      result = result.filter(
        buddy => buddy.subjects?.some(subject => filters.subjects.includes(subject))
      );
    }
    
    // Apply availability filters
    if (filters.availability.length > 0) {
      result = result.filter(
        buddy => buddy.availability?.some(time => filters.availability.includes(time))
      );
    }
    
    // Apply year of study filter
    if (filters.yearOfStudy) {
      result = result.filter(
        buddy => buddy.yearOfStudy === filters.yearOfStudy
      );
    }
    
    // Apply distance filter
    if (filters.distance) {
      // In a real app, this would use geolocation data
      // For demo purposes, we're just filtering randomly
      const distanceIndex = distanceOptions.indexOf(filters.distance);
      result = result.filter(
        (_, index) => index % (distanceIndex + 1) === 0
      );
    }
    
    setFilteredBuddies(result);
  }, [searchQuery, filters, potentialBuddies]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleSubjectFilter = (subject: string) => {
    setFilters(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }));
  };

  const toggleAvailabilityFilter = (availability: string) => {
    setFilters(prev => ({
      ...prev,
      availability: prev.availability.includes(availability)
        ? prev.availability.filter(a => a !== availability)
        : [...prev.availability, availability]
    }));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({
      ...prev,
      yearOfStudy: e.target.value
    }));
  };

  const handleDistanceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prev => ({
      ...prev,
      distance: e.target.value
    }));
  };

  const clearFilters = () => {
    setFilters({
      subjects: [],
      availability: [],
      yearOfStudy: '',
      distance: '',
    });
    setSearchQuery('');
  };

  const handleSendRequest = (buddyId: string) => {
    sendConnectionRequest(buddyId);
    setSentRequests(prev => ({
      ...prev,
      [buddyId]: true
    }));
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Study Buddies</h1>
          <p className="text-gray-600 mb-8">
            Connect with students who share your academic interests and study goals
          </p>
          
          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <div className="flex-grow relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search by name, subject, or major..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters {filters.subjects.length > 0 || filters.availability.length > 0 || filters.yearOfStudy || filters.distance ? `(${
                  filters.subjects.length +
                  filters.availability.length +
                  (filters.yearOfStudy ? 1 : 0) +
                  (filters.distance ? 1 : 0)
                })` : ''}
              </button>
              
              {(filters.subjects.length > 0 || filters.availability.length > 0 || filters.yearOfStudy || filters.distance) && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <X className="h-5 w-5 mr-2" />
                  Clear Filters
                </button>
              )}
            </div>
            
            {/* Filter Controls */}
            {showFilters && (
              <div className="mt-4 border-t border-gray-200 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Subjects</h3>
                    <div className="flex flex-wrap gap-2">
                      {allSubjects.map(subject => (
                        <button
                          key={subject}
                          onClick={() => toggleSubjectFilter(subject)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            filters.subjects.includes(subject)
                              ? 'bg-indigo-100 text-indigo-800 border border-indigo-300'
                              : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                          }`}
                        >
                          {subject}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Availability</h3>
                    <div className="flex flex-wrap gap-2">
                      {allAvailabilities.map(availability => (
                        <button
                          key={availability}
                          onClick={() => toggleAvailabilityFilter(availability)}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            filters.availability.includes(availability)
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                          }`}
                        >
                          {availability}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Year of Study</h3>
                    <select
                      value={filters.yearOfStudy}
                      onChange={handleYearChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Any Year</option>
                      {yearOptions.map(year => (
                        <option key={year} value={year}>{year === 'Graduate' ? 'Graduate' : `Year ${year}`}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Distance</h3>
                    <select
                      value={filters.distance}
                      onChange={handleDistanceChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="">Any Distance</option>
                      {distanceOptions.map(distance => (
                        <option key={distance} value={distance}>Within {distance}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Results */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {filteredBuddies.length} {filteredBuddies.length === 1 ? 'Match' : 'Matches'} Found
            </h2>
            
            {filteredBuddies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBuddies.map(buddy => (
                  <div key={buddy.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all">
                    <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
                    <div className="p-6 relative">
                      <div className="absolute top-0 transform -translate-y-1/2 left-6 bg-white rounded-full p-1 shadow-md">
                        <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-700">
                          {buddy.fullName.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                      
                      <div className="mt-10">
                        <h3 className="text-xl font-semibold text-gray-800">{buddy.fullName}</h3>
                        
                        <div className="flex flex-wrap items-center text-sm text-gray-600 mt-1">
                          {buddy.major && (
                            <span className="mr-3">{buddy.major}</span>
                          )}
                          {buddy.yearOfStudy && (
                            <span>Year {buddy.yearOfStudy}</span>
                          )}
                        </div>
                        
                        {buddy.university && (
                          <p className="text-gray-600 text-sm mt-1">{buddy.university}</p>
                        )}
                        
                        {buddy.bio && (
                          <p className="text-gray-700 mt-3 line-clamp-3">{buddy.bio}</p>
                        )}
                        
                        {buddy.subjects && buddy.subjects.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Subjects</h4>
                            <div className="flex flex-wrap gap-1">
                              {buddy.subjects.slice(0, 3).map(subject => (
                                <span 
                                  key={subject} 
                                  className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full text-xs"
                                >
                                  {subject}
                                </span>
                              ))}
                              {buddy.subjects.length > 3 && (
                                <span className="bg-gray-50 text-gray-700 px-2 py-1 rounded-full text-xs">
                                  +{buddy.subjects.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {buddy.availability && buddy.availability.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Availability</h4>
                            <div className="flex flex-wrap gap-1">
                              {buddy.availability.slice(0, 2).map(time => (
                                <span 
                                  key={time} 
                                  className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full text-xs"
                                >
                                  {time}
                                </span>
                              ))}
                              {buddy.availability.length > 2 && (
                                <span className="bg-gray-50 text-gray-700 px-2 py-1 rounded-full text-xs">
                                  +{buddy.availability.length - 2} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-6 flex space-x-2">
                          {sentRequests[buddy.id] ? (
                            <button 
                              className="flex-1 flex justify-center items-center px-4 py-2 bg-emerald-50 text-emerald-700 rounded-md cursor-default"
                              disabled
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Request Sent
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleSendRequest(buddy.id)}
                              className="flex-1 flex justify-center items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors"
                            >
                              <UserPlus className="h-4 w-4 mr-2" />
                              Connect
                            </button>
                          )}
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                            <MessageSquare className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No matches found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or search criteria to find more study buddies.
                </p>
                <button 
                  onClick={clearFilters}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindBuddiesPage;