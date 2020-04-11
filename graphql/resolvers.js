const { User } = require('../models');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const resolvers = {
    Query: {
        async lookUsers(_, args, { models }) {
            // if(!user) {
            //     throw new Error(`You're not authenticated`);
            // }

            return await models.User.findAll();
        }
    },

    Mutation: {
        async signup(_, { username, email, password }) {
            let user = await User.create({
                username,
                email,
                password: await bcrypt.hash(password, 10)
            })

            return true;
        },

        async login(_, { email, password }) {
            let user = await User.findOne({ where: { email } });

            if(!user) {
                throw new Error('No user with that email');
            }

            let valid = await bcrypt.compare(password, user.password);

            if(!valid) {
                throw new Error('Incorrect password');
            }

            return jsonwebtoken.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                // { expiresIn: '1d' }
            )
        }
    }
};

module.exports = resolvers;