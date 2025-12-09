import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PillarsSection } from "@/components/pillars-section"
import { FeaturedProjects } from "@/components/featured-projects"
import { ResearchHighlights } from "@/components/research-highlights"
import { StatsSection } from "@/components/stats-section"
import { CTASection } from "@/components/cta-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <PillarsSection />
        <FeaturedProjects />
        <StatsSection />
        <CTASection />
      </main>
    </div>
  )
}
