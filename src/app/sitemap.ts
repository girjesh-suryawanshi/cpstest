import { MetadataRoute } from 'next';
import { allPosts } from '@/lib/blog';

const games = [
    '/cps-test',
    '/cps-test-1s',
    '/jitter-click-test',
    '/kohi-click-test',
    '/butterfly-click-test',
    '/aim-trainer',
    '/spacebar-clicker',
    '/stimulation-clicker',
    '/typing-test',
    '/typing-test-30s',
    '/coreball-game',
    '/cupcake-2048',
    '/jigsaw-puzzle',
    '/sliding-puzzle',
    '/reaction-time-test',
    '/memory-game',
    '/number-memory-test',
    '/sequence-memory-test',
    '/chimp-test',
    '/verbal-memory-test',
    '/visual-memory-test',
    '/word-memory-test',
    '/math-quiz',
    '/word-scramble',
    '/drawing-pad',
    '/block-builder',
    '/connect-the-dots',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://www.cpssprint.com'; // Replace with your actual domain

  const gamePages = games.map((game) => ({
    url: `${siteUrl}${game}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const blogPages = allPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticPages = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${siteUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  return [...staticPages, ...gamePages, ...blogPages];
}
