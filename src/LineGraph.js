import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const options={
    legend:{
        display:false,
    },
    elements: {
        point: {
            radius:4,
        },
    },
    maintainAspectRatio:false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format:"MM/DD/YY",
                    tooltipformat: "ll",
              },
            },
        ],
        yAxes:[
            {
                gridLines:{
                    display:false,
                },
                tricks:{
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                      },
                },
            },
        ],
    },
};
     const buildChartData = (data, casesType= 'cases') => {
        const chartData = [];
        let lastDataPoint;
        for (let date in data.cases) {
             if (lastDataPoint){
                 const newDataPoint = {
                     x: date,
                     y: data[casesType][date] - lastDataPoint
                 };
                 chartData.push(newDataPoint);
             }
             lastDataPoint = data[casesType][date];
        }
        return chartData;
   };
 
    function LineGraph( casesType ) {
        const [ data , setData ] = useState({});
        
     useEffect(() =>{
        const fetchData =async () => {
       await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=30')
       .then((response) => response.json())
       .then((data) => {            
          console.log(data);
          const chartData = buildChartData(data); 
          setData(chartData);
       });
      };
      fetchData();
     }, [casesType]);

    return (
        <div>
            <h1>Worldwide Cases</h1> 
            {data.length > 0 && (    
               <Line 
               
               data={{
                  datasets: [
                    {
                      backgroundColor: "rgb(204, 16, 52, 0.5)",
                      borderColor: "#CC1034",
                      data: data,           
                    },
                ],        
                }}    
                options= {options}
                 />
            )}          
        </div>
    );
}

export default LineGraph
