"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { ARTICLES_DATA } from "@/lib/articles-data"

interface Article {
  title: string
  description: string
  content: string
  slug: string
  image?: string
  pubDate: string
}

export default function ClientArticlePage({ article }: { article: Article }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [article.slug])

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })

  const otherArticles = ARTICLES_DATA.filter((a) => a.slug !== article.slug).slice(0, 3)

  return (
    <div className="min-h-screen bg-white font-sans pt-20">
      <div className="flex min-h-[calc(100vh-5rem)]">
        {/* Sidebar - matching listing page */}
        <aside className="hidden lg:block w-80 bg-background/95 backdrop-blur-md text-foreground p-8 sticky top-0 h-screen border-r border-primary/20">
          <div className="border-4 border-primary/30 rounded-xl p-8 mt-24">
            <p className="text-sm font-semibold mb-4 text-primary uppercase tracking-wide">Sejam bem-vindos!</p>
            <h2 className="text-2xl font-bold leading-tight text-foreground">
              O Portal <span className="text-primary">Satus Gestão</span> oferece conteúdo atualizado e relevante sobre
              os mais diversificados assuntos contábeis.
            </h2>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="mb-12">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                  <Calendar className="w-4 h-4 text-primary" />
                  <time className="font-semibold text-gray-900">{formatDate(article.pubDate)}</time>
                </div>
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold text-black leading-tight mb-6 text-balance">
                {article.title}
              </h1>
              <p className="text-xl text-black leading-relaxed font-medium">{article.description}</p>
            </div>

            {article.image && (
              <div className="relative h-[32rem] mb-16 rounded-2xl overflow-hidden bg-muted shadow-xl">
                <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
              </div>
            )}

            <Card className="p-12 sm:p-16 bg-white border-gray-200 shadow-lg rounded-2xl mb-20">
              <div className="text-gray-900">
                <article
                  className="prose prose-xl max-w-none font-sans text-gray-900
                    prose-headings:font-bold prose-headings:text-black 
                    prose-p:text-gray-800 prose-p:leading-relaxed prose-p:mb-8 prose-p:text-lg
                    prose-li:text-gray-800 prose-li:text-base prose-li:leading-relaxed
                    prose-strong:text-black prose-strong:font-bold
                    prose-h2:text-black prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-6 prose-h2:leading-tight
                    prose-h3:text-black prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:font-bold prose-h3:leading-snug
                    prose-ul:text-gray-800 prose-ul:space-y-4 prose-ul:my-8
                    prose-ol:text-gray-800 prose-ol:space-y-4 prose-ol:my-8
                    prose-a:text-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>

              <div className="mt-20 pt-12 border-t-2 border-gray-200">
                <Card className="p-10 bg-white border-2 border-primary/50 rounded-2xl shadow-xl">
                  <h3 className="text-3xl font-bold text-black mb-4">Precisa de Ajuda Contábil?</h3>
                  <p className="text-gray-700 mb-8 leading-relaxed text-lg font-medium">
                    A Satus Gestão Contábil está pronta para auxiliar sua empresa com soluções personalizadas e
                    atendimento especializado.
                  </p>
                  <Link href="/">
                    <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all rounded-xl">
                      Entre em Contato
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </Card>
              </div>
            </Card>

            {/* Related articles section */}
            {otherArticles.length > 0 && (
              <div className="mb-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 bg-white">
                <h2 className="text-4xl font-bold text-black mb-12 text-center">Mais Artigos</h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {otherArticles.map((otherArticle) => (
                    <Link key={otherArticle.slug} href={`/artigos/${otherArticle.slug}`}>
                      <Card className="group overflow-hidden border-2 border-primary/30 hover:border-primary transition-all duration-300 hover:shadow-xl h-full bg-white">
                        {otherArticle.image && (
                          <div className="relative h-48 overflow-hidden bg-muted">
                            <Image
                              src={otherArticle.image || "/placeholder.svg"}
                              alt={otherArticle.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                            <Calendar className="w-3 h-3 text-primary" />
                            <time className="font-medium">{formatDate(otherArticle.pubDate)}</time>
                          </div>
                          <h3 className="text-xl font-bold text-black mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {otherArticle.title}
                          </h3>
                          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 mb-4">
                            {otherArticle.description}
                          </p>
                          <div className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                            Ler mais
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <footer className="bg-background/95 backdrop-blur-md border-t-2 border-primary/20 mt-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center space-y-6">
                <div className="flex items-center justify-center gap-2 mb-6">
                  <img src="/images/logo-satus.png" alt="Satus" className="h-14 w-auto" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Satus Gestão Contábil LTDA</h3>
                <div className="text-base text-foreground/80 space-y-2 font-medium">
                  <p>CNPJ 54.137.873/0001-70</p>
                  <p>Rua Rio Negrinho, Joinville – SC</p>
                  <p>
                    E-mail:{" "}
                    <a
                      href="mailto:suporte@satusgestao.com.br"
                      className="text-primary hover:text-primary/80 hover:underline font-semibold transition-colors"
                    >
                      suporte@satusgestao.com.br
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}
