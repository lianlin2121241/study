/*import animal, {say,type as animalType} from './content'
let says=say();
console.log(`The ${animalType} says ${says} to ${animal}`)*/



import animal, * as content from './content'
let says=content.say();
console.log(`The ${content.type} says ${says} to ${animal}`)