import fastifyStatic from '@fastify/static';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cluster from 'cluster';
import os from 'os';
import { join } from 'path';
import { AppModule } from './app.module';
import { initPlugin } from './init';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );
  if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);
    for (const cpu of os.cpus().map(() => cluster)) {
      cpu.fork();
    }
    cluster.on('exit', (worker) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    await initPlugin(app);
    app.setGlobalPrefix('api');
    app.register(fastifyStatic, {
      root: join(__dirname, 'public'),
      prefix: '/public/', // optional: default '/'
    });
    const config = new DocumentBuilder()
      .setTitle('Nest Starter API Document Example')
      .setDescription('The example API for Nest Starter API')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    await app.listen(3000);
    console.log(`Worker ${process.pid} started`);
  }
}
bootstrap();
