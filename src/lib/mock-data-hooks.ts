import { useState, useEffect } from 'react';
import { 
  users, 
  jobs, 
  professionals, 
  conversations, 
  User, 
  Job, 
  Professional, 
  Conversation,
  getCurrentUser,
  getOpenJobs,
  getJobsByBusiness,
  getJobById,
  getProfessionalById,
  getConversationsByUserId,
  getUnreadMessageCount
} from '@/data/mock';

// User hooks
export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setUser(getCurrentUser());
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return { user, loading };
};

// Job hooks
export const useJobs = (businessId?: string) => {
  const [jobList, setJobList] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      if (businessId) {
        setJobList(getJobsByBusiness(businessId));
      } else {
        setJobList(getOpenJobs());
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [businessId]);

  return { jobs: jobList, loading };
};

export const useJob = (jobId: string) => {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const found = getJobById(jobId);
      setJob(found || null);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [jobId]);

  return { job, loading };
};

// Professional hooks
export const useProfessionals = () => {
  const [professionalList, setProfessionalList] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setProfessionalList(professionals);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return { professionals: professionalList, loading };
};

export const useProfessional = (professionalId: string) => {
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const found = getProfessionalById(professionalId);
      setProfessional(found || null);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [professionalId]);

  return { professional, loading };
};

// Message hooks
export const useConversations = (userId: string) => {
  const [conversationList, setConversationList] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setConversationList(getConversationsByUserId(userId));
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [userId]);

  return { conversations: conversationList, loading };
};

export const useUnreadMessages = (userId: string) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setUnreadCount(getUnreadMessageCount(userId));
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [userId]);

  return { unreadCount, loading };
}; 