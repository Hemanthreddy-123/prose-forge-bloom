
import { BlogPost } from '../types/blog';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Modern Web Development',
    slug: 'getting-started-modern-web-development',
    excerpt: 'Learn the fundamentals of modern web development with React, TypeScript, and Tailwind CSS.',
    content: `# Getting Started with Modern Web Development

Modern web development has evolved significantly over the past few years. In this comprehensive guide, we'll explore the essential tools and technologies that every developer should know.

## Why Choose Modern Tools?

The web development landscape is constantly changing, and staying up-to-date with modern tools can significantly improve your productivity and the quality of your applications.

### Key Benefits:
- **Better Developer Experience**: Modern tools provide excellent debugging, hot reloading, and error handling
- **Improved Performance**: Advanced bundling and optimization techniques
- **Type Safety**: TypeScript helps catch errors at compile time
- **Component-Based Architecture**: Reusable components make development more efficient

## Essential Technologies

### React
React has become the de facto standard for building user interfaces. Its component-based architecture and virtual DOM make it perfect for building complex applications.

\`\`\`javascript
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}
\`\`\`

### TypeScript
TypeScript adds static typing to JavaScript, helping you catch errors early and improve code quality.

\`\`\`typescript
interface User {
  name: string;
  age: number;
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}!\`;
}
\`\`\`

### Tailwind CSS
Tailwind CSS is a utility-first CSS framework that allows you to build custom designs quickly.

## Getting Started

1. **Set up your development environment**
2. **Create your first React application**
3. **Add TypeScript support**
4. **Configure Tailwind CSS**
5. **Start building!**

The journey of learning modern web development is exciting and rewarding. Take it one step at a time, and don't be afraid to experiment with new technologies.`,
    author: 'Jane Smith',
    publishedDate: '2024-06-20',
    category: 'Web Development',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'JavaScript'],
    readTime: 8,
    featured: true
  },
  {
    id: '2',
    title: 'The Future of User Interface Design',
    slug: 'future-user-interface-design',
    excerpt: 'Explore emerging trends in UI design and how they will shape the future of digital experiences.',
    content: `# The Future of User Interface Design

User interface design is rapidly evolving, driven by new technologies and changing user expectations. Let's explore what the future holds for UI design.

## Emerging Trends

### Voice Interfaces
Voice user interfaces are becoming increasingly sophisticated, changing how users interact with applications.

### Augmented Reality
AR is opening new possibilities for immersive user experiences that blend digital and physical worlds.

### Micro-Interactions
Small animations and feedback mechanisms are becoming crucial for creating engaging user experiences.

## Design Principles for the Future

1. **Accessibility First**: Design for all users, regardless of abilities
2. **Performance Matters**: Fast, responsive interfaces are essential
3. **Context-Aware**: Interfaces that adapt to user context and preferences
4. **Minimalism**: Clean, focused designs that reduce cognitive load

The future of UI design is bright, with endless possibilities for creating more intuitive and engaging user experiences.`,
    author: 'Alex Johnson',
    publishedDate: '2024-06-18',
    category: 'Design',
    tags: ['UI Design', 'UX', 'Future Tech', 'Accessibility'],
    readTime: 6,
    featured: false
  },
  {
    id: '3',
    title: 'Building Scalable Applications with TypeScript',
    slug: 'building-scalable-applications-typescript',
    excerpt: 'Learn best practices for building large-scale applications using TypeScript and modern development patterns.',
    content: `# Building Scalable Applications with TypeScript

TypeScript has revolutionized how we build JavaScript applications. In this article, we'll explore best practices for creating scalable applications.

## Why TypeScript for Scale?

TypeScript provides several advantages when building large applications:

- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Self-Documenting Code**: Types serve as documentation
- **Easier Refactoring**: Confident code changes with type checking

## Best Practices

### 1. Use Strict Mode
Always enable TypeScript's strict mode for better type checking:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
\`\`\`

### 2. Define Clear Interfaces
Create well-defined interfaces for your data structures:

\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}
\`\`\`

### 3. Use Generic Types
Leverage generics for reusable, type-safe code:

\`\`\`typescript
function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  return fetch(url).then(response => response.json());
}
\`\`\`

## Architecture Patterns

Consider these patterns for scalable TypeScript applications:

- **Domain-Driven Design**: Organize code around business domains
- **Clean Architecture**: Separate concerns with clear boundaries
- **Dependency Injection**: Make components testable and maintainable

Building scalable applications is a journey, and TypeScript provides excellent tools to help you along the way.`,
    author: 'Sarah Wilson',
    publishedDate: '2024-06-15',
    category: 'Programming',
    tags: ['TypeScript', 'Architecture', 'Best Practices', 'Scalability'],
    readTime: 10,
    featured: true
  },
  {
    id: '4',
    title: 'CSS Grid vs Flexbox: When to Use What',
    slug: 'css-grid-vs-flexbox-when-to-use',
    excerpt: 'A comprehensive comparison of CSS Grid and Flexbox, helping you choose the right tool for your layouts.',
    content: `# CSS Grid vs Flexbox: When to Use What

CSS Grid and Flexbox are both powerful layout systems, but they serve different purposes. Let's explore when to use each one.

## CSS Grid: The Big Picture

CSS Grid is designed for two-dimensional layouts. It's perfect when you need to control both rows and columns.

### When to Use Grid:
- Complex layouts with multiple rows and columns
- When you need precise control over item placement
- Creating responsive layouts with media queries
- Building card-based layouts

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
\`\`\`

## Flexbox: The One-Dimensional Master

Flexbox excels at one-dimensional layouts, either in a row or column direction.

### When to Use Flexbox:
- Aligning items in a single direction
- Distributing space between items
- Creating flexible navigation bars
- Centering content vertically and horizontally

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

## Combining Both

The most powerful approach is to use Grid and Flexbox together:

- Use Grid for the overall page layout
- Use Flexbox for component-level alignment

## Practical Examples

### Grid for Page Layout:
\`\`\`css
.page-layout {
  display: grid;
  grid-template-areas: 
    "header header"
    "sidebar main"
    "footer footer";
}
\`\`\`

### Flexbox for Components:
\`\`\`css
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

Understanding when to use each tool will make you a more effective CSS developer.`,
    author: 'Mike Chen',
    publishedDate: '2024-06-12',
    category: 'CSS',
    tags: ['CSS', 'Grid', 'Flexbox', 'Layout'],
    readTime: 7,
    featured: false
  }
];

export const categories = [
  { id: '1', name: 'Web Development', slug: 'web-development', count: 1 },
  { id: '2', name: 'Design', slug: 'design', count: 1 },
  { id: '3', name: 'Programming', slug: 'programming', count: 1 },
  { id: '4', name: 'CSS', slug: 'css', count: 1 }
];
