import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
      let room;
      // No Room => Create Room
      if (roomId === undefined) {
        if (user.id !== toId) {
          room = await prisma.createRoom({
            participants: {
              connect: [{ id: toId }, { id: user.id }],
            },
          });
        }
      }
      // Room exist => Find Room
      else {
        room = await prisma.room({ id: roomId });
      }
      if (!room) {
        throw Error("Room not found ⚠️");
      }
      const getTo = room.participants.filter(
        (participant) => participant.id !== user.id
      )[0];
      return prisma.createMessage({
        text: message,
        room: {
          connect: {
            id: room.id,
          },
        },
        from: {
          connect: {
            id: user.id,
          },
        },
        to: {
          connect: {
            id: room.id ? getTo.id : toId,
          },
        },
      });
    },
  },
};
