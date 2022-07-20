import { fork } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {arg} from '../servidorHBS.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import random from 'random'
import {calculo} from './childProcess.js'

const apiRandom = (req, res) => {
    const cant = req.query.cant
    console.log('arg.CLUSTER')
    console.log(arg.CLUSTER)

    if (!arg.cluster&&!arg.CLUSTER) {

//EN MODO FORK SE LEVANTA UN CHILD PROCESS ANTES DE EJECUTAR CALCULO

        const secun = fork(__dirname + '/childProcess.js')
        secun.send(`${cant}`) 
        secun.on('message', obj=>{
            res.send( `PUERTO: ${arg.port}, PID: ${process.pid}   `+ JSON.stringify(obj)); 
        })
    } else{
                //EN MODO CLUSTER SE EJECUTA DIRECTAMENTE

        const cantParse = (Number(cant))
        let objeto;
        if (!isNaN(cantParse)) {
            objeto = calculo(cant)
        } else {
            objeto = calculo(1e8)
        }
        
        res.send( `PUERTO: ${arg.port}, PID: ${process.pid}   `+ JSON.stringify(objeto)); 
    }   
}
export default apiRandom
