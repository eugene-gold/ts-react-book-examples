import { assertIsPosts } from './getPosts';
import { PostData } from './types';
import { PostsList } from './PostsList';
import { NewPostForm } from './NewPostForm';
import { savePost } from './savePost';
import { useLoaderData, Await, useNavigate } from 'react-router-dom';
import { Suspense } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function PostsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(savePost, {
    onSuccess: (savedPost) => {
      queryClient.setQueryData<PostData[]>(['postData'], (oldPosts) => {
        if (oldPosts === undefined) {
          return [savedPost];
        } else {
          return [savedPost, ...oldPosts];
        }
      });
      navigate('/posts');
    },
  });

  const data = useLoaderData();
  assertIsData(data);

  // const { isLoading, isFetching, data: posts } = useQuery(['postsData'], getPosts);s

  // async function handleSave(newPostData: NewPostData) {
  //   await savePost(newPostData);
  // }
  // if (isLoading || posts === undefined) {
  //   return <div className="w-96 mx-auto mt-6">Loading ...</div>;
  // }

  return (
    <div className="w-96 mx-auto mt-6">
      <h2 className="text-xl text-slate-900 font bold">Posts</h2>
      <NewPostForm
        onSave={mutate}
        // onSave={handleSave}
      />
      {/* {isFetching ? <div>Fetching...</div> : <PostsList posts={posts} />} */}
      {/* <PostsList posts={posts} /> */}
      <Suspense fallback={<div>Fetching...</div>}>
        <Await resolve={data.posts}>
          {(posts) => {
            assertIsPosts(posts);
            return <PostsList posts={posts} />;
          }}
        </Await>
      </Suspense>
    </div>
  );
}

type Data = {
  posts: PostData[];
};

export function assertIsData(data: unknown): asserts data is Data {
  if (typeof data !== 'object') {
    throw new Error("Data isn't an object");
  }
  if (data === null) {
    throw new Error('Data is null');
  }
  if (!('posts' in data)) {
    throw new Error("data doesn't contain posts");
  }
}
