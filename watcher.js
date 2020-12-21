class Watcher{
    constructor(vm,key,cb){
        this.vm=vm;
        this.key=key;
        this.cb=cb;
            //把watcher对象记录到Dep的静态属性target
            Dep.target=this
        this.oldValue =vm[key]  //此处触发get
        Dep.target=null
    

    }
    update(){
        let newValue=this.vm[this.key]
       if(this.oldValue=== newValue){
           return 
       }
       this.cb(newValue)
    }

}
