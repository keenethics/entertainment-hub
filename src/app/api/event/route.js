import { prisma } from '@/lib/db';
import { withErrorHandler } from '@/lib/errors/errorHandler';

/**
 * @swagger
 * /event:
 *   get:
 *     tags:
 *       - events
 *     summary: List of events
 *     description: Provides a list of events
 *     parameters:
 *       - in: query
 *         name: month
 *         schema:
 *           type: integer
 *         description: A number on a month to query by
 *         required: true
 *     responses:
 *       '200':
 *         description: Successful query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Event'
 *                 metaData:
 *                   type: object
 *                   properties:
 *                     lastCursor:
 *                       type: string
 *                       format: uuid
 *                     hasNextPage:
 *                       type: boolean
 *                     queryMonth:
 *                       type: integer
 *                       example: 1
 */

export const GET = withErrorHandler(async req => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  const url = new URL(req.url);
  const take = url.searchParams.get('take');
  const lastCursor = url.searchParams.get('lastCursor');
  const queryMonth = url.searchParams.get('month');

  const filteredQueryMonth = parseInt(queryMonth, 10);
  const startOfNextMonth = new Date(currentYear, filteredQueryMonth - 1, 1);
  const endOfMonth = new Date(currentYear, filteredQueryMonth, 1);
  const endOfNextMonth = new Date(currentYear, filteredQueryMonth, 1);

  const result = await prisma.event.findMany({
    include: { tags: true, additionalLink: true },
    where: {
      isActive: true,
      eventDate: {
        gte: filteredQueryMonth === currentMonth ? today : startOfNextMonth,
        lte: filteredQueryMonth === currentMonth ? endOfMonth : endOfNextMonth,
      },
    },
    take: take ? parseInt(take, 10) : 6,

    ...(lastCursor && {
      skip: 1,
      cursor: {
        id: lastCursor,
      },
    }),
    orderBy: {
      eventDate: 'asc',
    },
  });

  if (result.length === 0) {
    return new Response(
      JSON.stringify({
        data: [],
        metaData: {
          lastCursor: null,
          hasNextPage: false,
          queryMonth,
        },
      }),
      { status: 200 },
    );
  }

  const lastPostInResults = result[result.length - 1];
  const cursor = lastPostInResults.id;

  const nextPage = await prisma.event.findMany({
    take: take ? parseInt(take, 10) : 6,
    skip: 1,
    cursor: {
      id: cursor,
    },
    orderBy: {
      eventDate: 'asc',
    },
  });

  const data = {
    data: result,
    metaData: {
      lastCursor: cursor,
      hasNextPage: nextPage.length > 0,
      queryMonth,
    },
  };

  return new Response(JSON.stringify(data), { status: 200 });
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
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
 *           example: Tag play
 *         organizerName:
 *           type: string
 *           example: Taggers' place
 *         notes:
 *           type: string
 *           example: Do not forget your suit
 *         address:
 *           type: string
 *           example: First street
 *         locationLink:
 *           type: string
 *           example: https://maps.app.goo.gl/9EBt5wYjqW5RWiBX9
 *         price:
 *           type: integer
 *           example: 100
 *         isActive:
 *           type: boolean
 *         linkId:
 *           type: string
 *           format: uuid
 *         eventDate:
 *           type: string
 *           format: datetime
 *           example: 2024-04-22T09:09:33.776Z
 *         format:
 *           type: string
 *           enum: ['OFFLINE', 'ONLINE', 'BOTH']
 *         priceType:
 *           type: string
 *           enum: ['MIN_PRICE', 'FIXED_PRICE']
 *         tags:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Tag'
 *         additionalLink:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               format: uuid
 *             createdAt:
 *               type: string
 *               example: 2024-04-22T09:09:33.776Z
 *               format: datetime
 *             label:
 *               type: string
 *               example: Our site
 *             link:
 *               type: string
 *               example: https://maps.app.goo.gl/9EBt5wYjqW5RWiBX9
 *     Tag:
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
 *           example: Tag1
 */
