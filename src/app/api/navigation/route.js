import { prisma } from '@/lib/db';
import { withErrorHandler } from '@/lib/errors/errorHandler';

/**
 * @swagger
 * /navigation:
 *  get:
 *    tags:
 *      - navigation
 *    summary: List official social media links
 *    description: Provides a list of social media links
 *    responses:
 *      '200':
 *        description: Successful query
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  title:
 *                    type: string
 *                    example: Instagram
 *                  href:
 *                    type: string
 *                    example: https://www.instagram.com/
 */

export const GET = withErrorHandler(async () => {
  const data = await prisma.navigation.findMany({
    select: {
      title: true,
      href: true,
    },
  });
  return new Response(JSON.stringify(data), { status: 200 });
});
