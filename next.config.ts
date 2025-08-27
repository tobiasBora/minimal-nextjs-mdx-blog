import createMDX from '@next/mdx'
import type { NextConfig } from "next";

const nextConfig : NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Configure static build
  output: "export",
  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  trailingSlash: true,
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
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
