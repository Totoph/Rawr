import { homeContent } from "@/content/home"
import { Nav } from "@/components/Nav"
import { Hero } from "@/components/Hero"
import { Stats } from "@/components/Stats"
import { AppScreens } from "@/components/AppScreens"
import { Waitlist } from "@/components/Waitlist"
import { FAQ } from "@/components/FAQ"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <main className="bg-[#FDF6EC] overflow-x-hidden">
      <Nav
        logo={homeContent.nav.logo}
        links={homeContent.nav.links}
        cta={homeContent.nav.cta}
      />
      <Hero
        tag={homeContent.hero.tag}
        headline={homeContent.hero.headline}
        headlineHighlight={homeContent.hero.headlineHighlight}
        headlineEnd={homeContent.hero.headlineEnd}
        subheadline={homeContent.hero.subheadline}
        ctaPrimary={homeContent.hero.ctaPrimary}
        ctaSecondary={homeContent.hero.ctaSecondary}
        socialProof={homeContent.hero.socialProof}
      />
      <Stats stats={homeContent.stats} />
      <AppScreens
        tag={homeContent.howItWorks.tag}
        headline={homeContent.howItWorks.headline}
        steps={homeContent.howItWorks.steps}
      />
      <Waitlist
        headline={homeContent.waitlist.headline}
        subheadline={homeContent.waitlist.subheadline}
        placeholder={homeContent.waitlist.placeholder}
        cta={homeContent.waitlist.cta}
        successMessage={homeContent.waitlist.successMessage}
      />
      <FAQ
        tag={homeContent.faq.tag}
        headline={homeContent.faq.headline}
        headlineHighlight={homeContent.faq.headlineHighlight}
        items={homeContent.faq.items}
      />
      <Footer
        logo={homeContent.footer.logo}
        copyright={homeContent.footer.copyright}
      />
    </main>
  )
}
