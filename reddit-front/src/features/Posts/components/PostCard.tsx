import {Post} from '../../../types.ts';
import {FC} from 'react';
import {Box, Card, CardContent, CardMedia, Typography,} from '@mui/material';
import {API_URL} from '../../../constants.ts';
import chatImg from '@/assets/chat.png';

interface Props {
  post: Post;
}

const PostCard: FC<Props> = ({post}) => {
  const cardImage = post.image ? `${API_URL}/${post.image}` : chatImg;

  return (
    <Card sx={{
      backgroundColor: '#f9f9f9',
      width: '700px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: '20px',
      boxShadow: '7px 6px 0px 0px rgb(0 0 0 / 10%)',
      borderRadius: '10px',
      padding: '10px',
    }}>
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '120px'}}>
        <CardMedia
          component="img"
          image={post.image ? cardImage : chatImg}
          alt={post.title}
          sx={{
            width: '100px',
            height: '100px',
            borderRadius: '8px',
            objectFit: post.image ? 'cover' : 'contain',
          }}
        />
      </Box>

      <Box sx={{flexGrow: 1, pl: 2}}>
        <CardContent sx={{padding: '0'}}>
          <Typography variant="caption" sx={{color: '#555'}}>
            {new Date(post.datetime).toLocaleDateString()} by {post.author.username}
          </Typography>
          <Typography variant="h6" sx={{margin: '8px 0', fontWeight: 'bold', color: '#333'}}>
            {post.title}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default PostCard;
