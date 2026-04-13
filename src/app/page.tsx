import { Nav } from "@/components/Nav"
import { Hero } from "@/components/Hero"
import { Benefits } from "@/components/Benefits"
import { Contact } from "@/components/Contact"
import { FAQ } from "@/components/FAQ"
import { Footer } from "@/components/Footer"

export default async function Home() {
  return (
    <main className="bg-[#FAF8F5] overflow-x-hidden">
      <Nav />
      <Hero />
      <Benefits />
      <Contact />
      <FAQ />
      <Footer />
    </main>
  )
}
