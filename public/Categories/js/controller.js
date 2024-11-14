const app = Vue.createApp({
    data() {
        return {
            loader: true
        }
    },
    methods: {
        async sleep(time) {
            return new Promise((resolve) => setTimeout(resolve, time));
        },
        async hideLoader() {
            await this.sleep(3000); // Simulate a delay
            this.loader = false;
        }
    }
});

window.onload = function() {
    const vm = app.mount('#app');
    vm.hideLoader();
};