"use client";

import { useEffect, useState } from "react";

const AUCKLAND_WEATHER_URL =
  "https://api.open-meteo.com/v1/forecast?latitude=-36.8485&longitude=174.7633&current=temperature_2m&timezone=Pacific%2FAuckland";

function formatAucklandTime() {
  return new Intl.DateTimeFormat("en-NZ", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Pacific/Auckland",
  }).format(new Date());
}

export default function AucklandStatus() {
  const [time, setTime] = useState("");
  const [temperature, setTemperature] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => setTime(formatAucklandTime());
    updateTime();
    const timer = window.setInterval(updateTime, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetch(AUCKLAND_WEATHER_URL, { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => {
        const currentTemperature = data?.current?.temperature_2m;
        if (typeof currentTemperature === "number") {
          setTemperature(`${Math.round(currentTemperature)}°C`);
        }
      })
      .catch(() => {
        // The local time remains useful if weather is temporarily unavailable.
      });

    return () => controller.abort();
  }, []);

  return (
    <span aria-live="polite">
      Auckland{time ? ` · ${time}` : ""}
      {temperature ? ` · ${temperature}` : ""}
    </span>
  );
}
