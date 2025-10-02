import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { supabase } from '../../supabase';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  created_at: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

const BlogCategoriesTagsPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'categories' | 'tags'>('categories');

  const [categoryModal, setCategoryModal] = useState<{ mode: 'add' | 'edit'; data?: Category } | null>(null);
  const [tagModal, setTagModal] = useState<{ mode: 'add' | 'edit'; data?: Tag } | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ type: 'category' | 'tag'; id: string } | null>(null);

  const [categoryForm, setCategoryForm] = useState({ name: '', slug: '', description: '' });
  const [tagForm, setTagForm] = useState({ name: '', slug: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesRes, tagsRes] = await Promise.all([
        supabase.from('blog_categories').select('*').order('name'),
        supabase.from('blog_tags').select('*').order('name')
      ]);

      if (categoriesRes.data) setCategories(categoriesRes.data);
      if (tagsRes.data) setTags(tagsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryForm.name) {
      alert('Category name is required');
      return;
    }

    try {
      if (categoryModal?.mode === 'edit' && categoryModal.data) {
        const { error } = await supabase
          .from('blog_categories')
          .update({ ...categoryForm, updated_at: new Date().toISOString() })
          .eq('id', categoryModal.data.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_categories')
          .insert([categoryForm]);

        if (error) throw error;
      }

      setCategoryModal(null);
      setCategoryForm({ name: '', slug: '', description: '' });
      fetchData();
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category');
    }
  };

  const handleTagSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tagForm.name) {
      alert('Tag name is required');
      return;
    }

    try {
      if (tagModal?.mode === 'edit' && tagModal.data) {
        const { error } = await supabase
          .from('blog_tags')
          .update(tagForm)
          .eq('id', tagModal.data.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blog_tags')
          .insert([tagForm]);

        if (error) throw error;
      }

      setTagModal(null);
      setTagForm({ name: '', slug: '' });
      fetchData();
    } catch (error) {
      console.error('Error saving tag:', error);
      alert('Failed to save tag');
    }
  };

  const handleDelete = async () => {
    if (!deleteModal) return;

    try {
      const table = deleteModal.type === 'category' ? 'blog_categories' : 'blog_tags';
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', deleteModal.id);

      if (error) throw error;
      setDeleteModal(null);
      fetchData();
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Failed to delete item');
    }
  };

  const openCategoryModal = (mode: 'add' | 'edit', category?: Category) => {
    if (mode === 'edit' && category) {
      setCategoryForm({ name: category.name, slug: category.slug, description: category.description });
      setCategoryModal({ mode, data: category });
    } else {
      setCategoryForm({ name: '', slug: '', description: '' });
      setCategoryModal({ mode });
    }
  };

  const openTagModal = (mode: 'add' | 'edit', tag?: Tag) => {
    if (mode === 'edit' && tag) {
      setTagForm({ name: tag.name, slug: tag.slug });
      setTagModal({ mode, data: tag });
    } else {
      setTagForm({ name: '', slug: '' });
      setTagModal({ mode });
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Categories & Tags">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-text-secondary">Loading...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Blog Categories & Tags">
      <div className="bg-card dark:bg-gray-800 rounded-lg shadow-md">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('categories')}
              className={`py-4 border-b-2 font-medium text-sm ${
                activeTab === 'categories'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-secondary hover:text-text-primary dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              Categories ({categories.length})
            </button>
            <button
              onClick={() => setActiveTab('tags')}
              className={`py-4 border-b-2 font-medium text-sm ${
                activeTab === 'tags'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-secondary hover:text-text-primary dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              Tags ({tags.length})
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'categories' ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200">Blog Categories</h3>
                <button
                  onClick={() => openCategoryModal('add')}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Category
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary dark:text-gray-300 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary dark:text-gray-300 uppercase tracking-wider">Slug</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary dark:text-gray-300 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {categories.map((category) => (
                      <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 text-sm font-medium text-text-primary dark:text-gray-200">{category.name}</td>
                        <td className="px-6 py-4 text-sm text-text-secondary dark:text-gray-400">{category.slug}</td>
                        <td className="px-6 py-4 text-sm text-text-secondary dark:text-gray-400 max-w-md truncate">{category.description}</td>
                        <td className="px-6 py-4 text-right text-sm font-medium space-x-3">
                          <button
                            onClick={() => openCategoryModal('edit', category)}
                            className="text-primary hover:text-primary/80"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteModal({ type: 'category', id: category.id })}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200">Blog Tags</h3>
                <button
                  onClick={() => openTagModal('add')}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Tag
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tags.map((tag) => (
                  <div key={tag.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-text-primary dark:text-gray-200">{tag.name}</h4>
                      <p className="text-sm text-text-secondary dark:text-gray-400">{tag.slug}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openTagModal('edit', tag)}
                        className="text-primary hover:text-primary/80"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setDeleteModal({ type: 'tag', id: tag.id })}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {categoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200 mb-4">
              {categoryModal.mode === 'add' ? 'Add Category' : 'Edit Category'}
            </h3>
            <form onSubmit={handleCategorySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-gray-200 mb-2">Name *</label>
                <input
                  type="text"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-text-primary dark:text-gray-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-gray-200 mb-2">Slug *</label>
                <input
                  type="text"
                  value={categoryForm.slug}
                  onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-text-primary dark:text-gray-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-gray-200 mb-2">Description</label>
                <textarea
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-text-primary dark:text-gray-200"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setCategoryModal(null)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-text-primary dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  {categoryModal.mode === 'add' ? 'Add' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {tagModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200 mb-4">
              {tagModal.mode === 'add' ? 'Add Tag' : 'Edit Tag'}
            </h3>
            <form onSubmit={handleTagSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-gray-200 mb-2">Name *</label>
                <input
                  type="text"
                  value={tagForm.name}
                  onChange={(e) => setTagForm({ ...tagForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-text-primary dark:text-gray-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-gray-200 mb-2">Slug *</label>
                <input
                  type="text"
                  value={tagForm.slug}
                  onChange={(e) => setTagForm({ ...tagForm, slug: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-text-primary dark:text-gray-200"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setTagModal(null)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-text-primary dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  {tagModal.mode === 'add' ? 'Add' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-text-primary dark:text-gray-200 mb-4">Confirm Delete</h3>
            <p className="text-text-secondary dark:text-gray-400 mb-6">
              Are you sure you want to delete this {deleteModal.type}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteModal(null)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-text-primary dark:text-gray-200 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default BlogCategoriesTagsPage;
