export interface Service {
  slug: string
  name: string
  shortName: string
  tagline: string
  description: string
  icon: string
  particleShape: string
  heroStatement: string
  coreMessage: string
  expandedCopy: string
  bullets: string[]
  differentiator: string
  color: string
}

export const services: Service[] = [
  {
    slug: 'visitor-identity',
    name: 'Visitor Identity Resolution',
    shortName: 'Visitor Identity',
    tagline: "You're already getting traffic. Now you can actually use it.",
    particleShape: 'eye',
    icon: '👁',
    heroStatement: "Most website traffic disappears without a trace.",
    coreMessage: "Turn anonymous website traffic into actionable audience data.",
    description: "A lightweight pixel that turns anonymous browsing into a stream of audience intelligence, so you can re-engage the demand already reaching your site.",
    expandedCopy: "Most website traffic disappears without a trace. Our visitor identity solution helps turn anonymous browsing into a stream of actionable audience intelligence. By identifying and enriching high-intent visitors, we help businesses build stronger retargeting, direct mail, and follow-up strategies that recover more opportunity from the traffic they already have.",
    bullets: [
      "Capture value from existing site visitors",
      "Build audiences from non-converters",
      "Support email, digital, and direct mail re-engagement",
      "Improve audience understanding and follow-up options",
      "Strengthen conversion recovery strategies",
    ],
    differentiator: "Traditional pixels track behavior. This helps you act on it.",
    color: "#FF9E1B",
  },
  {
    slug: 'audience-data',
    name: 'Intent-Based Audience Data',
    shortName: 'Audience Data',
    tagline: "Better data creates better marketing.",
    particleShape: 'fingerprint',
    icon: '🖐',
    heroStatement: "Better targeting starts with better data.",
    coreMessage: "High-intent audience data, ready for activation.",
    description: "Enriched consumer records built to improve targeting precision, match rates, and campaign performance across digital, mobile, CRM, and direct mail platforms.",
    expandedCopy: "Our data offering gives businesses and agencies access to activation-ready audience records designed for modern marketing. Each record can include deep identity, contact, and device-level enrichment, making it easier to target, segment, and activate across digital, mobile, CRM, and direct mail channels. This is not just data for reporting. It is data built to drive better marketing execution.",
    bullets: [
      "Improve audience precision",
      "Enrich customer and prospect records",
      "Increase match rates across ad platforms",
      "Activate across digital, mobile, and direct mail",
      "Support agencies with scalable audience data supply",
    ],
    differentiator: "Most providers hand you static lists. We focus on data that can actually be activated across the channels that matter.",
    color: "#FF9E1B",
  },
  {
    slug: 'geotargeting',
    name: 'Location Intelligence Targeting',
    shortName: 'Geotargeting',
    tagline: "Target customers based on where they actually go.",
    particleShape: 'pin',
    icon: '📍',
    heroStatement: "Most geotargeting stops at a radius.",
    coreMessage: "We use real-world location data to build audiences based on where people actually go.",
    description: "Mobile location signals identify and build audiences based on real-world behavior: competitor visits, travel patterns, abandonment behavior, and purchase intent signals.",
    expandedCopy: "Digital Pointes transforms real-world movement into high-value marketing audiences. By analyzing mobile location behavior, we identify consumers who have visited specific businesses, followed defined trade routes, or displayed patterns that signal intent. This allows you to reach competitor customers, engage surrounding audiences, and re-capture interest in a more precise and practical way.",
    bullets: [
      "Win attention from competitor audiences",
      "Target surrounding and complementary service customers",
      "Identify location-based abandonment patterns",
      "Reach people along natural trade routes",
      "Build precise local campaigns based on real-world activity",
    ],
    differentiator: "Most geotargeting stops at a radius. We look at behavior before, during, and after the visit to build smarter audiences.",
    color: "#FF9E1B",
  },
  {
    slug: 'marketing',
    name: 'Audience Activation',
    shortName: 'Marketing',
    tagline: "Multi-channel campaigns that actually work together.",
    particleShape: 'person',
    icon: '📡',
    heroStatement: "Most agencies start with channels.",
    coreMessage: "Reach the right audience everywhere that matters.",
    description: "Coordinated campaigns across digital, print, and connected TV, built around your audience, not just the channels available.",
    expandedCopy: "Digital Pointes brings audience strategy to life through integrated campaign execution. By coordinating digital, print, and streaming channels around the right audience, we create reinforcement, consistency, and stronger conversion potential across every stage of the buying process. This is not about being everywhere. It is about showing up in the right places with the right message.",
    bullets: [
      "Coordinated digital, print, and CTV campaigns",
      "Stronger message reinforcement across channels",
      "Better alignment between audience and activation",
      "Reduced fragmentation in campaign execution",
      "Performance-oriented optimization across touchpoints",
    ],
    differentiator: "Most agencies start with channels. We start with the audience, then activate across the right channels.",
    color: "#FF9E1B",
  },
  {
    slug: 'ai-systems',
    name: 'Custom AI Systems',
    shortName: 'AI Systems',
    tagline: "Custom AI systems built for your business.",
    particleShape: 'neural',
    icon: '⚡',
    heroStatement: "AI is not plug-and-play.",
    coreMessage: "Stop buying AI tools that don't fit. We build custom AI systems designed around the way your business actually works.",
    description: "Custom-built AI and automation systems designed around your real bottlenecks, opportunities, and operating realities. Not off-the-shelf deployments forced into your workflow.",
    expandedCopy: "Most AI products are built for mass adoption, not for the specific realities of your business. Digital Pointes takes a more practical approach. We identify bottlenecks, inefficiencies, and opportunities, then build AI and automation systems designed to solve them with precision. The result is not another generic tool. It is a system aligned with how your business runs and how your team actually works.",
    bullets: [
      "Built around real business pain points",
      "Avoids one-size-fits-all AI implementations",
      "Supports internal workflows and customer-facing systems",
      "Connects automation with practical business outcomes",
      "Designed to evolve as the business grows",
    ],
    differentiator: "No templates. No shortcuts. Just systems that work.",
    color: "#FF9E1B",
  },
  {
    slug: 'optimizers',
    name: 'Optimization Systems',
    shortName: 'Optimizers',
    tagline: "AI, automation, and content working together to drive results.",
    particleShape: 'chart',
    icon: '◈',
    heroStatement: "We don't just build websites.",
    coreMessage: "Turn your website into a conversion engine.",
    description: "From AI receptionists and automated workflows to authority content and community engagement, systems that transform passive traffic into measurable business opportunity.",
    expandedCopy: "We don't just build websites. We build systems around them that capture more leads, improve engagement, and create better conversion paths. From AI receptionists and agentic workflows to blog content that ranks and Reddit engagement that builds real trust, our optimization layer transforms a website from a static presence into a living conversion engine.",
    bullets: [
      "AI receptionists that keep your business responsive 24/7",
      "Automated workflows that move browsers toward buyers",
      "High-ranking blog content built to convert",
      "Strategic Reddit engagement in high-intent communities",
      "Continuous improvement, not set-it-and-forget-it",
    ],
    differentiator: "Most campaigns run until the budget runs out. Ours keep evolving, keep performing.",
    color: "#FF9E1B",
  },
  {
    slug: 'websites',
    name: 'Growth-Ready Websites',
    shortName: 'Websites',
    tagline: "A website that actually drives growth.",
    particleShape: 'chart',
    icon: '▣',
    heroStatement: "Your website shouldn't just exist.",
    coreMessage: "Your website shouldn't just exist. It should produce.",
    description: "High-performance websites designed for speed, search visibility, and conversion, managed continuously so they keep improving as your business grows.",
    expandedCopy: "Digital Pointes builds websites that do more than look modern. They are designed to support growth. Every site is built to be fast, mobile-friendly, SEO-ready, and structured for modern search and AI discovery. Ongoing support and unlimited updates ensure your website keeps evolving as your business does.",
    bullets: [
      "Mobile-first user experience",
      "High-performance technical foundation",
      "Strong speed and SEO benchmarks",
      "Structured for modern search behavior and AI discovery",
      "Ongoing support without friction or bottlenecks",
    ],
    differentiator: "Most websites are built and forgotten. Ours are built to keep improving.",
    color: "#FF9E1B",
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug)
}
