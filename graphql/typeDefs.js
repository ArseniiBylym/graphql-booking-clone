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
        _id: ID
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
        _id: ID
        place: Place
        owner: User
        startDate: Int
        endDate: Int
        totalPrice: Float
        status: ReserveStatus
    }

    type Review {
        _id: ID!
        owner: User
        place: Place
        rating: Int
        text: String
        date: String
    }

    type City {
        _id: ID!
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

    
    input CreatePlaceInput {
        name: String
        lat: Float
        long: Float
        city: ID
        address: String
        details: String
        roomsNumber: Int
        mainImage: String
        secondaryImages: [String]
        price: Float
    }

    input UpdatePlaceInput {
        _id: ID!
        name: String
        lat: Float
        long: Float
        city: ID
        address: String
        details: String
        roomsNumber: Int
        mainImage: String
        secondaryImages: [String]
        price: Float
    }
    
    input LocationInput {
        lat: Float
        long: Float
    }

    input CreateReserveInput {
        placeId: ID!
        startDate: String!
        endDate: String!
    }

    input ReviewInput {
        reviewId: ID
        placeId: ID!
        rating: Int
        text: String!
    }

    type Query {
        me: User
        getUser(id: ID!): User
        getPlace(id: ID!): Place
        getPlaces(city: ID!, page: Int, limit: Int, sort: String, order: Int): [Place]
        getUserReserves(page: Int, limit: Int, sort: String, order: Int): [Reserve]
        getPlaceReserves(placeId: ID!, page: Int, limit: Int, sort: String, order: Int): [Reserve]
        getCities: [City]
        checkDates(placeId: ID, startDate: String, endDate: String): String
    }

    type Mutation {
        registerUser(name: String, email: String, password: String, passwordConfirm: String): UserWithToken
        loginUser(email: String, password: String, googleId: String): UserWithToken
        updateUser(name: String, phone: String, ): User
        createPlace(input: CreatePlaceInput): Place
        updatePlace(input: UpdatePlaceInput): Place
        deletePlace(id: ID!): ID!
        createReserve(input: CreateReserveInput): Reserve
        updateReserveStatus(reserveId: ID!, status: String): Reserve
        createReview(input: ReviewInput): Review
        updateReview(input: ReviewInput): Review
    }

`