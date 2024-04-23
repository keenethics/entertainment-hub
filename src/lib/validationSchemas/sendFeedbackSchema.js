import { z } from 'zod';
import { PHONE_REGEX } from '../consts';
import { string, boolean } from './utils';

const SendFeedback = z.object({
  name: string('Name').min(1).max(128).zod,
  phone: string('Mobile phone').zod.refine(val => PHONE_REGEX.test(val), {
    message: 'Please input your phone number in format +1XXXXXXXXX',
  }),
  callMe: boolean('Call me back').zod,
  email: string('Email').email().optional().zod,
  message: string('Message').min(5).max(320).zod,
});

export default SendFeedback;
