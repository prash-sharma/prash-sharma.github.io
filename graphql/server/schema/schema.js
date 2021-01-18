const graphql = require('graphql')
const _ = require('lodash')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql

// Dummy data
let movies = [
    { name: 'Lord of the Rings', genre: 'Fantasy', id: '1' },
    { name: 'Harry Potter', genre: 'Fantasy', id: '2' },
    {
        name: 'Godfather',
        genre:
            'https://www.gravatar.com/avatar/071676328c3ff81e2454e36b8edb8b6a%20+%20%27?s=120%27',
        id: '3',
    },
]

let tv = [
    { name: 'Breaking Bad', genre: 'Crime, Drama', id: '1' },
    { name: 'The Haunting of the Hill House', genre: 'Horror', id: '2' },
    { name: 'Dark', genre: 'Sci-fi', id: '3' },
]

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    }),
})

const TvType = new GraphQLObjectType({
    name: 'TV',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    }),
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db / other source
                return _.find(movies, { id: args.id })
            },
        },
        tv: {
            type: TvType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db / other source
                return _.find(tv, { id: args.id })
            },
        },
    },
})

module.exports = new GraphQLSchema({
    query: RootQuery,
})
