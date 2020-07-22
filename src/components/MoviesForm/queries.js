import {gql} from 'apollo-boost';

//запрос для получения id и имени режиссера для дропдауна в форме
export const directorsQuery = gql`
    query directorsQuery {
        directors {
            id
            name
        }
    } 
`;