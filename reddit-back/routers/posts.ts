import express from 'express';
import Post from '../models/Post';
import {auth, RequestWithUser} from '../middleware/auth';
import {imagesUpload} from '../multer';

const postsRouter = express.Router();

postsRouter.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username -_id',).sort({datetime: -1});
    if(posts.length === 0) {
      res.send([])
    }
    res.send(posts);
  } catch (e) {
    res.status(500).send({error: 'Failed to fetch posts'});
  }
});

postsRouter.post('/', auth, imagesUpload.single('images') ,async (req: RequestWithUser, res) => {
  try {
    const postData = {
      author: req.user!._id,
        title: req.body.title,
      description: req.body.description,
      image: req.file ? req.file.filename : null,
      datetime: req.body.datetime
    }
    const post = new Post(postData);
    await post.save();
    res.send(post);
  } catch (e) {
    res.status(400).send({error: 'Failed to create post'});
  }
});

export default postsRouter;
