import { VideoHero } from "@/components/video-hero"
import { About } from "@/components/about"
import { Objective } from "@/components/objective"
import { Services } from "@/components/services"
import { StatsAndClients } from "@/components/stats-and-clients"
import { ClientArea } from "@/components/client-area"
import { Contact } from "@/components/contact"
import { Address } from "@/components/address"
import { GoogleReviewsDisplay } from "@/components/google-reviews-display"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default function Home() {
  return (
    <main className="min-h-screen">
      <VideoHero />
      <About />
      <Objective />
      <Services />
      <StatsAndClients />
      <ClientArea />
      <Contact />
      <GoogleReviewsDisplay />
      <Address />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
