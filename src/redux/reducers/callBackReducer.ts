import { CALLBACK, ICallbackType } from '../types/callbackType';
import { ICallback } from '../../utils/TypeScript';

const callbackReducer = (state: ICallback = {}, action: ICallbackType): ICallback => {
    switch (action.type) {
        case CALLBACK:
            return action.payload;
        default:
            return state;
    }
};

export default callbackReducer;
