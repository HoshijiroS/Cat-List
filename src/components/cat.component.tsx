import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { getCat } from '../service/cat.service';
import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { CatDetail, BreedDetail } from '../models/cat';
import React from 'react';
import { Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

import './cat.component.css';

const attributes = ["Hairless", "Natural", "Rare", "Suppressed Tail", "Short Legs", "Hypoallergenic"];

export default function CatComponent() {
  let navigate = useNavigate();

  const params = useParams();
  const [catDetails, setCatDetails] = useState({} as CatDetail);

  useEffect(() => {
    async function fetchDetails() {
      const detailID = (params.id ? params.id : '').replace(":", "");
      
      getCat(detailID).then((response: AxiosResponse<any>) => {
        setCatDetails(response.data);
      }).catch((e: Error) => {
        console.log(e);
      });
    }

    fetchDetails();
  }, [params.id]);

  const renderAttributes = (details: any) => {
    return (
      <Box sx={{ flexGrow: 1, marginTop: 3, marginBottom: 3}}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {attributes.map((el, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <div
                className = {details[el.toLowerCase().replace(" ", "_")] === 1 ? "cell active" : "cell inactive"}
              >
                {el}
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  const goBack = () => {
    navigate('/');
  }

  const renderDetails = () => {

    return (
      catDetails && catDetails.breeds && catDetails.breeds.length > 0 ? 
        <Card sx={{ margin: "20px" }}>
          <CardMedia
            component="img"
            width="248"
            image={catDetails.url}
            alt={catDetails.breeds[0].name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {catDetails.breeds[0].name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{marginTop: 3}}>
              {catDetails.breeds[0].description}
            </Typography>
            {renderAttributes(catDetails.breeds[0])}
          </CardContent>
          <CardActions>
            <Button size="small" onClick={goBack}>Go Back</Button>
          </CardActions>
        </Card>
        : <div></div>
    );
  }
  
  return (
    <Container>
      {renderDetails()}
    </Container>
  );
}