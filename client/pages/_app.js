import 'bootstrap/dist/css/bootstrap.css'

// _app is a wrapper around our nextjs components.
// this is required to include a global css file.

// component below are individual components in nextjs application

const app =  ({Component, pageProps})=>{
    return (
         <Component {...pageProps} />
    )
}

export default app;