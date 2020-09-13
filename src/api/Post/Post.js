const { prisma } = require("../../../generated/prisma-client");

export default {
  Post: {
    files: ({ id }) => prisma.post({ id }).files(),
    comments: ({ id }) => prisma.post({ id }).comments(),
    user: ({ id }) => prisma.post({ id }).user(),
    isLike: (parent, _, { request }) => {
      const { user } = request;
      const { id: postId } = parent;
      return prisma.$exists.like({
        AND: [
          {
            post: {
              id: postId,
            },
          },
          {
            user: {
              id: user.id,
            },
          },
        ],
      });
    },
    likeCount: (parent) =>
      prisma
        .likesConnection({ where: { post: { id: parent.id } } })
        .aggregate()
        .count(),
  },
};
