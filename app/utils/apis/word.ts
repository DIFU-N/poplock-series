import axios from "axios";
import { API_BASE } from "./auth";
import { Comment, Post } from "../types/word";

export const createPost = async (postData: Post) => {
  const response = await axios.post(`${API_BASE}/words/post/create`, {
    postData,
  });
  return response.data;
};

export const fetchAllPosts = async () => {
  const response = await axios.get(`${API_BASE}/words/post/readall`);
  return response.data;
};

export const updatePost = async (postData: Post) => {
  const response = await axios.post(`${API_BASE}/words/post/update`, {
    postData,
  });
  return response.data;
};

export const getPostById = async (postId: string) => {
  const response = await axios.get(`${API_BASE}/words/post/${postId}`);
  return response.data;
};

export const addComment = async (commentData: Comment, postId: string) => {
  const response = await axios.post(`${API_BASE}/words/${postId}/comment`, {
    postId,
    commentData,
  });
  return response.data;
};

export const getComments = async (postId: string) => {
  const response = await axios.get(`${API_BASE}/words/${postId}/comment`);
  return response.data;
};

export const deleteComment = async (commentId: string, postId: string) => {
  const response = await axios.delete(
    `${API_BASE}/words/${postId}/${commentId}/delete`,
  );
  return response.data;
};

export const likePost = async (postId: string) => {
  const response = await axios.put(`${API_BASE}/words/${postId}/like`, {
    postId,
  });
  return response.data;
};
