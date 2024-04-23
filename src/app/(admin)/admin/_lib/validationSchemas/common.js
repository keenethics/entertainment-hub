import { z } from 'zod';

export const MESSAGES = {
  requiredField: `Required field`,
  unacceptableValue: 'Wrong value',
  singlePrimaryAddress: 'Primary address is required',
};

export const zString = z
  .string({
    required_error: MESSAGES.requiredField,
    invalid_type_error: MESSAGES.requiredField,
  })
  .trim();

export const zUrl = zString.url({ message: MESSAGES.unacceptableValue });

export const zBoolean = z.boolean({
  required_error: MESSAGES.requiredField,
  invalid_type_error: MESSAGES.requiredField,
});
