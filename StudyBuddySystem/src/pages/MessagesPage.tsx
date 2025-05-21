import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { MessageCircle, Send, Search, ChevronLeft, MoreVertical, Phone, Video, Image, Smile, Paperclip } from 'lucide-react';
import { format } from 'date-fns';

const MessagesPage: React.FC = () => {
  const { user, connections, messages, sendMessage } = useUser();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-200px)]">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-center text-gray-700">Please log in to view your messages.</p>
        </div>
      </div>
    );
  }

  const activeConnections = connections.filter(
    connection => connection.status === 'active'
  );

  const filteredConnections = activeConnections.filter(
    connection => connection.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const conversationMessages = messages.filter(
    message => message.recipientId === selectedConversation || message.senderId === selectedConversation
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  const selectedBuddy = connections.find(connection => connection.id === selectedConversation);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (messageText.trim() && selectedConversation) {
      sendMessage({
        id: `msg-${Date.now()}`,
        senderId: user.id,
        recipientId: selectedConversation,
        content: messageText,
        timestamp: new Date().toISOString(),
        read: false,
      });
      
      setMessageText('');
    }
  };

  const backToList = () => {
    setSelectedConversation(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden h-[700px]">
          <div className="flex h-full">
            {/* Sidebar - Conversation List */}
            <div className={`w-full md:w-1/3 bg-white border-r border-gray-200 ${selectedConversation ? 'hidden md:block' : 'block'}`}>
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Messages</h2>
                <div className="mt-3 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search conversations..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              
              <div className="overflow-y-auto h-[calc(100%-81px)]">
                {filteredConnections.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {filteredConnections.map(connection => {
                      const unreadCount = messages.filter(
                        m => m.senderId === connection.id && !m.read
                      ).length;
                      
                      const lastMessage = messages
                        .filter(m => m.senderId === connection.id || m.recipientId === connection.id)
                        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
                      
                      return (
                        <div
                          key={connection.id}
                          onClick={() => setSelectedConversation(connection.id)}
                          className={`p-4 hover:bg-gray-50 cursor-pointer ${
                            selectedConversation === connection.id ? 'bg-indigo-50' : ''
                          }`}
                        >
                          <div className="flex items-center">
                            <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center mr-3 text-lg font-medium text-indigo-700">
                              {connection.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-900 truncate">
                                  {connection.name}
                                </h3>
                                {lastMessage && (
                                  <span className="text-xs text-gray-500">
                                    {format(new Date(lastMessage.timestamp), 'h:mm a')}
                                  </span>
                                )}
                              </div>
                              {lastMessage ? (
                                <p className="mt-1 text-sm text-gray-500 truncate">
                                  {lastMessage.senderId === user.id ? 'You: ' : ''}
                                  {lastMessage.content}
                                </p>
                              ) : (
                                <p className="mt-1 text-sm text-gray-500 italic">No messages yet</p>
                              )}
                            </div>
                            {unreadCount > 0 && (
                              <div className="ml-2 bg-indigo-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                                {unreadCount}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">No conversations found</p>
                    <p className="text-gray-500 text-sm">
                      {searchQuery 
                        ? 'Try a different search term'
                        : 'Connect with study buddies to start messaging'}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Main Content - Conversation */}
            <div className={`w-full md:w-2/3 flex flex-col ${!selectedConversation ? 'hidden md:flex' : 'flex'}`}>
              {selectedConversation && selectedBuddy ? (
                <>
                  {/* Conversation Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center">
                    <button 
                      onClick={backToList}
                      className="md:hidden mr-2 p-1 text-gray-500 hover:text-gray-700"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3 text-lg font-medium text-indigo-700">
                      {selectedBuddy.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{selectedBuddy.name}</h3>
                      <p className="text-xs text-gray-500">
                        {selectedBuddy.subject}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full">
                        <Phone className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full">
                        <Video className="h-5 w-5" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                    {conversationMessages.length > 0 ? (
                      <div className="space-y-4">
                        {conversationMessages.map(message => (
                          <div
                            key={message.id}
                            className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
                          >
                            <div 
                              className={`max-w-[75%] p-3 rounded-lg ${
                                message.senderId === user.id 
                                  ? 'bg-indigo-600 text-white rounded-br-none' 
                                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                              }`}
                            >
                              <p>{message.content}</p>
                              <p 
                                className={`text-xs mt-1 ${
                                  message.senderId === user.id ? 'text-indigo-100' : 'text-gray-500'
                                }`}
                              >
                                {format(new Date(message.timestamp), 'h:mm a')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center">
                        <MessageCircle className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-800 mb-2">No messages yet</h3>
                        <p className="text-gray-600 max-w-md">
                          Send a message to start your conversation with {selectedBuddy.name}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <form onSubmit={handleSendMessage} className="flex items-center">
                      <button 
                        type="button"
                        className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full"
                      >
                        <Paperclip className="h-5 w-5" />
                      </button>
                      <button 
                        type="button"
                        className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full"
                      >
                        <Image className="h-5 w-5" />
                      </button>
                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 mx-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button 
                        type="button"
                        className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full"
                      >
                        <Smile className="h-5 w-5" />
                      </button>
                      <button 
                        type="submit"
                        disabled={!messageText.trim()}
                        className={`ml-2 p-2 rounded-full ${
                          messageText.trim() 
                            ? 'bg-indigo-600 text-white hover:bg-indigo-500' 
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <MessageCircle className="h-16 w-16 text-indigo-200 mb-6" />
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Messages</h2>
                  <p className="text-gray-600 mb-8 max-w-md">
                    Select a conversation from the list to view your messages or connect with new study buddies.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;