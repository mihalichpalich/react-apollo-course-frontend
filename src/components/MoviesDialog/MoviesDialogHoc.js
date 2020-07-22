import { compose } from 'recompose';
import {graphql} from "react-apollo";

import {deleteMovieMutation} from './mutations';
import {moviesQuery} from "../MoviesTable/queries";

const withGraphqlDelete = graphql(deleteMovieMutation, {
    props: ({mutate}) => ({
        deleteMovie: id => mutate({ //формируем проп addDirector
            variables: id,
            refetchQueries: [{query: moviesQuery}] //загрузка данных о режиссерах после обновления
        })
    })
});

export default compose(withGraphqlDelete);