const app = Vue.createApp({
    data() {
        return {
            products: [],
            categories: [],
            newProduct: {
                name: '',
                price: 0,
            },
            editProduct: { id: null, name: '', price: 0 },
            message: "",
            show : false,
            errorMessage: false,
            loader: true
        };
    }, 

    methods: {
        async sleep(time) {
            return new Promise((resolve) => setTimeout(resolve, time));
        },
        async hideLoader() {
            await this.sleep(2000);
            this.loader = false;
        },
        async showProducts() {
            try {
                const response = await axios.get('/api/products');
                this.products = response.data;
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        },
        updateProduct(product) {
            // Lógica para actualizar el producto
            console.log('Producto actualizado:', product);
        },
        deleteProduct(product) {
            // Lógica para eliminar el producto
            console.log('Producto eliminado:', product);
        },
        openEditModal(product) {
            this.editProduct = { ...product };
            $('#editModal').modal('show');
        },
        openDeleteModal(product) {
            this.editProduct = { ...product };
            $('#deleteModal').modal('show');
        },

    },
  
    mounted() {
        this.hideLoader();
    }
});

app.mount('#app');