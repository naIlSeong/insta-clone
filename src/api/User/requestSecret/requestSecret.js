import { prisma } from "../../../../generated/prisma-client";
import { generateSecret } from "../../../util";

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const secret = generateSecret();
      try {
        await prisma.updateUser({
          data: { email, loginSecret: secret },
          where: { email },
        });
        return true;
      } catch {
        return false;
      }
    },
  },
};
