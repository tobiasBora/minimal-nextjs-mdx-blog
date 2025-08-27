import { getAllPosts } from "../blogUtils" 

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // TODO: deal with .mdx extension, index.md etc
  const { default: Post } = await import(`@/_blog_posts/${slug}.md`)
  
  return <Post />
}

// Specify to Next.js which URL must be generated when generating static builds
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((file) =>  ({ slug: file.slug }));
}

// Give 404 if not in this list
export const dynamicParams = false
