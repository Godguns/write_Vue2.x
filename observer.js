class Observer{

   constructor(data){
    this.walk(data)
   }
   walk(data){
    if(!data ||typeof data !== 'object'){
        return 
    }
    Object.keys(data).forEach(key=>{
        this.defineReactive(data,key,data[key])
    })

   }
   defineReactive(obj,key,val){
       if(typeof val ==='object'){
           return new Observer(val)

       }
       let dep= new Dep()
        Object.defineProperty(obj,key,{
            get(){
                Dep.target && dep.addsub(Dep .target)
                return val
            },
            set(newValue){
                if(val===newValue){
                    return 
                }
                val=newValue;
                dep.notify()
            }
        })
   }
}