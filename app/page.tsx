import { Post } from "@prisma/client";
import { prisma } from "./api/client";
import Other from "./home/Other";
import Tech from "./home/Tech";
import Travel from "./home/Travel";
import Trending from "./home/Trending";

const getPosts = async () => {
  const posts = await prisma.post.findMany();

  return posts;
};

export default async function Home() {
  const posts = await getPosts();
  const formatPosts = () => {
    const trendingPosts: Array<Post> = [];
    const techPosts: Array<Post> = [];
    const travelPosts: Array<Post> = [];
    const otherPosts: Array<Post> = [];

    posts.forEach((post: Post, i: number) => {
      if (i < 3) {
        trendingPosts.push(post);
      }
      if (post?.category === "Tech") {
        techPosts.push(post);
      } else if (post?.category === "Travel") {
        travelPosts.push(post);
      } else {
        otherPosts.push(post);
      }
    });
    return [trendingPosts, travelPosts, techPosts, otherPosts];
  };
  const [trendingPosts, travelPosts, techPosts, otherPosts] = formatPosts();
  return (
    <main className="pt-5">
      <Trending trendingPosts={trendingPosts} />
      <div className="flex flex-col gap-4 pt-10">
        <Tech techPosts={techPosts} />
        <Travel travelPosts={travelPosts} />
        <Other otherPosts={otherPosts} />
      </div>
    </main>
  );
}
