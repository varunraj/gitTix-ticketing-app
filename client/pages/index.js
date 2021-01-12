import buildClient from '../api/build-client' // axios client

const LandingPage =  ({currentUser})=>{
    
    // console.log('I am in component', currentUser);
    
    return currentUser ? <h1>You are Signed In</h1> : <h1>You are not Signed In</h1> 

}


// getInitialProps is a nextjs method. This is where we can 
// do api calls from nextjs server before sending html data to browser.
// data (as an object in return) from getInitialProps will be given to component as a prop 


// getIntial prop can get access to req(context) object. We can take cookie from req and pass on

LandingPage.getInitialProps = async (context) => {

    const client = buildClient(context)
    const {data} = await client.get('/api/users/currentuser')

    return data;

}

export default LandingPage;