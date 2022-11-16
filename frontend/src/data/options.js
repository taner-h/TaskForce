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
  project_id: 15,
  creator_id: 1,
  project_name: 'TaskForce',
  description:
    'TaskForce is an online collaboration platform for software development.',
  summary: null,
  repo: 'https://github.com/taner-h/TaskForce',
  credit_count: 3,
  member_count: 0,
  create_time: '2022-11-12T08:38:01.653Z',
  project_type: 'private',
  creator_name: 'Admin',
  creator_surname: 'Admin',
  sub_tier: 'ultimate',
  fields: [
    {
      project_id: 15,
      field_id: 2,
      name: 'Mobile Application Development',
    },
    {
      project_id: 15,
      field_id: 19,
      name: 'Database Development',
    },
    {
      project_id: 15,
      field_id: 21,
      name: 'Cross-platform Development',
    },
  ],
  skills: [
    {
      project_id: 15,
      skill_id: 3,
      name: 'Artificial Intelligence',
    },
    {
      project_id: 15,
      skill_id: 4,
      name: 'Mobile Application Developer',
    },
    {
      project_id: 15,
      skill_id: 1,
      name: 'Front-End Developer',
    },
  ],
  tags: [
    {
      project_id: 15,
      tag_id: 2,
      name: 'Java',
    },
    {
      project_id: 15,
      tag_id: 12,
      name: 'Redis',
    },
    {
      project_id: 15,
      tag_id: 17,
      name: 'E-commerce',
    },
    {
      project_id: 15,
      tag_id: 23,
      name: 'PHP',
    },
    {
      project_id: 15,
      tag_id: 26,
      name: 'Angular',
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

export const example = {
  totalItems: 24,
  totalPageCount: 2,
  currentPage: 1,
  pageSize: 12,
  projects: [
    {
      project_id: 39,
      creator_id: 1,
      project_name: 'TaskForce',
      description:
        'TaskForce is an online collaboration platform for software development.',
      summary:
        'TaskForce is an online collaboration platform for software development.',
      repo: 'https://github.com/taner-h/TaskForce',
      credit_count: 3,
      member_count: 0,
      create_time: '2022-11-12T09:35:37.275Z',
      project_type: 'private',
      creator_name: 'Admin',
      creator_surname: 'Admin',
      sub_tier: 'ultimate',
      fields: [
        {
          project_id: 39,
          field_id: 1,
          name: 'Web Development',
        },
        {
          project_id: 39,
          field_id: 2,
          name: 'Mobile Application',
        },
      ],
      skills: [
        {
          project_id: 39,
          skill_id: 3,
          name: 'Artificial Intelligence',
        },
        {
          project_id: 39,
          skill_id: 4,
          name: 'Mobile Application Developer',
        },
        {
          project_id: 39,
          skill_id: 1,
          name: 'Front-End Developer',
        },
      ],
      tags: [
        {
          project_id: 39,
          tag_id: 1,
          name: 'React.js',
        },
        {
          project_id: 39,
          tag_id: 3,
          name: 'JavaScript',
        },
        {
          project_id: 39,
          tag_id: 60,
          name: 'NewTag',
        },
        {
          project_id: 39,
          tag_id: 61,
          name: 'NewTag2',
        },
      ],
    },
    {
      project_id: 38,
      creator_id: 1,
      project_name: 'TaskForce',
      description:
        'TaskForce is an online collaboration platform for software development.',
      summary:
        'TaskForce is an online collaboration platform for software development.',
      repo: 'https://github.com/taner-h/TaskForce',
      credit_count: 3,
      member_count: 0,
      create_time: '2022-11-12T09:30:58.607Z',
      project_type: 'private',
      creator_name: 'Admin',
      creator_surname: 'Admin',
      sub_tier: 'ultimate',
      fields: [
        {
          project_id: 38,
          field_id: 1,
          name: 'Web Development',
        },
        {
          project_id: 38,
          field_id: 2,
          name: 'Mobile Application',
        },
      ],
      skills: [
        {
          project_id: 38,
          skill_id: 3,
          name: 'Artificial Intelligence',
        },
        {
          project_id: 38,
          skill_id: 4,
          name: 'Mobile Application Developer',
        },
        {
          project_id: 38,
          skill_id: 1,
          name: 'Front-End Developer',
        },
      ],
      tags: [
        {
          project_id: 38,
          tag_id: 1,
          name: 'React.js',
        },
        {
          project_id: 38,
          tag_id: 3,
          name: 'JavaScript',
        },
        {
          project_id: 38,
          tag_id: 58,
          name: 'NewTag',
        },
        {
          project_id: 38,
          tag_id: 59,
          name: 'NewTag2',
        },
      ],
    },
    {
      project_id: 37,
      creator_id: 1,
      project_name: 'TaskForce',
      description:
        'TaskForce is an online collaboration platform for software development.',
      summary:
        'TaskForce is an online collaboration platform for software development.',
      repo: 'https://github.com/taner-h/TaskForce',
      credit_count: 3,
      member_count: 0,
      create_time: '2022-11-12T09:30:40.691Z',
      project_type: 'private',
      creator_name: 'Admin',
      creator_surname: 'Admin',
      sub_tier: 'ultimate',
      fields: [
        {
          project_id: 37,
          field_id: 1,
          name: 'Web Development',
        },
        {
          project_id: 37,
          field_id: 2,
          name: 'Mobile Application',
        },
      ],
      skills: [
        {
          project_id: 37,
          skill_id: 3,
          name: 'Artificial Intelligence',
        },
        {
          project_id: 37,
          skill_id: 4,
          name: 'Mobile Application Developer',
        },
        {
          project_id: 37,
          skill_id: 1,
          name: 'Front-End Developer',
        },
      ],
      tags: [
        {
          project_id: 37,
          tag_id: 1,
          name: 'React.js',
        },
        {
          project_id: 37,
          tag_id: 3,
          name: 'JavaScript',
        },
        {
          project_id: 37,
          tag_id: 56,
          name: 'NewTag',
        },
        {
          project_id: 37,
          tag_id: 57,
          name: 'NewTag2',
        },
      ],
    },
    {
      project_id: 36,
      creator_id: 1,
      project_name: 'TaskForce',
      description:
        'TaskForce is an online collaboration platform for software development.',
      summary:
        'TaskForce is an online collaboration platform for software development.',
      repo: 'https://github.com/taner-h/TaskForce',
      credit_count: 3,
      member_count: 0,
      create_time: '2022-11-12T09:26:48.318Z',
      project_type: 'private',
      creator_name: 'Admin',
      creator_surname: 'Admin',
      sub_tier: 'ultimate',
      fields: [
        {
          project_id: 36,
          field_id: 1,
          name: 'Web Development',
        },
        {
          project_id: 36,
          field_id: 2,
          name: 'Mobile Application',
        },
      ],
      skills: [
        {
          project_id: 36,
          skill_id: 3,
          name: 'Artificial Intelligence',
        },
        {
          project_id: 36,
          skill_id: 4,
          name: 'Mobile Application Developer',
        },
        {
          project_id: 36,
          skill_id: 1,
          name: 'Front-End Developer',
        },
      ],
      tags: [
        {
          project_id: 36,
          tag_id: 1,
          name: 'React.js',
        },
        {
          project_id: 36,
          tag_id: 3,
          name: 'JavaScript',
        },
        {
          project_id: 36,
          tag_id: 54,
          name: 'NewTag',
        },
        {
          project_id: 36,
          tag_id: 55,
          name: 'NewTag2',
        },
      ],
    },
    {
      project_id: 35,
      creator_id: 1,
      project_name: 'TaskForce',
      description:
        'TaskForce is an online collaboration platform for software development.',
      summary:
        'TaskForce is an online collaboration platform for software development.',
      repo: 'https://github.com/taner-h/TaskForce',
      credit_count: 3,
      member_count: 0,
      create_time: '2022-11-12T09:22:35.243Z',
      project_type: 'private',
      creator_name: 'Admin',
      creator_surname: 'Admin',
      sub_tier: 'ultimate',
      fields: [
        {
          project_id: 35,
          field_id: 1,
          name: 'Web Development',
        },
        {
          project_id: 35,
          field_id: 2,
          name: 'Mobile Application',
        },
      ],
      skills: [
        {
          project_id: 35,
          skill_id: 3,
          name: 'Artificial Intelligence',
        },
        {
          project_id: 35,
          skill_id: 4,
          name: 'Mobile Application Developer',
        },
        {
          project_id: 35,
          skill_id: 1,
          name: 'Front-End Developer',
        },
      ],
      tags: [
        {
          project_id: 35,
          tag_id: 1,
          name: 'React.js',
        },
        {
          project_id: 35,
          tag_id: 3,
          name: 'JavaScript',
        },
      ],
    },
    {
      project_id: 34,
      creator_id: 1,
      project_name: 'TaskForce',
      description:
        'TaskForce is an online collaboration platform for software development.',
      summary:
        'TaskForce is an online collaboration platform for software development.',
      repo: 'https://github.com/taner-h/TaskForce',
      credit_count: 3,
      member_count: 0,
      create_time: '2022-11-12T09:21:13.945Z',
      project_type: 'private',
      creator_name: 'Admin',
      creator_surname: 'Admin',
      sub_tier: 'ultimate',
      fields: [
        {
          project_id: 34,
          field_id: 1,
          name: 'Web Development',
        },
        {
          project_id: 34,
          field_id: 2,
          name: 'Mobile Application',
        },
      ],
      skills: [
        {
          project_id: 34,
          skill_id: 3,
          name: 'Artificial Intelligence',
        },
        {
          project_id: 34,
          skill_id: 4,
          name: 'Mobile Application Developer',
        },
        {
          project_id: 34,
          skill_id: 1,
          name: 'Front-End Developer',
        },
      ],
      tags: [
        {
          project_id: 34,
          tag_id: 1,
          name: 'React.js',
        },
        {
          project_id: 34,
          tag_id: 3,
          name: 'JavaScript',
        },
      ],
    },
    {
      project_id: 32,
      creator_id: 1,
      project_name: 'TaskForce',
      description:
        'TaskForce is an online collaboration platform for software development.',
      summary:
        'TaskForce is an online collaboration platform for software development.',
      repo: 'https://github.com/taner-h/TaskForce',
      credit_count: 3,
      member_count: 0,
      create_time: '2022-11-12T09:09:04.060Z',
      project_type: 'private',
      creator_name: 'Admin',
      creator_surname: 'Admin',
      sub_tier: 'ultimate',
      fields: [
        {
          project_id: 32,
          field_id: 1,
          name: 'Web Development',
        },
        {
          project_id: 32,
          field_id: 2,
          name: 'Mobile Application',
        },
      ],
      skills: [
        {
          project_id: 32,
          skill_id: 3,
          name: 'Artificial Intelligence',
        },
        {
          project_id: 32,
          skill_id: 4,
          name: 'Mobile Application Developer',
        },
        {
          project_id: 32,
          skill_id: 1,
          name: 'Front-End Developer',
        },
      ],
      tags: [
        {
          project_id: 32,
          tag_id: 1,
          name: 'React.js',
        },
        {
          project_id: 32,
          tag_id: 3,
          name: 'JavaScript',
        },
      ],
    },
    {
      project_id: 31,
      creator_id: 1,
      project_name: 'TaskForce',
      description:
        'TaskForce is an online collaboration platform for software development.',
      summary:
        'TaskForce is an online collaboration platform for software development.',
      repo: 'https://github.com/taner-h/TaskForce',
      credit_count: 3,
      member_count: 0,
      create_time: '2022-11-12T08:57:56.479Z',
      project_type: 'private',
      creator_name: 'Admin',
      creator_surname: 'Admin',
      sub_tier: 'ultimate',
      fields: [
        {
          project_id: 31,
          field_id: 1,
          name: 'Web Development',
        },
        {
          project_id: 31,
          field_id: 2,
          name: 'Mobile Application',
        },
      ],
      skills: [
        {
          project_id: 31,
          skill_id: 3,
          name: 'Artificial Intelligence',
        },
        {
          project_id: 31,
          skill_id: 4,
          name: 'Mobile Application Developer',
        },
        {
          project_id: 31,
          skill_id: 1,
          name: 'Front-End Developer',
        },
      ],
      tags: [
        {
          project_id: 31,
          tag_id: 1,
          name: 'React.js',
        },
        {
          project_id: 31,
          tag_id: 3,
          name: 'JavaScript',
        },
      ],
    },
    {
      project_id: 30,
      creator_id: 1,
      project_name: 'TaskForce',
      description:
        'TaskForce is an online collaboration platform for software development.',
      summary:
        'TaskForce is an online collaboration platform for software development.',
      repo: 'https://github.com/taner-h/TaskForce',
      credit_count: 3,
      member_count: 0,
      create_time: '2022-11-12T08:56:56.930Z',
      project_type: 'private',
      creator_name: 'Admin',
      creator_surname: 'Admin',
      sub_tier: 'ultimate',
      fields: [
        {
          project_id: 30,
          field_id: 1,
          name: 'Web Development',
        },
        {
          project_id: 30,
          field_id: 2,
          name: 'Mobile Application',
        },
      ],
      skills: [
        {
          project_id: 30,
          skill_id: 3,
          name: 'Artificial Intelligence',
        },
        {
          project_id: 30,
          skill_id: 4,
          name: 'Mobile Application Developer',
        },
        {
          project_id: 30,
          skill_id: 1,
          name: 'Front-End Developer',
        },
      ],
      tags: [
        {
          project_id: 30,
          tag_id: 1,
          name: 'React.js',
        },
        {
          project_id: 30,
          tag_id: 3,
          name: 'JavaScript',
        },
      ],
    },
    {
      project_id: 29,
      creator_id: 1,
      project_name: 'TaskForce',
      description:
        'TaskForce is an online collaboration platform for software development.',
      summary:
        'TaskForce is an online collaboration platform for software development.',
      repo: 'https://github.com/taner-h/TaskForce',
      credit_count: 3,
      member_count: 0,
      create_time: '2022-11-12T08:55:54.835Z',
      project_type: 'private',
      creator_name: 'Admin',
      creator_surname: 'Admin',
      sub_tier: 'ultimate',
      fields: [
        {
          project_id: 29,
          field_id: 1,
          name: 'Web Development',
        },
        {
          project_id: 29,
          field_id: 2,
          name: 'Mobile Application',
        },
      ],
      skills: [
        {
          project_id: 29,
          skill_id: 3,
          name: 'Artificial Intelligence',
        },
        {
          project_id: 29,
          skill_id: 4,
          name: 'Mobile Application Developer',
        },
        {
          project_id: 29,
          skill_id: 1,
          name: 'Front-End Developer',
        },
      ],
      tags: [
        {
          project_id: 29,
          tag_id: 1,
          name: 'React.js',
        },
        {
          project_id: 29,
          tag_id: 3,
          name: 'JavaScript',
        },
      ],
    },
    {
      project_id: 28,
      creator_id: 1,
      project_name: 'TaskForce',
      description:
        'TaskForce is an online collaboration platform for software development.',
      summary:
        'TaskForce is an online collaboration platform for software development.',
      repo: 'https://github.com/taner-h/TaskForce',
      credit_count: 3,
      member_count: 0,
      create_time: '2022-11-12T08:51:01.798Z',
      project_type: 'private',
      creator_name: 'Admin',
      creator_surname: 'Admin',
      sub_tier: 'ultimate',
      fields: [
        {
          project_id: 28,
          field_id: 1,
          name: 'Web Development',
        },
        {
          project_id: 28,
          field_id: 2,
          name: 'Mobile Application',
        },
      ],
      skills: [
        {
          project_id: 28,
          skill_id: 3,
          name: 'Artificial Intelligence',
        },
        {
          project_id: 28,
          skill_id: 4,
          name: 'Mobile Application Developer',
        },
        {
          project_id: 28,
          skill_id: 1,
          name: 'Front-End Developer',
        },
      ],
      tags: [
        {
          project_id: 28,
          tag_id: 1,
          name: 'React.js',
        },
        {
          project_id: 28,
          tag_id: 3,
          name: 'JavaScript',
        },
      ],
    },
    {
      project_id: 26,
      creator_id: 1,
      project_name: 'TaskForce',
      description:
        'TaskForce is an online collaboration platform for software development.',
      summary:
        'TaskForce is an online collaboration platform for software development.',
      repo: 'https://github.com/taner-h/TaskForce',
      credit_count: 3,
      member_count: 0,
      create_time: '2022-11-12T08:49:48.103Z',
      project_type: 'private',
      creator_name: 'Admin',
      creator_surname: 'Admin',
      sub_tier: 'ultimate',
      fields: [
        {
          project_id: 26,
          field_id: 1,
          name: 'Web Development',
        },
        {
          project_id: 26,
          field_id: 2,
          name: 'Mobile Application',
        },
      ],
      skills: [
        {
          project_id: 26,
          skill_id: 3,
          name: 'Artificial Intelligence',
        },
        {
          project_id: 26,
          skill_id: 4,
          name: 'Mobile Application Developer',
        },
        {
          project_id: 26,
          skill_id: 1,
          name: 'Front-End Developer',
        },
      ],
      tags: [
        {
          project_id: 26,
          tag_id: 1,
          name: 'React.js',
        },
        {
          project_id: 26,
          tag_id: 3,
          name: 'JavaScript',
        },
      ],
    },
  ],
  currentPageItems: 12,
};
