import fastifyCookie from '@fastify/cookie';
import fastifyCors from '@fastify/cors';
import fastifyCsrfProtection from '@fastify/csrf-protection';
import fastifyHelmet from '@fastify/helmet';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { randomBytes } from 'crypto';
import { RawServerDefault } from 'fastify';

export const initPlugin = async (
  app: NestFastifyApplication<RawServerDefault>,
) => {
  await app.register(fastifyHelmet);
  await app.register(fastifyCookie, {
    secret: randomBytes(16).toString('hex'),
  });
  await app.register(fastifyCsrfProtection, {
    cookieKey: 'csrf_key',
    cookieOpts: {
      secure: true,
      maxAge: 60 * 5,
    },
  });
  await app.register(fastifyCors, {
    origin: true,
    credentials: true,
  });
};
