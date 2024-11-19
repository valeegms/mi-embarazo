import bcrypt from 'bcrypt'; // If passwords are hashed
import { getUserByEmail } from './getUserByEmail';

export async function signIn(strategy: string, { email, password }: { email: string, password: string }) {
  if (strategy !== 'credentials') {
    throw new Error('Unsupported strategy');
  }

  const user = await getUserByEmail(email);

  if (!user) {
    throw { type: 'CredentialsSignin', message: 'User not found.' };
  }

  // Compare passwords (ensure passwords are hashed in the database)
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw { type: 'CredentialsSignin', message: 'Invalid credentials.' };
  }

  return user;
}
