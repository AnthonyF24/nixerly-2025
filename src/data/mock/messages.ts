import { v4 as uuidv4 } from 'uuid';
import { users } from './users';
import { professionals } from './professionals';

export type MessageStatus = 'sent' | 'delivered' | 'read';

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: string;
  status: MessageStatus;
  attachments?: string[];
};

export type Conversation = {
  id: string;
  participants: string[];
  lastMessageTimestamp: string;
  unreadCount: number;
  messages: Message[];
  title?: string;
};

// Create mock conversations and messages
export const conversations: Conversation[] = [
  {
    id: uuidv4(),
    participants: [users[0].id, professionals[0].id],
    lastMessageTimestamp: '2024-03-30T14:22:00Z',
    unreadCount: 2,
    title: 'NixOS System Configuration Project',
    messages: [
      {
        id: uuidv4(),
        conversationId: '',
        senderId: users[0].id,
        recipientId: professionals[0].id,
        content: 'Hi Jordan, I saw your profile and I think you would be a great fit for our NixOS project. Do you have availability in the coming weeks?',
        timestamp: '2024-03-29T10:15:00Z',
        status: 'read'
      },
      {
        id: uuidv4(),
        conversationId: '',
        senderId: professionals[0].id,
        recipientId: users[0].id,
        content: 'Hello Alex, thanks for reaching out! Yes, I have availability starting next week. Could you share more details about your project requirements?',
        timestamp: '2024-03-29T11:30:00Z',
        status: 'read'
      },
      {
        id: uuidv4(),
        conversationId: '',
        senderId: users[0].id,
        recipientId: professionals[0].id,
        content: 'Great! We need help setting up a reproducible build environment for our development team using NixOS. We have about 20 developers who need consistent environments across MacOS and Linux.',
        timestamp: '2024-03-29T14:45:00Z',
        status: 'read'
      },
      {
        id: uuidv4(),
        conversationId: '',
        senderId: professionals[0].id,
        recipientId: users[0].id,
        content: 'That sounds like a perfect fit for my experience. I\'ve implemented similar setups for cross-platform teams before. Would you be available for a call to discuss technical details?',
        timestamp: '2024-03-30T09:20:00Z',
        status: 'read'
      },
      {
        id: uuidv4(),
        conversationId: '',
        senderId: users[0].id,
        recipientId: professionals[0].id,
        content: 'Absolutely! How does tomorrow at 2pm Pacific time work for you? I can set up a Zoom call with our tech lead as well.',
        timestamp: '2024-03-30T10:05:00Z',
        status: 'read'
      },
      {
        id: uuidv4(),
        conversationId: '',
        senderId: professionals[0].id,
        recipientId: users[0].id,
        content: 'That works perfectly. I\'ll prepare some initial thoughts on how we could approach this. Looking forward to the call!',
        timestamp: '2024-03-30T14:22:00Z',
        status: 'delivered'
      }
    ]
  },
  {
    id: uuidv4(),
    participants: [users[0].id, professionals[1].id],
    lastMessageTimestamp: '2024-03-28T16:10:00Z',
    unreadCount: 0,
    title: 'DevOps Consultation',
    messages: [
      {
        id: uuidv4(),
        conversationId: '',
        senderId: users[0].id,
        recipientId: professionals[1].id,
        content: 'Hi Taylor, I\'m interested in your DevOps services. We\'re looking to improve our deployment pipeline using NixOS.',
        timestamp: '2024-03-28T13:40:00Z',
        status: 'read'
      },
      {
        id: uuidv4(),
        conversationId: '',
        senderId: professionals[1].id,
        recipientId: users[0].id,
        content: 'Hello Alex! I specialize in NixOS deployments and would be happy to help. What challenges are you currently facing with your pipeline?',
        timestamp: '2024-03-28T14:15:00Z',
        status: 'read'
      },
      {
        id: uuidv4(),
        conversationId: '',
        senderId: users[0].id,
        recipientId: professionals[1].id,
        content: 'Our main issues are inconsistent builds between environments and long deployment times. We\'re also having trouble with dependency management.',
        timestamp: '2024-03-28T15:30:00Z',
        status: 'read'
      },
      {
        id: uuidv4(),
        conversationId: '',
        senderId: professionals[1].id,
        recipientId: users[0].id,
        content: 'Those are precisely the kinds of problems NixOS solves well. I can help you set up a reproducible build system that addresses these issues. Would you like to schedule an initial consultation call?',
        timestamp: '2024-03-28T16:10:00Z',
        status: 'read'
      }
    ]
  },
  {
    id: uuidv4(),
    participants: [users[0].id, professionals[2].id],
    lastMessageTimestamp: '2024-03-27T11:05:00Z',
    unreadCount: 1,
    title: 'Full-Stack Development Project',
    messages: [
      {
        id: uuidv4(),
        conversationId: '',
        senderId: professionals[2].id,
        recipientId: users[0].id,
        content: 'Hello, I noticed your job posting for a full-stack developer with Nix experience. I believe my background makes me a strong candidate for this role.',
        timestamp: '2024-03-27T09:15:00Z',
        status: 'read'
      },
      {
        id: uuidv4(),
        conversationId: '',
        senderId: users[0].id,
        recipientId: professionals[2].id,
        content: 'Hi Morgan, thanks for reaching out. Your profile looks interesting. Could you tell me more about your experience with Nix in particular?',
        timestamp: '2024-03-27T09:45:00Z',
        status: 'read'
      },
      {
        id: uuidv4(),
        conversationId: '',
        senderId: professionals[2].id,
        recipientId: users[0].id,
        content: 'I\'ve been using Nix for the past 3 years to create reproducible development environments for JavaScript and TypeScript projects. I\'ve also contributed to several Nix packages and helped teams transition their build systems to Nix.',
        timestamp: '2024-03-27T11:05:00Z',
        status: 'delivered'
      }
    ]
  }
];

// Fix conversation IDs
conversations.forEach(conversation => {
  conversation.messages.forEach(message => {
    message.conversationId = conversation.id;
  });
});

// Helper functions
export const getConversationsByUserId = (userId: string): Conversation[] => {
  return conversations.filter(conv => conv.participants.includes(userId));
};

export const getConversationById = (conversationId: string): Conversation | undefined => {
  return conversations.find(conv => conv.id === conversationId);
};

export const getUnreadMessageCount = (userId: string): number => {
  return conversations
    .filter(conv => conv.participants.includes(userId))
    .reduce((total, conv) => {
      const unreadMessages = conv.messages.filter(
        msg => msg.recipientId === userId && msg.status !== 'read'
      );
      return total + unreadMessages.length;
    }, 0);
}; 