import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    me: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const {
        user: { id },
      } = request;
      const userProfile = await prisma.user({ id });
      const posts = await prisma.user({ id }).posts();
      const following = await prisma.user({ id }).following();
      return {
        user: userProfile,
        posts,
        following,
      };
    },
  },
};
