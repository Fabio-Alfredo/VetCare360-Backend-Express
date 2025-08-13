import "dotenv/config";
const {
  PORT,
  NODE_ENV,
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_DIALECT,
  SECRET_KEY_JWT,
  DEFAULT_ROLE
} = process.env;

const validateEnv = (name, value) => {
  if (!value) {
    throw new Error(`Environment variable ${name} is not defined`);
  }

  return value;
};

export const config = {
  development: {
    port: validateEnv("PORT", PORT) || 3000,
    db: {
      host: validateEnv("DB_HOST", DB_HOST),
      name: validateEnv("DB_NAME", DB_NAME),
      user: validateEnv("DB_USER", DB_USER),
      pass: validateEnv("DB_PASS", DB_PASS),
      dialect: validateEnv("DB_DIALECT", DB_DIALECT) || "mysql",
    },
    secretKeyJwt:
      validateEnv("SECRET_KEY_JWT", SECRET_KEY_JWT) ||
      "acavaunaclavesecretaparaquesoque",
    defaultRole: validateEnv("DEFAULT_ROLE", DEFAULT_ROLE),
  },
};

const environment = validateEnv("NODE_ENV", NODE_ENV) || "development";

export const currentConfig = config[environment];
