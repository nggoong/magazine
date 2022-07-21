import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const deleteHandler = async () => {
    const result = window.confirm('정말 삭제하시겠습니까?');
    if(result) {
      await dispatch(deletePosting({posting_id: item.item.docID}));
      dispatch(postingActions.setDefaultPostings());
      dispatch(fsActions.setDefaultLastVisible());
      dispatch(personalFetchPosting());
    }
    else return;
  }

    return (
        <Card sx={{  mt:0, md:0, mr:'auto', ml:'auto', width:'100%'}}>
          <CardMedia
            component="img"
            height="400"
            src={item.url}
            alt="green iguana"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {item.text}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={deleteHandler} color="error">Delete</Button>
            <Button size="small" onClick={()=> navigate(`/posting/edit/${item.item.docID}`)}>Edit</Button>
          </CardActions>
        </Card>
      );
    }

export default PersonalPostingCard;