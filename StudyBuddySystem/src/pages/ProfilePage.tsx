import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { 
  User, BookOpen, Clock, Building, Calendar, MapPin, 
  Edit, Check, X, Trash2, Plus, Save
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    university: user?.university || '',
    major: user?.major || '',
    bio: user?.bio || '',
    location: user?.location || '',
    yearOfStudy: user?.yearOfStudy || '',
    availability: user?.availability || [],
    subjects: user?.subjects || [],
    learningPreferences: user?.learningPreferences || [],
  });
  const [newSubject, setNewSubject] = useState('');
  const [newPreference, setNewPreference] = useState('');

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-center text-gray-700">Loading profile...</p>
        </div>
      </div>
    );
  }

  const availabilityOptions = [
    'Weekday mornings',
    'Weekday afternoons',
    'Weekday evenings',
    'Weekend mornings',
    'Weekend afternoons',
    'Weekend evenings',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvailabilityChange = (option: string) => {
    setFormData(prev => {
      const newAvailability = prev.availability.includes(option)
        ? prev.availability.filter(item => item !== option)
        : [...prev.availability, option];
      
      return {
        ...prev,
        availability: newAvailability
      };
    });
  };

  const handleAddSubject = () => {
    if (newSubject.trim() !== '' && !formData.subjects.includes(newSubject.trim())) {
      setFormData(prev => ({
        ...prev,
        subjects: [...prev.subjects, newSubject.trim()]
      }));
      setNewSubject('');
    }
  };

  const handleRemoveSubject = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter(s => s !== subject)
    }));
  };

  const handleAddPreference = () => {
    if (newPreference.trim() !== '' && !formData.learningPreferences.includes(newPreference.trim())) {
      setFormData(prev => ({
        ...prev,
        learningPreferences: [...prev.learningPreferences, newPreference.trim()]
      }));
      setNewPreference('');
    }
  };

  const handleRemovePreference = (preference: string) => {
    setFormData(prev => ({
      ...prev,
      learningPreferences: prev.learningPreferences.filter(p => p !== preference)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      fullName: user.fullName || '',
      university: user.university || '',
      major: user.major || '',
      bio: user.bio || '',
      location: user.location || '',
      yearOfStudy: user.yearOfStudy || '',
      availability: user.availability || [],
      subjects: user.subjects || [],
      learningPreferences: user.learningPreferences || [],
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="h-32 bg-gradient-to-r from-indigo-500 to-indigo-700"></div>
            <div className="relative px-6 pb-6">
              <div className="absolute -top-12 left-6">
                <div className="h-24 w-24 rounded-full border-4 border-white bg-indigo-100 flex items-center justify-center">
                  <User className="h-12 w-12 text-indigo-600" />
                </div>
              </div>
              <div className="pt-16 flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{user.fullName}</h1>
                  <div className="flex flex-wrap items-center text-gray-600 mt-1 space-x-4">
                    {user.university && (
                      <div className="flex items-center mt-1">
                        <Building className="h-4 w-4 mr-1" />
                        <span>{user.university}</span>
                      </div>
                    )}
                    {user.major && (
                      <div className="flex items-center mt-1">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>{user.major}</span>
                      </div>
                    )}
                    {user.yearOfStudy && (
                      <div className="flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Year {user.yearOfStudy}</span>
                      </div>
                    )}
                    {user.location && (
                      <div className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{user.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                <button 
                  onClick={() => setIsEditing(true)}
                  className={`px-4 py-2 rounded-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors flex items-center ${isEditing ? 'hidden' : ''}`}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {isEditing ? (
            /* Edit Profile Form */
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
                <div className="flex space-x-2">
                  <button 
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition-colors flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
                    University/College
                  </label>
                  <input
                    type="text"
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-1">
                    Major/Field of Study
                  </label>
                  <input
                    type="text"
                    id="major"
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="yearOfStudy" className="block text-sm font-medium text-gray-700 mb-1">
                    Year of Study
                  </label>
                  <select
                    id="yearOfStudy"
                    name="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="5+">5+ Year</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Tell potential study buddies about yourself..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Availability
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availabilityOptions.map(option => (
                      <label 
                        key={option} 
                        className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${
                          formData.availability.includes(option)
                            ? 'bg-indigo-50 border-indigo-300'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mr-2"
                          checked={formData.availability.includes(option)}
                          onChange={() => handleAvailabilityChange(option)}
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subjects & Courses
                  </label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value)}
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Add a subject or course..."
                    />
                    <button
                      type="button"
                      onClick={handleAddSubject}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-500 transition-colors"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.subjects.map(subject => (
                      <div 
                        key={subject} 
                        className="flex items-center bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full"
                      >
                        <span>{subject}</span>
                        <button 
                          type="button" 
                          onClick={() => handleRemoveSubject(subject)}
                          className="ml-2 text-indigo-500 hover:text-indigo-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Learning Preferences
                  </label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      value={newPreference}
                      onChange={(e) => setNewPreference(e.target.value)}
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Add a learning preference..."
                    />
                    <button
                      type="button"
                      onClick={handleAddPreference}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-500 transition-colors"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.learningPreferences.map(preference => (
                      <div 
                        key={preference} 
                        className="flex items-center bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full"
                      >
                        <span>{preference}</span>
                        <button 
                          type="button" 
                          onClick={() => handleRemovePreference(preference)}
                          className="ml-2 text-emerald-500 hover:text-emerald-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          ) : (
            /* Profile Details */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                {/* Bio Section */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">About Me</h2>
                  <p className="text-gray-700 whitespace-pre-line">
                    {user.bio || "No bio available yet. Edit your profile to add your bio."}
                  </p>
                </div>
                
                {/* Subjects Section */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Subjects & Courses</h2>
                  
                  {user.subjects && user.subjects.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {user.subjects.map(subject => (
                        <span 
                          key={subject} 
                          className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No subjects added yet. Edit your profile to add subjects.</p>
                  )}
                </div>
                
                {/* Learning Preferences */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Learning Preferences</h2>
                  
                  {user.learningPreferences && user.learningPreferences.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {user.learningPreferences.map(preference => (
                        <span 
                          key={preference} 
                          className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm"
                        >
                          {preference}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No learning preferences added yet.</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-8">
                {/* Availability */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Availability</h2>
                  
                  {user.availability && user.availability.length > 0 ? (
                    <ul className="space-y-2">
                      {user.availability.map(time => (
                        <li key={time} className="flex items-center">
                          <Clock className="h-4 w-4 text-indigo-500 mr-2" />
                          <span className="text-gray-700">{time}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No availability set yet.</p>
                  )}
                </div>
                
                {/* Stats */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Stats</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-600 text-sm">Study Sessions</p>
                      <p className="text-2xl font-bold text-gray-800">12</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-600 text-sm">Study Buddies</p>
                      <p className="text-2xl font-bold text-gray-800">5</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-600 text-sm">Hours Studied</p>
                      <p className="text-2xl font-bold text-gray-800">34</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-600 text-sm">Member Since</p>
                      <p className="text-lg font-medium text-gray-800">April 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;