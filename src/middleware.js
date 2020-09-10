export const isAuthenticated = (request) => {
  if (!request.user) {
    throw Error("⚠️ Authentication Error ⚠️");
  }
  return;
};
