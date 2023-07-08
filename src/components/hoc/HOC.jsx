import ContentLoader from "../ui/ContentLoader.jsx";
import ContentNotFound from "../ui/ContentNotFound.jsx";

const HOC  = ({isLoaded, hasData, children}) => {
    if(isLoaded){
        if(hasData){
            return <>{children}</>
        }
        return <ContentNotFound />
    }
    return <ContentLoader />
}


export default HOC;