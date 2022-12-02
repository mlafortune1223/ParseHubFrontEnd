import React, { useState, useContext, useEffect } from 'react';
const Context = React.createContext();

export function useContext() {
    return useContext(Context);
}

export function ContextProvider({ children }) {
    const [search, setSearch] = useState(false)

    const [results, setResults] = useState()
    const pathnames = pathname.split("/")
    useEffect(() => {
        fetch(`http://localhost:3000/path?path=${window.location.pathname.substring(1)}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
            .then(response => response.json())
            .then(results => {
                console.log(results.result)
                if (results.error) setResults(
                    <div>
                        Sorry, your search didn't return any results. Please include the full path of what you're looking for
                    </div>)
                else setResults(<>
                    <Button onClick={() => history.push(`/${search}`)}>Search</Button>
                    {results.type == "file" ? (<div>
                        THIS IS FILE: {pathnames[pathnames.length - 1]}
                    </div>)
                        :
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            THIS IS FOLDER: {pathnames[pathnames.length - 1].toString()}
                            {Object.keys(results.result).map((result) =>
                                <Link style={{ height: '100 %' }} onClick={() => searching(`/${results.foundPath}/${result}`)}>
                                    {result.toString()}
                                </Link>
                            )}
                        </div>
                    }
                </>)
            })
    }, [search])

    function searching(path) {
        history.push(path)
        setSearch(search => !search)
    }

    return (
        <ContextProvider.Provider
            value={{
                results,
                searching
            }}>
            {children}
        </ContextProvider.Provider>
    );
}