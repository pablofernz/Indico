const { MercadoPagoConfig, Preference } = require("mercadopago")

const client = new MercadoPagoConfig({
    accessToken:

        // "APP_USR-6072302819757063-012118-92d5d099fe2447411ce13a48ac639dda-826256729"
        "TEST-4019169714958723-012215-806190c36bdd8a7207bab6920b81af5b-826256729"
})

const payWithMP = async (orders) => {
    const preference = new Preference(client)

    const response = await preference.create({
        body: {
            items: orders,
            back_urls: {
                success: "http://localhost:3001/store/pay",
                failure: "http://localhost:3001/store/pay",
                pending: "http://localhost:3001/store/pay",
            }, auto_return: "approved"
        }

    })

    return response

}

module.exports = payWithMP