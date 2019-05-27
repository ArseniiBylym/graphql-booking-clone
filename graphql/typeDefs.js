const {gql} = require('apollo-server-express');

module.exports = gql`
    type User {
        _id: ID
        name: String
        email: String
        picture: String
        phone: String
        places: [Place]
        reserves: [Reserve]
        reviews: [Review]
        googleId: String
    }

    type UserWithToken {
        user: User
        token: String
    }

    type Place {
        name: String
        location: Location
        city: City
        address: String
        details: String
        roomsNumber: Int
        mainImage: String
        secondaryImages: [String]
        price: Float
        owner: User
        reviews: [Review]
        rating: Float
        reserves: [Reserve]
    }

    type Reserve {
        place: Place
        owner: User
        startDate: Int
        endDate: Int
        totalPrice: Float
        status: ReserveStatus
    }

    type Review {
        owner: User
        place: Place
        rating: Int
        text: String
        date: Int
    }

    type City {
        name: String
        value: Int
        location: Location
    }

    type Location {
        lat: Float
        long: Float
    }

    enum ReserveStatus {
        reserved
        confirmed
        completed
    }

    type Query {
        me: User
    }

    type Mutation {
        registerUser(name: String!, email: String!, password: String!, passwordConfirm: String!): UserWithToken
        loginUser(email: String, password: String, googleId: String): UserWithToken
        updateUser(name: String, phone: String, ): User
    }

`