import PageLoader from "../ui/PageLoader.jsx";

const HOLC  = ({isAuth, children}) => {
    return isAuth ? <PageLoader /> :  <>{children}</>
}
export default HOLC;