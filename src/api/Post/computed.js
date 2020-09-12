const { prisma } = require("../../../generated/prisma-client");

export default {
  Post: {
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
