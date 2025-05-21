import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Menu, X, User, MessageSquare, Search, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <BookOpen className="h-7 w-7" />
            <span>StudyBuddy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`transition-colors hover:text-indigo-200 ${
                    location.pathname === '/dashboard' ? 'text-white font-medium' : 'text-indigo-100'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/find-buddies" 
                  className={`transition-colors hover:text-indigo-200 ${
                    location.pathname === '/find-buddies' ? 'text-white font-medium' : 'text-indigo-100'
                  }`}
                >
                  Find Buddies
                </Link>
                <Link 
                  to="/messages" 
                  className={`transition-colors hover:text-indigo-200 ${
                    location.pathname === '/messages' ? 'text-white font-medium' : 'text-indigo-100'
                  }`}
                >
                  Messages
                </Link>
                <Link 
                  to="/profile" 
                  className={`transition-colors hover:text-indigo-200 ${
                    location.pathname === '/profile' ? 'text-white font-medium' : 'text-indigo-100'
                  }`}
                >
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-400 transition-colors"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-400 transition-colors"
                >
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 rounded bg-white text-indigo-600 hover:bg-indigo-50 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4`}>
          <nav className="flex flex-col space-y-4 pb-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                  onClick={closeMenu}
                >
                  <User className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  to="/find-buddies" 
                  className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                  onClick={closeMenu}
                >
                  <Search className="h-5 w-5" />
                  <span>Find Buddies</span>
                </Link>
                <Link 
                  to="/messages" 
                  className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                  onClick={closeMenu}
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Messages</span>
                </Link>
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                  onClick={closeMenu}
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-400 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Log Out</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded bg-indigo-500 hover:bg-indigo-400 transition-colors text-center"
                  onClick={closeMenu}
                >
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 rounded bg-white text-indigo-600 hover:bg-indigo-50 transition-colors text-center"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;