const { initRouter } = require('./router/index')
const uploadRouters = require('./router/uploadRouter')
const routers = [
    {
        url: '/user_info/get',
        async handle({ query }) {
            return {
                id: 1,
                name: 'admin'
            }
        }
    }
]
const init = async () => {
    initRouter([...routers, ...uploadRouters])
}
init()