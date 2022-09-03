import hapi from '@hapi/hapi'
import routes from './routes.js'

// const hapi = require('@hapi/hapi')


const initialization = async ()=>{
    const server = hapi.server({
        port:9000,
        host : 'localhost',
        routes: {
            cors: true//{
                // cors should be specified when sharing data between origins
            //   origin: ['*'],
            // },
        },
    })

    server.route(routes)
    await server.start()
    console.log(`Server running on ${server.info.host}:${server.info.port}`)
}

initialization();