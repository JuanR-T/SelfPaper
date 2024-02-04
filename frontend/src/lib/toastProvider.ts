import { Theme, ToastContent, ToastPosition, TypeOptions, toast } from 'react-toastify';

const toastProvider = (type: TypeOptions, message: ToastContent, position: ToastPosition, theme: Theme) => {
    return toast(message, {
        position: position,
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: theme,
        type: type,
    });
};
/**
    TypeOptions : 
        info
        success
        error
    Position :
        bottom/top/left/right - left/right
    Theme :
        colored
        light
        dark
*/
export default toastProvider;