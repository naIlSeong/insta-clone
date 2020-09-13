import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    posts: ({ id }) => prisma.user({ id }).posts(),
    likes: ({ id }) => prisma.user({ id }).likes(),
    comments: ({ id }) => prisma.user({ id }).comments(),
    rooms: ({ id }) => prisma.user({ id }).rooms(),
    following: ({ id }) => prisma.user({ id }).following(),
    followers: ({ id }) => prisma.user({ id }).followers(),
    followingCounte: ({ id }) =>
      prisma
        .usersConnection({
          where: {
            following_some: { id },
          },
        })
        .aggregate()
        .count(),
    followersCounte: ({ id }) =>
      prisma
        .usersConnection({
          where: {
            followers_some: { id },
          },
        })
        .aggregate()
        .count(),
    fullName: (parent) => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollower: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        return prisma.$exists.user({
          AND: [
            {
              id: user.id,
            },
            {
              followers_some: {
                id: parentId,
              },
            },
          ],
        });
      } catch (error) {
        console.log(error);
      }
    },
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    },
  },
};
