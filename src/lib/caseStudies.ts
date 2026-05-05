export type CaseStudySections = {
  situation: string;
  call: string;
  execution: string;
  impact: string;
  lesson: string;
};

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
  metaDescription: string;
  client: string;
  year: string;
  metrics: { value: string; label: string }[];
  status?: string;
  sections: CaseStudySections;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'ph-rollout',
    number: '01',
    icon: '🎯',
    title: 'PH Rollout',
    subtitle: 'Multi-warehouse PTL, Philippines',
    tags: ['PTL', 'Training', 'Rollout'],
    cover: '/ph-rollout.webp',
    role: 'Implementation PM',
    timeline: '2024 — Present',
    scale: '50+ Sites',
    client: 'StackBOX',
    year: '2024 — Present',
    status: 'In Progress',
    metrics: [
      { value: '50+', label: 'Sites targeted' },
      { value: '99.2%', label: 'Pick accuracy (pilot)' },
    ],
    metaDescription: 'How I rolled out Pick-to-Light systems across 8 warehouses in the Philippines for a major pharma manufacturer — 99.2% pick accuracy, zero missed shipments.',
    sections: {
      situation: 'A major pharmaceutical manufacturer in the Philippines needed Pick-to-Light (PTL) systems deployed across 50+ warehouse sites. There was no local implementation team, no prior PTL playbook in-country, and no vendor with rollout experience at this scale in the Philippine market. The client needed operational continuity throughout — zero tolerance for shipment failures during a live pharmaceutical supply chain.',
      call: 'Pilot 8 sites before committing to full rollout. Accept a slower start to build a repeatable playbook that could scale with minimal re-work. This meant resisting pressure to move faster early, in exchange for predictability across the remaining 40+ sites.',
      execution: 'Designed warehouse layouts and PTL hardware configurations for each site typology. Built comprehensive rollout playbooks from scratch — commissioning checklists, operator training modules, WMS configuration guides, and go-live sign-off criteria. Trained 200+ operators and local implementation partners. Ran staggered pilots with live data capture and accuracy validation at each site before progression to the next cluster. Currently scaling through the remaining sites.',
      impact: '99.2% pick accuracy across the pilot network. Zero missed shipments during go-live phases. 18% faster order fulfillment versus manual picking baseline. Rollout progressing on schedule with the playbook being executed by trained local partners with minimal central oversight.',
      lesson: 'A rollout without a documented playbook is just controlled chaos. Write the manual before you need it — because once you\'re in the field, there\'s no time to think.',
    },
  },
  {
    slug: 'hul-samadhan',
    number: '02',
    icon: '📦',
    title: 'HUL Samadhan',
    subtitle: 'Warehouse automation UAT & go-live',
    tags: ['WMS', 'UAT', 'PTL'],
    cover: '/hul-samadhan.webp',
    role: 'Automation Lead',
    timeline: 'Jan — Jun 2023',
    scale: '3 Warehouses',
    client: 'Hindustan Unilever',
    year: '2023',
    metrics: [
      { value: '+40%', label: 'Throughput increase' },
      { value: '$2.3M', label: 'Annual savings captured' },
    ],
    metaDescription: 'How I led UAT design and go-live for a full warehouse automation retrofit across HUL\'s top 3 distribution hubs — 40% throughput increase, $2.3M in annual savings.',
    sections: {
      situation: 'HUL\'s three largest distribution hubs in India were running manual sortation, picking, and packing workflows built over 15 years. Automation hardware was already purchased. The gap was implementation — no BRD had been written, no UAT framework existed, and no one had planned how to go live without shutting down operations that process millions of units monthly.',
      call: 'Run UAT across all three sites simultaneously rather than sequentially. Sequential meant lower risk per site but tripled the timeline and forced operational disruption twice over. Parallel meant more coordination overhead upfront — but a single go-live window, and a much shorter period of operational uncertainty for the client.',
      execution: 'Built the BRD from scratch through discovery sessions with 150+ stakeholders across operations, IT, and three external automation vendors. Designed and ran the full UAT cycle — conveyor timing, sensor calibration, PTL system triggers, Spring Logic configuration, WES monitoring. Ran six weeks of parallel site testing across all three hubs before staging a single phased go-live window over one weekend.',
      impact: '40% throughput increase post-launch. $2.3M in projected annual savings captured. Zero operational regressions across all three sites in the 90 days following go-live. The client\'s operations team reported the smoothest system transition in their distribution history.',
      lesson: 'UAT doesn\'t surface edge cases. The floor does. The best defect reports came from pickers who\'d worked the manual process for 10 years — not from the test scripts.',
    },
  },
  {
    slug: '25-percent-project',
    number: '03',
    icon: '📈',
    title: 'The 25% Project',
    subtitle: 'Picking workflow redesign',
    tags: ['Process Design', 'Analytics'],
    cover: '/25-percent.webp',
    role: 'Process Design Lead',
    timeline: 'May — Aug 2022',
    scale: 'Edgistify · Delhi Hub',
    client: 'Edgistify',
    year: '2022',
    metrics: [
      { value: '+25%', label: 'Productivity gain per picker' },
      { value: '90 days', label: 'Full ROI payback' },
    ],
    metaDescription: 'How redesigning the batching algorithm and picker workflows at Edgistify\'s Delhi hub delivered a 25% productivity gain — 160 additional picks per picker per shift.',
    sections: {
      situation: 'Picking productivity at Edgistify\'s Delhi hub had plateaued for six months. Management suspected a WMS configuration issue and wanted a system change. The problem was that no one had measured where time was actually being lost — the assumption was the software, but no one had watched the floor.',
      call: 'Don\'t touch the WMS until the data is clear. Spend 6 weeks on the floor mapping every picker\'s movement across full shifts before proposing any change. Ignore the pressure to produce a quick fix — a wrong fix would embed a bad process permanently.',
      execution: 'Tracked picker routes across 30+ full shifts — motion paths, idle moments, data entry patterns, and batch assignment sequences. Found that 40% of pick time was lost to unoptimised batch groupings: pickers were crossing the same aisles 3–4 times per batch for items that could have been sequenced together. Redesigned the batching algorithm around zone proximity and aisle order. Retrained pickers on the new workflow. Rolled out in two weeks with no system downtime.',
      impact: '25% productivity gain per picker — 160 additional picks per picker per shift. Full ROI achieved in 90 days. The hub manager replicated the zone-proximity batching model across two other facilities within six months.',
      lesson: 'The answer was already on the floor. Stop looking at dashboards and start watching the people doing the work.',
    },
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
    metaDescription: 'How I built an alternative last-mile network in 48 hours and cleared 150,000 shipments in 7 days during COVID — a crisis ops case study from DTDC Mumbai.',
    sections: {
      situation: 'April 2020. First COVID lockdown. Mumbai\'s last-mile delivery network shut down overnight — no riders, no vehicles, no corporate guidance on when it would resume. 150,000 shipments stacked at my branch with SLA timers still running. Customers expecting medical supplies, essentials, and business-critical documents. No escalation path.',
      call: 'Don\'t wait for corporate to solve it. The situation required a decision in hours, not days. Build a parallel delivery network using local partners with idle two-wheelers — find them, price them, deploy them — before the backlog compounds further.',
      execution: 'Identified neighbourhood logistics contacts and vehicle owners through local networks within 12 hours. Negotiated per-shipment rates on the spot — fast enough to move, structured enough to track. Built manual routing sheets in Google Sheets, divided by zone, assigned vehicles per cluster, and stood up daily dispatch operations in under 48 hours. Managed the operation personally for 7 straight days, adjusting routes daily based on access restrictions and availability.',
      impact: '150,000 shipments cleared in 7 days. Maintained 95–98% on-time delivery throughout the operation. Less than 0.5% damage rate. Zero customer escalations. The operation was documented and distributed as a crisis response case study across the DTDC branch network.',
      lesson: 'In a crisis, the speed of your first decision matters more than the quality of your final plan. Perfect information never arrives on time.',
    },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find(cs => cs.slug === slug) ?? null;
}
