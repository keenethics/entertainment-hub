import { prisma } from '@/lib/db';

/**
 * @swagger
 * /activity:
 *   get:
 *     tags:
 *       - activity
 *     summary: List activity types
 *     description: Provides a list of activity types.
 *     responses:
 *       '200':
 *         description: Successful query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ActivityType'
 */

export async function GET() {
  const activityTypes = await prisma.activityType.findMany();
  return Response.json(activityTypes);
}

export async function POST(request) {
  const { price } = await request.json();
  const activityType = await prisma.activityType.create({ data: { price } });
  return Response.json(activityType);
}
