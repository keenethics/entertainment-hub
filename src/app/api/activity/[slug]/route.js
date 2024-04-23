import { prisma } from '@/lib/db';

/**
 * @swagger
 * /activity/{id}:
 *   delete:
 *     tags:
 *       - activity
 *     summary: Delete activity
 *     description: Deletes activity from the server
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID of activity to delete
 *     responses:
 *       '200':
 *         description: Successful delete
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ActivityType'
 */

export async function DELETE(_, { params }) {
  const { slug: id } = params;
  const activityType = await prisma.activityType.delete({ where: { id } });
  return Response.json(activityType);
}
