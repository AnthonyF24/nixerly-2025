"use client";

import React, { useState, useEffect, useRef } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useAppStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Send, 
  PaperclipIcon, 
  Phone, 
  Video, 
  MoreVertical, 
  Image as ImageIcon,
  Plus,
  ArrowLeft,
  CheckCircle,
  MessageSquare,
  Briefcase
} from "lucide-react";
import { dummyProfessionals, dummyBusinesses } from "@/lib/dummy-data";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Define message types
interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: string;
  read: boolean;
  attachments?: {
    type: 'image' | 'file' | 'job';
    url?: string;
    name?: string;
    thumbnail?: string;
    jobId?: string;
  }[];
}

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  unreadCount: number;
  lastMessage?: {
    content: string;
    timestamp: string;
    senderId: string;
  };
}

const MessagesPage = () => {
  const { userType, professional, business, isAuthenticated } = useAppStore();
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileViewingMessages, setMobileViewingMessages] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  // Mock data based on authenticated user
  const currentUser = userType === "professional" ? professional : business;
  
  // Mock conversations data
  const mockConversations: Conversation[] = userType === "professional" 
    ? dummyBusinesses.map((biz, index) => ({
        id: `conv-${biz.id}`,
        participantId: biz.id,
        participantName: biz.name,
        participantAvatar: biz.logoUrl,
        unreadCount: Math.floor(Math.random() * 3),
        lastMessage: {
          content: "Thanks for your interest in our job posting.",
          timestamp: new Date(Date.now() - (86400000 * (index + 1))).toISOString(),
          senderId: biz.id
        }
      }))
    : dummyProfessionals.map((pro, index) => ({
        id: `conv-${pro.id}`,
        participantId: pro.id,
        participantName: pro.name,
        unreadCount: Math.floor(Math.random() * 3),
        lastMessage: {
          content: "I'm interested in the position you posted.",
          timestamp: new Date(Date.now() - (86400000 * (index + 1))).toISOString(),
          senderId: pro.id
        }
      }));

  // Filter conversations based on search
  const filteredConversations = mockConversations.filter(conv => 
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Add a state to store formatted times
  const [formattedTimes, setFormattedTimes] = useState<Record<string, string>>({});

  // Add a clientOnly state flag
  const [isClient, setIsClient] = useState(false);

  // Only show client-rendered content after hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Mock messages for each conversation
  const generateMockMessages = (conversationId: string): Message[] => {
    const conversation = mockConversations.find(c => c.id === conversationId);
    if (!conversation) return [];
    
    const participantId = conversation.participantId;
    const currentUserId = currentUser?.id || "";
    
    const messages: Message[] = [
      {
        id: `msg-${conversationId}-1`,
        content: "Hello! I saw your profile and would like to discuss a potential job opportunity.",
        senderId: userType === "professional" ? participantId : currentUserId,
        receiverId: userType === "professional" ? currentUserId : participantId,
        timestamp: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
        read: true
      },
      {
        id: `msg-${conversationId}-2`,
        content: "Hi there! I'd be happy to discuss. What kind of position are you looking to fill?",
        senderId: userType === "professional" ? currentUserId : participantId,
        receiverId: userType === "professional" ? participantId : currentUserId,
        timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        read: true
      },
      {
        id: `msg-${conversationId}-3`,
        content: "We're looking for someone with your expertise for a 6-month project. Here's the job listing:",
        senderId: userType === "professional" ? participantId : currentUserId,
        receiverId: userType === "professional" ? currentUserId : participantId,
        timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        read: true,
        attachments: [
          {
            type: 'job',
            jobId: 'j1',
            name: 'Senior Electrician'
          }
        ]
      },
      {
        id: `msg-${conversationId}-4`,
        content: "This looks interesting! I have experience with similar projects. Here's a sample of my previous work:",
        senderId: userType === "professional" ? currentUserId : participantId,
        receiverId: userType === "professional" ? participantId : currentUserId,
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        read: true,
        attachments: [
          {
            type: 'image',
            url: '/portfolio/electrical-work.jpg',
            thumbnail: '/portfolio/electrical-work.jpg',
            name: 'Previous Project'
          }
        ]
      },
      {
        id: `msg-${conversationId}-5`,
        content: "Great work! Would you be available for a phone call to discuss the details further?",
        senderId: userType === "professional" ? participantId : currentUserId,
        receiverId: userType === "professional" ? currentUserId : participantId,
        timestamp: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
        read: userType === "professional"
      }
    ];
    
    return messages;
  };

  // Get active conversation messages
  const activeMessages = activeConversation 
    ? generateMockMessages(activeConversation) 
    : [];
  
  // Get active participant
  const activeParticipant = activeConversation 
    ? mockConversations.find(c => c.id === activeConversation) 
    : null;

  // Format timestamps on client-side only
  useEffect(() => {
    // Skip this effect if we're not on the client yet
    if (!isClient) return;
    
    const times: Record<string, string> = {};
    
    // Format conversation timestamps
    filteredConversations.forEach(conv => {
      if (conv.lastMessage?.timestamp) {
        // Check if we already have this timestamp formatted to avoid unnecessary updates
        if (!formattedTimes[conv.id]) {
          times[conv.id] = formatDistanceToNow(new Date(conv.lastMessage.timestamp), { addSuffix: true });
        } else {
          times[conv.id] = formattedTimes[conv.id];
        }
      }
    });
    
    // Format message timestamps
    activeMessages.forEach(message => {
      // Check if we already have this timestamp formatted to avoid unnecessary updates
      if (!formattedTimes[message.id]) {
        times[message.id] = formatDistanceToNow(new Date(message.timestamp), { addSuffix: true });
      } else {
        times[message.id] = formattedTimes[message.id];
      }
    });
    
    // Only update state if there are new times to add
    const hasNewTimes = Object.keys(times).some(key => !formattedTimes[key] || formattedTimes[key] !== times[key]);
    if (hasNewTimes) {
      setFormattedTimes(prevTimes => ({ ...prevTimes, ...times }));
    }
  }, [isClient, activeConversation]); // Only run when activeConversation changes or client status changes

  // Send new message
  const handleSendMessage = () => {
    if (!messageText.trim() || !activeConversation || !currentUser) return;
    
    // In a real app, this would send the message to the API
    // For now, we'll just clear the input since we're using mock data
    setMessageText("");
    
    // Scroll to bottom of messages
    setTimeout(() => {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleStartConversation = (conversationId: string) => {
    setActiveConversation(conversationId);
    setMobileViewingMessages(true);
  };

  // Scroll to the end of messages when active conversation changes
  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [activeConversation]);
  
  return (
    <DashboardLayout>
      <div className="h-full flex flex-col">
        <div className="bg-white shadow-sm border rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Messages</h1>
              <p className="text-gray-500">
                Direct communication with {userType === "professional" ? "businesses" : "professionals"}
              </p>
            </div>
            <Button variant="outline" className="flex items-center gap-2" asChild>
              <Link href="/dashboard" className="flex items-center gap-2" tabIndex={0}>
                <ArrowLeft className="h-4 w-4" />
                Return to Dashboard
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col h-[calc(100vh-220px)] bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="flex h-full">
            {/* Conversations List - hidden on mobile when viewing messages */}
            <div className={cn(
              "w-full md:w-80 lg:w-96 border-r", 
              mobileViewingMessages ? "hidden md:block" : "block"
            )}>
              <div className="p-3 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search messages..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <ScrollArea className="h-[calc(100vh-300px)]">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map(conversation => (
                    <div 
                      key={conversation.id}
                      className={cn(
                        "p-3 hover:bg-gray-50 transition-colors cursor-pointer",
                        activeConversation === conversation.id && "bg-blue-50 hover:bg-blue-50 border-l-4 border-l-blue-500"
                      )}
                      onClick={() => handleStartConversation(conversation.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-gray-200">
                          <AvatarImage src={conversation.participantAvatar} alt={conversation.participantName} />
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {conversation.participantName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-sm truncate">{conversation.participantName}</h3>
                            {isClient && conversation.lastMessage && (
                              <span className="text-xs text-gray-500 whitespace-nowrap">
                                {formattedTimes[conversation.id] || ''}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <p className="text-xs text-gray-500 truncate">
                              {conversation.lastMessage?.content || "No messages yet"}
                            </p>
                            {isClient && conversation.unreadCount > 0 && (
                              <Badge className="ml-1 py-0 px-1.5 h-4 text-xs bg-blue-500">{conversation.unreadCount}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No conversations found
                  </div>
                )}
              </ScrollArea>
            </div>
          
            {/* Active Conversation Messages */}
            <div className={cn(
              "flex-1 flex flex-col", 
              mobileViewingMessages ? "block" : "hidden md:flex"
            )}>
              {activeConversation ? (
                <>
                  {/* Conversation Header */}
                  <div className="p-3 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden mr-1"
                        onClick={() => setMobileViewingMessages(false)}
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </Button>
                      <Avatar className="h-9 w-9 border border-gray-200">
                        <AvatarImage src={activeParticipant?.participantAvatar} alt={activeParticipant?.participantName} />
                        <AvatarFallback className="bg-blue-100 text-blue-700">
                          {activeParticipant?.participantName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-sm">{activeParticipant?.participantName}</h3>
                        <p className="text-xs text-green-600">
                          {userType === "professional" ? "Business" : "Professional"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="text-gray-500 hidden sm:flex">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-500 hidden sm:flex">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-500">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Messages Area */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      <div className="text-center mb-6">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          Conversation started
                        </span>
                      </div>
                      
                      {activeMessages.map(message => {
                        const isCurrentUser = message.senderId === currentUser?.id;
                        
                        return (
                          <div key={message.id} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] space-y-1 ${isCurrentUser ? 'order-2' : 'order-1'}`}>
                              <div className="flex items-end gap-2">
                                {!isCurrentUser && (
                                  <Avatar className="h-8 w-8 border border-gray-200">
                                    <AvatarImage src={activeParticipant?.participantAvatar} alt={activeParticipant?.participantName} />
                                    <AvatarFallback className="bg-blue-100 text-blue-700">
                                      {activeParticipant?.participantName.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                                
                                <div className={cn(
                                  "px-4 py-2 rounded-lg",
                                  isCurrentUser 
                                    ? "bg-blue-500 text-white rounded-br-none" 
                                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                                )}>
                                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                </div>
                              </div>
                              
                              {/* Attachments */}
                              {message.attachments && message.attachments.length > 0 && (
                                <div className="ml-10 space-y-2">
                                  {message.attachments.map((attachment, index) => (
                                    <div key={index} className="bg-white border rounded-lg overflow-hidden">
                                      {attachment.type === 'image' && (
                                        <div className="relative">
                                          <img 
                                            src={attachment.url} 
                                            alt={attachment.name || 'Attachment'} 
                                            className="w-full max-h-40 object-cover" 
                                          />
                                          <div className="absolute inset-0 bg-black/5"></div>
                                        </div>
                                      )}
                                      
                                      {attachment.type === 'job' && (
                                        <div className="p-3 bg-blue-50 border-l-4 border-blue-500">
                                          <div className="flex items-center">
                                            <Briefcase className="h-4 w-4 text-blue-500 mr-2" />
                                            <p className="text-sm font-medium">{attachment.name}</p>
                                          </div>
                                          <p className="text-xs text-gray-500 mt-1">Job Posting</p>
                                          <Button size="sm" className="mt-2 h-7 text-xs" variant="outline">
                                            View Job
                                          </Button>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              {/* Message footer with timestamp and read status */}
                              <div className={`flex items-center text-xs text-gray-500 ${isCurrentUser ? 'justify-end' : 'justify-start ml-10'}`}>
                                {isClient && (
                                  <>
                                    <span>
                                      {formattedTimes[message.id] || ''}
                                    </span>
                                    {isCurrentUser && message.read && (
                                      <span className="ml-1 text-blue-500">
                                        <CheckCircle className="h-3 w-3" />
                                      </span>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      
                      <div ref={messageEndRef} />
                    </div>
                  </ScrollArea>
                  
                  {/* Message Input */}
                  <div className="border-t p-3">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="text-gray-500">
                        <PaperclipIcon className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-500">
                        <ImageIcon className="h-5 w-5" />
                      </Button>
                      <Input 
                        placeholder="Type a message..." 
                        className="flex-1"
                        value={messageText}
                        onChange={e => setMessageText(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button 
                        disabled={!messageText.trim()} 
                        onClick={handleSendMessage}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <div className="bg-blue-100 text-blue-700 p-4 rounded-full mb-4">
                    <MessageSquare className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No conversation selected</h3>
                  <p className="text-gray-500 max-w-sm">
                    Select a conversation from the list to start messaging or search for a user.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage; 