import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    me: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const {
        user: { id },
      } = request;
      return prisma.user({ id });
    },
  },
};
