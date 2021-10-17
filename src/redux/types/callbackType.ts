import { ICallback } from '../../utils/TypeScript';

export const CALLBACK = 'CALLBACK';

export interface ICallbackType {
    type: typeof CALLBACK;
    payload: ICallback;
}
