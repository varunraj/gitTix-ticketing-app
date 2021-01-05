import axios from 'axios'

// create a custom axios depending on from where api calls are made from 
// getInitialProps

export default ({ req }) => {

    // since this is a call within k8s, we need to use k8s service name
    // instead of reaching to http://auth-srv:3000/api/users/currentuser
    // we are going to reach to ingress-nginx to find the domain part
    // If we run kebectl get namespace, we can see that all service we created
    // runs in default name space and ngress nginix in its own.
    // So we need make cross namespace call.
 
    // to see service of ingress-nginx, run the command 

    // kubectl get services -n ingress-nginx

    // We use below url to reach the service in another name space
    // http://ingress-nginx-controller.ingress-nginx.svc.cluster.local

    // So to reach currentUser end point, use url 
    // http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser

    // with this approach, we dont need to change the base url depending on the service


    // IMP:IMP:
    // getInitialProps is executed from client when user navigates within the app once it is loaded
    // into the browser. For refresh, link clicks, it is executed in server.



    if (typeof window === 'undefined') { // in server

        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        })


    } else { // in browser

        return axios.create({
            baseURL: '/',
        })

    }
}