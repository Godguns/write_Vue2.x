class Dep{
   constructor(){
    this.subs=[]
   }
   addsub(sub){
        if(sub && sub.update){
            this.subs.push(sub)
        }
   }
   notify(){
    this.subs.forEach(sub=>{
        sub.update()
    })
   }
}