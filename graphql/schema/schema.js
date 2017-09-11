const graphql = require('graphql');
const User = require('../../models/user.model');
const camelCase = require('camelcase-keys');

const { GraphQLObjectType, GraphQLBoolean, GraphQLInt, GraphQLString, GraphQLSchema } = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    displayName: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    active: { type: GraphQLBoolean },
    provider: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    accountType: { type: GraphQLString },
    profileImage: { type: GraphQLString },
    gender: { type: GraphQLString },
    coverPhoto: { type: GraphQLString },
    verified: { type: GraphQLBoolean },
    lastLogin: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    pending: { type: GraphQLBoolean },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLInt } },
      async resolve(parentValue, args) {
        const user = await User.query()
          .where('id', args.id)
          .first();
        return camelCase(user);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
