This is a [Next.js](https://nextjs.org) example of a minimalist static blog system, bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It provides notably MDX support, with all markdown files present in the `src/_blog_posts` folder.

WARNING: the goal of this project is just to show how to use MDX and Next.js to get a minimalist blog. It is up to you to configure it the way you like, with categories, sub-folders etc.


## How I implemented this minimalist blog

I invite you to go through all the commits of this project to see what I added to the original starting project. I tried to maintain them in a way that gradually adds features, but I'll still explain the big idea here.

### Basic blog support

But the main idea of the blog is quite simple and based on this official [MDX in Next.js](https://nextjs.org/docs/app/guides/mdx) guide. Namely:
- I installed `npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx` and configured it as explained in the above guide to natively support the `.md` and `.mdx` extension, where the configuration can be found in `next.config.ts` and `src/mdx-components.tsx`.
- I installed the `remark-frontmatter` and `remark-mdx-frontmatter` plugins to automatically deal with YAML frontmatter (`@next/mdx` does not support frontmatter and recommends the above extensions, otherwise the frontmatter will be turned into `h2` titles) and added them to the `next.config.ts` file.
- Then, I can simply write in any (async) javascript code:
  ```
  const { default: BlogContent, frontmatter } = await import(`@/blog_posts/${slug}.md`)
  ```
  and then add in any JSX `<BlogContent>` to insert the blog content, and `frontmatter` will contain the elements configured in the MDX YAML frontmatter like. For instance, if the MDX file is:
  ```
  ---
  title: Hello world
  ---
   
  # Hello world
  
  This is a demo markdown file
  ```
  then `frontmatter.title` will contain `Hello world`.
- This fact is used notably in `src/app/blog/[slug]/page.tsx` to show the current blog entry, and in the function `getAllPosts` in `src/app/blog/blogUtils.ts` that uses `fs` to finds all markdown files, before importing them, notably to get the frontmatter. This function is then called in two places: `src/app/blog/page.tsx` to list all blog entries in a single page (this is just a demo, feel free to use pagination, categories etc to sort them better), and `src/app/blog/[slug]/page.tsx` in the Next.js `generateStaticParams()` function that is used to list all blog pages (needed to know which page to render when building the pages of the static blog).
- Finally, a very rough styling is done using `tailwindcss-typography` via the class `prose lg:prose-xl` in `src/app/layout.tsx` (not recommended to style a whole website this way). You can also configure the markdown rendering in `src/mdx-components.tsx`.

## How to test this code

First, install NodeJs and the dependencies of this project with:
```bash
npm i
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

To generate a static version, run:
```
npm run build
```

The website will be in `out/`. You can serve it via:
```
npx serve out
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
