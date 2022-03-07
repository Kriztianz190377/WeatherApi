import { Fragment, useState, useEffect } from "react"
import PropTypes from 'prop-types'
import Header from "./components/Header"
import SearchForm from "./components/SearchForm"
import Weather from "./components/Weather";
import Error from "./components/Error";



function App() {

  const [search, setSearch] = useState({
    city: '',
    country: '',
  });

  const [consult, setConsult] = useState(false);
  const [result, setResult] = useState({});
  const [error, setError] = useState(false);



  const { city, country } = search;

  useEffect(() => {
    const consultApi = async () => {

      if (consult) {
        const apiId = '421d0d7b07c333cd7c7f861ac3247cc9';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiId}`

        const response = await fetch(url);
        const result = await response.json();
        setResult(result);
        setConsult(false);
        if (result.cod === "404") {
          setError(true)
        } else {
          setError(false)
        }
      }
    }
    consultApi();
   

  }, [consult]);

  let component;
  if (error) {
    component = <Error      
      message='No result ' />
  } else {
    component = <Weather
      result={result}
    />
  }

  
  return (
    <Fragment>
      <Header
        title="Weather City"
      />
      <div className="container-form">
        <div className="container">
          <div className="row">
            <div className="col m7 s12">
              <SearchForm
                search={search}
                setSearch={setSearch}
                setConsult={setConsult}
              />
            </div>
            <div className="col m5 s12 ">

              {component}

            </div>

          </div>

        </div>


      </div>

    </Fragment>
  )
  App.propTypes = {
    search: PropTypes.object.isRequired,
    setSearch: PropTypes.func.isRequired,
    setConsult: PropTypes.func.isRequired

  }
}

export default App
