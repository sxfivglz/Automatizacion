const app = Vue.createApp({
    data() {
        return {
            products: [],
            newProduct: {
                name: '',
                price: 0,
            },
            message: "",
            show : false,
            errorMessage: false,
            loader: true
        }
    }, 

    methods:{
        async sleep(time)
        {
            return new Promise((resolve) => setTimeout(resolve, time));
        },
        async hideLoader(){
            await this.sleep(2000);
            this.loader = false;
        }
    },
    mounted(){
        this.hideLoader();
    }
    }).mount('#app')