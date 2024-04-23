import { PrismaClient } from '@prisma/client';
import {
  districts,
  organizationTypes,
  psychologyMethods,
  medicalMethods,
  requests,
  specializations,
  activityTypes,
  clientCategories,
  donationDetails,
} from './data.mjs';

const prisma = new PrismaClient();

specializations.push(
  {
    name: 'Psychologist',
    methods: {
      connectOrCreate: psychologyMethods.map(method => {
        const { title, description } = method;
        return {
          where: { title },
          create: { title, description },
        };
      }),
    },
  },
  {
    name: 'Doctor',
    methods: {
      connectOrCreate: medicalMethods.map(method => {
        const { title, description } = method;
        return {
          where: { title },
          create: { title, description },
        };
      }),
    },
  },
);

async function createIfNotExist(model, data, filter) {
  // eslint-disable-next-line no-restricted-syntax
  for (const it of data) {
    // eslint-disable-next-line no-await-in-loop
    await model.upsert({ where: filter(it), create: it, update: {} });
  }
}

async function main() {
  await createIfNotExist(prisma.clientCategory, clientCategories, ({ name }) => ({ name }));
  await createIfNotExist(prisma.donationDetails, [donationDetails], ({ title }) => ({ title }));
  await createIfNotExist(prisma.district, districts, ({ name }) => ({ name }));
  await createIfNotExist(prisma.request, requests, ({ name }) => ({ name }));
  await createIfNotExist(prisma.specialization, specializations, ({ name }) => ({ name }));
  await createIfNotExist(prisma.organizationType, organizationTypes, ({ name }) => ({ name }));
  await createIfNotExist(
    prisma.method,
    medicalMethods
      .map(method => ({ ...method, specialization: { connect: { name: 'Doctor' } } }))
      .concat(psychologyMethods.map(method => ({ ...method, specialization: { connect: { name: 'Psychologist' } } }))),
    method => ({ title: method.title }),
  );

  // depends on 'requests', they should be created before activity types
  await createIfNotExist(prisma.activityType, activityTypes, ({ type }) => ({ type }));
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
