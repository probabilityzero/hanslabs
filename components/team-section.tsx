import { Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

const team = [
  {
    name: "Dr. Sarah Chen",
    role: "Founder & Chief Scientist",
    bio: "Former research scientist at DeepMind. PhD in Machine Learning from Stanford. 15+ years building intelligent systems.",
    image: "/professional-woman-scientist.png",
    social: {
      linkedin: "#",
      github: "#",
      twitter: "#",
    },
  },
  {
    name: "Marcus Rivera",
    role: "Head of Engineering",
    bio: "Ex-Google infrastructure lead. Expert in distributed systems and high-performance computing. Open source contributor.",
    image: "/professional-engineer.png",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
  {
    name: "Elena Vasquez",
    role: "Creative Director",
    bio: "Award-winning designer from IDEO. Specializes in interactive experiences and data visualization. MFA from RISD.",
    image: "/professional-woman-designer.png",
    social: {
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Dr. James Park",
    role: "Research Lead",
    bio: "Quantum computing researcher. Former professor at MIT. Published 50+ papers in top-tier venues.",
    image: "/professional-researcher.png",
    social: {
      linkedin: "#",
      github: "#",
    },
  },
]

export function TeamSection() {
  return (
    <section className="py-24 lg:py-32 bg-card/50 border-y border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide">Our Team</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            World-class researchers and engineers
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            A diverse team united by curiosity and a drive to build what hasn't been built before.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((person) => (
            <div key={person.name} className="group relative flex flex-col items-center text-center">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={person.image || "/placeholder.svg"}
                  alt={person.name}
                  className="h-64 w-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div className="flex gap-3">
                    {person.social.linkedin && (
                      <Link
                        href={person.social.linkedin}
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                      </Link>
                    )}
                    {person.social.github && (
                      <Link
                        href={person.social.github}
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        <Github className="h-5 w-5" />
                      </Link>
                    )}
                    {person.social.twitter && (
                      <Link
                        href={person.social.twitter}
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        <Twitter className="h-5 w-5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">{person.name}</h3>
              <p className="text-sm text-primary">{person.role}</p>
              <p className="mt-2 text-sm text-muted-foreground">{person.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
