
import {useState} from 'react'
import axios from 'axios'
const signUp =  () =>{
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([]);


    const onSubmit = async (event) =>{
        event.preventDefault();
        //console.log(email, password);
        
        try{
        
            const response = await axios.post('/api/users/signup', {
                email, password
            })
        }catch(err){
            //console.log(err.response.data)
            setErrors(err.response.data.errors)
        }

        //console.log(response.data);

    }

    function returnError(){
        if(errors.length === 0){
            return null
        } else
        return(
            <div className="alert alert-danger">
                    <h4>Oops...Something went wrong</h4>
                    <ul className="my-0">
                        {errors.map(err=> <li key={err.message}> {err.message} </li>)}
                    </ul>
                </div>
        )
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
                      {returnError()}          
                <button className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default signUp;