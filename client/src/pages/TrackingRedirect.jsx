import React, { useEffect } from 'react';
import { useLocation } from 'wouter';

const TrackingRedirect = () => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to the home page after a brief delay
    const timer = setTimeout(() => {
      setLocation('/');
    }, 500);

    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  );
};

export default TrackingRedirect;