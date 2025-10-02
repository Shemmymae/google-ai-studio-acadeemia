import React, { useEffect, useState } from 'react';
import LandingLayout from '../components/LandingLayout';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';

const PageHero = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="bg-secondary dark:bg-gray-800 py-16">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-text-primary dark:text-gray-100">{title}</h1>
            <p className="mt-2 text-lg text-text-secondary dark:text-gray-300 max-w-3xl mx-auto">{subtitle}</p>
        </div>
    </div>
);

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featured_image: string;
  author_name: string;
  published_at: string;
  views_count: number;
}

const BlogCard = ({ post }: { post: BlogPost }) => (
    <Link to={`/blog/${post.slug}`} className="block group bg-card dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        {post.featured_image && <img src={post.featured_image} alt={post.title} className="w-full h-48 object-cover" />}
        <div className="p-6">
            <div className="flex items-center text-sm text-text-secondary dark:text-gray-400 mb-3">
                <span>{post.author_name}</span>
                <span className="mx-2">•</span>
                <span>{new Date(post.published_at).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span>{post.views_count.toLocaleString()} views</span>
            </div>
            <h3 className="text-xl font-bold text-text-primary dark:text-gray-100 mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
            <p className="text-text-secondary dark:text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
            <span className="font-semibold text-primary">Read More &rarr;</span>
        </div>
    </Link>
);

const BlogListPage = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        fetchBlogData();
    }, [selectedCategory]);

    const fetchBlogData = async () => {
        try {
            let query = supabase
                .from('blog_posts')
                .select('*')
                .eq('status', 'published')
                .order('published_at', { ascending: false });

            if (selectedCategory) {
                const { data: postCategories } = await supabase
                    .from('blog_post_categories')
                    .select('post_id')
                    .eq('category_id', selectedCategory);

                const postIds = postCategories?.map(pc => pc.post_id) || [];
                if (postIds.length > 0) {
                    query = query.in('id', postIds);
                } else {
                    setPosts([]);
                    setLoading(false);
                    return;
                }
            }

            const { data: postsData } = await query;
            setPosts(postsData || []);

            const { data: categoriesData } = await supabase
                .from('blog_categories')
                .select('*')
                .order('name');
            setCategories(categoriesData || []);

        } catch (error) {
            console.error('Error fetching blog data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <LandingLayout>
            <PageHero
                title="Acadeemia Insights"
                subtitle="Your source for the latest trends, tips, and best practices in school management and educational technology."
            />
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="mb-8 flex flex-wrap gap-3">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-4 py-2 rounded-full transition-colors ${
                                selectedCategory === null
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-text-primary dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                        >
                            All Posts
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-full transition-colors ${
                                    selectedCategory === category.id
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 text-text-primary dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                                <p className="mt-4 text-text-secondary">Loading posts...</p>
                            </div>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-text-secondary dark:text-gray-400">No posts found.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map(post => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </LandingLayout>
    );
};

export default BlogListPage;
