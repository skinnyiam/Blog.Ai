import { prisma } from "@/app/api/client";
import React from "react";
import { Post as PostType } from "@prisma/client";
import { FormattedPost } from "@/app/types";
import Content from "./Content";
type Props = {
  params: { id: string };
};

const getPost = async (id: string) => {
  const post: PostType | null = await prisma.post.findUnique({
    where: { id },
  });
  if (!post) {
    console.log("post with the id doesnot find");
    return null;
  }
  const formattedPost = {
    ...post,
    createdAt: post?.createdAt?.toISOString(),
    updatedAt: post?.updatedAt?.toISOString(),
  };
  return formattedPost;
};

const Post = async ({ params }: Props) => {
  const { id } = params;
  const post: FormattedPost | null = await getPost(id);
  if (!post) {
    return <div>Post Not Found</div>;
  }
  return (
    <main className="pt-5">
      <div className="flex flex-col gap-4 pt-10">
        <Content post={post} />
      </div>
    </main>
  );
};

export default Post;
