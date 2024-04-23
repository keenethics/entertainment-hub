/* eslint-disable sonarjs/no-duplicate-string */
// needed to seed activity types correctly

export const districts = ['Lychakiv', 'Shevchenko', 'Franko', 'Railway', 'Halych', 'Sychiv'].map(name => ({ name }));

export const specializations = ['Music', 'Organization', 'Photography', 'Entertainment', 'Education', 'Extreme'].map(
  name => ({
    name,
  }),
);

export const clientCategories = ['Kids', 'Disabled', 'Military', 'Students', 'Companies', 'Elder people'].map(name => ({
  name,
}));

export const organizationTypes = ['Volunteers', 'Social', 'Commercial'].map(name => ({ name }));

export const activityTypes = [
  {
    isActive: true,
    type: 'individual',
    title: 'For individuals',
    description: 'For one person',
    imagePath: '/assets/images/activity_individual.svg',
    priority: 6,
    requests: {
      connect: [
        'Quest',
        'Relax',
        'Travel',
        'Beauty',
        'Medical',
        'Music',
        'Art',
        'Dancing',
        'Food',
        'Games',
        'Cinema',
      ].map(name => ({ name })),
    },
  },
  {
    isActive: true,
    type: 'kids',
    title: 'For kids',
    description: 'For kids of any age and size',
    imagePath: '/assets/images/activity_kids.svg',
    priority: 5,
    requests: {
      connect: [
        'Quest',
        'Open air activities',
        'Relax',
        'Travel',
        'Birthday',
        'Medical',
        'Music',
        'Art',
        'Dancing',
        'Food',
        'Games',
        'Cinema',
      ].map(name => ({ name })),
    },
  },
  {
    isActive: true,
    type: 'family',
    title: 'For family',
    description: 'for building or reinforcement of family connectedness',
    imagePath: '/assets/images/activity_family.svg',
    priority: 4,
    requests: {
      connect: [
        'Quest',
        'Open air activities',
        'Travel',
        'Swimming',
        'Medical',
        'Music',
        'Art',
        'Dancing',
        'Food',
        'Games',
        'Cinema',
      ].map(name => ({ name })),
    },
  },
  {
    isActive: true,
    type: 'group',
    title: 'For groups',
    description: 'for people united by interests',
    imagePath: '/assets/images/activity_group.svg',
    priority: 3,
    requests: {
      connect: [
        'Quest',
        'Open air activities',
        'Relax',
        'Travel',
        'Medical',
        'Music',
        'Art',
        'Dancing',
        'Food',
        'Games',
        'Museum',
      ].map(name => ({ name })),
    },
  },
  {
    isActive: true,
    type: 'pair',
    title: 'For pair',
    description: 'for you and your partner',
    imagePath: '/assets/images/activity_pair.svg',
    priority: 2,
    requests: {
      connect: [
        'Quest',
        'Open air activities',
        'Relax',
        'Travel',
        'Birthday',
        'Medical',
        'Music',
        'Art',
        'Dancing',
        'Food',
        'Games',
        'Cinema',
        'Romantic',
        'Extreme',
      ].map(name => ({ name })),
    },
  },
  {
    isActive: true,
    type: 'business',
    title: 'For business',
    description: 'for employers, partners and employees.',
    imagePath: '/assets/images/activity_business.svg',
    priority: 1,
    requests: {
      connect: [
        'Quest',
        'Open air activities',
        'Relax',
        'Travel',
        'Birthday',
        'Medical',
        'Music',
        'Art',
        'Dancing',
        'Food',
        'Games',
        'Cinema',
        'Education',
        'Teambuilding',
      ].map(name => ({ name })),
    },
  },
];

// get all requests from activities
// map them from { name: 'foobar' } to 'foobar'
// then distinct them with 'Set'
// then map back to { name: 'foobar' } for creating in prisma
export const requests = [...new Set(activityTypes.flatMap(it => it.requests.connect).map(({ name }) => name))].map(
  name => ({ name }),
);

export const medicalMethods = [
  {
    title: 'Cosmetic surgery',
    description: 'Medical ways to adjust body weaknesses.',
  },
  {
    title: 'Speech therapy',
    description: 'Removing of speech defects',
  },
  {
    title: 'Cosmetic procedures',
    description: 'Ways to change body weaknesses that do not require medical qualification',
  },
  {
    title: 'Check-ups',
    description: 'Ways to check body health indicators.',
  },
  {
    title: 'Other',
  },
];

export const psychologyMethods = [
  {
    title: 'Art-therapy',
    description: 'Healing by drawing in specific way and under special conditions.',
  },
  {
    title: 'Audio-therapy',
    description: 'A way to control feelings by understanding them better by listening to music',
  },
  {
    title: 'Classic psychology',
    description: 'Understanding and fixing emotional or social problems.',
  },
  {
    title: 'Coaching',
    description: 'Understanding how to set realisting goals and reach them.',
  },
  {
    title: 'Military psychology',
    description: 'Dealing with phychological problems of military people and their families.',
  },
  {
    title: 'Family psychology',
    description: 'Inderstanding family problems and learning to deal with them together.',
  },
  {
    title: 'Other',
  },
];

export const donationDetails = {
  isDonationEnabled: true,
  title: 'Підтримати проект',
  subtitle: 'Your donation is very important',
  isSubtitleEnabled: true,
  paypalLink: 'https://www.paypal.com/ua/home',
  isPayPalLinkEnabled: true,
  privatLink: 'https://next.privat24.ua',
  isPrivatLinkEnabled: true,
  isBankDetailsEnabled: true,
  enterpriceName: 'EntertainmentHub',
  iban: 'UA213223130000026007233566xxx',
  enterpriseRegisterId: 12345678,
  paymentPurpose: 'Donation',
  isQREnabled: true,
  qrLink: 'https://next.privat24.ua',
};
