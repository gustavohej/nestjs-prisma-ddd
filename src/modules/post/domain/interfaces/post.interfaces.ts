export interface IFactoryCommentProps {
  text: string;
  createdByUserId: string;
  replyToPostId: string;
}

export interface ICreatePostProps {
  id: string;
  title: string;
  text: string;
  createdByUserId: string;
}

export interface IPostProps extends ICreatePostProps {
  comments?: Comment[];
}
