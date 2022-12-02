import React, { useEffect, useState } from "react";
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from "@material-ui/core";

const Explorer = props => {
  const {
    history,
    location: { pathname },
  } = props;

  const [results, setResults] = useState()
  const [search, setSearch] = useState(false)
  const pathnames = pathname.replace("home", '').split("/").filter(x => x)

  useEffect(() => {
    fetch(`http://localhost:3000/path?path=${window.location.pathname.substring(1) ? window.location.pathname.substring(1) : 'home'}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(results => {
        if (results.error) setResults(
          <div>
            Sorry, your search didn't return any results. Please include the full path of what you're looking for
          </div>)
        else setResults(<>
          {results.type == "file" ? (<div>
            THIS IS FILE: {pathnames[pathnames.length - 1]}
          </div>)
            :
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              THIS IS FOLDER: {pathnames[0] ? pathnames[pathnames.length - 1].toString() : 'home'}
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
    <div>
      <MUIBreadcrumbs aria-label="breadcrumb">
        {pathnames.length > 0 ? (
          <Link onClick={() => searching("/home")}>home</Link>
        ) : (
          <Typography> home </Typography>
        )}
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <Typography key={name}>{name}</Typography>
          ) : (
            <Link key={name} onClick={() => searching(`/home${routeTo}`)}>
              {name}
            </Link>
          );
        })}
      </MUIBreadcrumbs>

      {results ?
        <div>
          {results}
        </div>
        :
        <div>Searching...</div>
      }
    </div>
  )
};

export default Explorer;
