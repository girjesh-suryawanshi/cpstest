import { allPosts, postMetas } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/card';

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post.slug === params.slug);
  if (!post) {
    return {};
  }
  return {
    title: post.title,
    description: post.description,
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const PostContent = post.content;

  return (
    <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto px-4 py-8">
        <PostContent />
    </article>
  );
}
