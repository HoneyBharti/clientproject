'use client';
import React, { useEffect, useMemo, useState, Suspense } from 'react';
import Link from 'next/link';
import { NavHeader } from '@/components/layout/page-header';
import { AppFooter } from '@/components/layout/page-footer';
import { BookOpen, Search, ArrowRight, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { allPosts } from '@/lib/blog-posts';
import { API_BASE_URL } from '@/lib/api-base';

type PublicPost = {
    title: string;
    path: string;
    category: string;
    country?: string;
    excerpt?: string;
    featured?: boolean;
    image?: string;
    imageHint?: string;
    slug: string;
    source: 'static' | 'db';
};

const getSlugFromPath = (path: string) => {
    const sanitized = path.split('?')[0].split('#')[0];
    const parts = sanitized.split('/').filter(Boolean);
    return parts[parts.length - 1] || '';
};

const createPlaceholderImage = (title: string) =>
    `https://placehold.co/600x400/e2e8f0/0f172a?text=${encodeURIComponent(title.slice(0, 24) || 'Blog')}`;

const stripHtml = (value: string) =>
    value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

const buildStaticPosts = (): PublicPost[] =>
    allPosts
        .map((post) => ({
            ...post,
            slug: getSlugFromPath(post.path),
            source: 'static' as const,
        }))
        .filter((post) => Boolean(post.slug));

const mergePosts = (staticPosts: PublicPost[], dbPosts: PublicPost[]) => {
    const merged = new Map<string, PublicPost>();
    staticPosts.forEach((post) => merged.set(post.slug, post));
    dbPosts.forEach((post) => {
        const existing = merged.get(post.slug);
        if (existing) {
            merged.set(post.slug, {
                ...existing,
                ...post,
                path: existing.path || post.path,
                featured: existing.featured ?? post.featured,
                imageHint: existing.imageHint ?? post.imageHint,
                source: post.source,
            });
            return;
        }
        merged.set(post.slug, post);
    });
    return Array.from(merged.values());
};

function BlogContent() {
    const [searchTerm, setSearchTerm] = useState('');
    const [dbPosts, setDbPosts] = useState<PublicPost[]>([]);
    const [postsError, setPostsError] = useState('');
    const searchParams = useSearchParams();

    const topicFilter = searchParams.get('topic');
    const countryFilter = searchParams.get('country');

    const staticPosts = useMemo(() => buildStaticPosts(), []);
    const mergedPosts = useMemo(() => mergePosts(staticPosts, dbPosts), [staticPosts, dbPosts]);

    useEffect(() => {
        let isMounted = true;
        const loadBlogs = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/blogs?status=published&limit=200`, { cache: 'no-store' });
                const data = await response.json().catch(() => null);
                if (!response.ok || !data?.blogs) {
                    throw new Error(data?.message || 'Unable to load blogs.');
                }

                const mapped: PublicPost[] = data.blogs
                    .map((blog: any) => {
                        const slug = String(blog.slug || '').trim();
                        if (!slug) return null;
                        const excerptSource = blog.excerpt || stripHtml(blog.content || '');
                        const excerpt = excerptSource ? excerptSource.slice(0, 180) : '';
                        return {
                            title: blog.title || 'Untitled Blog',
                            path: `/blog/${slug}`,
                            category: blog.category || 'General',
                            country: blog.country || 'Global',
                            excerpt,
                            featured: false,
                            image: blog.featuredImage || createPlaceholderImage(blog.title || 'Blog'),
                            imageHint: 'legal blog',
                            slug,
                            source: 'db',
                        };
                    })
                    .filter((post: PublicPost | null): post is PublicPost => Boolean(post));

                if (isMounted) {
                    setDbPosts(mapped);
                    setPostsError('');
                }
            } catch (error) {
                if (isMounted) {
                    setDbPosts([]);
                    setPostsError(error instanceof Error ? error.message : 'Unable to load blogs.');
                }
            }
        };

        loadBlogs();
        return () => {
            isMounted = false;
        };
    }, []);

    const categories = useMemo(
        () => [...new Set(mergedPosts.filter(p => p.category !== 'Pillar').map(post => post.category))],
        [mergedPosts]
    );
    const countries = useMemo(
        () => [...new Set(mergedPosts.map(post => post.country))]
            .filter(Boolean)
            .map(countryName => {
                let flag = '';
                if (countryName === 'USA') flag = '🇺🇸';
                if (countryName === 'Australia') flag = '🇦🇺';
                if (countryName === 'UAE') flag = '🇦🇪';
                if (countryName === 'UK') flag = '🇬🇧';
                if (countryName === 'India') flag = '🇮🇳';
                if (countryName === 'Netherlands') flag = '🇳🇱';
                if (countryName === 'Saudi Arabia') flag = '🇸🇦';
                if (countryName === 'Singapore') flag = '🇸🇬';
                if (countryName === 'Global') flag = '🌍';
                return { name: countryName, flag };
            }),
        [mergedPosts]
    );

    const featuredPosts = mergedPosts.filter(p => p.featured && !topicFilter && !countryFilter);

    const filteredPosts = mergedPosts.filter(post => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = searchTerm
            ? post.title.toLowerCase().includes(searchLower) ||
              (post.excerpt && post.excerpt.toLowerCase().includes(searchLower)) ||
              post.category.toLowerCase().includes(searchLower)
            : true;

        const matchesTopic = topicFilter
            ? post.category.toLowerCase() === topicFilter.toLowerCase()
            : true;
        
        const matchesCountry = countryFilter
            ? post.country?.toLowerCase() === countryFilter.toLowerCase()
            : true;

        return matchesSearch && matchesTopic && matchesCountry;
    });

    const isAnyFilterActive = topicFilter || countryFilter;

    let filterTitle = 'Filtered Articles';
    if (topicFilter && countryFilter) {
        filterTitle = `Showing articles for "${topicFilter}" in ${countryFilter}`;
    } else if (topicFilter) {
        filterTitle = `Showing articles for topic: "${topicFilter}"`;
    } else if (countryFilter) {
        filterTitle = `Showing articles for ${countryFilter}`;
    }
    
    return (
        <div className="min-h-screen bg-white font-inter">
            <NavHeader onLoginClick={() => {}} onSignupClick={() => {}} />

            <section className="py-20 bg-gray-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
                        Founder Resources
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Your expert guide to international incorporation, tax, and compliance.
                    </p>
                    <div className="mt-8 relative max-w-2xl mx-auto">
                        <Input 
                            type="search" 
                            placeholder="Search articles (e.g., 'Delaware C-Corp', 'VAT', 'SEIS')..." 
                            className="pl-12 h-14 text-lg rounded-full shadow-lg"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                    </div>
                </div>
            </section>

            <main className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Topic</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {categories.map(category => (
                                <Link href={`/blog?topic=${encodeURIComponent(category)}`} key={category} className="block bg-gray-50 p-6 rounded-xl border border-gray-200 text-center hover:bg-white hover:shadow-md transition">
                                    <h3 className="font-semibold text-gray-800">{category}</h3>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Country</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {countries.map(country => (
                                <Link href={`/blog?country=${country.name}`} key={country.name} className="flex items-center space-x-3 bg-gray-50 p-4 rounded-xl border border-gray-200 hover:bg-white hover:shadow-md transition">
                                    <span className="text-3xl">{country.flag}</span>
                                    <h3 className="font-bold text-gray-800 text-lg">{country.name}</h3>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {isAnyFilterActive ? (
                        <div className="mb-16">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900">{filterTitle}</h2>
                                <Button asChild variant="link" className="mt-2">
                                    <Link href="/blog">Clear filters and view all articles</Link>
                                </Button>
                            </div>
                        </div>
                    ) : (
                         <div className="mb-20">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Pillar Content Guides</h2>
                            <p className="text-lg text-gray-600 max-w-3xl mb-8">Explore our comprehensive guides covering key aspects of US business compliance. These pillar pages act as a starting point to dive deep into specific topics.</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {featuredPosts.map(post => (
                                    <Link href={post.path} key={post.path} className="group block bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                                        <div className="h-48 bg-gray-200 w-full overflow-hidden">
                                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-ai-hint={post.imageHint} />
                                        </div>
                                        <div className="p-6">
                                            <p className="text-sm text-blue-600 font-semibold mb-1">{post.category}</p>
                                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700">{post.title}</h3>
                                            <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
                                            <span className="text-blue-600 font-semibold flex items-center">Read The Guide <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"/></span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                    
                     <div className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">All Articles</h2>
                        {filteredPosts.length > 0 ? (
                            <div className="space-y-4">
                                {filteredPosts.map(post => (
                                    <Link href={post.path} key={post.path} className="block bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition">
                                        <h3 className="font-semibold text-blue-600">{post.title}</h3>
                                        <p className="text-sm text-gray-500">{post.excerpt}</p>
                                        <span className="text-xs text-gray-400 mt-1 inline-block">{post.category} • {post.country}</span>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-10">
                                {postsError || 'No articles found. Try removing some filters or searching for a different term.'}
                            </p>
                        )}
                    </div>
                </div>
            </main>

            <AppFooter />
        </div>
    );
}

export default function BlogPage() {
  return (
    <Suspense fallback={
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
    }>
        <BlogContent />
    </Suspense>
  );
}
