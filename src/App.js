import React, { useState, useEffect } from "react";
import{
   MenuItem,
   FormControl,
   Select,
   Card,
   CardContent, 
   Button,
   Grid,
   Typography,
   Container,
   makeStyles,
   Link,
} from "@material-ui/core";
import InfoBox from "./InfoBox/InfoBox";
import Map from "./Map/Map";
import Table from "./Table/Table";
import { sortData } from "./util/util";
import numeral from "numeral";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import "./App.css";
import Footer from "./Footer";
import Aos from "aos";
import "aos/dist/aos.css";

function App() {
  const [ countries, setCountries ] = useState([]);
  const [ country, setCountry ] = useState('worldwide');
  const [ countryInfo, setCountryInfo ] = useState({});
  const [ tableData, setTableData] = useState([]);
  const[ mapCenter, setMapCenter ] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const[mapCountries, setMapCountries] = useState([]);

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://vivek-webapp-covid19.netlify.app/">
         Vivek Budithi
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
  
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));
 
  const [casesType, setCasesType] = useState("cases");
  const classes = useStyles();

  Aos.init({duration:2000});  

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() =>{
          const getCountriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
            .then((response) => response.json())
            .then((data) => {
              const countries = data.map((country) => (
                {
                  name: country.country,
                  value: country.countryInfo.iso2,
                }
              ));
              let sortedData = sortData(data);
              setCountries(countries);
              setMapCountries(data);
              setTableData(sortedData);
            });
          }
          getCountriesData();
  }, []);
   console.log(casesType);

   const onCountryChange = async(event) => {
      const countryCode = event.target.value;

      setCountry(countryCode);          

      const url = countryCode === "worldwide" 
          ? "https://disease.sh/v3/covid-19/all"
          : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await fetch(url)
        .then((response) => response.json())
        .then((data) => { 
            setCountry(countryCode);
            setCountryInfo(data);
            setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
            setMapZoom(4);
        });
      };

  return (
  <React.Fragment>
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>             
        </div> 
        <hr />      
        <div className="app__stats">
          <InfoBox title="coronavirus cases" isRed cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>
        <div className={classes.heroContent}>
        <Container>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>         
                COVID-19 - Human to human transmision
                symptoms: fever, dry cough, tiredness
          </Typography>
        <div className="app__center" data-aos="fade-down">      
          <Grid container justify= "center">
            <FormControl className="app__dropdown">
              <Select variant="outlined" value= { country } onChange={onCountryChange} >
                <MenuItem value="worldwide">WORLDWIDE</MenuItem>
                  {
                    countries.map((country) => (
                      <MenuItem value={country.value}>{country.name}</MenuItem>
                    ))
                  }
              </Select>
            </FormControl>
          </Grid>
          <br />
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Link href="https://disease.sh/docs/#/COVID-19%3A%20JHUCSSE/get_v3_covid_19_historical_all" target="_blank">
                <Button size="medium" variant="contained" color="primary">
                  CoVID19 API
                </Button>
              </Link>    
            </Grid>
            <Grid item>
              <Link href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public" target="_blank">
                  <Button size="medium" variant="outlined" color="primary">
                    PRECAUTIONS
                  </Button>
              </Link>
            </Grid>
          </Grid>
        </div>
     </Container>
      </div>
        <Map 
         countries= {mapCountries}
         casesType={casesType}
         center ={mapCenter}
         zoom ={mapZoom}
         />

      </div>     
    <div className="map" data-aos="zoom-in-up">
      <Card className="app__right">
        <CardContent>
          <h3> live cases</h3>
          <Table countries = { tableData } />
          <LineGraph casesType={casesType}/>
        </CardContent>
      </Card>
    </div>
   
  </div>

  {/* Footer */}
  <footer className={classes.footer}>
  <div style={{textAlign:"center",color:"Black"}}>
            Made With ❤️ by Vivek Budithi  |   
        <a target="_blank" href="https://www.linkedin.com/in/vivek-budithi-a27321151/">
            Contact Vivek Budithi
        </a>
  </div>
  <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
    CoVID19 Web App
  </Typography>
  <Copyright />
</footer>
{/* End footer */}
 
</React.Fragment>
  );  
}

export default App;
