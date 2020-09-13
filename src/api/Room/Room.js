import { prisma } from "../../../generated/prisma-client";

export default {
  Room: {
    participants: ({ id }) => prisma.room.participants(),
    messages: ({ id }) => prisma.room.messages(),
  },
};
