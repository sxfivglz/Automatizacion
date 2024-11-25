const app = Vue.createApp({
    data() {
        return {
            loader: true, 
            products: [],
            categories: [],
            category: null,
            newProduct: { name: '', price: '', stock: '', categoryId: '' },
            editProduct: { id: null, name: '', price: '', stock: '', category: '' },
            productToDelete: { id: null, name: '' }
        };
    },
    computed: {
        filteredCategories() {
            return this.categories.filter(category => category.id !== this.editProduct.category);
        }
    },
    methods: {
        async showProducts() {
            try {
                const response = await axios.get('/api/products');
                this.products = response.data.data;
                this.products_categories = response.data.categories;
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        async showCategories() {
            try {
                const response = await axios.get('/api/categories');
                this.categories = response.data;
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        },
        async createProduct() {
            try {
                const response = await axios.post('/api/products', this.newProduct);
                this.products.push(response.data);
                this.newProduct = { name: '', price: '', stock: '', categoryId: '' };
                await this.showProducts();
            } catch (error) {
                console.error('Error creating product:', error);
            }
        },
        async updateProduct() {
            try {
                if (!this.editProduct || !this.editProduct.id || !this.editProduct.category) {
                    throw new Error('editProduct is not properly defined');
                }

                const updatedProduct = {
                    ...this.editProduct,
                    categoryId: this.editProduct.category
                };

                await axios.put(`/api/products/${this.editProduct.id}`, updatedProduct);

                await this.showProducts();
                $('#editModal').modal('hide');
            } catch (error) {
                console.error('Error updating product:', error);
            }
        },
        openEditModal(product) {
            this.editProduct = { ...product };
            this.editProduct.category = product.Category.id;
            $('#editModal').modal('show');
        },
        openDeleteModal(product) {
            this.productToDelete = { ...product };
            $('#deleteModal').modal('show');
        },
        async deleteProduct() {
            try {
                await axios.delete(`/api/products/${this.productToDelete.id}`);
                this.products = this.products.filter(product => product.id !== this.productToDelete.id);
                $('#deleteModal').modal('hide');
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    },
    async mounted() {
        try {
            await Promise.all([this.showProducts(), this.showCategories()]);
        } catch (error) {
            console.error('Error initializing data:', error);
        } finally {
            this.loader = false;
        }
    }
});

app.mount('#app');
