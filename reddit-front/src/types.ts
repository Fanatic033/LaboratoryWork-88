export interface Post {
  _id: string;
  author: {
    username: string;
  };
  title: string;
  description: string;
  image: string | null;
  datetime: string;
}

export interface PostMutation {
  title: string;
  description: string;
  image: string | null;
  datetime: string;
}

export interface CommentMutation {
  author: {
    username: string;
  };
  postId: {
    _id: string;
  };
  text: string;
  createdAt: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}


export interface GlobalError  {
  error: string;
}

