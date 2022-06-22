/**
 * id
 * title
 * description
 * createdByUserId
 */
export interface ICreatePostProps {
  id: string;
  title: string;
  description: string;
  createdByUserId: string;
}

export interface IPostProps extends ICreatePostProps {
  comments?: Comment[];
}

export class Post implements IPostProps {
  id: string;
  title: string;
  description: string;
  createdByUserId: string;
}
