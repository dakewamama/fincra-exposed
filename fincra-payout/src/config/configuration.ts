import * as Joi from '@hapi/joi';

export const validationSchema = Joi.object({
  FINCRA_API_KEY: Joi.string().required(),
  FINCRA_BASE_URL: Joi.string().uri().required(),
  PORT: Joi.number().default(3002),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
});
