import express from 'express';
import Post from '../models/Post';
import {auth, RequestWithUser} from '../middleware/auth';
import {imagesUpload} from '../multer';
import mongoose from 'mongoose';
import {postMutation} from '../types';

const postsRouter = express.Router();


postsRouter.post('/', auth, imagesUpload.single('images') ,async (req: RequestWithUser, res,next) => {
  try {
    const postData: postMutation = {
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
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e)
    }
    return next(e)
  }
})



postsRouter.get('/', async (req, res,next) => {
  try {
    const posts = await Post.find().populate('author', 'username -_id',).sort({datetime: -1});
    if(posts.length === 0) {
      res.send([])
    }
    res.send(posts);
  } catch (e) {
   next(e)
  }
});



export default postsRouter;
