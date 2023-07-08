import PageLoader from "../ui/PageLoader.jsx";

const HODC  = ({isAuth, children}) => {
    return isAuth ? <>{children}</> : <PageLoader />
}
export default HODC;