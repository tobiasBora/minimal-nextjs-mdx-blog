import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center">
      <Link href="/blog">Go to my blog</Link>
    </div>
  );
}
