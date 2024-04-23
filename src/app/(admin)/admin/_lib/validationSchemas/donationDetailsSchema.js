import { z } from 'zod';
import iban from 'iban';
import { REGISTER_ID_LENGTH } from '@admin/_lib/consts';
import { zBoolean, zString, zUrl } from './common';

export const DonationDetailsSchema = z.object({
  isDonationEnabled: zBoolean,
  title: zString.max(128, {
    message: 'Title should be shorter than 128 characters',
  }),
  subtitle: zString.max(50, {
    message: 'Subtitle length should be less than 50 characters',
  }),
  isSubtitleEnabled: zBoolean,
  paypalLink: zUrl,
  isPayPalLinkEnabled: zBoolean,
  privatLink: zUrl,
  isPrivatLinkEnabled: zBoolean,
  isBankDetailsEnabled: zBoolean,
  enterpriceName: zString,
  iban: zString.refine(value => iban.isValid(value), {
    message: 'Please provide correct IBAN',
  }),
  enterpriseRegisterId: z
    .number({
      invalid_type_error: 'Enterprise registry code should be one number',
      required_error: 'Enterprise registry code is required',
    })
    .int({
      message: 'Enterprise registry code should be one number',
    })
    .positive({
      message: 'Enterprise registry code should be positive number',
    })
    .refine(value => String(value).length === REGISTER_ID_LENGTH, {
      message: `Enterprise registry code should be ${REGISTER_ID_LENGTH} digits long`,
    }),
  paymentPurpose: zString,
  isQREnabled: zBoolean,
  qrLink: zUrl,
});
