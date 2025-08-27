import fs from 'fs'
import path from 'path'


export async function getAllPosts({ withMetadata = false } = {}) {
    const path_posts = path.join(process.cwd(), 'src', '_blog_posts');
  const md_files = fs.readdirSync(path_posts).filter((file) => path.extname(file) === '.mdx' || path.extname(file) === '.md');
  const parsed_posts = await Promise.all(md_files.map(async (file) => {
    // Sometimes we don't care about metadata
    if (withMetadata) {
      const { default: BlogContent, frontmatter } = await import(`@/_blog_posts/${file}`);
      return {
        slug: path.basename(file, path.extname(file)),
        frontmatter: frontmatter,
        BlogContent: BlogContent // You can call <BlogContent> to load it
      }
    } else {
      return {
        slug: path.basename(file, path.extname(file)),
      }
    }
  }));
  return parsed_posts;
}
