import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, MessageCircle, Calendar, Award, Search } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Find Your Perfect Study Partner
              </h1>
              <p className="text-xl text-indigo-100">
                Connect with students who share your academic interests and boost your learning through collaboration.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/register"
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 rounded-lg text-center text-white font-medium transition-colors duration-300 transform hover:scale-105"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-3 bg-white hover:bg-indigo-50 rounded-lg text-center text-indigo-600 font-medium transition-colors duration-300"
                >
                  Log In
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative">
              <img
                src="https://images.pexels.com/photos/5553094/pexels-photo-5553094.jpeg"
                alt="Students studying together"
                className="rounded-lg shadow-xl object-cover h-[500px] w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Award className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Success Rate</p>
                    <p className="text-gray-800 font-bold text-xl">94%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Divider */}
        <div className="h-16 bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="h-16 w-full transform translate-y-[-100%]">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,117.3C672,107,768,117,864,138.7C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How StudyBuddy Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform makes it easy to find the perfect study partner, connect, and excel in your academics together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 transition-transform hover:transform hover:scale-105">
              <div className="h-14 w-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <Search className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Find Your Match</h3>
              <p className="text-gray-600">
                Create your profile with your courses, study preferences, and academic goals to find perfectly matched study partners.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 transition-transform hover:transform hover:scale-105">
              <div className="h-14 w-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <MessageCircle className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Connect & Communicate</h3>
              <p className="text-gray-600">
                Use our integrated messaging system to coordinate with your study buddies and build productive learning relationships.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 transition-transform hover:transform hover:scale-105">
              <div className="h-14 w-14 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <Calendar className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Schedule & Study</h3>
              <p className="text-gray-600">
                Plan and organize study sessions with our calendar integration, setting goals and tracking progress together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from students who found academic success through collaborative learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-amber-700 font-bold text-xl">J</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Jessica M.</h4>
                  <p className="text-gray-500 text-sm">Computer Science</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Finding a study partner who understood my learning style completely changed my academic experience. We've been studying together for two semesters and my GPA has improved significantly."
              </p>
              <div className="mt-4 flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-emerald-700 font-bold text-xl">M</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Michael T.</h4>
                  <p className="text-gray-500 text-sm">Biology</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "I was struggling with organic chemistry until I found my study group through StudyBuddy. Being able to discuss complex concepts with peers who get it has been invaluable."
              </p>
              <div className="mt-4 flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-700 font-bold text-xl">S</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Sophia L.</h4>
                  <p className="text-gray-500 text-sm">Business Administration</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The accountability that comes with having a dedicated study partner has completely transformed my study habits. We keep each other motivated and on track with our goals."
              </p>
              <div className="mt-4 flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-indigo-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Study Buddy?</h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Join thousands of students who are already experiencing the benefits of collaborative learning.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/register"
              className="px-8 py-4 bg-white hover:bg-gray-100 rounded-lg text-indigo-600 font-medium transition-colors duration-300 transform hover:scale-105"
            >
              Create Your Profile
            </Link>
            <Link
              to="/find-buddies"
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 rounded-lg text-white font-medium transition-colors duration-300 transform hover:scale-105"
            >
              Browse Study Buddies
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-indigo-600 mb-2">5,000+</p>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-indigo-600 mb-2">3,200+</p>
              <p className="text-gray-600">Successful Matches</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-indigo-600 mb-2">120+</p>
              <p className="text-gray-600">Universities</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-indigo-600 mb-2">94%</p>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;