import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * @swagger
 * /district:
 *     get:
 *       tags:
 *         - districts
 *       summary: List districts
 *       description: Provides a list of city districts
 *       responses:
 *         '200':
 *           description: Successful query
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                   createdAt:
 *                     type: string
 *                     example: 2024-04-22T09:09:33.776Z
 *                     format: datetime
 *                   name:
 *                     type: string
 *                     example: Lychakiv
 */

export async function GET() {
  const districts = await prisma.district.findMany();
  return NextResponse.json(districts);
}
