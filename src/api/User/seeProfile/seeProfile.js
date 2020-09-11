import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeProfile: (_, args) => {
      const { id } = args;
      return prisma.user({ id });
    },
  },
};
