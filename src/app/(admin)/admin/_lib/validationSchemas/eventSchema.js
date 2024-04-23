import { z } from 'zod';
import { string, date, errors } from '@/lib/validationSchemas/utils';

const ActiveEventSchema = z.object({
  isActive: z.literal(true),
  title: string('Event name').min(1).max(128).zod,
  organizerName: string('Organizer name').min(1).max(128).zod,
  eventDate: date('Event date').min(new Date()).zod,
  notes: string('Notes').min(1).max(350).nullish().zod,
  locationLink: string('Link').nullish().zod,
  additionalLink: z
    .object({
      label: string('Type').min(1).max(30).nullish().zod,
      link: string('Link').min(1).nullish().zod,
    })
    .superRefine((data, ctx) => {
      const { label, link } = data;
      if (label && !link) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_type,
          path: ['link'],
          message: errors('Link').required,
        });
      }
      if (link && !label) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_type,
          path: ['label'],
          message: errors('Type').required,
        });
      }
    }),
  format: z.enum(['ONLINE', 'OFFLINE'], {
    required_error: errors('Format').required,
    invalid_type_error: errors('Format').format('OFFLINE/ONLINE'),
  }),
  priceType: z.enum(['FREE', 'FIXED_PRICE', 'MIN_PRICE'], {
    required_error: errors('Pricing type').required,
    invalid_type_error: errors('Pricing type').format('FREE/FIXED_PRICE/MIN_PRICE'),
  }),
  price: z.number().nullish(),
  address: string('Address').min(1).max(128).nullish().zod,
});

const DraftEventSchema = z.object({
  isActive: z.literal(false),
  title: string('Event name').min(1).max(128).zod,
  organizerName: string('Organizer name').min(1).max(128).zod,
});

export const EventSchema = z
  .discriminatedUnion('isActive', [ActiveEventSchema, DraftEventSchema])
  .superRefine((data, ctx) => {
    const { price, format, address, priceType } = data;
    if (format === 'ONLINE' && address) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        path: ['address'],
        message: 'Online event cannot have address',
      });
    }
    if (format === 'OFFLINE' && !address) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        path: ['address'],
        message: 'Offline event require address',
      });
    }
    if (priceType === 'FREE' && price) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        path: ['price'],
        message: 'Free event cannot have price',
      });
    }
    if (priceType && priceType !== 'FREE' && (!price || price <= 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_type,
        path: ['price'],
        message: 'Positive price is required for non-free event',
      });
    }
  });
