import express from 'express';
import {auth, RequestWithUser} from '../middleware/auth';
import  Comment from '../models/Comment';
import mongoose from 'mongoose';
import {commentMutation} from '../types';

const commentsRouter = express.Router();


commentsRouter.post('/',auth , async (req: RequestWithUser, res,next) => {
  try {
    if(!req.body.postId){
      return res.status(404).send('Not Found post');
    }
    const commentData: commentMutation = {
      author: req.user!.id,
      postId:req.body.postId,
      text: req.body.text,
      createdAt: req.body.createdAt,
    }
    const comment = new Comment(commentData);
    await comment.save();
    res.send(comment);
  }catch(e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e)
    }
    return next(e)
  }
})

commentsRouter.get('/:postId', auth, async (req: RequestWithUser, res,next) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ postId }).populate('author', 'username -_id');

    if (!comments.length) {
      return res.status(404).send({ error: 'No comments found for this post' });
    }

    res.send(comments);
  } catch (err) {
   next(err)
  }
});

export default commentsRouter