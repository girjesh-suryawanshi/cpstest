import CpsTestUltimateGuide, { frontmatter as CpsTestFrontmatter } from '@/app/blog/content/cps-test-ultimate-guide.mdx';
import JitterClickTestGuide, { frontmatter as JitterClickFrontmatter } from '@/app/blog/content/jitter-click-test-guide.mdx';

export interface Post {
    slug: string;
    title: string;
    description: string;
    date: string;
    content: React.ComponentType;
}

export const postMetas: Record<string, Omit<Post, 'slug' | 'content'>> = {
    'cps-test-ultimate-guide': {
        title: CpsTestFrontmatter.title,
        description: CpsTestFrontmatter.description,
        date: '2024-07-29',
    },
    'jitter-click-test-guide': {
        title: JitterClickFrontmatter.title,
        description: JitterClickFrontmatter.description,
        date: '2024-07-30',
    }
};

export const allPosts: Post[] = [
    {
        slug: 'cps-test-ultimate-guide',
        title: postMetas['cps-test-ultimate-guide'].title,
        description: postMetas['cps-test-ultimate-guide'].description,
        date: postMetas['cps-test-ultimate-guide'].date,
        content: CpsTestUltimateGuide,
    },
    {
        slug: 'jitter-click-test-guide',
        title: postMetas['jitter-click-test-guide'].title,
        description: postMetas['jitter-click-test-guide'].description,
        date: postMetas['jitter-click-test-guide'].date,
        content: JitterClickTestGuide,
    },
];
