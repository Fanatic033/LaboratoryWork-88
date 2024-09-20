import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {useEffect} from 'react';
import {fetchPosts} from './PostsThunks.ts';
import {selectPosts} from './PostsSlice.ts';
import PostCard from './components/PostCard.tsx';

const PostsPage = () => {

  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch])
  return (
    <>
      <h1 style={{marginLeft: '40px'}}>Posts List</h1>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      {posts.map((post) => (
        <PostCard key={post._id} post={post}/>
      ))}
    </div>
    </>
  );
};

export default PostsPage;