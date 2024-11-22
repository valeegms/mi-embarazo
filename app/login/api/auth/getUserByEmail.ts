import prisma from '@/lib/db';

export async function getUserByEmail(email: string) {
  // Query the database to find the user by email
  const user = await prisma.user.findUnique({ where: { email } });
  
  return user; // Should include fields like email, password, role, etc.
}
