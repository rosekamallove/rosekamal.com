export const content = {
  header: {
    name: "Kamal",
    tagline: "Product Lead & IC • Exited Founder • AI & SaaS",
    location: "Bengaluru, India (Remote)"
  },
  now: {
    title: "/now",
    items: [
      {
        text: "building InstantDocs (formerly Kroto)",
        subitems: [
          "product lead & individual contributor",
          "exploring AI-first software businesses"
        ]
      }
    ]
  },
  prev: {
    title: "/prev",
    items: [
      "Product Lead & IC @ OptimizeCX (InstantDocs)",
      "Founder & CEO @ Kroto (acquired, 6-figure exit)",
      "Raised $160k pre-seed",
      "Product Hunt #1 & #4",
      "Software Engineer Intern @ Material Depot (YC W22)",
      "Google Summer of Code contributor",
      "MLH Fellow (top ~0.75%)"
    ]
  },
  about: {
    title: "About",
    body: "I’m a product-focused engineer and founder.\nI like building fast, talking to users early, and turning vague problems into shipped software.\nI’ve built and sold an AI SaaS, led product and engineering, and worked across startups and open source.\nCurrently focused on building high-quality, AI-native tools with real user value."
  },
  projects: {
    title: "Projects",
    items: [
      {
        name: "InstantDocs",
        description: "AI-powered video documentation for SaaS",
        href: ""
      },
      {
        name: "Kroto",
        description: "AI product documentation startup (acquired)",
        href: ""
      },
      {
        name: "[Project Placeholder]",
        description: "",
        href: ""
      },
      {
        name: "[Project Placeholder]",
        description: "",
        href: ""
      }
    ]
  },
  writing: {
    title: "Writing / Notes",
    body: "Placeholder for future essays, learnings, or notes."
  },
  socials: {
    title: "Socials",
    items: [
      { name: "GitHub", href: "" },
      { name: "LinkedIn", href: "" },
      { name: "Twitter / X", href: "" },
      { name: "YouTube (placeholder)", href: "" },
      { name: "Instagram (placeholder)", href: "" }
    ]
  },
  footer: "Built with Next.js. No tracking."
} as const;

export type Content = typeof content;
