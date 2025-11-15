import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { allPosts, Post } from '@/lib/blog';
import { Rss } from 'lucide-react';
import {format} from 'date-fns';

export default function BlogPage() {
  const sortedPosts = allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <header className="py-8 sm:py-12">
        <div className="flex items-center gap-4">
            <Rss className="h-10 w-10 text-primary" />
            <div>
                 <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
                    CpsSpeedTest Blog
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Tips, tricks, and insights to improve your clicking skills.
                </p>
            </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <Card className="h-full overflow-hidden transition-shadow duration-300 group-hover:shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription>
                  {format(new Date(post.date), 'MMMM d, yyyy')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
