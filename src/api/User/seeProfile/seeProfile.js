import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeProfile: async (_, args) => {
      const { id } = args;
      const user = await prisma.user({ id });
      const posts = await prisma.user({ id }).posts();
      const following = await prisma.user({ id }).following();
      return {
        user,
        posts,
        following,
      };
    },
  },
};
