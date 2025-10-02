import React, { useEffect, useState } from 'react';
import LandingLayout from '../components/LandingLayout';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabase';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  featured_image: string;
  author_name: string;
  published_at: string;
  views_count: number;
  meta_description: string;
}

interface Comment {
  id: string;
  author_name: string;
  content: string;
  created_at: string;
}

const BlogPostPage = () => {
    const { slug } = useParams();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [commentForm, setCommentForm] = useState({ name: '', email: '', content: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (slug) {
            fetchPost();
        }
    }, [slug]);

    const fetchPost = async () => {
        try {
            const { data: postData, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('slug', slug)
                .eq('status', 'published')
                .single();

            if (error) throw error;

            setPost(postData);

            await supabase
                .from('blog_posts')
                .update({ views_count: (postData.views_count || 0) + 1 })
                .eq('id', postData.id);

            const { data: commentsData } = await supabase
                .from('blog_comments')
                .select('*')
                .eq('post_id', postData.id)
                .eq('status', 'approved')
                .order('created_at', { ascending: false });

            setComments(commentsData || []);

            const { data: categoryLinks } = await supabase
                .from('blog_post_categories')
                .select('category_id')
                .eq('post_id', postData.id)
                .limit(1);

            if (categoryLinks && categoryLinks.length > 0) {
                const { data: relatedCategoryPosts } = await supabase
                    .from('blog_post_categories')
                    .select('post_id')
                    .eq('category_id', categoryLinks[0].category_id)
                    .neq('post_id', postData.id)
                    .limit(3);

                if (relatedCategoryPosts && relatedCategoryPosts.length > 0) {
                    const postIds = relatedCategoryPosts.map(p => p.post_id);
                    const { data: related } = await supabase
                        .from('blog_posts')
                        .select('id, title, slug, featured_image, excerpt')
                        .in('id', postIds)
                        .eq('status', 'published')
                        .limit(3);

                    setRelatedPosts(related || []);
                }
            }

        } catch (error) {
            console.error('Error fetching post:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!commentForm.name || !commentForm.email || !commentForm.content) {
            alert('Please fill in all fields');
            return;
        }

        if (!post) return;

        setSubmitting(true);

        try {
            const { error } = await supabase
                .from('blog_comments')
                .insert([{
                    post_id: post.id,
                    author_name: commentForm.name,
                    author_email: commentForm.email,
                    content: commentForm.content,
                    status: 'pending'
                }]);

            if (error) throw error;

            alert('Comment submitted successfully! It will appear after moderation.');
            setCommentForm({ name: '', email: '', content: '' });

        } catch (error) {
            console.error('Error submitting comment:', error);
            alert('Failed to submit comment');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <LandingLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-text-secondary">Loading post...</p>
                    </div>
                </div>
            </LandingLayout>
        );
    }

    if (!post) {
        return (
            <LandingLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-text-primary mb-4">Post not found</h2>
                        <Link to="/blog" className="text-primary hover:underline">← Back to Blog</Link>
                    </div>
                </div>
            </LandingLayout>
        );
    }

    return (
        <LandingLayout>
            <div className="py-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <article className="mb-16">
                        <header className="mb-12">
                            <Link to="/blog" className="text-primary hover:underline mb-4 block inline-flex items-center">
                                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Blog
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary dark:text-gray-100 leading-tight mb-6">
                                {post.title}
                            </h1>
                            <div className="flex items-center text-text-secondary dark:text-gray-400 text-sm">
                                <span className="font-medium">{post.author_name}</span>
                                <span className="mx-2">•</span>
                                <span>{new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                <span className="mx-2">•</span>
                                <span>{post.views_count.toLocaleString()} views</span>
                            </div>
                        </header>

                        {post.featured_image && (
                            <figure className="mb-12">
                                <img src={post.featured_image} alt={post.title} className="w-full rounded-lg shadow-md" />
                            </figure>
                        )}

                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }} />
                        </div>
                    </article>

                    {relatedPosts.length > 0 && (
                        <div className="mb-16">
                            <h2 className="text-2xl font-bold text-text-primary dark:text-gray-100 mb-6">Related Posts</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {relatedPosts.map((related) => (
                                    <Link
                                        key={related.id}
                                        to={`/blog/${related.slug}`}
                                        className="block group bg-card dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                                    >
                                        {related.featured_image && (
                                            <img src={related.featured_image} alt={related.title} className="w-full h-32 object-cover" />
                                        )}
                                        <div className="p-4">
                                            <h3 className="font-semibold text-text-primary dark:text-gray-200 group-hover:text-primary transition-colors">
                                                {related.title}
                                            </h3>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="bg-card dark:bg-gray-800 rounded-lg p-8 mb-8">
                        <h2 className="text-2xl font-bold text-text-primary dark:text-gray-100 mb-6">
                            Comments ({comments.length})
                        </h2>

                        {comments.length > 0 && (
                            <div className="space-y-6 mb-8">
                                {comments.map((comment) => (
                                    <div key={comment.id} className="border-l-4 border-primary pl-4">
                                        <div className="flex items-center mb-2">
                                            <span className="font-semibold text-text-primary dark:text-gray-200">{comment.author_name}</span>
                                            <span className="mx-2 text-text-secondary dark:text-gray-400">•</span>
                                            <span className="text-sm text-text-secondary dark:text-gray-400">
                                                {new Date(comment.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-text-primary dark:text-gray-300">{comment.content}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
                            <h3 className="text-xl font-semibold text-text-primary dark:text-gray-100 mb-4">Leave a Comment</h3>
                            <form onSubmit={handleCommentSubmit} className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-text-primary dark:text-gray-200 mb-2">
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={commentForm.name}
                                            onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-text-primary dark:text-gray-200"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-text-primary dark:text-gray-200 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            value={commentForm.email}
                                            onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-text-primary dark:text-gray-200"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-text-primary dark:text-gray-200 mb-2">
                                        Comment *
                                    </label>
                                    <textarea
                                        value={commentForm.content}
                                        onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-text-primary dark:text-gray-200"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? 'Submitting...' : 'Submit Comment'}
                                </button>
                                <p className="text-sm text-text-secondary dark:text-gray-400">
                                    Your comment will be published after moderation.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
};

export default BlogPostPage;
