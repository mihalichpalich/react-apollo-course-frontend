import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import {graphql} from "react-apollo";

import { styles } from './styles';
import {addMovieMutation} from "./mutations";
import {moviesQuery} from "../MoviesTable/queries";
import {directorsQuery} from "./queries";

const withGraphqlAdd = graphql(addMovieMutation, {
    props: ({mutate}) => ({
        addMovie: movie => mutate({ //формируем проп addDirector
            variables: movie,
            refetchQueries: [{query: moviesQuery}] //загрузка данных о режиссерах после обновления
        })
    })
});

export default compose(withStyles(styles), withGraphqlAdd, graphql(directorsQuery));