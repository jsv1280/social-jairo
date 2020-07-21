const bcrypt = require('bcrypt')
const error = require('../../../utils/error');
const auth = require('../../../auth')

const TABLA = 'auth';


module.exports = function(injectedStore){

    let store = injectedStore
    if(!store){
        store =  require('../../../store/dummy')
    }

    async function login(username,password){
        const data = await store.query(TABLA,{ username: username});
       
        return bcrypt.compare(password,data.password)
            .then(sonIguales => {
                if(sonIguales === true){
                    // Generar Token
                    return auth.sign(JSON.stringify(data));
                }
                else {
                    throw error('Informacion Invalida', 400);
                }
               
            })
        
    }

    async function upsert(data){
        const authData = {
            id : data.id
        }

        if(data.username){
            authData.username = data.username;
        }

        if(data.password){
            authData.password = await bcrypt.hash(data.password,5);
        }


        return store.upsert(TABLA,authData);
    }

    return {
        upsert,
        login
    }
}