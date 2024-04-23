import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * @swagger
 * /specialization:
 *   get:
 *     tags:
 *       - specialization
 *     summary: List specializations
 *     description: Provides a list of specializations.
 *     responses:
 *       '200':
 *         description: Successful query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Specialization'
 */

export async function GET() {
  const specializations = await prisma.specialization.findMany();
  return NextResponse.json(specializations);
}
