import type { MDXComponents } from 'mdx/types'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '2rem', marginBottom: '1rem' }}>{children}</h2>,
    h3: ({ children }) => <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem' }}>{children}</h3>,
    p: ({ children }) => <p style={{ lineHeight: '1.6', marginBottom: '1rem' }}>{children}</p>,
    ul: ({ children }) => <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginBottom: '1rem' }}>{children}</ul>,
    li: ({ children }) => <li style={{ marginBottom: '0.5rem' }}>{children}</li>,
    a: ({ href, children }) => <a href={href} style={{ color: 'hsl(var(--primary))', textDecoration: 'underline' }}>{children}</a>,
    ...components,
  }
}
