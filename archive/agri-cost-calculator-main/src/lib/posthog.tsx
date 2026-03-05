import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";

// PostHog configuration
const POSTHOG_KEY = "phc_OUqHVqxNwBxcPTx0qJl6qrrW6PKfF2VGvuzlQe8AwZW";
const POSTHOG_HOST = "https://us.i.posthog.com";

// Initialize PostHog
const isConfigured = true;

if (isConfigured && typeof window !== "undefined") {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: "identified_only",
    capture_pageview: false, // We'll handle this manually for SPA
    capture_pageleave: true,
  });
}

// Component to track page views on route changes
function PostHogPageView() {
  const location = useLocation();

  useEffect(() => {
    if (isConfigured) {
      posthog.capture("$pageview", {
        $current_url: window.location.href,
        path: location.pathname,
      });
    }
  }, [location]);

  return null;
}

interface PostHogProviderProps {
  children: ReactNode;
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  if (!isConfigured) {
    // Return children without PostHog wrapper if not configured
    return <>{children}</>;
  }

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  );
}

export { posthog, isConfigured };
