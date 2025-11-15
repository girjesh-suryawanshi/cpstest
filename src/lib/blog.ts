import cpsTestPost from '@/app/blog/content/cps-test-ultimate-guide.mdx';

export interface Post {
    slug: string;
    title: string;
    description: string;
    date: string;
    content: React.ComponentType;
}

export const allPosts: Post[] = [
    {
        slug: 'cps-test-ultimate-guide',
        title: cpsTestPost.title,
        description: cpsTestPost.description,
        date: cpsTestPost.date,
        content: cpsTestPost.default,
    },
];

export const postMetas = {
    'cps-test-ultimate-guide': {
        title: cpsTestPost.title,
        description: cpsTestPost.description,
        date: cpsTestPost.date,
    }
}
