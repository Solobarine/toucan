import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Post, Repost } from "../../types/post";
import {
  createPost,
  deletePost,
  deleteRepost,
  getPost,
  getPostsFeed,
  getRepost,
  getUserPosts,
  repostPost,
  updatePost,
  updateRepost,
} from "../thunks/posts";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import {
  createComment,
  createReply,
  deleteComment,
  getComments,
  updateComment,
} from "../thunks/comments";
import { likeContent, unlikeContent } from "../thunks/likes";
import { LoadingInterface } from "../../types/loading";
import { Comment } from "../../types/comment";
import { banUser } from "../thunks/user";

type FeedItem = Post | Repost;

interface InitialState {
  posts: {
    statusCode: number | undefined;
    status: LoadingInterface;
    data: [] | FeedItem[];
    error: string | undefined;
  };
  post: {
    statusCode: number;
    status: LoadingInterface;
    data: Post | undefined;
    comments: [] | Comment[];
    error: string | undefined;
  };
  create: {
    statusCode: number | undefined;
    status: LoadingInterface;
    message: string | undefined;
    error: string | undefined;
  };
  update: {
    status: LoadingInterface;
  };
  delete: {
    status: LoadingInterface;
  };
  getComments: {
    status: LoadingInterface;
  };
  createComment: {
    statusCode: number | undefined;
    status: LoadingInterface;
    message: string | undefined;
    error: string | undefined;
  };
  createReply: {
    statusCode: number | undefined;
    status: LoadingInterface;
    message: string | undefined;
    error: string | undefined;
  };
  updateComment: {
    status: LoadingInterface;
  };
  deleteComment: {
    status: LoadingInterface;
  };
  like: {
    status: LoadingInterface;
    error: string | undefined;
  };
  unlike: {
    status: LoadingInterface;
    error: string | undefined;
  };
  userPosts: {
    status: LoadingInterface;
    data: Post[] | [];
    error: string | undefined;
  };
  createRepost: { status: LoadingInterface };
  repost: {
    status: LoadingInterface;
    data: Repost | null;
    error: string;
    statusCode: number;
  };
  updateRepost: {
    status: LoadingInterface;
  };
  deleteRepost: {
    status: LoadingInterface;
  };
}

const initialState: InitialState = {
  posts: {
    statusCode: undefined,
    status: "idle",
    data: [],
    error: undefined,
  },
  post: {
    statusCode: 0,
    data: undefined,
    comments: [],
    status: "idle",
    error: undefined,
  },
  create: {
    statusCode: undefined,
    status: "idle",
    message: undefined,
    error: undefined,
  },
  update: {
    status: "idle",
  },
  delete: {
    status: "idle",
  },
  getComments: {
    status: "idle",
  },
  createComment: {
    statusCode: undefined,
    status: "idle",
    message: undefined,
    error: undefined,
  },
  updateComment: {
    status: "idle",
  },
  deleteComment: {
    status: "idle",
  },
  userPosts: {
    status: "idle",
    data: [],
    error: undefined,
  },
  createReply: {
    statusCode: undefined,
    status: "idle",
    message: undefined,
    error: undefined,
  },
  like: {
    status: "idle",
    error: undefined,
  },
  unlike: { status: "idle", error: undefined },
  createRepost: {
    status: "idle",
  },
  repost: {
    status: "idle",
    data: null,
    error: "",
    statusCode: 0,
  },
  updateRepost: {
    status: "idle",
  },
  deleteRepost: {
    status: "idle",
  },
};

