import * as actionTypes from '../actions/actionTypes'

const initialState = {
    data: [],
    loading: false
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.TRAIN_SEARCH_START:
            return{
                ...initialState,
                loading: true
            }
        case actionTypes.TRAIN_SEARCH_SUCCESS:
            return{
                ...initialState,
                data: action.data,
                loading:false
            }
        case actionTypes.TRAIN_SEARCH_FAIL:
            return{
                ...initialState,
                loading: false
            }
        default: return state;
    }
}

export default reducer