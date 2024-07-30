import { useDispatch } from "react-redux"
import { setIsLoading } from "../redux/loaderSlice";

export const useAppLoading = () => {
    const dispatch = useDispatch();

    const showLoading = () => {
        dispatch(setIsLoading(true))
    }
    const hideLoading = () => {
        dispatch(setIsLoading(false))
    }

    return { showLoading, hideLoading }
}