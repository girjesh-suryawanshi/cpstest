import CpsTestUltimateGuide, { frontmatter as CpsTestFrontmatter } from '@/app/blog/content/cps-test-ultimate-guide.mdx';
import JitterClickTestGuide, { frontmatter as JitterClickFrontmatter } from '@/app/blog/content/jitter-click-test-guide.mdx';
import KohiClickTestGuide, { frontmatter as KohiClickFrontmatter } from '@/app/blog/content/kohi-click-test-guide.mdx';
import ButterflyClickTestGuide, { frontmatter as ButterflyClickFrontmatter } from '@/app/blog/content/butterfly-click-test-guide.mdx';
import AimTrainerGuide, { frontmatter as AimTrainerFrontmatter } from '@/app/blog/content/aim-trainer-guide.mdx';
import SpacebarTestGuide, { frontmatter as SpacebarTestFrontmatter } from '@/app/blog/content/spacebar-test-guide.mdx';

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
    },
    'kohi-click-test-guide': {
        title: KohiClickFrontmatter.title,
        description: KohiClickFrontmatter.description,
        date: '2024-07-31',
    },
    'butterfly-click-test-guide': {
        title: ButterflyClickFrontmatter.title,
        description: ButterflyClickFrontmatter.description,
        date: '2024-08-01',
    },
    'aim-trainer-guide': {
        title: AimTrainerFrontmatter.title,
        description: AimTrainerFrontmatter.description,
        date: '2024-08-02',
    },
    'spacebar-test-guide': {
        title: SpacebarTestFrontmatter.title,
        description: SpacebarTestFrontmatter.description,
        date: '2024-08-03',
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
    {
        slug: 'kohi-click-test-guide',
        title: postMetas['kohi-click-test-guide'].title,
        description: postMetas['kohi-click-test-guide'].description,
        date: postMetas['kohi-click-test-guide'].date,
        content: KohiClickTestGuide,
    },
    {
        slug: 'butterfly-click-test-guide',
        title: postMetas['butterfly-click-test-guide'].title,
        description: postMetas['butterfly-click-test-guide'].description,
        date: postMetas['butterfly-click-test-guide'].date,
        content: ButterflyClickTestGuide,
    },
    {
        slug: 'aim-trainer-guide',
        title: postMetas['aim-trainer-guide'].title,
        description: postMetas['aim-trainer-guide'].description,
        date: postMetas['aim-trainer-guide'].date,
        content: AimTrainerGuide,
    },
    {
        slug: 'spacebar-test-guide',
        title: postMetas['spacebar-test-guide'].title,
        description: postMetas['spacebar-test-guide'].description,
        date: postMetas['spacebar-test-guide'].date,
        content: SpacebarTestGuide,
    },
];
