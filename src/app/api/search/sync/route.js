import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { BadRequestException } from '@/lib/errors/BadRequestException';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { getSearchParamsFromRequest } from '@/utils/getSearchParamsFromRequest';
import { createSearchSyncFilter } from '../helpers';

/**
 * @swagger
 * /search/sync:
 *   get:
 *     tags:
 *       - search
 *     summary: List events/specialists/organizations
 *     description: Provides a list of events, specialists and organizations.
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: A search query
 *       - in: query
 *         name: searchType
 *         schema:
 *           type: string
 *           enum: ['request', 'specialist', 'organization']
 *         required: true
 *         description: A type of events specialists/organizations provide
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       title:
 *                         type: string
 *                         example: John Doe
 */

export const handler = withErrorHandler(async req => {
  const params = getSearchParamsFromRequest(req, { searchType: 'request', query: undefined });
  const { searchType, query } = params;

  const searchSyncFilter = createSearchSyncFilter(params);

  const searchTypeFindAndMap = {
    request: {
      find: () =>
        prisma.request.findMany({
          where: {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
        }),
      map: el => ({
        id: el.id,
        title: el.name,
      }),
    },
    organization: {
      find: () =>
        prisma.searchEntry.findMany({
          where: searchSyncFilter,
          orderBy: { sortString: 'asc' },
        }),
      map: el => ({
        id: el.organizationId,
        title: el.sortString,
      }),
    },
    specialist: {
      find: () =>
        prisma.searchEntry.findMany({
          where: searchSyncFilter,
          orderBy: { sortString: 'asc' },
        }),
      map: el => ({
        id: el.specialistId,
        title: el.sortString,
      }),
    },
  };

  if (!(searchType in searchTypeFindAndMap)) {
    throw new BadRequestException({
      message: 'searchType, should be either request, specialist or organization',
    });
  }

  const syncItems = await searchTypeFindAndMap[searchType].find();
  const mappedSyncItems = syncItems.map(searchTypeFindAndMap[searchType].map);

  return NextResponse.json({
    data: mappedSyncItems,
  });
});

export { handler as GET };
