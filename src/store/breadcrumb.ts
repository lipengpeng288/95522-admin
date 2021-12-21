const breadcrumbModule = {
    namespace: true,
    state: {
        breadcrumbList: ['123', '456'],
    },
    actions: {

    },
    mutations: {
        changeBreadcrumbList(state:any, val: string[]) {
            // console.log(val);
            state.breadcrumbList = val;
        }
    },
    getters: {
        getBreadcrumbList(state: any) {
            console.log('======1======');
            return state.breadcrumbList;
        }
    }
}

export default breadcrumbModule