"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { 
  AlertCircle, 
  Bell, 
  CheckCircle, 
  Info, 
  X,
  AlertTriangle
} from "lucide-react";
import { 
  Slide,
  ToastProvider, 
  Toast, 
  ToastTitle, 
  ToastDescription, 
  ToastClose, 
  ToastViewport 
} from "@/components/ui/toast";

export type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationProps {
  type?: NotificationType;
  title: string;
  description?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  duration?: number;
  action?: React.ReactNode;
  className?: string;
}

export const Notification: React.FC<NotificationProps> = ({
  type = "info",
  title,
  description,
  open,
  onOpenChange,
  duration = 5000,
  action,
  className,
}) => {
  const iconMap = {
    success: <CheckCircle className="h-5 w-5 text-green-600" />,
    error: <AlertCircle className="h-5 w-5 text-red-600" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-600" />,
    info: <Info className="h-5 w-5 text-blue-600" />,
  };

  const bgColorMap = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    warning: "bg-amber-50 border-amber-200",
    info: "bg-blue-50 border-blue-200",
  };

  return (
    <Toast
      open={open}
      onOpenChange={onOpenChange}
      duration={duration}
      className={cn(
        "border group p-4 shadow-lg",
        bgColorMap[type],
        className
      )}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          {iconMap[type]}
        </div>
        <div className="flex-1">
          <ToastTitle className="font-medium">{title}</ToastTitle>
          {description && (
            <ToastDescription className="text-sm mt-1 text-gray-600">
              {description}
            </ToastDescription>
          )}
          {action && <div className="mt-3">{action}</div>}
        </div>
        <ToastClose className="absolute top-2 right-2 opacity-70 transition-opacity group-hover:opacity-100" />
      </div>
    </Toast>
  );
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  return (
    <ToastProvider swipeDirection="right">
      {children}
      <ToastViewport className="p-6 gap-2 max-w-md" />
    </ToastProvider>
  );
};

// Custom hook for managing notification state
export const useNotification = (initialState = false) => {
  const [open, setOpen] = useState(initialState);
  
  const show = () => setOpen(true);
  const hide = () => setOpen(false);
  
  return {
    open,
    setOpen,
    show,
    hide
  };
}; 