
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
import JigsawPuzzleGuide, { frontmatter as JigsawPuzzleFrontmatter } from '@/app/blog/content/jigsaw-puzzle-guide.mdx';
import SlidingPuzzleGuide, { frontmatter as SlidingPuzzleFrontmatter } from '@/app/blog/content/sliding-puzzle-guide.mdx';
import ReactionTimeTestGuide, { frontmatter as ReactionTimeTestFrontmatter } from '@/app/blog/content/reaction-time-test-guide.mdx';
import MemoryGameGuide, { frontmatter as MemoryGameFrontmatter } from '@/app/blog/content/memory-game-guide.mdx';
import NumberMemoryTestGuide, { frontmatter as NumberMemoryTestFrontmatter } from '@/app/blog/content/number-memory-test-guide.mdx';
import SequenceMemoryTestGuide, { frontmatter as SequenceMemoryTestFrontmatter } from '@/app/blog/content/sequence-memory-test-guide.mdx';
import ChimpTestGuide, { frontmatter as ChimpTestFrontmatter } from '@/app/blog/content/chimp-test-guide.mdx';
import VerbalMemoryTestGuide, { frontmatter as VerbalMemoryTestFrontmatter } from '@/app/blog/content/verbal-memory-test-guide.mdx';
import VisualMemoryTestGuide, { frontmatter as VisualMemoryTestFrontmatter } from '@/app/blog/content/visual-memory-test-guide.mdx';
import WordMemoryTestGuide, { frontmatter as WordMemoryTestFrontmatter } from '@/app/blog/content/word-memory-test-guide.mdx';

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
    },
    'jigsaw-puzzle-guide': {
        title: JigsawPuzzleFrontmatter.title,
        description: JigsawPuzzleFrontmatter.description,
        date: '2024-08-08',
    },
    'sliding-puzzle-guide': {
        title: SlidingPuzzleFrontmatter.title,
        description: SlidingPuzzleFrontmatter.description,
        date: '2024-08-09',
    },
    'reaction-time-test-guide': {
        title: ReactionTimeTestFrontmatter.title,
        description: ReactionTimeTestFrontmatter.description,
        date: '2024-08-10',
    },
    'memory-game-guide': {
        title: MemoryGameFrontmatter.title,
        description: MemoryGameFrontmatter.description,
        date: '2024-08-11',
    },
    'number-memory-test-guide': {
        title: NumberMemoryTestFrontmatter.title,
        description: NumberMemoryTestFrontmatter.description,
        date: '2024-08-12',
    },
    'sequence-memory-test-guide': {
        title: SequenceMemoryTestFrontmatter.title,
        description: SequenceMemoryTestFrontmatter.description,
        date: '2024-08-13',
    },
    'chimp-test-guide': {
        title: ChimpTestFrontmatter.title,
        description: ChimpTestFrontmatter.description,
        date: '2024-08-14',
    },
    'verbal-memory-test-guide': {
        title: VerbalMemoryTestFrontmatter.title,
        description: VerbalMemoryTestFrontmatter.description,
        date: '2024-08-15',
    },
    'visual-memory-test-guide': {
        title: VisualMemoryTestFrontmatter.title,
        description: VisualMemoryTestFrontmatter.description,
        date: '2024-08-16',
    },
    'word-memory-test-guide': {
        title: WordMemoryTestFrontmatter.title,
        description: WordMemoryTestFrontmatter.description,
        date: '2024-08-17',
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
    {
        slug: 'jigsaw-puzzle-guide',
        title: postMetas['jigsaw-puzzle-guide'].title,
        description: postMetas['jigsaw-puzzle-guide'].description,
        date: postMetas['jigsaw-puzzle-guide'].date,
        content: JigsawPuzzleGuide,
    },
    {
        slug: 'sliding-puzzle-guide',
        title: postMetas['sliding-puzzle-guide'].title,
        description: postMetas['sliding-puzzle-guide'].description,
        date: postMetas['sliding-puzzle-guide'].date,
        content: SlidingPuzzleGuide,
    },
    {
        slug: 'reaction-time-test-guide',
        title: postMetas['reaction-time-test-guide'].title,
        description: postMetas['reaction-time-test-guide'].description,
        date: postMetas['reaction-time-test-guide'].date,
        content: ReactionTimeTestGuide,
    },
    {
        slug: 'memory-game-guide',
        title: postMetas['memory-game-guide'].title,
        description: postMetas['memory-game-guide'].description,
        date: postMetas['memory-game-guide'].date,
        content: MemoryGameGuide,
    },
    {
        slug: 'number-memory-test-guide',
        title: postMetas['number-memory-test-guide'].title,
        description: postMetas['number-memory-test-guide'].description,
        date: postMetas['number-memory-test-guide'].date,
        content: NumberMemoryTestGuide,
    },
    {
        slug: 'sequence-memory-test-guide',
        title: postMetas['sequence-memory-test-guide'].title,
        description: postMetas['sequence-memory-test-guide'].description,
        date: postMetas['sequence-memory-test-guide'].date,
        content: SequenceMemoryTestGuide,
    },
    {
        slug: 'chimp-test-guide',
        title: postMetas['chimp-test-guide'].title,
        description: postMetas['chimp-test-guide'].description,
        date: postMetas['chimp-test-guide'].date,
        content: ChimpTestGuide,
    },
    {
        slug: 'verbal-memory-test-guide',
        title: postMetas['verbal-memory-test-guide'].title,
        description: postMetas['verbal-memory-test-guide'].description,
        date: postMetas['verbal-memory-test-guide'].date,
        content: VerbalMemoryTestGuide,
    },
    {
        slug: 'visual-memory-test-guide',
        title: postMetas['visual-memory-test-guide'].title,
        description: postMetas['visual-memory-test-guide'].description,
        date: postMetas['visual-memory-test-guide'].date,
        content: VisualMemoryTestGuide,
    },
    {
        slug: 'word-memory-test-guide',
        title: postMetas['word-memory-test-guide'].title,
        description: postMetas['word-memory-test-guide'].description,
        date: postMetas['word-memory-test-guide'].date,
        content: WordMemoryTestGuide,
    },
];
