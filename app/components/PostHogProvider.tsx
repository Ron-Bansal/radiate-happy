"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

    if (!apiKey) {
      if (process.env.NODE_ENV === "development") {
        console.warn("PostHog key is not configured. Analytics has been disabled.");
      }

      return;
    }

    posthog.init(apiKey, {
      api_host: "/ingest",
      ui_host: "https://us.posthog.com",
      capture_exceptions: true, // This enables capturing exceptions using Error Tracking
      debug: process.env.NODE_ENV === "development",
    });

    return () => {
      posthog.shutdown();
    };
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
