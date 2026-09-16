import { JSONContent } from "@tiptap/core";

export type Post = {
  id: string;
  date: string;
  title: string;
  body: JSONContent;
  deleted: boolean;
  subtitle: string;
  headerImage: string;
  authorId: string;
  likes: number;
};

export type PostLikes = {
  id: string;
  postId: string;
  userId: string;
};

export type Comment = {
  id: string;
  date: string;
  body: string;
  deleted: boolean;
  postId: string;
  authorId: string;
  likes: number;
};

export type fetchAllPostsResponse = {
  posts: Post[];
};