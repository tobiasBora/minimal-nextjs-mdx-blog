import { getAllPosts } from "../blogUtils" 

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // TODO: deal with .mdx extension, index.md etc
  const { default: Post, frontmatter } = await import(`@/_blog_posts/${slug}.md`)

  // - prose = defined by tailwindcss-typography to give nice default styles to regular html
  // - [&_img]:inline = images are block by default via tailwind, here we want to configure them as inline
  //   by default to allow inline images in paragraphs.
  //   [&_img]:inline means "all images inside the current element (&) are inline"
  //   https://stackoverflow.com/questions/73666015/nested-brackets-and-ampersand-usage-in-tailwind-ui-examples
  return <div>
    <h1>{frontmatter.title}</h1>
    <div className="prose lg:prose-xl [&_img]:inline">
      <Post />
    </div>
  </div>
}

// Specify to Next.js which URL must be generated when generating static builds
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((file) =>  ({ slug: file.slug }));
}

// Give 404 if not in this list
export const dynamicParams = false
