import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number][] = [
    ["", 1], ["/course", 1], ["/consultation", 0.9], ["/redroot", 0.8],
    ["/projects", 0.7], ["/about", 0.7], ["/contact", 0.6],
  ];
  return pages.map(([p, priority]) => ({ url: `${SITE_URL}${p}`, changeFrequency: "monthly", priority }));
}
