const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async function (parent, args, context) {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
    Mutation: {
        login: async function(parent, {email, password}) {
            const user = await User.findOne({email});
            if(!user){
                throw new AuthenticationError('No user with that email was found.');
            }
            const correctPw = await user.isCorrectPassword(password);
            if(!correctPw){
                throw new AuthenticationError('Incorrect password.');
            }
            const token = signToken(user);
            return {token, user};
        },
        addUser: async function(parent, {username, email, password}){
            const user = User.create({username, email, password});
            const token = signToken(user);
            return {token, user};
        },
        saveBook: async function(parent, {book}, context){
            if (context.user) {
                return User.findOneAndUpdate(
                    {_id: context.user._id},
                    {
                        $addToSet: {savedBooks: book}
                    },
                    {
                      new: true,
                      runValidators: true,
                    }
                )
            }
            throw new AuthenticationError('You need to sign in to save a book!');
        },
        removeBook: async function(parent,{bookId}, context){
            if(context.user){
                return User.findOneAndUpdate(
                    {_id: context.user},
                    { 
                        $pull: {savedBooks: {bookId}}
                    },
                    { new: true}
                    );
            }
            throw new AuthenticationError('You need to sign in to save a book!');
        }
    }
};

module.exports = resolvers;