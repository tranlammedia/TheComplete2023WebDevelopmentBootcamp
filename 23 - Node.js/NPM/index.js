import gerenateSuperhero from "superheros";
import {readFile} from "fs";
readFile('../Native Modules/text.txt','utf-8',(err, data)  =>{
    console.log(data)
})
console.log(gerenateSuperhero())
