import { compose } from 'recompose';
import {graphql} from "react-apollo";

import {deleteDirectorMutation} from './mutations';
import {directorsQuery} from '../DirectorsTable/queries';

const withGraphqlDelete = graphql(deleteDirectorMutation, {
    props: ({mutate}) => ({
        deleteDirector: id => mutate({ //формируем проп addDirector
            variables: id,
            refetchQueries: [{query: directorsQuery}] //загрузка данных о режиссерах после обновления
        })
    })
});

export default compose(withGraphqlDelete);