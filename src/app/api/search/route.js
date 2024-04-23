import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { createSearchEntryFilter, getSearchFilterQueryParams } from './helpers';

/**
 * @swagger
 * /search:
 *  get:
 *    tags:
 *      - search
 *    summary: List events/specialists/organizations
 *    description: Provides a list of events, specialists and organizations.
 *    parameters:
 *      - in: query
 *        name: type
 *        schema:
 *          type: string
 *          enum: ['individual', 'family', 'group', 'business', 'pair', 'kids']
 *        description: A type of events specialists/organizations provide (may be multiple)
 *      - in: query
 *        name: query
 *        schema:
 *          type: string
 *        description: A search query
 *      - in: query
 *        name: request
 *        schema:
 *          type: integer
 *        description: ID of request that specialist/organization fulfill (may be multiple)
 *      - in: query
 *        name: district
 *        schema:
 *          type: string
 *          format: uuid
 *        description: ID of district where specialists/organizations work (may be multiple)
 *      - in: query
 *        name: price
 *        schema:
 *          type: string
 *          enum:
 *            - free
 *            - notSpecified
 *            - below500
 *            - from500to1000
 *            - from1000to1500
 *            - above1500
 *        description: A price tag (may be multiple)
 *      - in: query
 *        name: priceMin
 *        schema:
 *          type: integer
 *        description: A minimal price.
 *      - in: query
 *        name: priceMax
 *        schema:
 *          type: integer
 *        description: A maximum price
 *      - in: query
 *        name: searchType
 *        schema:
 *          type: string
 *          enum: ['request', 'specialist', 'organization']
 *        description: A type of events specialists/organizations provide
 *      - in: query
 *        name: category
 *        schema:
 *          type: string
 *          format: uuid
 *        description: Category ID of clients specialists/organizations work with (may be multiple)
 *      - in: query
 *        name: specialization
 *        schema:
 *          type: string
 *          format: uuid
 *        description: ID of specialization specialists/organizations provide (may be multiple)
 *      - in: query
 *        name: specializationMethod
 *        schema:
 *          type: integer
 *        description: ID of method specialists/organizations provide (may be multiple)
 *      - in: query
 *        name: gender
 *        schema:
 *          type: string
 *          example: 'MALE'
 *        description: Gender of specialist
 *    responses:
 *      '200':
 *        description: Successful query
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                data:
 *                  type: array
 *                  items:
 *                    anyOf:
 *                      - $ref: '#/components/schemas/Event'
 *                      - $ref: '#/components/schemas/SearchEntry'
 *                metaData:
 *                  type: object
 *                  properties:
 *                    lastCursor:
 *                      type: string
 *                      format: uuid
 *                    hasNextPage:
 *                      type: boolean
 *                    queryMonth:
 *                      type: integer
 *                      example: 1
 */

export const handler = withErrorHandler(async req => {
  const params = getSearchFilterQueryParams(req);
  const { take, skip, lastCursor } = params;

  const searchEntryFilter = createSearchEntryFilter(params);
  const totalCount = await prisma.searchEntry.count({ where: searchEntryFilter });

  const sharedInclude = {
    supportFocuses: {
      select: {
        id: true,
        price: true,
        activityType: true,
        requests: true,
      },
    },
    addresses: {
      select: {
        id: true,
        nameOfClinic: true,
        fullAddress: true,
        latitude: true,
        longitude: true,
        district: { select: { id: true, name: true } },
        isPrimary: true,
      },
    },
    workTime: {
      select: {
        weekDay: true,
        time: true,
        isDayOff: true,
      },
    },
    clientsWorkingWith: true,
    clientsNotWorkingWith: true,
  };

  const takeFilter = params?.mode === 'map' ? totalCount : take;
  const searchEntries = await prisma.searchEntry.findMany({
    include: {
      specialist: {
        include: {
          ...sharedInclude,
          specializationMethods: { select: { id: true, simpleId: true, title: true, description: true } },
          specializations: { select: { id: true, name: true } },
        },
      },
      organization: {
        include: {
          ...sharedInclude,
          type: { select: { id: true, name: true } },
          expertSpecializations: {
            select: { id: true, name: true },
          },
        },
      },
    },
    where: searchEntryFilter,
    orderBy: {
      sortString: 'asc',
    },
    take: takeFilter + 1,
    skip,
    ...(lastCursor && {
      skip: 1,
      cursor: {
        id: lastCursor,
      },
    }),
  });

  let nextPageEntry;
  if (searchEntries.length > takeFilter) {
    nextPageEntry = searchEntries.pop();
  }
  const hasNextPage = !!nextPageEntry;

  const newCursor = hasNextPage ? searchEntries[take - 1].id : undefined;
  return NextResponse.json({
    data: searchEntries,
    metaData: {
      totalCount,
      lastCursor: newCursor,
      hasNextPage,
    },
  });
});

export { handler as GET };

