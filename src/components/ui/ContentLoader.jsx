const ContentLoader = () => {
    return (
        <div
            className="flex items-center justify-center"
            style={{height: "calc(100vh - 15vh)"}}
        >
            <div>
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
            </div>
        </div>
    )
}

export default ContentLoader;