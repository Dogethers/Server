const { gql } = require("apollo-server");
const axios = require("axios");

const typeDefs = gql`
  type Friendlist {
    id: ID
    FriendId: Int
    UserId: Int
    status: Boolean
    Users: User
  }

  type User {
    id: ID!
    username: String
    email: String
    password: String
    isOnline: Boolean
  }

  extend type Query {
    getFriendlist(access_token: String): [Friendlist]
    getFriendRequest(access_token: String): [Friendlist]
  }

  extend type Mutation {
    addFriend(
      access_token: String
      FriendId: Int # UserID : Int
    ): # status : Boolean
    Friendlist
    acceptFriend(access_token: String, status: Boolean): Friendlist
    rejectFriend(access_token: String, status: Boolean): Friendlist
  }
`;

const resolvers = {
  Query: {
    async getFriendlist(_, args) {
      try {
        const { data } = await axios.get("http://localhost:3000/friendlist", {
          headers: { access_token: args.access_token },
        });
        console.log(data);

        return data;
      } catch (error) {
        console.log(error);
      }
    },

    async getFriendRequest(_, args) {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/friendrequest",
          {
            headers: { access_token: args.access_token },
          }
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    async addFriend(_, args) {
      try {
        const { data } = await axios.post(
          "http://localhost:3000/friendlist",
          { FriendId: args.FriendId },
          {
            headers: { access_token: args.access_token },
          }
        );
        console.log(data);
        return {
          UserId: data.UserId,
          FriendId: data.FriendId,
          status: data.status,
        };
      } catch (error) {
        console.log(error);
      }
    },
    async acceptFriend(_, args) {
      try {
        const { data } = await axios.patch(
          "http://localhost:3000/friendlist",
          {
            headers: { access_token: args.access_token },
          },
          args
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    async rejectFriend(_, args) {
      try {
        const { data } = await axios.delete(
          "http://localhost:3000/friendlist",
          {
            headers: { access_token: args.access_token },
          },
          args
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
