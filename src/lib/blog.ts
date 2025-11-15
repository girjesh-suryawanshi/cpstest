import CpsTestUltimateGuide, { frontmatter as CpsTestFrontmatter } from '@/app/blog/content/cps-test-ultimate-guide.mdx';
import JitterClickTestGuide, { frontmatter as JitterClickFrontmatter } from '@/app/blog/content/jitter-click-test-guide.mdx';
import KohiClickTestGuide, { frontmatter as KohiClickFrontmatter } from '@/app/blog/content/kohi-click-test-guide.mdx';
import ButterflyClickTestGuide, { frontmatter as ButterflyClickFrontmatter } from '@/app/blog/content/butterfly-click-test-guide.mdx';
import AimTrainerGuide, { frontmatter as AimTrainerFrontmatter } from '@/app/blog/content/aim-trainer-guide.mdx';
import SpacebarTestGuide, { frontmatter as SpacebarTestFrontmatter } from '@/app/blog/content/spacebar-test-guide.mdx';
import StimulationClickerGuide, { frontmatter as StimulationClickerFrontmatter } from '@/app/blog/content/stimulation-clicker-guide.mdx';
import TypingTestGuide, { frontmatter as TypingTestFrontmatter } from '@/app/blog/content/typing-test-guide.mdx';
import CoreballGameGuide, { frontmatter as CoreballGameFrontmatter } from '@/app/blog/content/coreball-game-guide.mdx';
import Cupcake2048Guide, { frontmatter as Cupcake2048Frontmatter } from '@/app/blog/content/cupcake-2048-guide.mdx';

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
    },
    'stimulation-clicker-guide': {
        title: StimulationClickerFrontmatter.title,
        description: StimulationClickerFrontmatter.description,
        date: '2024-08-04',
    },
    'typing-test-guide': {
        title: TypingTestFrontmatter.title,
        description: TypingTestFrontmatter.description,
        date: '2024-08-05',
    },
    'coreball-game-guide': {
        title: CoreballGameFrontmatter.title,
        description: CoreballGameFrontmatter.description,
        date: '2024-08-06',
    },
    'cupcake-2048-guide': {
        title: Cupcake2048Frontmatter.title,
        description: Cupcake2048Frontmatter.description,
        date: '2024-08-07',
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
    {
        slug: 'stimulation-clicker-guide',
        title: postMetas['stimulation-clicker-guide'].title,
        description: postMetas['stimulation-clicker-guide'].description,
        date: postMetas['stimulation-clicker-guide'].date,
        content: StimulationClickerGuide,
    },
    {
        slug: 'typing-test-guide',
        title: postMetas['typing-test-guide'].title,
        description: postMetas['typing-test-guide'].description,
        date: postMetas['typing-test-guide'].date,
        content: TypingTestGuide,
    },
    {
        slug: 'coreball-game-guide',
        title: postMetas['coreball-game-guide'].title,
        description: postMetas['coreball-game-guide'].description,
        date: postMetas['coreball-game-guide'].date,
        content: CoreballGameGuide,
    },
    {
        slug: 'cupcake-2048-guide',
        title: postMetas['cupcake-2048-guide'].title,
        description: postMetas['cupcake-2048-guide'].description,
        date: postMetas['cupcake-2048-guide'].date,
        content: Cupcake2048Guide,
    },
];
