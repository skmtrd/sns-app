export const isAdminUser = (userId: string) => {
  return userId === process.env.NEXT_PUBLIC_ADMIN_USER;
};
