import {
  addComment,
  createPost,
  deleteComment,
  fetchAllPosts,
  getComments,
  getPostById,
  updatePost,
} from "@/utils/apis/word";
import { Comment, fetchAllPostsResponse, Post } from "@/utils/types/word";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type WordsState = {
  loading: boolean;
  error: string | null;
  posts: Post[];

  postData: Post | null;
  setPost: (postData: Post) => void;
  fetchAllPosts: () => Promise<void>;
  createPost: (postData: Post) => Promise<void>;
  updatePost: (postData: Post) => Promise<void>;
  getPostById: (postId: string) => Promise<void>;

  comment: Comment | null;
  addComment: (postId: string) => Promise<void>;
  deleteComment: (commentId: string, postId: string) => Promise<void>;
  getComments: (postId: string) => Promise<void>;
  setComment: (comment: Comment) => void;

  likePost: (postId: string) => Promise<void>;
};

const initialState: WordsState = {
  error: null,
  loading: false,
  postData: null,
  posts: [],
  comment: null,
  getComments: async () => {},
  addComment: async () => {},
  deleteComment: async () => {},
  setComment: () => {},

  createPost: async () => {},
  fetchAllPosts: async () => {},
  getPostById: async () => {},
  setPost: () => {},
  updatePost: async () => {},

  likePost: async () => {},
};

export const useWordsStore = create<WordsState>()(
  persist(
    (set, get) => ({
      ...initialState,
      comment: null,
      setComment: (comment) => {
        set({ comment: comment });
      },

      addComment: async (postId) => {
        set({ loading: true });

        try {
          const { comment } = get();

          if (!comment) {
            set({
              loading: false,
              error: "Comment is required",
            });
            return;
          }

          await addComment(comment, postId);

          set({
            loading: false,
          });
        } catch {
          set({
            loading: false,
            error: "Error adding comment",
          });
        }
      },
      deleteComment: async (commentId, postId) => {
        set({ loading: true });

        try {
          await deleteComment(commentId, postId);

          set({
            loading: false,
          });
        } catch {
          set({
            loading: false,
            error: "Error deleting comment",
          });
        }
      },
      getComments: async (postId) => {
        set({ loading: true });

        try {
          await getComments(postId);

          set({
            loading: false,
          });
        } catch {
          set({
            loading: false,
            error: "Error fetching comment",
          });
        }
      },
      likePost: async (postId) => {
        try {
          await getComments(postId);
        } catch {
          set({
            error: "Error fetching comment",
          });
        }
      },

      postData: null,
      setPost: (postData) => {
        set({ postData });
      },

      createPost: async (postData) => {
        set({ loading: true });

        try {
          await createPost(postData);

          set({
            loading: false,
          });
        } catch {
          set({
            loading: false,
            error: "Error adding post",
          });
        }
      },

      fetchAllPosts: async () => {
        set({ loading: true });

        try {
          const allPosts: fetchAllPostsResponse = await fetchAllPosts();

          set({
            loading: false,
            posts: [...allPosts.posts],
          });
        } catch {
          set({
            loading: false,
            error: "Error fetching posts",
          });
        }
      },

      getPostById: async (postId) => {
        set({ loading: true });

        try {
          await getPostById(postId);

          set({
            loading: false,
          });
        } catch {
          set({
            loading: false,
            error: "Error adding comment",
          });
        }
      },
      updatePost: async () => {
        set({ loading: true });

        const { postData } = get();

        if (!postData) {
          set({
            loading: false,
            error: "Post data required to update",
          });
          return;
        }

        try {
          await updatePost(postData);

          set({
            loading: false,
          });
        } catch {
          set({
            loading: false,
            error: "Failed to update post",
          });
        }
      },
    }),
    { name: "word-storage" },
  ),
);
