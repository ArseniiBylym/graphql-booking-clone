import React, {useContext} from 'react';
import {Redirect} from 'react-router';
import Context from 'store/context';
import SelectedCity from 'components/SelectedCity';

const Places = () => {
    const {state, dispatch} = useContext(Context);

    if (!state.selectedCity) {
        return <Redirect to='/'/>
    }
    return (
        <div>
            <SelectedCity/>
            Places
        </div>
    )
}

export default Places;