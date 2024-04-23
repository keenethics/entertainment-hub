import { faker } from '@faker-js/faker';
import { NavigationUrl, PrismaClient } from '@prisma/client';
import { getSpecialistFullName } from '../src/utils/getSpecialistFullName.mjs';

function getFullAddress() {
  const street = faker.location.streetAddress();
  const streetNumber = faker.number.int({ min: 1, max: 100 });
  const floor = faker.number.int({ min: 1, max: 100 });
  const room = faker.number.int({ min: 1, max: 100 });
  return `вул. ${street} ${streetNumber}, поверх ${floor}, кабінет ${room}`;
}

function nullable(value) {
  return Date.now() % 2 === 0 ? value : null;
}

function randomUndefined(value) {
  return Date.now() % 2 === 0 ? value : undefined;
}

// returns array of unique objects with id field
function uniqueObjectsWithId(instances) {
  if (instances.length === 0) return [];
  return faker.helpers
    .uniqueArray(
      instances.map(s => s.id),
      faker.number.int({ min: 1, max: instances.length }),
    )
    .map(id => ({ id }));
}

function randomAddress(districts, isPrimary) {
  const randomNameOfClinic = `Клініка ${faker.company.name()}`;
  const randomDistricts = faker.helpers.arrayElement(districts).id; // returns random object from districts array

  // among coordinates of Lviv city
  const randomLat = faker.location.latitude({ min: 49.83250892445946, max: 49.843362597265774 });
  const randomLng = faker.location.longitude({ min: 24.02389821868425, max: 24.0279810366963 });

  return {
    nameOfClinic: randomNameOfClinic,
    fullAddress: getFullAddress(),
    district: {
      connect: {
        id: randomDistricts,
      },
    },
    latitude: randomLat,
    longitude: randomLng,
    isPrimary,
  };
}

function randomSupportFocusArray({ activities }) {
  const uniqueActivitiesIdsArray = uniqueObjectsWithId(activities);

  const uniqueActivitiesArray = uniqueActivitiesIdsArray.map(({ id: activityTypeId }) =>
    activities.find(activityType => activityType.id === activityTypeId),
  );

  return uniqueActivitiesArray.map(activityType => ({
    price: Math.random() > 0.5 ? faker.number.int({ min: 0, max: 20 }) * 100 : null,
    activityType: {
      connect: {
        id: activityType.id,
      },
    },
    requests: {
      connect: uniqueObjectsWithId(activityType.requests),
    },
  }));
}

function generateSocialMediaLinks() {
  const socialMediaList = ['facebook', 'instagram', 'youtube', 'linkedin', 'tiktok', 'viber', 'telegram'];

  return Object.fromEntries(
    socialMediaList
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.floor(Math.random() * 5) + 1)
      .map(network => [network, faker.internet.url()]),
  );
}

function setClientCategories(categories) {
  const [clientsWorkingWith, clientsNotWorkingWith] = categories.reduce(
    (acc, category) => {
      const decision = Math.floor(Math.random() * 3); // 0, 1, or 2
      if (decision === 0) acc[0].push(category);
      else if (decision === 1) acc[1].push(category);
      // Skip adding to any array if decision is 2
      return acc;
    },
    [[], []],
  );
  return {
    clientsWorkingWith,
    clientsNotWorkingWith,
  };
}

function randomWorkTime() {
  const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  return {
    connectOrCreate: weekdays.map(weekDay => {
      const isDayOff = faker.datatype.boolean();
      const time = !isDayOff
        ? `0${faker.number.int({ min: 7, max: 9 })}:00 - ${faker.number.int({ min: 17, max: 20 })}:00`
        : '';
      const workTimeData = { isDayOff, weekDay, time };
      return {
        create: workTimeData,
        where: { weekDay_time_isDayOff: workTimeData },
      };
    }),
  };
}

