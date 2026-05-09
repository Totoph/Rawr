import { homeContent } from "@/content/home"
import { Nav } from "@/components/Nav"
import { Hero } from "@/components/Hero"
import { Stats } from "@/components/Stats"
import { AppScreens } from "@/components/AppScreens"
import { Waitlist } from "@/components/Waitlist"
import { FAQ } from "@/components/FAQ"
import { LegalFooter } from "@/components/LegalFooter"

export default function Home() {
  return (
    <main className="bg-white">
      <Nav
        logo={homeContent.nav.logo}
        links={homeContent.nav.links}
        cta={homeContent.nav.cta}
      />
      <Hero
        tag={homeContent.hero.tag}
        headline={homeContent.hero.headline}
        subheadlineStart={homeContent.hero.subheadlineStart}
        subheadlineHighlight1={homeContent.hero.subheadlineHighlight1}
        subheadlineMiddle={homeContent.hero.subheadlineMiddle}
        subheadlineHighlight2={homeContent.hero.subheadlineHighlight2}
        subheadlineEnd={homeContent.hero.subheadlineEnd}
        subheadline={homeContent.hero.subheadline}
        ctaPrimary={homeContent.hero.ctaPrimary}
        ctaSecondary={homeContent.hero.ctaSecondary}
        socialProof={homeContent.hero.socialProof}
      />
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
      <Stats stats={homeContent.stats} className="relative -mt-47 mt-12" />
      <FAQ
        tag={homeContent.faq.tag}
        headline={homeContent.faq.headline}
        headlineHighlight={homeContent.faq.headlineHighlight}
        items={homeContent.faq.items}
      />
      <section className="relative -mt-47">
        <img
          src="/assets/assets/design/footer.png"
          alt="Footer"
          className="w-full h-auto block"
        />
        <LegalFooter copyright={homeContent.footer.copyright} />
      </section>
    </main>
  )
}
