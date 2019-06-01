import {gql} from 'apollo-boost';

export const MUTATION_LOGIN = gql`
    mutation($email: String, $password: String) {
        loginUser(email: $email, password: $password) {
            user {
                _id
                name
                email
                picture
            }
            token
        }
    }
`;

export const MUTATION_REGISTER = gql`
    mutation($name: String, $email: String, $password: String, $passwordConfirm: String) {
        registerUser(name: $name, email: $email, password: $password, passwordConfirm: $passwordConfirm) {
            user {
                _id
                name
                email
                picture
            }
            token
        }
    }
`;

export const MUTATION_ADD_REVIEW = gql`
    mutation($placeId: ID!, $rating: Int, $text: String!) {
        createReview(input: {placeId: $placeId, rating: $rating, text: $text}) {
            _id
            owner{_id name picture}
            rating
            text
            date
        }
    }
`;

export const MUTATION_CREATE_PLACE = gql`
    mutation($name: String, $lat: Float, $long: Float $city: ID, $address: String, $details: String, $roomsNumber: Int, $mainImage: String, $secondaryImages: [String], $price: Float) {
        createPlace(input: {
            name: $name
            lat: $lat
            long: $long
            city: $city
            address: $address 
            details: $details 
            roomsNumber: $roomsNumber 
            mainImage: $mainImage 
            secondaryImages: $secondaryImages
            price: $price 
        }) {
            _id
        }
    }
`;