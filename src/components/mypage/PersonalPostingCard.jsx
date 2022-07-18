import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const PersonalPostingCard = (item, url, text) => {

    return (
        <Card sx={{  mt:0, md:0, mr:'auto', ml:'auto', width:'100%'}}>
          <CardMedia
          objectFit="cover"
            component="img"
            height="400"
            // image={item.image_url}
            src={item.url}
            alt="green iguana"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {item.text}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      );
    }

export default PersonalPostingCard;