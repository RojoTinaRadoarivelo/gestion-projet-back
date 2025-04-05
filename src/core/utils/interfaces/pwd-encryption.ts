import * as bcrypt from 'bcrypt';

export const HashPassword = async (password: string, salt: number) =>
  await bcrypt.hash(password, salt);

export const ComparePasswords = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => await bcrypt.compare(plainPassword, hashedPassword);
