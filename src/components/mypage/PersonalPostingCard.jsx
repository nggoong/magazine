import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { deletePosting, postingActions,personalFetchPosting } from '../../redux/module/postingReducer';
import { fsActions } from '../../redux/module/fsReducer';


const PersonalPostingCard = (item, url, text) => {
  const dispatch = useDispatch();
  // useEffect(()=> {
  //   console.log('dhlfa;s : ', item);
  //   console.log(url);
  //   console.log(text);
  // }, [])
  
  const deleteHandler = async () => {
    // console.log('delete handler doc id : ', item.item.docID);
    // console.log(item.docID);
    await dispatch(deletePosting({posting_id: item.item.docID}));
    dispatch(postingActions.setDefaultPostings());
    dispatch(fsActions.setDefaultLastVisible());
    dispatch(personalFetchPosting());
  }

    return (
        <Card sx={{  mt:0, md:0, mr:'auto', ml:'auto', width:'100%'}}>
          <CardMedia
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
            <Button size="small" onClick={deleteHandler}>Delete</Button>
            <Button size="small">Edit</Button>
          </CardActions>
        </Card>
      );
    }

export default PersonalPostingCard;