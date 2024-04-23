import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { withErrorHandler } from '@/lib/errors/errorHandler';
import { createSearchEntryFilter, getSearchFilterQueryParams } from '../helpers';

/**
 * @swagger
 * /search/count:
 *   get:
 *     tags:
 *       - search
 *     summary: Count events/specialists/organizations
 *     description: Returns a total count of events, specialists and organizations.
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: ['individual', 'family', 'group', 'business', 'pair', 'kids']
 *         description: A type of events specialists/organizations provide (may be multiple)
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: A search query
 *       - in: query
 *         name: request
 *         schema:
 *           type: integer
 *         description: ID of request that specialist/organization fulfill (may be multiple)
 *       - in: query
 *         name: district
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of district where specialists/organizations work (may be multiple)
 *       - in: query
 *         name: price
 *         schema:
 *           type: string
 *           enum:
 *             - free
 *             - notSpecified
 *             - below500
 *             - from500to1000
 *             - from1000to1500
 *             - above1500
 *         description: A price tag (may be multiple)
 *       - in: query
 *         name: priceMin
 *         schema:
 *           type: integer
 *         description: A minimal price.
 *       - in: query
 *         name: priceMax
 *         schema:
 *           type: integer
 *         description: A maximum price
 *       - in: query
 *         name: searchType
 *         schema:
 *           type: string
 *           enum: ['request', 'specialist', 'organization']
 *         description: A type of events specialists/organizations provide
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Category ID of clients specialists/organizations work with (may be multiple)
 *       - in: query
 *         name: specialization
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of specialization specialists/organizations provide (may be multiple)
 *       - in: query
 *         name: specializationMethod
 *         schema:
 *           type: integer
 *         description: ID of method specialists/organizations provide (may be multiple)
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           example: 'MALE'
 *         description: Gender of specialist
 *     responses:
 *       '200':
 *         description: Successful query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 */

export const handler = withErrorHandler(async req => {
  const params = getSearchFilterQueryParams(req);

  const searchEntryFilter = createSearchEntryFilter(params);
  const count = await prisma.searchEntry.count({ where: searchEntryFilter });

  return NextResponse.json({
    data: { count },
  });
});

export { handler as GET };
