import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import SendFeedback from '@/lib/validationSchemas/sendFeedbackSchema';
import { withErrorHandler } from '@/lib/errors/errorHandler';

/**
 * @swagger
 * /feedback:
 *  post:
 *    tags:
 *      - feedbacks
 *    summary: Send feedback
 *    description: Allows to send feedback to website admins
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: John Doe
 *              phone:
 *                type: string
 *                example: +120394883294
 *              callMe:
 *                type: boolean
 *              email:
 *                type: string
 *                format: email
 *              message:
 *                type: string
 *                example: You are great!
 *    responses:
 *      '200':
 *        description: Successful submit
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                feedbackSent:
 *                  type: boolean
 */

export const POST = withErrorHandler(async request => {
  const feedbackData = await request.json();
  const validatedFeedback = SendFeedback.parse(feedbackData);
  await prisma.feedback.create({ data: validatedFeedback });
  return NextResponse.json({ feedbackSent: true });
});
