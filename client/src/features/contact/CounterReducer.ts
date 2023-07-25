// CounterReducer.ts

// Define action types as constants
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

// ... other reducer logic ...


export interface CounterState{
    data: number;
    title:string;
}

const InitialState: CounterState ={
    data : 14,
    title:'another redux counter'
}

export function increment(amount=1){
    return{
        type:INCREMENT_COUNTER,
        payload: amount
    }

}

export function decrement(amount=1){
    return{
        type:DECREMENT_COUNTER,
        payload: amount
    }

}

export default function counterReducer(state=InitialState,action :any){  
    switch (action.type) {
        case INCREMENT_COUNTER:
            return{
                ...state,
                data: state.data + action.payload
            }
            case DECREMENT_COUNTER:
                return{
                    ...state,
                    data: state.data - action.payload
                }
        default:
            return state;
    }  
     
}