import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PlaceCard from 'components/Place/PlaceCard'

const Places = ({places}) => {
    return (
        <> 
            {places.map(item => (
                <PlaceCard key={item._id} {...item} />
            ))}
        </>
    )
}

const useStyles = makeStyles(theme => ({

}))

export default Places

