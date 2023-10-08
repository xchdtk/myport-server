import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  mail_user: process.env.MAIL_USER,
  mail_pass: process.env.MAIL_PORT,
}));
