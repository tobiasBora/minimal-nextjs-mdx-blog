import createMDX from '@next/mdx'
import type { NextConfig } from "next";

const nextConfig : NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Configure static build
  output: "export",
  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  trailingSlash: true,
  // Image cannot be optimized in static mode (TODO: use another project that is compatible with image optimization)
  // https://nextjs.org/docs/messages/export-image-api
  images: { unoptimized: true },
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [
      // These two plugins create, when importing a .md(x) file, a field "frontmatter" containing the
      // markdown YAML frontmatter
      // With TurboPack, the name of the extension must be a string instead of an import:
      // https://nextjs.org/docs/app/guides/mdx#using-plugins-with-turbopack
      "remark-frontmatter",
      "remark-mdx-frontmatter",
    ],
    rehypePlugins: [
      // Allows raw html in MDX
      ['rehype-raw', {passThrough: ['mdxjsEsm', 'mdxFlowExpression', 'mdxJsxFlowElement', 'mdxJsxTextElement', 'mdxTextExpression']}],
      // Allow images
      'rehype-mdx-import-media',
    ],
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
