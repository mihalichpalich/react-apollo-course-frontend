import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import {graphql} from "react-apollo";

import { styles } from './styles';
import {addMovieMutation, updateMovieMutation} from "./mutations";
import {moviesQuery} from "../MoviesTable/queries";
import {directorsQuery} from "./queries";

const withGraphQl = compose(
    graphql(addMovieMutation, {
        props: ({mutate}) => ({
            addMovie: movie => mutate({ //формируем проп addDirector
                variables: movie,
                refetchQueries: [{query: moviesQuery}] //загрузка данных о режиссерах после обновления
            })
        })
    }),
    graphql(updateMovieMutation, {
        props: ({mutate}) => ({
            updateMovie: movie => mutate({ //формируем проп addDirector
                variables: movie,
                refetchQueries: [{query: moviesQuery}] //загрузка данных о режиссерах после обновления
            })
        })
    })
);

export default compose(withStyles(styles), withGraphQl, graphql(directorsQuery));