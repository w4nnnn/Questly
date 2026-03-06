import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { modules } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  const publishedModules = await db
    .select({ id: modules.id, updatedAt: modules.updatedAt })
    .from(modules)
    .where(eq(modules.isPublished, true));

  const moduleEntries: MetadataRoute.Sitemap = publishedModules.map(
    (module) => ({
      url: `${baseUrl}/modules/${module.id}`,
      lastModified: module.updatedAt ?? new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...moduleEntries,
  ];
}
