import {TypedUseSelectorHook,useSelector} from "react-redux"
import {AppState,AppState2} from "./"

export {useDispatch} from "react-redux"
export const useAppSelector:TypedUseSelectorHook<AppState> = useSelector