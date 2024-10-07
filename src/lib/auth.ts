import { cookies } from 'next/headers';
import { lucia } from './lucia';
import {validateRequest} from './verify-auth'
export async function destroySession() {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: 'Unauthorized!',
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}