function randomSpecialist({ districts, specializations, activityTypes, clientCategories, specializationMethods }) {
  const gender = faker.helpers.arrayElement(['FEMALE', 'MALE']);
  let addresses;
  const formatOfWork = faker.helpers.arrayElement(['BOTH', 'ONLINE', 'OFFLINE']);
  if (formatOfWork !== 'ONLINE') {
    addresses = {
      create: Array(faker.number.int({ min: 1, max: 3 }))
        .fill('')
        .map((_, i) => randomAddress(districts, i === 0)),
    };
  }

  const phoneRegexp = '+380[0-9]{9}';

  const socialMediaLinks = generateSocialMediaLinks();

  const { clientsWorkingWith, clientsNotWorkingWith } = setClientCategories(clientCategories);
  const specializationsIds = uniqueObjectsWithId(specializations);
  const specializationMethodsIds = uniqueObjectsWithId(
    specializationMethods.filter(({ specializationId }) =>
      specializationsIds.some(({ id }) => id === specializationId),
    ),
  );

  return {
    specializations: {
      connect: specializationsIds,
    },
    specializationMethods: {
      connect: specializationMethodsIds,
    },
    // take name of corresponding gender
    firstName: faker.person.firstName(gender.toLowerCase()),
    lastName: faker.person.lastName(),
    surname: nullable(faker.person.lastName()),
    gender,
    workTime: randomUndefined(randomWorkTime()),
    yearsOfExperience: faker.number.int({ min: 1, max: 30 }),
    // take one of these
    formatOfWork,
    addresses,
    supportFocuses: {
      create: randomSupportFocusArray({ activities: activityTypes }),
    },
    isFreeReception: faker.datatype.boolean(),
    isActive: faker.datatype.boolean(),
    phone: nullable(faker.helpers.fromRegExp(phoneRegexp)),
    email: nullable(faker.internet.email()),
    website: nullable(faker.internet.url()),
    description: faker.lorem.paragraph(),
    ...socialMediaLinks,
    clientsWorkingWith: {
      connect: clientsWorkingWith,
    },
    clientsNotWorkingWith: {
      connect: clientsNotWorkingWith,
    },
  };
}

function randomOrganization({ activityTypes, districts, organizationTypes, expertSpecializations, clientCategories }) {
  let addresses;
  const formatOfWork = faker.helpers.arrayElement(['BOTH', 'ONLINE', 'OFFLINE']);
  if (formatOfWork !== 'ONLINE') {
    addresses = {
      create: Array(faker.number.int({ min: 1, max: 3 }))
        .fill('')
        .map((_, i) => randomAddress(districts, i === 0)),
    };
  }
  const phoneRegexp = '+380[0-9]{9}';
  const socialMediaLinks = generateSocialMediaLinks();

  const { clientsWorkingWith, clientsNotWorkingWith } = setClientCategories(clientCategories);

  return {
    name: faker.company.name(),
    expertSpecializations: {
      connect: uniqueObjectsWithId(expertSpecializations),
    },
    yearsOnMarket: nullable(faker.number.int({ min: 1, max: 30 })),
    ownershipType: faker.helpers.arrayElement(['PRIVATE', 'GOVERNMENT']),
    isInclusiveSpace: faker.datatype.boolean(),
    formatOfWork,
    type: {
      connect: uniqueObjectsWithId(organizationTypes),
    },
    addresses,
    supportFocuses: {
      create: randomSupportFocusArray({ activities: activityTypes }),
    },
    workTime: randomUndefined(randomWorkTime()),
    isFreeReception: faker.datatype.boolean(),
    isActive: faker.datatype.boolean(),
    phone: nullable(faker.helpers.fromRegExp(phoneRegexp)),
    email: nullable(faker.internet.email()),
    website: nullable(faker.internet.url()),
    description: faker.lorem.paragraph(),
    ...socialMediaLinks,
    clientsWorkingWith: {
      connect: clientsWorkingWith,
    },
    clientsNotWorkingWith: {
      connect: clientsNotWorkingWith,
    },
  };
}

