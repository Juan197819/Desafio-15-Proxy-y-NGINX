import { fork } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {arg} from '../servidorHBS.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import random from 'random'

const calculo = (cant)=>{
    let obj={}
    for (let i = 0; i < cant; i++) {
        const aleat =  random.int(1, 1000)
        if (obj[aleat]) {
            obj[aleat]= obj[aleat] +1
        }else{
            obj[aleat] = 1 
        }
    }
    return obj
}

const apiRandom = (req, res) => {
    const cant = req.query.cant
    // const secun = fork(__dirname + '/childProcess.js')
    // secun.send(`${cant}`) 
    // secun.on('message', obj=>{
    //     res.send( `PUERTO: ${arg.port}, PID: ${process.pid}   `+ JSON.stringify(obj)); 
    // })
    const cantParse = (Number(cant))
    let objeto;
    if (!isNaN(cantParse)) {
        objeto = calculo(cant)
    } else {
        objeto = calculo(1e8)
    }
    
    res.send( `PUERTO: ${arg.port}, PID: ${process.pid}   `+ JSON.stringify(objeto)); 
}
export default apiRandom
