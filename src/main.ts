import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import cluster from 'cluster';
import os from 'os';
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
    app.setGlobalPrefix('v1');
    await app.listen(3000);
    console.log(`Worker ${process.pid} started`);
  }
}
bootstrap();
