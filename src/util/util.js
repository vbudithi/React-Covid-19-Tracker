import React from 'react';
import numeral from "numeral";
import { Circle, Popup, Marker } from 'react-leaflet';
import StarRateIcon from '@material-ui/icons/StarRate';
import IconButton from '@material-ui/core/IconButton';
import './util.css'


const casesTypeColors = {
    cases: {
      hex: "#F08080",
      multiplier: 800,
    },
    recovered: {
      hex: "#90EE90",
      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
      multiplier: 2000,
    },
  };

export const sortData = (data) => {
     let sortedData = [...data];
      sortedData.sort((a,b) => {            //return sortedData.sort((a,b) =>( a.cases>b.cases ? -1: 1));
           if( a.cases > b.cases) {
               return -1;
           } else {
               return 1;
           }
      })
      return sortedData;
};

//Draw circles on the map with interactive tooltop
export const showDataOnMap = (data, casesType = "cases") => 
    data.map((country) => (
      <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
      >
        <Popup>
          
            <div className="info-container">
                <br />
                <div className="info-flag" style={{ backgroundImage : `url(${country.countryInfo.flag})` }} />
                <div className="info-country"> <h1> {country.country} </h1>  </div>
                <br />
                <IconButton >
                  <StarRateIcon  className= "svg_icons"/>
                </IconButton>
           
                <div className="info-name"> <h3 className="info-case1">No of Cases:</h3>
                     <i class="fa fa-universal" />
                   {numeral(country.cases).format("0,0")} </div>
                <div className="info-name"><h3 className="info-case2">Recovered: </h3> {numeral(country.recovered).format("0,0")}</div>
                <div className="info-name"><h3 className="info-case3">Deaths: </h3> {numeral(country.deaths).format("0,0")}</div>
            </div>
        </Popup>
      </Circle>
    ));
