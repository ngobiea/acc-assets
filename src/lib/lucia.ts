import { Lucia, TimeSpan } from 'lucia';
import {
  NeonHTTPAdapter,
  NodePostgresAdapter,
} from '@lucia-auth/adapter-postgresql';
import { neon } from '@neondatabase/serverless';
import pg from 'pg';
const {
  DB_NAME_LOCAL,
  DB_DIALECT_LOCAL,
  DB_PASSWORD_LOCAL,
  DB_USERNAME_LOCAL,
  DB_HOST_LOCAL,
  DB_PORT,
} = process.env;

const sql = neon(
  'postgresql://acc-assets_owner:FUHuV5mGfi8Q@ep-red-bar-a2row8q1.eu-central-1.aws.neon.tech/acc-assets?sslmode=require'
);
const pool = new pg.Pool({
  database: DB_NAME_LOCAL,
  host: DB_HOST_LOCAL,
  port: Number(DB_PORT),
  password: DB_PASSWORD_LOCAL,
  user: DB_USERNAME_LOCAL,
});

const neonAdapter = new NeonHTTPAdapter(sql, {
  user: 'User',
  session: 'sessions',
});

const adapter = new NodePostgresAdapter(pool, {
  user: 'User',
  session: 'sessions',
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: true,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (databaseUserAttributes) => ({
    email: databaseUserAttributes.email,
    password: databaseUserAttributes.password,
  }),
  sessionExpiresIn: new TimeSpan(1, 'd'),
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<UserForm, 'id'>;
  }
}
