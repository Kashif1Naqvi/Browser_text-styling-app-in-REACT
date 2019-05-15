
class Random {
    constructor(max=1000, allowNegitives = true){
        this.max = max
        this.allowNegitives = allowNegitives
    }
    randomInt(min,max){
        if(max > this.max){
            max = this.max
        }
        if(min < 0 && !this.allowNegitives ){
            min = 0
        }
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max-min + 1) )+ min
    }
}

class ColorGenrator extends Random {
    constructor(max,allowNegitives,type="rgb"){
        super(max,allowNegitives)
        if(this.typeList.includes(type)){
            this.type = type
        }else {
            this.type = "rgb"
        }
    }
    typeList = ["hex","rgb"]
    get types(){
        return this.typeList
    }
    set types(types =['hex','rgb']){
        if(Array.isArray(types)){
            this.typeList = types.map(type => type)
        }
    }
    color(){
        let r = super.randomInt(0,255)
        let g = super.randomInt(0,255)
        let b = super.allowNegitives(0,255)
        if(this.type==='hex'){
            return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
        } else {
            return `rgb(${r},${g},${b})`
        }
    }
}

export const rando = new ColorGenrator()

const shakespareapi = "https://api.graph.cool/simple/v1/shakespeare";

let options = () => {
    return {
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            query:`{
                allPoems(
                    first:1
                    skip: ${rando.randomInt(0,160)}
                    )
                    {
                        title
                        author
                        lines
                        text
                    }
            }`
        })
    }
}
export async function getRandomPoem(){
    try {
        let result = await fetch(shakespareapi,options())
        let response = await result.json()
        let poem = response.data.allPoems[0]
        return poem.text
    } catch (error) {
        console.log("Error in getRandomPoem",error)
        throw error
    }
}