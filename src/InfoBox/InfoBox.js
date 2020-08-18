import React from 'react'
import { Card, CardContent, Typography } from "@material-ui/core";
import './InfoBox.css';
import Aos from "aos";
import "aos/dist/aos.css";

function InfoBox({ title, cases, total }) {
    Aos.init({duration:200});  
    return (
        <div data-aos="fade-right" data-aos-once="true" className="card">
         <Card className="infoBox">
           <CardContent>
               <Typography className="infoBox__title" color= "textSecondary">
                    {title}
               </Typography>
                
               <h2 className="infoBox__total" color="textSecondary">
                   {total} Total
               </h2>

               <h4 className="infoBox__cases"> + {cases} today </h4>
             
           </CardContent>
        </Card>
    </div>
    );
}

export default InfoBox;


