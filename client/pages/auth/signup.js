
import {useState} from 'react'
import useRequest from '../../hooks/use-request';

const signUp =  () =>{
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const {doRequest, errors} = useRequest({
        url:'/api/users/signup',
        method: 'post',
        body:{
            email, password
        }
    })


    const onSubmit = async (event) =>{
        event.preventDefault();
        //console.log(email, password);
        
        doRequest();

    }

    
    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <h1>Sign Up</h1>
                <div className="form-group">
                    <label>Email Address</label>
                    <input 
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                        className="form-control" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                        type="password" 
                        className="form-control" />
                </div>
                      {errors}          
                <button className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default signUp;