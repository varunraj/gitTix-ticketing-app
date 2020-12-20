// this is added for nextjs file changes with k8s.
// without this sometime it wont work correctly
module.exports = {
    webpackDevMiddleware: config =>{
        config.watchOptions.poll = 300;
        return config;
    }
};