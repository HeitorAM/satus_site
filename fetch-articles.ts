"use server"

import { ARTICLES_DATA } from "@/lib/articles-data"

interface Article {
  title: string
  link: string
  pubDate: string
  description: string
  guid: string
  slug?: string
  image?: string
}

export async function fetchArticles(): Promise<{ success: boolean; articles: Article[]; error?: string }> {
  try {
    console.log("[v0] Using articles data from lib")
    return { success: true, articles: ARTICLES_DATA }
  } catch (error) {
    console.error("[v0] Error in fetchArticles:", error)
    return { success: true, articles: ARTICLES_DATA }
  }
}
