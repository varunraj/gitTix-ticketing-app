import axios from 'axios'
import {useState} from 'react'

export default ({url, method, body, onSucess})=>{

    // method must be a string like 'post', 'get' etc
    const [errors, setErrors] = useState(null);
    const doRequest = async () =>{
        try{
            setErrors(null) // this will clear out existing error before new one is sent
           const response = await axios[method](url, body)
           if(onSucess){
                onSucess(response.data);   
           }
            return response.data
        }catch(err){
            
            setErrors(
                <div className="alert alert-danger">
                    <h4>Oops...Something went wrong</h4>
                    <ul className="my-0">
                        {console.log(err)}
                        {err.response.data.errors.map(err=> <li key={err.message}> {err.message} </li>)}
                    </ul>
                </div>
                
            )
        }
    }

    return {doRequest, errors}
}