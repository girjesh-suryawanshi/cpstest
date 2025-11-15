import { allPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = allPosts.find((post) => post.slug === params.slug);
  if (!post) {
    return {};
  }
  
  const siteUrl = 'https://www.cpssprint.com';
  const fullUrl = `${siteUrl}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
        title: post.title,
        description: post.description,
        url: fullUrl,
        type: 'article',
        publishedTime: new Date(post.date).toISOString(),
        authors: ['CpsSpeedTest Team'],
    },
    twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
    },
  };
}

const JsonLd = ({ post }: { post: any }) => {
    const siteUrl = 'https://www.cpssprint.com';
    const fullUrl = `${siteUrl}/blog/${post.slug}`;
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.description,
        "datePublished": new Date(post.date).toISOString(),
        "dateModified": new Date(post.date).toISOString(),
        "author": {
            "@type": "Organization",
            "name": "CpsSpeedTest"
        },
        "publisher": {
            "@type": "Organization",
            "name": "CpsSpeedTest",
            "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/logo.png`
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": fullUrl
        },
    };
    return (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
    )
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const PostContent = post.content;

  return (
    <>
      <JsonLd post={post} />
      <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto px-4 py-8">
          <PostContent />
      </article>
    </>
  );
}
