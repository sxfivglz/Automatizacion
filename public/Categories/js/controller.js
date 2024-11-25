const app = Vue.createApp({
    data() {
        return {
            categories: [],
            newCategory: {
                name: '',
                description: '',
            },
            editCategory: { id: null, name: '', description: '' },
            categoryToDelete: null,
            loader: true,
        };
    },
    methods: {
        async showCategories() {
            try {
                const response = await axios.get('/api/categories');
                this.categories = response.data; 
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                this.loader = false;
            }
        },
        async createCategory() {
            try {
                const response = await axios.post('/api/categories', this.newCategory);
                this.categories.push(response.data);
                this.newCategory = { name: '', description: '' };
            } catch (error) {
                if (error.response && error.response.data && error.response.data.errors) {
                    const errorMsg = error.response.data.errors[0].msg;
                    console.error('Error creating category:', errorMsg);
                } else {
                    console.error('Error creating category:', error.message);
                }
            }
        },
        async updateCategory() {
            try {
                const response = await axios.put(`/api/categories/${this.editCategory.id}`, this.editCategory);
                const index = this.categories.findIndex(cat => cat.id === this.editCategory.id);
                if (index !== -1) {
                    this.categories[index] = response.data;
                } else {
                    console.error('Category not found in local list');
                }
                this.editCategory = { id: null, name: '', description: '' };
                $('#editModal').modal('hide');
            } catch (error) {
                console.error('Error updating category:', error.response ? error.response.data : error.message);
            }
        },
        async deleteCategory() {
            try {
                if (!this.categoryToDelete || !this.categoryToDelete.id) {
                    console.error('No category selected for deletion');
                    return;
                }
                await axios.delete(`/api/categories/${this.categoryToDelete.id}`);
                this.categories = this.categories.filter(cat => cat.id !== this.categoryToDelete.id);
                this.categoryToDelete = null;
                $('#deleteModal').modal('hide');
            } catch (error) {
                console.error('Error deleting category:', error.response ? error.response.data : error.message);
            }
        },
        openEditModal(category) {
            this.editCategory = { ...category };
            $('#editModal').modal('show'); 
        },
        openDeleteModal(category) {
            this.categoryToDelete = { ...category };
            $('#deleteModal').modal('show'); 
        },
    },
    mounted() {
     
        this.showCategories();
    }
});

app.mount('#app');
