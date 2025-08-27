import { getAllPosts } from "./blogUtils" 
import Link from 'next/link'

export default async function Page() {
  const posts = await getAllPosts({withMetadata: true});
  return <>
    <h1>All my blogs articles:</h1>
    <ul>
      {posts.map((post) => <li key={post.slug}><Link href={`/blog/${post.slug}`}>{post.frontmatter?.title || post.slug }</Link></li>)}
    </ul>
  </>
}
