import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import {graphql} from "react-apollo";

import { styles } from './styles';
import {addDirectorMutation, updateDirectorMutation} from "./mutations";
import {directorsQuery} from "../DirectorsTable/queries";

const withGraphQl = compose(
    graphql(addDirectorMutation, {
        props: ({mutate}) => ({
            addDirector: director => mutate({ //формируем проп addDirector
                variables: director,
                refetchQueries: [{
                    query: directorsQuery,
                    variables: {name: ''}
                }]
            })
        })
    }),
    graphql(updateDirectorMutation, {
        props: ({mutate}) => ({
            updateDirector: director => mutate({ //формируем проп addDirector
                variables: director,
                refetchQueries: [{
                    query: directorsQuery,
                    variables: {name: ''}
                }]
            })
        })
    })
);

export default compose(withStyles(styles), withGraphQl);