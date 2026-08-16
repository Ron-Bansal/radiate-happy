import type { MetadataRoute } from "next";

const siteUrl = "https://raunaqbansal.com";

const pages: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/portfolio", changeFrequency: "monthly", priority: 0.9 },
  { path: "/garden", changeFrequency: "monthly", priority: 0.7 },
  { path: "/ascent", changeFrequency: "monthly", priority: 0.7 },
  { path: "/c3", changeFrequency: "monthly", priority: 0.7 },
  { path: "/caruso", changeFrequency: "monthly", priority: 0.7 },
  { path: "/draftline", changeFrequency: "monthly", priority: 0.7 },
  { path: "/patina", changeFrequency: "monthly", priority: 0.7 },
  { path: "/reel", changeFrequency: "monthly", priority: 0.7 },
  { path: "/speedround", changeFrequency: "monthly", priority: 0.7 },
  { path: "/12weekyear", changeFrequency: "monthly", priority: 0.6 },
  { path: "/tracksuit", changeFrequency: "monthly", priority: 0.6 },
  { path: "/blog/25circle", changeFrequency: "yearly", priority: 0.5 },
  { path: "/blog/25fails", changeFrequency: "yearly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path}`,
    changeFrequency,
    priority,
  }));
}