function randomEvent({ tags, link }) {
  const priceType = faker.helpers.arrayElement(['FREE', 'FIXED_PRICE', 'MIN_PRICE']);
  const format = faker.helpers.arrayElement(['ONLINE', 'OFFLINE']);
  let address;
  let price;
  let locationLink;
  if (format === 'OFFLINE') {
    address = getFullAddress();
    locationLink = faker.helpers.arrayElement([
      'https://maps.app.goo.gl/3YXkdzJnoLwHsXNb7',
      'https://maps.app.goo.gl/coSnsiqkAmGuMgvY9',
      'https://maps.app.goo.gl/AuuirMDJobE7WWKN6',
    ]);
  }
  if (priceType !== 'FREE') {
    price = faker.number.int({ min: 1000, max: 5000 });
  }
  return {
    title: faker.word.noun(),
    organizerName: faker.company.name(),
    address,
    locationLink,
    priceType,
    price,
    format,
    eventDate: Math.random() > 0.5 ? faker.date.future() : faker.date.past(),
    isActive: faker.datatype.boolean(),
    additionalLink: {
      connect: link,
    },
    tags: {
      connect: uniqueObjectsWithId(tags),
    },
  };
}

const prisma = new PrismaClient();

async function main() {
  // Clear the database to make sure we can run seed
  await prisma.$transaction(async trx => {
    await trx.address.deleteMany();
    await trx.specialist.deleteMany();
    await trx.event.deleteMany();
    await trx.eventLink.deleteMany();
    await trx.eventTag.deleteMany();
    await trx.faq.deleteMany();
    await trx.organization.deleteMany();
    await trx.searchEntry.deleteMany();
    await trx.workTime.deleteMany();
    await trx.navigation.deleteMany();
  });

  const faqs = Array.from({ length: 15 }).map((_, i) => ({
    isActive: faker.datatype.boolean(),
    question: faker.lorem.sentence(),
    answer: faker.lorem.paragraph(),
    priority: i + 10,
  }));

  const eventTags = ['Tag1', 'Tag2', 'Tag3'];

  const eventLink = { label: 'Some site', link: 'https://keenethics.com/' };

  await prisma.eventTag.createMany({
    data: eventTags.map(name => ({ name })),
  });

  await prisma.eventLink.create({ data: eventLink });

  await prisma.faq.createMany({
    data: faqs,
  });

  const activityTypes = await prisma.activityType.findMany({ select: { id: true, requests: true } });
  const specializations = await prisma.specialization.findMany({
    select: { id: true },
  });

  const clientCategories = await prisma.clientCategory.findMany({
    select: { id: true },
  });

  const specializationMethods = await prisma.method.findMany();
  const districts = await prisma.district.findMany({ select: { id: true } });

  const tags = await prisma.eventTag.findMany({ select: { id: true } });
  const link = await prisma.eventLink.findFirst({ select: { id: true } });
  const organizationTypes = await prisma.organizationType.findMany({ select: { id: true } });

  // createMany does not support records with relations
  for (let i = 0; i < 10; i += 1) {
    // for instead of Promise.all to avoid overloading the database pool
    const specialistData = randomSpecialist({
      districts,
      specializations,
      activityTypes,
      clientCategories,
      specializationMethods,
    });
    // eslint-disable-next-line no-await-in-loop
    await prisma.specialist.create({
      data: {
        ...specialistData,
        searchEntry: {
          create: {
            sortString: getSpecialistFullName(specialistData),
          },
        },
      },
    });
  }
  for (let i = 0; i <= 100; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await prisma.event.create({
      data: randomEvent({ tags, link }),
    });
  }

  await prisma.navigation.createMany({
    data: [
      {
        title: NavigationUrl.FACEBOOK,
        href: 'https://www.facebook.com',
      },
      {
        title: NavigationUrl.INSTAGRAM,
        href: 'https://www.instagram.com',
      },
      {
        title: NavigationUrl.APPLICATION,
        href: 'https://www.google.com/intl/uk_ua/forms/about/',
      },
    ],
  });

  for (let i = 0; i < 10; i += 1) {
    const organizationData = randomOrganization({
      activityTypes,
      districts,
      organizationTypes,
      expertSpecializations: specializations,
      clientCategories,
    });
    // eslint-disable-next-line no-await-in-loop
    await prisma.organization.create({
      data: {
        ...organizationData,
        searchEntry: {
          create: {
            sortString: organizationData.name,
          },
        },
      },
    });
  }
}

main().then(
  async () => {
    await prisma.$disconnect();
  },
  async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  },
);
