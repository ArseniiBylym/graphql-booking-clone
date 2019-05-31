import {gql} from 'apollo-boost';

export const QUERY_ME =  gql`
    {
        me {
            _id
            name
            email
            picture
        }
    }
`;

export const QUERY_USER =  gql`
    query($id: ID!){
        getUser(id: $id) {
            _id
            name
            email
            picture
            phone
            places {
                _id
                name
                city {name}
                mainImage
            }
            reviews {
                _id
                owner {name picture}
                place {name}
                rating
                text
                date
            }
            reserves {
                _id
                place {_id name address}
                startDate
                endDate
                totalPrice
                status
            }
        }
    }
`;

export const QUERY_CITIES = gql`
    {
        getCities {
            _id
            name
            location {
                lat
                long
            }
        }
    }
`;

export const QUERY_PLACES = gql`
    query($city: ID!){
        getPlaces(city: $city) {
            _id
            name
            address
            mainImage
            price
            rating
        }
    }
`;

export const QUERY_PLACES_MAP = gql`
    query($city: ID!){
        getPlaces(city: $city) {
            _id
            name
            address
            location{lat long}
        }
    }
`;

export const QUERY_PLACE = gql`
    query($id: ID!){
        getPlace(id: $id) {
            _id
            name
            location {lat long}
            city {_id name}
            address
            details
            roomsNumber
            mainImage
            secondaryImages
            price
            rating
            owner {_id name picture}
            reviews {
                _id
                owner{_id name picture}
                rating
                text
                date
            }
        }
    }
`;
