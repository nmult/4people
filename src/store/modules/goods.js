const fetchConfig = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

export default {

    actions: {
        async getProductsData({commit}) {
            try {
                const res = await fetch('./data/data.json', fetchConfig);
                const data = await res.json();

                commit('UPDATE_PRODUCTS_DATA', data.Value.Goods);
            } catch (e) {
                console.log(e);
            }
        },

        async getProductsNames({commit}) {
            try {
                const res = await fetch('./data/names.json', fetchConfig);
                const data = await res.json();

                commit('UPDATE_PRODUCTS_NAMES', data);
            } catch (e) {
                console.log(e);
            }
        },
    },

    mutations: {
        UPDATE_PRODUCTS_DATA(state, productsData) {
            state.productsData = productsData;
        },
        UPDATE_PRODUCTS_NAMES(state, productsNames) {
            state.productsNames = productsNames;
        },
        UPDATE_EXCHANGE_RATE(state, rate) {
            state.exchangeRate = rate;
        },
    },

    state: {
        productsData: [],
        productsNames: [],
        exchangeRate: '',
    },

    getters: {
        groups: state => {
            const productsData = state?.productsData || [];
            const productsNames = state?.productsNames || [];
            const rate = state.exchangeRate || 1;
            const groups = [];

            if (productsData.length && Object.keys(productsNames).length && rate) {

                for (const groupId in productsNames) {
                    if (Object.prototype.hasOwnProperty.call(productsNames, groupId)) {
                        groups.push({
                            id: groupId,
                            name: productsNames[groupId].G,
                            products: productsData.filter((product) => {
                                if (product.G == groupId) {
                                    return product.T
                                }
                            }).map((product) => product.T),
                        });
                    }
                }

                return groups;
            }
        },

        products: state => {
            const productsData = state.productsData || [];
            const productsNames = state.productsNames;
            const rate = state.exchangeRate;
            let products = [];

            if (productsData.length && Object.keys(productsNames).length && rate) {
                products = productsData.reduce((acc, product) => {
                    const price = parseFloat((product.C * rate).toFixed(2), 10);

                    acc[product.T] = acc[product.T] || [];

                    acc[product.T] = {
                        name: productsNames[product.G].B[product.T].N,
                        availableItems: product.P,
                        price,
                    };

                    return acc;
                }, {});
            }

            return products;
        },

        exchangeRate: state => {
            return state.exchangeRate;
        }
    }
}