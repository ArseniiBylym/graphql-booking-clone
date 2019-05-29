import {gql} from 'apollo-boost';

export const QUERY_ME =  gql`
    {
        me {
            name
            email
            picture
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
