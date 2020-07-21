import {gql} from 'apollo-boost';

export const addMovieMutation = gql`
    mutation addMovie($name: String!, $genre: String!, $watched: Boolean!, $rate: Int, $directorId: ID) {
        addDirector(name: $name, genre: $genre, watched: $watched, rate: $rate, directorId: $directorId) {
            name
        }
    }
`;