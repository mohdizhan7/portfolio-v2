export type Dispatch = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
};

export const dispatches: Dispatch[] = [
  {
    slug: 'the-48-hour-network',
    title: 'The 48-Hour Network',
    subtitle: 'How I rebuilt last-mile logistics from scratch during the first COVID lockdown.',
    date: 'Apr 2025',
    readTime: '5 min read',
  },
  {
    slug: 'the-floor-before-the-whiteboard',
    title: 'The Floor Before the Whiteboard',
    subtitle: 'Why I spend weeks watching pickers before redesigning any workflow.',
    date: 'Mar 2025',
    readTime: '4 min read',
  },
  {
    slug: 'uat-is-design',
    title: 'UAT Is Design',
    subtitle: 'User Acceptance Testing is the most underrated design activity in operations.',
    date: 'Feb 2025',
    readTime: '4 min read',
  },
];

export function getDispatch(slug: string) {
  return dispatches.find(d => d.slug === slug) ?? null;
}
