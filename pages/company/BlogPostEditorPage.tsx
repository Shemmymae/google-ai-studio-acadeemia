import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import RichTextEditor from '../../components/RichTextEditor';
import { supabase } from '../../supabase';

interface Category {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
}

const BlogPostEditorPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featured_image: '',
    author_name: 'Admin',
    status: 'draft',
    meta_description: '',
    meta_keywords: '',
    scheduled_at: '',
  });

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    fetchCategoriesAndTags();
    if (isEditMode) {
      fetchPost();
    }
  }, [id]);

  useEffect(() => {
    if (!isEditMode && formData.title && !formData.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, isEditMode]);

  const fetchCategoriesAndTags = async () => {
    try {
      const [categoriesRes, tagsRes] = await Promise.all([
        supabase.from('blog_categories').select('id, name').order('name'),
        supabase.from('blog_tags').select('id, name').order('name')
      ]);

      if (categoriesRes.data) setCategories(categoriesRes.data);
      if (tagsRes.data) setTags(tagsRes.data);
    } catch (error) {
      console.error('Error fetching categories and tags:', error);
    }
  };

  const fetchPost = async () => {
    if (!id) return;
    setLoading(true);

    try {
      const { data: post, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setFormData({
        title: post.title,
        slug: post.slug,
        content: post.content,
        excerpt: post.excerpt || '',
        featured_image: post.featured_image || '',
        author_name: post.author_name,
        status: post.status,
        meta_description: post.meta_description || '',
        meta_keywords: post.meta_keywords || '',
        scheduled_at: post.scheduled_at || '',
      });

      const { data: postCategories } = await supabase
        .from('blog_post_categories')
        .select('category_id')
        .eq('post_id', id);

      if (postCategories) {
        setSelectedCategories(postCategories.map(pc => pc.category_id));
      }

      const { data: postTags } = await supabase
        .from('blog_post_tags')
        .select('tag_id')
        .eq('post_id', id);

      if (postTags) {
        setSelectedTags(postTags.map(pt => pt.tag_id));
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      alert('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent, publishNow: boolean = false) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      alert('Title and content are required');
      return;
    }

    setSaving(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const postData: any = {
        ...formData,
        updated_at: new Date().toISOString(),
        author_id: user?.id || null,
      };

      if (publishNow) {
        postData.status = 'published';
        postData.published_at = new Date().toISOString();
      }

      let postId = id;

      if (isEditMode) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id);

        if (error) throw error;
      } else {
        postData.created_at = new Date().toISOString();
        if (publishNow) {
          postData.published_at = new Date().toISOString();
        }

        const { data, error } = await supabase
          .from('blog_posts')
          .insert([postData])
          .select()
          .single();

        if (error) throw error;
        postId = data.id;
      }

      await supabase.from('blog_post_categories').delete().eq('post_id', postId);
      if (selectedCategories.length > 0) {
        await supabase
          .from('blog_post_categories')
          .insert(selectedCategories.map(catId => ({ post_id: postId, category_id: catId })));
      }

      await supabase.from('blog_post_tags').delete().eq('post_id', postId);
      if (selectedTags.length > 0) {
        await supabase
          .from('blog_post_tags')
          .insert(selectedTags.map(tagId => ({ post_id: postId, tag_id: tagId })));
      }

      alert('Post saved successfully!');
      navigate('/company/blog-manager/posts');
    } catch (error: any) {
      console.error('Error saving post:', error);
      const errorMessage = error?.message || 'Unknown error occurred';
      alert(`Failed to save post: ${errorMessage}\n\nPlease check the console for more details.`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title={isEditMode ? 'Edit Post' : 'New Post'}>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-text-secondary">Loading post...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={isEditMode ? 'Edit Post' : 'Create New Post'}>
      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-gray-200 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-text-primary dark:text-gray-200"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-gray-200 mb-2">
                    Slug *
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-text-primary dark:text-gray-200"
                    required
                  />
                  <p className="text-xs text-text-secondary dark:text-gray-400 mt-1">
                    URL: /blog/{formData.slug || 'your-post-slug'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-gray-200 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-text-primary dark:text-gray-200"
                    placeholder="Short description for listings and SEO"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-gray-200 mb-2">
                    Content *
                  </label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
                    placeholder="Write your post content here..."
                  />
                  <p className="text-xs text-text-secondary dark:text-gray-400 mt-2">
                    Use the toolbar above to format your content with headings, bold text, links, images, and more.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200 mb-4">SEO Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-gray-200 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={formData.meta_description}
                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-text-primary dark:text-gray-200"
                    placeholder="Brief description for search engines (150-160 characters)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-gray-200 mb-2">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    value={formData.meta_keywords}
                    onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-text-primary dark:text-gray-200"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200 mb-4">Publish Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-gray-200 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author_name}
                    onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-text-primary dark:text-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary dark:text-gray-200 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-text-primary dark:text-gray-200"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                {formData.status === 'scheduled' && (
                  <div>
                    <label className="block text-sm font-medium text-text-primary dark:text-gray-200 mb-2">
                      Schedule Date
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.scheduled_at}
                      onChange={(e) => setFormData({ ...formData, scheduled_at: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-text-primary dark:text-gray-200"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200 mb-4">Featured Image</h3>
              <div>
                <input
                  type="text"
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-text-primary dark:text-gray-200"
                  placeholder="Image URL"
                />
                {formData.featured_image && (
                  <img src={formData.featured_image} alt="Preview" className="mt-3 w-full rounded-lg" />
                )}
              </div>
            </div>

            <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200 mb-4">Categories</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {categories.map((category) => (
                  <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories([...selectedCategories, category.id]);
                        } else {
                          setSelectedCategories(selectedCategories.filter(id => id !== category.id));
                        }
                      }}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-text-primary dark:text-gray-200">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200 mb-4">Tags</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {tags.map((tag) => (
                  <label key={tag.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTags([...selectedTags, tag.id]);
                        } else {
                          setSelectedTags(selectedTags.filter(id => id !== tag.id));
                        }
                      }}
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-text-primary dark:text-gray-200">{tag.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                disabled={saving}
                className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Publishing...' : 'Publish Now'}
              </button>
              <button
                type="submit"
                disabled={saving}
                className="w-full px-6 py-3 bg-gray-100 dark:bg-gray-700 text-text-primary dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Draft'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/company/blog-manager/posts')}
                className="w-full px-6 py-3 border border-gray-300 dark:border-gray-600 text-text-primary dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default BlogPostEditorPage;
