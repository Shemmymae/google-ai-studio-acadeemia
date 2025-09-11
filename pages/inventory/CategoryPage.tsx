import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { getCategories, addCategory, deleteCategory, Category, getSchools, School } from '../../db';

// --- ICONS ---
const icons = {
    add: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    list: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>,
    save: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>,
    edit: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    delete: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
};

const AddCategoryForm = ({ onCategoryAdded }: { onCategoryAdded: () => void }) => {
    const [schools, setSchools] = useState<School[]>([]);
    const [loadingSchools, setLoadingSchools] = useState(true);

    useEffect(() => {
        const fetchSchools = async () => {
            setLoadingSchools(true);
            const schoolsData = await getSchools();
            setSchools(schoolsData);
            setLoadingSchools(false);
        };
        fetchSchools();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const newCategory: Omit<Category, 'id' | 'school_id'> = {
            school: formData.get('school') as string,
            name: formData.get('name') as string,
        };
        await addCategory(newCategory);
        onCategoryAdded();
        form.reset();
    };

    return (
        <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700">
            <h3 className="flex items-center text-lg font-semibold text-text-primary dark:text-gray-100 border-b-2 border-primary pb-2 mb-6">
                {icons.add} Add Category
            </h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="school" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        School <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <select id="school" name="school" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" disabled={loadingSchools}>
                           <option value="">{loadingSchools ? 'Loading...' : 'Select'}</option>
                            {schools.map(school => (
                                <option key={school.id} value={school.name}>
                                    {school.name}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Category Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                </div>
                <div className="flex justify-end pt-2">
                    <button type="submit" className="inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-hover disabled:opacity-50 transition-colors">
                        {icons.save} Save
                    </button>
                </div>
            </form>
        </div>
    );
};

const CategoryList = ({ categories, onCategoryDeleted }: { categories: Category[], onCategoryDeleted: () => void }) => {
    
    const handleDelete = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            await deleteCategory(id);
            onCategoryDeleted();
        }
    };
    
    return (
        <div className="bg-card dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700">
            <h3 className="flex items-center text-lg font-semibold text-text-primary dark:text-gray-100 border-b-2 border-primary pb-2 mb-6">
                {icons.list} Category List
            </h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                        <tr>
                            {['SI', 'School', 'Name', 'Action'].map(head => (
                                <th key={head} className="p-3 font-semibold text-sm text-text-secondary dark:text-gray-300 uppercase tracking-wider">{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                            <tr key={category.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                <td className="p-3 text-sm text-text-secondary dark:text-gray-400">{index + 1}</td>
                                <td className="p-3 text-sm text-text-primary dark:text-gray-200">{category.school}</td>
                                <td className="p-3 text-sm text-text-primary dark:text-gray-200 font-medium">{category.name}</td>
                                <td className="p-3">
                                    <div className="flex space-x-2">
                                        <button className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors" aria-label="Edit category">{icons.edit}</button>
                                        <button onClick={() => handleDelete(category.id)} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors" aria-label="Delete category">{icons.delete}</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


const CategoryPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        const data = await getCategories();
        setCategories(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return (
        <DashboardLayout title="Inventory">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <AddCategoryForm onCategoryAdded={fetchCategories} />
                </div>
                <div className="lg:col-span-2">
                    {loading ? (
                         <div className="text-center py-8 text-text-secondary dark:text-gray-400">Loading Categories...</div>
                    ) : (
                        <CategoryList categories={categories} onCategoryDeleted={fetchCategories} />
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CategoryPage;