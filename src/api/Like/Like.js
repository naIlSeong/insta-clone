export default {
  Like: {
    user: ({ id }) => prisma.like({ id }).user(),
    post: ({ id }) => prisma.like({ id }).post(),
  },
};
