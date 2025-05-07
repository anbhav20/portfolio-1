import React, { useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./components/ThemeProvider";
import NotFound from "@/pages/not-found";
import Portfolio from "@/pages/Portfolio";
import TrackingRedirect from "@/pages/TrackingRedirect";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Portfolio} />
      <Route path="/track-redirect" component={TrackingRedirect} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Track visitor IP on every page load
    fetch("/api/track-ip").catch((err) => console.error("IP tracking failed:", err));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;