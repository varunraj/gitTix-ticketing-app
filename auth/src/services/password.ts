import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'


const scriptAsync = promisify(scrypt) // scriprt is callback based. Convert it to use promise based
 


export class Password {
    
    static async toHash(password:string){
        const salt = randomBytes(8).toString('hex')
        const buf = (await scriptAsync(password, salt, 64)) as Buffer // as Buffer is for 
        // ts to understand buf variable is of type Buffer
        return `${buf.toString('hex')}.${salt}` // hash and salt combined and returned back
    }

    static async compare(storePassword: string, suppliedPassword: string){
        const [hashedPassword, salt] = storePassword.split('.')
        const buf = (await scriptAsync(suppliedPassword, salt, 64)) as Buffer
        return buf.toString('hex') === hashedPassword
    }
}