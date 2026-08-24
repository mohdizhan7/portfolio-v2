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
  title: string;
  subtitle: string;
  tags: string[];
  cover: string;
  role: string;
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
    title: 'PH Rollout',
    subtitle: 'Multi-warehouse PTL, Philippines',
    tags: ['PTL', 'Training', 'Rollout'],
    cover: '/ph-rollout.webp',
    role: 'Implementation PM',
    client: 'StackBOX',
    year: '2024 — Present',
    status: 'In Progress',
    metrics: [
      { value: '50+', label: 'Sites targeted' },
      { value: '99.2%', label: 'Pick accuracy (pilot)' },
    ],
    metaDescription: 'How I rolled out Pick-to-Light systems across 8 warehouses in the Philippines for a major pharma manufacturer: 99.2% pick accuracy, zero missed shipments.',
    sections: {
      situation: 'A major pharmaceutical manufacturer in the Philippines needed Pick-to-Light (PTL) systems deployed across 50+ warehouse sites. There was no local implementation team, no prior PTL playbook in-country, and no vendor with rollout experience at this scale in the Philippine market. The client needed operational continuity throughout, with zero tolerance for shipment failures during a live pharmaceutical supply chain.',
      call: 'Pilot 8 sites before committing to full rollout. Accept a slower start to build a repeatable playbook that could scale with minimal re-work. This meant resisting pressure to move faster early, in exchange for predictability across the remaining 40+ sites.',
      execution: 'Designed warehouse layouts and PTL hardware configurations for each site typology. Built comprehensive rollout playbooks from scratch: commissioning checklists, operator training modules, WMS configuration guides, and go-live sign-off criteria. Trained 200+ operators and local implementation partners. Ran staggered pilots with live data capture and accuracy validation at each site before progression to the next cluster. Currently scaling through the remaining sites.',
      impact: '99.2% pick accuracy across the pilot network. Zero missed shipments during go-live phases. 18% faster order fulfillment versus manual picking baseline. Rollout progressing on schedule with the playbook being executed by trained local partners with minimal central oversight.',
      lesson: 'A rollout without a documented playbook is just controlled chaos. Write the manual before you need it, because once you\'re in the field, there\'s no time to think.',
    },
  },
  {
    slug: 'hul-samadhan',
    number: '02',
    title: 'HUL Samadhan',
    subtitle: 'Solo UAT and go-live readiness, zero to ready',
    tags: ['WMS', 'UAT', 'PTL/SBL'],
    cover: '/hul-samadhan.webp',
    role: 'Implementation Lead',
    client: 'Hindustan Unilever (HUL)',
    year: '2024',
    metrics: [
      { value: '20K/day', label: 'Target order volume, design capacity' },
      { value: '20+', label: 'Pickers & supervisors trained and certified' },
    ],
    metaDescription: 'How I built a bare warehouse\'s WMS, PTL/SBL, and network infrastructure from zero and ran a solo 30-day UAT to a clean go-live handoff for HUL, inside my first six months at StackBOX.',
    sections: {
      situation: 'HUL wanted an "order today, deliver tomorrow" model for retailers: an order placed today, picked and packed that evening, dispatched overnight, on the shelf the next day, designed around a target of roughly 20,000 orders a day running through a new PTL/SBL automation layer. I\'d just come off a successful pilot at HUL\'s Chennai site, testing conveyor communication against StackBOX\'s WCS and training pickers on a system they\'d never used before. Once that pilot proved out, I was sent to Vapi to build the same thing from zero, with no pilot cushion this time. Vapi was a bare warehouse. The conveyor and physical stations were installed by a separate hardware vendor; everything else, including the PTL lights, controllers, the network, and the StackBOX system itself, was mine to build. I was under six months into my time at StackBOX. If this site failed, HUL was a client we stood to lose.',
      call: 'I ran Vapi as a set of parallel, independent workstreams: network readiness, conveyor-to-WCS-to-StackBOX communication testing, PTL bin setup, picker and supervisor training, and a live issue tracker feeding both the hardware vendor and StackBOX\'s product team, instead of one sequential chain gated on the vendor finishing first. That was the deliberate rejection: never let a vendor blocker, like a conveyor fix or a diverter fault, stall the whole timeline. Whatever couldn\'t move, I flagged and tracked to resolution. Whatever could move, like training and network testing, I pulled forward and ran anyway. Treating the build as parallel tracks instead of one blocked queue is the reason the timeline held.',
      execution: 'The BRD was already locked by a previous project manager before I arrived; my scope started at infrastructure and system readiness. UAT ran roughly 30 days against a large infrastructure footprint. I trained and certified around 20 pickers and 3 shift supervisors from scratch, covering picking strategies for both SBL and PTL, app navigation, and repicking flows, in parallel with the infrastructure fixes. I was the only person on-site who understood both what the StackBOX system expected and the physical and network infrastructure behind it, which made me the sole source of technical visibility on the floor. When something broke, like a crate not diverting or looping the conveyor instead of dropping to its station, I traced it back through the StackBOX WCS logs myself, then routed the fix to the hardware vendor or StackBOX\'s product team depending on where the fault actually lived. I also ran mock order test cycles to validate that StackBOX, the WCS, and the conveyor were working in unison before signing off on readiness. My scope ended at UAT-complete, training-complete, handoff-ready. I was transitioned to a different project as soon as the site cleared for go-live, and handed the account back to the original project manager.',
      impact: 'The site passed UAT and moved to go-live on the strength of that readiness work. Handover was clean: every picker and supervisor was certified on both the system and the physical infrastructure, and the incoming project manager inherited a site with no open technical unknowns. I wasn\'t on-site for go-live day itself, so the post-launch throughput numbers aren\'t mine to claim. The deliverable was a bare warehouse taken to a fully tested, staffed, and validated go-live-ready state, solo, inside a UAT window that held despite starting from zero infrastructure.',
      lesson: 'This was the first time I\'d tested physical automation, not just the StackBOX system layer, and it landed before my six-month mark at the company. Nobody tells you that the hardest part of an enterprise go-live isn\'t the system logic. It\'s being the one person on-site who has to translate between the vendor\'s hardware, the client\'s ops floor, and your own product, while the client\'s country-ops lead is watching to see if you can be trusted with the account.',
    },
  },
  {
    slug: 'the-backlog',
    number: '03',
    title: 'The Backlog',
    subtitle: 'No playbook. No directive. 150,000 shipments cleared in 7 days.',
    tags: ['Last-Mile', 'Crisis Ops'],
    cover: '/backlog.jpg',
    role: 'Acting Ops Lead',
    client: 'DTDC Express',
    year: '2020',
    metrics: [
      { value: '150K',       label: 'Shipments cleared in 7 days' },
      { value: '10% → 70%',  label: 'On-time delivery recovered' },
      { value: 'Averted',    label: 'SLA breach exposure' },
    ],
    metaDescription: 'How I built an alternative last-mile delivery network during the COVID lockdown and cleared 150,000 backlogged shipments in 7 days, with no playbook, no corporate directive, and 40 people.',
    sections: {
      situation: 'June 2020. Mumbai was in full COVID lockdown. Staff had returned to their hometowns overnight. Shipments were stacking on the floor with no data in the system and not enough manpower to process inbound volumes. On-time delivery had collapsed to 10%. SLA penalties were accumulating, the client relationship was at risk, and the branch\'s operational credibility was on the line. No directive came down. The call was mine.',
      call: 'There was no playbook. Nobody had built one for this. But one detail changed everything: my branch covered a dense network of government offices and restricted localities where only authorised persons could enter. Standard couriers were being turned back at checkpoints; there was no way in without an existing access pass or recognised local authority. I grew up in one of these areas and knew first-hand how that access worked. If we could find vendors who already had that authorisation, we could deliver where no conventional last-mile network could reach. That was the unlock. We moved immediately.',
      execution: 'Before Day 1, we sourced vendors with existing access to government localities: people already operating inside the restricted perimeter. We briefed them on the work, negotiated per-shipment rates (COVID meant everyone needed income; pricing was fast and fair), and arranged official movement passes so their routes wouldn\'t be stopped at checkpoints.\n\nDay 1: Started with letters and documents, lightweight and low-risk, as a live test of the network. Each vendor took ~100 shipments. It worked. Government employees were absent, so we delivered to security personnel and got sign-off from leadership to proceed.\n\nDays 2–3: Scaled to 300–400 documents per vendor per day and cleared the full document backlog.\n\nDay 4: The harder problem: larger parcels destined for government offices and residential addresses. Called recipients directly. Most asked for return to origin; for the rest, security-personnel handover was approved. For residential shipments, we brought in vegetable and newspaper vendors already making daily rounds through the same streets.\n\nDays 5–7: Cleared all remaining shipments and closed every pending CRM ticket. Tracking ran on DRS sheets; the vendors knew the localities better than any routing algorithm.',
      impact: '150,000 shipments cleared in 7 days with 40–50 people. On-time delivery recovered from 10% to 70%. Some RTO was unavoidable given government offices remained shut, but the alternative was 0%. SLA penalties were halted. The operation ran without a single directive from above.\n\nThe result led directly to my promotion to Branch Manager of one of DTDC Mumbai\'s highest-volume branches, within months of the incident. That is the market\'s verdict on the work.',
      lesson: 'Informal access networks outperform formal logistics infrastructure when formal systems fail, and the person who maps those informal networks before the crisis is the one who resolves it after. I didn\'t know I was building that map. Six years in that branch had already done it for me.\n\nThe tactical note: work in blocks. I didn\'t try to solve 150,000 shipments at once. I solved letters first, then documents, then parcels, then residentials. Structure beats firefighting, even when everything is on fire.',
    },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find(cs => cs.slug === slug) ?? null;
}
