import db from '../db'; // Replace with your database setup

export async function getUserByEmail(email: string) {
  // Query the database to find the user by email
  const user = await db.user.findUnique({ where: { email } });

  return user; // Should include fields like email, password, role, etc.
}
