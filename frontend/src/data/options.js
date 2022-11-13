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
        label: 'Reccomended',
        subLabel: 'Take a look at our reccommendations for you',
        href: '/projects/reccomended',
      },
      {
        label: 'Open Source',
        subLabel:
          'Explore open source projects to contribute to a free and open internet',
        href: '/projects/opensource',
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

export const project = {
  project_id: 1,
  creator_id: 1,
  name: 'TaskForce',
  description:
    'TaskForce is an online collaboration platform for software development. Made for developers, by developers. ',
  summary:
    'TaskForce is an online collaboration platform for software development. Made for developers, by developers. ',
  repo: 'https://github.com/taner-h/TaskForce',
  credit_count: 3,
  create_time: '2022-11-04T11:19:11.342Z',
  project_type_id: 1,
  type: 'private',
  creator: {
    user_id: 1,
    email: 'admin@mail.com',
    password: '$2b$10$ZfSoN/Xwk2aQyoJk4qJ5iuCWmmZrSsWJQT2bRwrVk4apcecY6b.nC',
    name: 'Admin',
    surname: 'Admin',
    linkedin: null,
    github: null,
    bio: null,
    portfolio: null,
    credit_count: -2,
    create_time: '2022-11-04T08:18:47.605Z',
    sub_tier_id: 1,
    sub_tier: 'premium',
  },
  member_count: '4',
  fields: [
    {
      field_id: 1,
      name: 'Web Development',
    },
    {
      field_id: 2,
      name: 'Mobile Application',
    },
  ],
  tags: [
    {
      tag_id: 2,
      name: 'Java',
    },
    {
      tag_id: 3,
      name: 'JavaScript',
    },
    {
      tag_id: 5,
      name: 'node.js',
    },
  ],
  skills: [
    {
      skill_id: 3,
      name: 'Artificial Intelligence',
    },
    {
      skill_id: 4,
      name: 'Mobile Application Developer',
    },
  ],
  resources: [
    {
      resource_id: 1,
      title: 'Example Resource',
      link: 'www.example.com',
    },
    {
      resource_id: 2,
      title: 'Another Example Resource ',
      link: 'www.example2.com',
    },
  ],
};
export const project2 = {
  project_id: 1,
  creator_id: 1,
  name: 'TaskForce2',
  description:
    'TaskForce is an online collaboration platform for software development. Made for developers, by developers. ',
  summary:
    'TaskForce2 is an online collaboration platform for software development. Made for developers, by developers. TaskForce is an online collaboration platform for software development. Made for developers, by developers. ',
  repo: 'https://github.com/taner-h/TaskForce',
  credit_count: 3,
  create_time: '2022-11-04T11:19:11.342Z',
  project_type_id: 1,
  type: 'private',
  creator: {
    user_id: 1,
    email: 'admin@mail.com',
    password: '$2b$10$ZfSoN/Xwk2aQyoJk4qJ5iuCWmmZrSsWJQT2bRwrVk4apcecY6b.nC',
    name: 'Taner',
    surname: 'Hacioglu',
    linkedin: null,
    github: null,
    bio: null,
    portfolio: null,
    credit_count: -2,
    create_time: '2022-11-04T08:18:47.605Z',
    sub_tier_id: 1,
    sub_tier: 'free',
  },
  member_count: '4',
  fields: [
    {
      field_id: 1,
      name: 'Web Development',
    },
    {
      field_id: 2,
      name: 'Mobile Application',
    },
  ],
  tags: [
    {
      tag_id: 2,
      name: 'Java',
    },
    {
      tag_id: 3,
      name: 'JavaScript',
    },
    {
      tag_id: 5,
      name: 'node.js',
    },
  ],
  skills: [
    {
      skill_id: 3,
      name: 'Artificial Intelligence',
    },
    {
      skill_id: 4,
      name: 'Mobile Application Developer',
    },
  ],
  resources: [
    {
      resource_id: 1,
      title: 'Example Resource',
      link: 'www.example.com',
    },
    {
      resource_id: 2,
      title: 'Another Example Resource ',
      link: 'www.example2.com',
    },
  ],
};
