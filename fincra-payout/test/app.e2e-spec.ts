// test/app.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/health (GET) - should return service status', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect((res) => {
        expect(res.body.status).toBe('ok');
      });
  });

  it('/fincra/business (GET) - should return 401 without valid API key', () => {
    return request(app.getHttpServer())
      .get('/fincra/business')
      .expect(401);
  });

  it('/fincra/payouts (POST) - should validate request body', () => {
    return request(app.getHttpServer())
      .post('/fincra/payouts')
      .send({})
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBeDefined();
        expect(Array.isArray(res.body.message)).toBe(true);
      });
  });
});