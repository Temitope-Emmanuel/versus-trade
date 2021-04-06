import {TypedUseSelectorHook,useSelector} from "react-redux"
import {AppState} from "./"

export {useDispatch} from "react-redux"
export const useAppSelector:TypedUseSelectorHook<AppState> = useSelector