import type { MetadataRoute } from "next";
import { products } from "@/lib/data/products";
import { collections, looks, journalArticles, stores } from "@/lib/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://uclothia.com";

  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/new",
    "/women",
    "/men",
    "/accessories",
    "/collections",
    "/lookbook",
    "/journal",
    "/house",
    "/weddings",
    "/private-client",
    "/stores",
    "/search",
    "/wishlist",
    "/cart",
    "/checkout",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const collectionPages: MetadataRoute.Sitemap = collections.map((c) => ({
    url: `${baseUrl}/collections/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const lookPages: MetadataRoute.Sitemap = looks.map((l) => ({
    url: `${baseUrl}/lookbook/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const articlePages: MetadataRoute.Sitemap = journalArticles.map((a) => ({
    url: `${baseUrl}/journal/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const storePages: MetadataRoute.Sitemap = stores.map((s) => ({
    url: `${baseUrl}/stores/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const womenCategories = ["sarees", "lehengas", "gowns", "suits", "kurtas"];
  const menCategories = ["sherwanis", "bandhgalas", "kurta-sets", "suits"];
  const accessoryCategories = ["jewellery", "stoles", "bags", "footwear"];

  const categoryPages: MetadataRoute.Sitemap = [
    ...womenCategories.map((c) => `/women/${c}`),
    ...menCategories.map((c) => `/men/${c}`),
    ...accessoryCategories.map((c) => `/accessories/${c}`),
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...productPages,
    ...collectionPages,
    ...lookPages,
    ...articlePages,
    ...storePages,
    ...categoryPages,
  ];
}
