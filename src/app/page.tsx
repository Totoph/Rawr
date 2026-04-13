import { Nav } from "@/components/Nav"
import { Hero } from "@/components/Hero"
import { Benefits } from "@/components/Benefits"
import { ValueProps } from "@/components/ValueProps"
import { ConnectionDiagram } from "@/components/ConnectionDiagram"
import { Contact } from "@/components/Contact"
import { FAQ } from "@/components/FAQ"
import { Footer } from "@/components/Footer"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const rawName = params.restaurant
  const restaurantName =
    typeof rawName === "string" && rawName.trim()
      ? decodeURIComponent(rawName.trim())
      : "Le Bernardin"

  return (
    <main className="bg-[#FAF8F5] overflow-x-hidden">
      <Nav />
      <Hero restaurantName={restaurantName} />
      <Benefits />
      <ValueProps />
      <ConnectionDiagram />
      <Contact />
      <FAQ />
      <Footer />
    </main>
  )
}
