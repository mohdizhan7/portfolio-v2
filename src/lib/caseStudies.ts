export type CaseStudy = {
  slug: string;
  number: string;
  icon: string;
  title: string;
  subtitle: string;
  tags: string[];
  cover: string;
  role: string;
  timeline: string;
  scale: string;
  body: string[];
  outcome: string;
  metaDescription: string;
  client: string;
  year: string;
  metrics: { value: string; label: string }[];
  status?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'hul-samadhan',
    number: '01',
    icon: '📦',
    title: 'HUL Samadhan',
    subtitle: 'Warehouse automation UAT & go-live',
    tags: ['WMS', 'UAT', 'PTL'],
    cover: '/hul-samadhan.webp',
    role: 'Automation Lead',
    timeline: 'Jan—Jun 2023',
    scale: '3 Warehouses',
    client: 'Hindustan Unilever',
    year: '2023',
    metrics: [
      { value: '+40%', label: 'Throughput increase' },
      { value: '$2.3M', label: 'Annual savings captured' },
    ],
    body: [
      'Led UAT design and execution for a full warehouse automation retrofit across HUL\'s top 3 distribution hubs. Automated sortation, picking, and packing workflows that had been manual for 15+ years.',
      'Built the BRD, choreographed UAT cycles with 150+ stakeholders (operations, IT, external partners), and ran go-live across 3 sites in parallel without a single day of downtime.',
    ],
    outcome: '40% throughput increase. Captured $2.3M in annual savings. Zero operational regressions post-launch.',
    metaDescription: 'How I led UAT design and go-live for a full warehouse automation retrofit across HUL\'s top 3 distribution hubs — 40% throughput increase, $2.3M in annual savings.',
  },
  {
    slug: '25-percent-project',
    number: '02',
    icon: '📈',
    title: 'The 25% Project',
    subtitle: 'Picking workflow redesign',
    tags: ['Process Design', 'Analytics'],
    cover: '/25-percent.webp',
    role: 'Process Design Lead',
    timeline: 'May—Aug 2022',
    scale: 'Edgistify · Delhi Hub',
    client: 'Edgistify',
    year: '2022',
    metrics: [
      { value: '+25%', label: 'Productivity gain per picker' },
      { value: '90 days', label: 'Full ROI payback' },
    ],
    body: [
      'Spent 6 weeks on the warehouse floor studying picker motion, data entry bottlenecks, and batching logic. Identified that 40% of pick time was wasted on unoptimised batch assignments.',
      'Redesigned batching algorithm to group picks by zone proximity and aisle sequences. Retrained pickers on new layouts. Reduced average pick cycle time from 8 min to 6 min per 50-unit batch.',
    ],
    outcome: '25% productivity gain. 160 additional picks per picker per shift. ROI in 90 days.',
    metaDescription: 'How redesigning the batching algorithm and picker workflows at Edgistify\'s Delhi hub delivered a 25% productivity gain — 160 additional picks per picker per shift.',
  },
  {
    slug: 'ph-rollout',
    number: '03',
    icon: '🎯',
    title: 'PH Rollout',
    subtitle: 'Multi-warehouse PTL, Philippines',
    tags: ['PTL', 'Training', 'Rollout'],
    cover: '/ph-rollout.webp',
    role: 'Implementation PM',
    timeline: 'Mar—Dec 2021',
    scale: '8 Warehouses',
    client: 'StackBOX',
    year: '2024 — Present',
    status: 'In Progress',
    metrics: [
      { value: '50+', label: 'Sites targeted' },
      { value: '99.2%', label: 'Pick accuracy (pilot)' },
    ],
    body: [
      'Managed end-to-end roll out of Pick-to-Light (PTL) systems across 8 warehouses serving a top pharmaceutical manufacturer. Each site ran independently; we needed synchronised go-live without spillover impact.',
      'Built rollout playbooks, trained 200+ operators on hardware and workflows, and ran staggered pilots with live data validation before full deployment to each site.',
    ],
    outcome: '99.2% pick accuracy. Zero missed shipments. 18% faster order fulfillment across network.',
    metaDescription: 'How I rolled out Pick-to-Light systems across 8 warehouses in the Philippines for a major pharma manufacturer — 99.2% pick accuracy, zero missed shipments.',
  },
  {
    slug: 'the-backlog',
    number: '04',
    icon: '⚡',
    title: 'The Backlog',
    subtitle: 'Crisis ops: 150K in 7 days',
    tags: ['Last-Mile', 'Crisis Ops'],
    cover: '/backlog.webp',
    role: 'Branch Manager',
    timeline: 'April 2020',
    scale: '150,000 shipments',
    client: 'DTDC Express',
    year: '2020',
    metrics: [
      { value: '150K', label: 'Shipments cleared in 7 days' },
      { value: '48h', label: 'Network built from scratch' },
    ],
    body: [
      'During the first COVID wave, Mumbai\'s last-mile collapsed. 150,000 shipments stacked up at my branch. I built an alternative last-mile network in 48 hours and cleared the entire backlog in seven days.',
      'Signed local partners with idle two-wheelers, negotiated per-shipment rates, and stood up routing sheets in Google Sheets. Maintained 95–98% on-time delivery and less than 0.5% damage rate throughout the operation.',
    ],
    outcome: 'No customer escalations. Zero service failures. Became a case study in crisis operations across the DTDC network.',
    metaDescription: 'How I built an alternative last-mile network in 48 hours and cleared 150,000 shipments in 7 days during COVID — a crisis ops case study from DTDC Mumbai.',
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find(cs => cs.slug === slug) ?? null;
}