/**
 * @swagger
 * components:
 *   schemas:
 *     Addresses:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *             format: uuid
 *           fullAddress:
 *             type: string
 *           districtId:
 *             type: string
 *             format: uuid
 *           isPrimary:
 *             type: boolean
 *           longitude:
 *             type: number
 *           latitude:
 *             type: number
 *           createdAt:
 *             type: string
 *             example: 2024-04-22T09:09:33.776Z
 *             format: datetime
 *     ActivityType:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         createdAt:
 *           type: string
 *           example: 2024-04-22T09:09:33.776Z
 *           format: datetime
 *         title:
 *           type: string
 *           example: Choreography session
 *         type:
 *           type: string
 *           enum: ['individual', 'family', 'group', 'business', 'pair', 'kids']
 *         description:
 *           type: string
 *         imagePath:
 *           type: string
 *         isActive:
 *           type: boolean
 *         priority:
 *           type: integer
 *     ClientCategory:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         createdAt:
 *           type: string
 *           example: 2024-04-22T09:09:33.776Z
 *           format: datetime
 *     Method:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         simpleId:
 *           type: integer
 *         createdAt:
 *           type: string
 *           example: 2024-04-22T09:09:33.776Z
 *           format: datetime
 *         title:
 *           type: string
 *           example: Kinetic games
 *         description:
 *           type: string
 *           example: Games that involve active movement
 *     Organization:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         createdAt:
 *           type: string
 *           example: 2024-04-22T09:09:33.776Z
 *           format: datetime
 *         name:
 *           type: string
 *           example: The entertainers group
 *         expertSpecializations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Specialization'
 *         specializationMethods:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Method'
 *         organizationType:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             name:
 *               type: string
 *             createdAt:
 *               type: string
 *               example: 2024-04-22T09:09:33.776Z
 *               format: datetime
 *         ownershipType:
 *           type: string
 *           enum: ['PRIVATE', 'GOVERNMENT']
 *         isInclusiveSpace:
 *           type: boolean
 *         description:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *           format: phone
 *         facebook:
 *           type: string
 *           format: url
 *         instagram:
 *           type: string
 *           format: url
 *         linkedin:
 *           type: string
 *           format: url
 *         telegram:
 *           type: string
 *           format: url
 *         tiktok:
 *           type: string
 *           format: url
 *         viber:
 *           type: string
 *           format: url
 *         website:
 *           type: string
 *           format: url
 *         youtube:
 *           type: string
 *           format: url
 *         formatOfWork:
 *           type: string
 *           enum: ['OFFLINE', 'ONLINE', 'BOTH']
 *         isActive:
 *           type: boolean
 *         isFreeReception:
 *           type: boolean
 *         yearsOnMarket:
 *           type: integer
 *         addresses:
 *           $ref: '#/components/schemas/Addresses'
 *         workTime:
 *           $ref: '#/components/schemas/Worktime'
 *         supportFocuses:
 *           $ref: '#/components/schemas/SupportFocus'
 *         clientsWorkingWith:
 *           $ref: '#/components/schemas/ClientCategory'
 *         clientsNotWorkingWith:
 *           $ref: '#/components/schemas/ClientCategory'
 *     Request:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         simpleId:
 *           type: integer
 *         name:
 *           type: string
 *           example: Experience with autistic audience
 *         createdAt:
 *           type: string
 *           example: 2024-04-22T09:09:33.776Z
 *           format: datetime
 *     SearchEntry:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         organization:
 *           $ref: '#/components/schemas/Organization'
 *         organizationId:
 *           type: string
 *           format: uuid
 *         specialist:
 *           $ref: '#/components/schemas/Specialist'
 *         specialistId:
 *           type: string
 *           format: uuid
 *     Specialist:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         createdAt:
 *           type: string
 *           example: 2024-04-22T09:09:33.776Z
 *           format: datetime
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Doe
 *         surname:
 *           type: string
 *           example: Olegovich
 *         specializations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Specialization'
 *         specializationMethods:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Method'
 *         gender:
 *           type: string
 *           example: 'MALE'
 *         description:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *           format: phone
 *         facebook:
 *           type: string
 *           format: url
 *         instagram:
 *           type: string
 *           format: url
 *         linkedin:
 *           type: string
 *           format: url
 *         telegram:
 *           type: string
 *           format: url
 *         tiktok:
 *           type: string
 *           format: url
 *         viber:
 *           type: string
 *           format: url
 *         website:
 *           type: string
 *           format: url
 *         youtube:
 *           type: string
 *           format: url
 *         formatOfWork:
 *           type: string
 *           enum: ['OFFLINE', 'ONLINE', 'BOTH']
 *         isActive:
 *           type: boolean
 *         isFreeReception:
 *           type: boolean
 *         yearsOfExperience:
 *           type: integer
 *         addresses:
 *           $ref: '#/components/schemas/Addresses'
 *         workTime:
 *           $ref: '#/components/schemas/Worktime'
 *         supportFocuses:
 *           $ref: '#/components/schemas/SupportFocus'
 *         clientsWorkingWith:
 *           $ref: '#/components/schemas/ClientCategory'
 *         clientsNotWorkingWith:
 *           $ref: '#/components/schemas/ClientCategory'
 *     Specialization:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         createdAt:
 *           type: string
 *           example: 2024-04-22T09:09:33.776Z
 *           format: datetime
 *         name:
 *           type: string
 *           example: baloons
 *     SupportFocus:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         price:
 *           type: integer
 *         createdAt:
 *           type: string
 *           example: 2024-04-22T09:09:33.776Z
 *           format: datetime
 *         activity:
 *           $ref: '#/components/schemas/ActivityType'
 *         requests:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Request'
 *     Worktime:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           isDayOff:
 *             type: boolean
 *           time:
 *             type: string
 *           weekDay:
 *             type: string
 *             enum:
 *               - MON
 *               - TUE
 *               - WED
 *               - THU
 *               - FRI
 *               - SAT
 *               - SUN
 */
