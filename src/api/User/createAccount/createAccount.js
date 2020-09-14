import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, firstName = "", lastName = "", bio = "" } = args;
      const isExistingEmail = await prisma.$exists.user({ email });
      const isExistingUsername = await prisma.$exists.user({ username });
      if (isExistingEmail) {
        throw Error("This email is already in use");
      } else if (isExistingUsername) {
        throw Error("This username is already in use");
      }

      await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio,
      });
      return true;
    },
  },
};
