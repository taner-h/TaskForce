export const NAV_ITEMS = [
  {
    label: 'Projects',
    children: [
      {
        label: 'Search',
        subLabel: 'Find new projects to contribute',
        href: '/projects',
      },

      {
        label: 'Create',
        subLabel: 'Create your own project and add other people to your team',
        href: '/projects/create',
      },
    ],
  },
  {
    label: 'Tasks',
    children: [
      {
        label: 'Explore',
        subLabel: 'Look at all available tasks',
        href: '/tasks',
      },
      {
        label: 'Open Task',
        subLabel: 'Open your own task to get help from people',
        href: '/tasks/create',
      },
    ],
  },
  {
    label: 'Match',
    href: '/match',
  },
  {
    label: 'Pricing',
    href: '/pricing',
  },
  {
    label: 'Dashboard',
    children: [
      {
        label: 'My Projects',
        subLabel: 'Manage your projects',
        href: '/myprojects',
      },
      {
        label: 'My Tasks',
        subLabel: 'Manage your tasks',
        href: '/mytasks',
      },
    ],
  },
];

export const HOME_TEXTS = [
  'achieve your dreams?',
  'build your project?',
  'make the next big thing?',
  'solve your issues?',
  'co-found your business?',
  'create your app?',
];

export const USER_BADGE_COLORS = {
  free: 'gray',
  premium: 'green',
  ultimate: 'yellow',
};
