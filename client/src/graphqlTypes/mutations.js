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