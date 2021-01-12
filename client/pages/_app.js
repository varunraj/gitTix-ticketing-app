import 'bootstrap/dist/css/bootstrap.css'
import buildClient from '../api/build-client'
import Header from '../components/header'



// This is Custom App Component
// _app is a wrapper around our nextjs components.
// this is required to include a global css file.
// we can also add header to app

// component below are individual components in nextjs application




const AppComponent =  ({Component, pageProps, currentUser})=>{
    return (
        <div>
            <Header currentUser={currentUser} />
            <Component {...pageProps} />
       </div>
    )
}


// for a page, we get context passed to getIntialProps. But for 
// custom app it is different. We get appContext which contain AppTree, Component, router, ctx
// we get req and res from ctx.

AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx)
    const { data } = await client.get('/api/users/currentuser')
    // lecture 227 
    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx)
    }

    console.log(pageProps);

    return {
        pageProps,
        currentUser: data.currentUser
    }
}


export default AppComponent;