const post = createSlice({
  name: "posts",
  initialState,
  reducers: {
    cachePost: (state, action: { payload: Post; type: string }) => {
      state.post.data = action.payload;
    },
    incrementLikeCount: (
      state,
      action: { payload: { post_id: number; context: "posts" | "post" } }
    ) => {
      if (action.payload.context === "posts") {
        const postIndex = state.posts.data.findIndex(
          (post) => post.id === action.payload.post_id
        );
        const repostIndex = state.posts.data.findIndex(
          (post) =>
            post.item_type == "repost" &&
            post.original_post_id === action.payload.post_id
        );

        if (postIndex !== -1) {
          let post = state.posts.data[postIndex];

          if (post.item_type === "post") {
            post = {
              ...post,
              is_liked_by_user: true,
              likes_count: post.likes_count + 1,
            };

            const newPosts = [
              ...state.posts.data.slice(0, postIndex),
              post,
              ...state.posts.data.slice(postIndex + 1),
            ];

            state.posts.data = newPosts;
          }
        }

        if (repostIndex !== -1) {
          const repost = state.posts.data[repostIndex] as Repost;

          state.posts.data[repostIndex] = {
            ...repost,
            original_post: {
              ...repost.original_post,
              is_liked_by_user: true,
              likes_count: repost.original_post.likes_count + 1,
            },
          };
        }
      } else {
        state.post.data = {
          ...(state.post.data as Post),
          is_liked_by_user: true,
          likes_count: (state.post.data?.likes_count as number) + 1,
        };
      }
    },
    decrementLikeCount: (
      state,
      action: { payload: { post_id: number; context: "posts" | "post" } }
    ) => {
      if (action.payload.context === "posts") {
        const postIndex = state.posts.data.findIndex(
          (post) => post.id === action.payload.post_id
        );
        const repostIndex = state.posts.data.findIndex(
          (post) =>
            post.item_type == "repost" &&
            post.original_post_id === action.payload.post_id
        );

        if (postIndex !== -1) {
          let post = state.posts.data[postIndex];

          if (post.item_type === "post") {
            post = {
              ...post,
              is_liked_by_user: false,
              likes_count: post.likes_count - 1,
            };

            const newPosts = [
              ...state.posts.data.slice(0, postIndex),
              post,
              ...state.posts.data.slice(postIndex + 1),
            ];

            state.posts.data = newPosts;
          }
        }

        if (repostIndex !== -1) {
          const repost = state.posts.data[repostIndex] as Repost;
          state.posts.data[repostIndex] = {
            ...repost,
            original_post: {
              ...repost.original_post,
              is_liked_by_user: false,
              likes_count: repost.original_post.likes_count - 1,
            },
          };
        }
      } else {
        state.post.data = {
          ...(state.post.data as Post),
          is_liked_by_user: false,
          likes_count: (state.post.data?.likes_count as number) - 1,
        };
      }
    },
  },
  extraReducers: (builder) => {
    /** GET POSTS FEED **/
    builder.addCase(getPostsFeed.pending, (state) => {
      state.posts.statusCode = undefined;
      state.posts.status = "pending";
      state.posts.error = undefined;
    });
    builder.addCase(
      getPostsFeed.fulfilled,
      (state, action: PayloadAction<AxiosResponse>) => {
        state.posts.status = "idle";
        state.posts.data = action.payload.data.posts;
      }
    );
    builder.addCase(getPostsFeed.rejected, (state, action) => {
      state.posts.statusCode = (
        action.payload as { statusCode: number | undefined }
      ).statusCode;
      state.posts.status = "failed";
      state.posts.error = (
        action.payload as { error: string | undefined }
      ).error;
    });

    /** CREATE POST **/
    builder.addCase(createPost.pending, (state) => {
      state.create.statusCode = undefined;
      state.create.status = "pending";
      state.create.error = undefined;
    });
    builder.addCase(createPost.fulfilled, (state) => {
      state.create.status = "idle";
      state.create.message = "Post created successfully";
      toast.success(state.create.message, {});
    });
    builder.addCase(createPost.rejected, (state, action) => {
      state.create.statusCode = (
        action.payload as { statusCode: number | undefined }
      ).statusCode;
      state.create.message = "Post failed to create";
      toast.error(state.create.message, {});
      state.create.status = "failed";
      state.create.error = (
        action.payload as { error: string | undefined }
      ).error;
    });

    /** GET POST **/
    builder.addCase(getPost.pending, (state) => {
      state.post = {
        ...state.post,
        status: "pending",
        error: undefined,
        statusCode: 0,
      };
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.post = {
        ...state.post,
        status: "idle",
        data: action.payload.data.post,
      };
    });
    builder.addCase(getPost.rejected, (state, action) => {
      state.post = {
        ...state.post,
        status: "failed",
        statusCode: (action.payload as { statusCode: number }).statusCode,
        error: (action.payload as { error: string | undefined }).error,
      };
    });

    /** UPDATE POST **/
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.update = { status: "idle" };
      toast.success("Post Updated Successfully");
      const postId = action.meta.arg.id;

      // Update Posts Feed
      const postIndex = state.posts.data.findIndex(
        (feedItem) => feedItem.id == postId && feedItem.item_type == "post"
      );

      if (postIndex !== -1) {
        state.posts.data[postIndex] = {
          ...state.posts.data[postIndex],
          title: action.meta.arg.data.title,
          body: action.meta.arg.data.body,
        } as Post;
      }

      // Update User Posts
      const index = state.userPosts.data.findIndex((item) => item.id == postId);

      if (index !== -1) {
        state.userPosts.data[postIndex] = {
          ...state.userPosts.data[postIndex],
          title: action.meta.arg.data.title,
          body: action.meta.arg.data.body,
        } as Post;
      }
    });
    builder.addCase(updatePost.rejected, (state) => {
      state.update = {
        status: "failed",
      };
      toast.error("Failed to Update Post");
    });

    /** DELETE POST **/
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.delete = { status: "idle" };
      toast.success("Post Deleted Successfully");

      const postId =
        typeof action.meta.arg == "string"
          ? parseInt(action.meta.arg)
          : action.meta.arg;
      // Update Feed
      state.posts.data = state.posts.data.filter(
        (feedItem) => feedItem.id !== postId
      );

      // Update User Posts
      state.userPosts.data = state.userPosts.data.filter(
        (item) => item.id !== postId
      );
    });

    builder.addCase(deletePost.rejected, (state) => {
      state.delete = { status: "failed" };
      toast.error("Failed to Delete Post");
    });

    /** GET COMMENTS **/
    builder.addCase(getComments.pending, (state) => {
      state.getComments = { status: "pending" };
      state.post.comments = [];
    });

    builder.addCase(getComments.fulfilled, (state, action) => {
      state.getComments = { status: "idle" };
      state.post.comments = action.payload.data.comments;
    });

    builder.addCase(getComments.rejected, (state) => {
      state.getComments = { status: "failed" };
      toast.error("Unable to Load Comments");
    });

    /** CREATE COMMENT **/
    builder.addCase(createComment.pending, (state) => {
      state.createComment.statusCode = undefined;
      state.createComment.status = "pending";
      state.createComment.error = undefined;
    });

    builder.addCase(createComment.fulfilled, (state, action) => {
      state.createComment.status = "idle";
      console.log(action);

      // Increment comment count for post
      if (state.post.data) {
        state.post.data.comments_count += 1;
        state.post.comments = [
          action.payload.data.comment,
          ...state.post.comments,
        ];
      }
    });
    builder.addCase(createComment.rejected, (state, action) => {
      state.createComment.statusCode = (
        action.payload as { statusCode: number | undefined }
      ).statusCode;
      state.createComment.error = (
        action.payload as { error: string | undefined }
      ).error;
      console.log(action);
    });

    /** CREATE REPLY **/
    builder.addCase(createReply.pending, (state) => {
      state.createReply = {
        error: undefined,
        status: "pending",
        statusCode: undefined,
        message: undefined,
      };
    });
    builder.addCase(createReply.fulfilled, (state, action) => {
      state.createReply = {
        ...state.createReply,
        status: "idle",
        message: "Reply created successfully",
      };
      console.log(action);
      toast("Reply created successfully");
    });
    builder.addCase(createReply.rejected, (state, action) => {
      const payload = action.payload as {
        error: string | undefined;
        statusCode: number | undefined;
      };
      state.createReply = {
        ...state.createReply,
        error: payload.error,
        status: "failed",
        statusCode: payload.statusCode,
      };
    });

    /** UPDATE COMMENT **/
    builder.addCase(updateComment.fulfilled, (state, action) => {
      toast.success("Comment updated successfully");
      const commentId = action.meta.arg.id;
      if (!state.post.comments) return;
      const comments = state.post.comments;
      const commentIndex = comments.findIndex(
        (comment) => comment.id == commentId
      );

      if (commentIndex >= 0) {
        state.post.comments[commentIndex].text = action.meta.arg.data.text;
      }
    });
    builder.addCase(updateComment.rejected, () => {
      toast.error("Unable to update comment");
    });

    /** DELETE COMMENT **/
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      toast.success("Comment deleted successfully");
      const commentId = action.meta.arg;
      if (!state.post.comments) return;
      const comments = state.post.comments;
      state.post.comments = comments.filter(
        (comment) => comment.id !== commentId
      );
    });
    builder.addCase(deleteComment.rejected, () => {
      toast.error("Unable to delete comment");
    });

    /** LIKE CONTENT **/
    builder.addCase(likeContent.pending, (state) => {
      state.like = { ...state.like, status: "pending", error: undefined };
    });
    builder.addCase(likeContent.fulfilled, (state) => {
      state.like.status = "idle";
      toast.success("Content liked successfully");
    });
    builder.addCase(likeContent.rejected, (state, action) => {
      state.like = {
        ...state.like,
        status: "failed",
        error: (action.payload as { error: string | undefined }).error,
      };
      toast.error("Unable to like Content");
    });

    /** UNLIKE CONTENT **/
    builder.addCase(unlikeContent.pending, (state) => {
      state.unlike = { ...state.unlike, status: "pending", error: undefined };
    });
    builder.addCase(unlikeContent.fulfilled, (state) => {
      state.unlike.status = "idle";
      toast.success("Content unliked successfully");
    });
    builder.addCase(unlikeContent.rejected, (state, action) => {
      state.unlike = {
        ...state.unlike,
        status: "failed",
        error: (action.payload as { error: string | undefined }).error,
      };
      toast.error("Something went wrong");
    });

    /** USER POSTS **/
    builder.addCase(getUserPosts.pending, (state) => {
      state.userPosts.status = "pending";
      state.userPosts.data = [];
      state.userPosts.error = undefined;
    });

    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.userPosts.status = "idle";
      state.userPosts.data = action.payload.data.posts;
    });
    builder.addCase(getUserPosts.rejected, (state) => {
      state.userPosts.status = "failed";
      state.userPosts.error = "Something went wrong";
    });

    /** CREATE REPOST **/
    builder.addCase(repostPost.pending, (state) => {
      state.createRepost.status = "pending";
    });

    builder.addCase(repostPost.fulfilled, (state) => {
      state.createRepost.status = "idle";
      toast.success("Repost successful");
    });

    builder.addCase(repostPost.rejected, (state) => {
      state.createRepost.status = "failed";
      toast.error("Repost failed");
    });

    /** GET REPOST **/
    builder.addCase(getRepost.pending, (state) => {
      state.repost = {
        status: "pending",
        data: null,
        error: "",
        statusCode: 0,
      };
    });
    builder.addCase(getRepost.fulfilled, (state, action) => {
      state.repost = {
        ...state.repost,
        status: "idle",
        data: action.payload.data.repost,
        statusCode: (action.payload as { statusCode: number }).statusCode,
      };
    });
    builder.addCase(getRepost.rejected, (state) => {
      state.repost = {
        ...state.repost,
        status: "failed",
        error: "Failed to Retrieve Repost",
      };
    });

    /** UPDATE REPOST **/
    builder.addCase(updateRepost.fulfilled, (state) => {
      state.updateRepost = { ...state.updateRepost };
      toast.success("Repost Updated Successfully");
    });

    builder.addCase(updateRepost.rejected, (state) => {
      state.updateRepost = {
        status: "failed",
      };
      toast.error("Failed to Update Repost");
    });
    /** DELETE REPOST **/
    builder.addCase(deleteRepost.fulfilled, (state) => {
      state.deleteRepost = { status: "idle" };
      toast.success("Repost Deleted Successfully");
    });

    builder.addCase(deleteRepost.rejected, (state) => {
      state.deleteRepost = { status: "failed" };
      toast.error("Failed to Delete Repost");
    });

    /** BAN USER **/
    builder.addCase(banUser.fulfilled, (state, action) => {
      const userId = action.meta.arg.blocked_id;
      state.posts.data = state.posts.data.filter(
        (post) => post.user_id !== userId
      );
    });
  },
});
export const { cachePost, incrementLikeCount, decrementLikeCount } =
  post.actions;
export default post.reducer;
