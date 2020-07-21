import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import {graphql} from "react-apollo";

import { styles } from './styles';
import {addDirectorMutation} from "./mutations";
import {directorsQuery} from "../DirectorsTable/queries";

const withGraphqlAdd = graphql(addDirectorMutation, {
    props: ({mutate}) => ({
        addDirector: director => mutate({ //формируем проп addDirector
            variables: director,
            refreshQueries: [{query: directorsQuery}] //загрузка данных о режиссерах после обновления
        })
    })
});

export default compose(withStyles(styles), withGraphqlAdd);