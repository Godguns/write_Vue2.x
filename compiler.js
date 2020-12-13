class Compiler{
    constructor(vm){
        this.el=vm.$el;
        this.vm=vm;
        this.compile(this.el)
    }
    //编译模版
    compile(el){
        let childNodes =el.childNodes
        Array.from(childNodes).forEach(node=>{
            if(this.isTextNode(node)){
                this.compileText(node)
            }else if(this.isElementNode(node)){
                this.complieElement(node)
            }
            //判断node节点，是否有子节点，如果有子节点，要递归调用complie
            if(node.childNodes && node.childNodes.length!==0){
                this.compile(node)
            }
        })
    }
    //编译元素节点
    complieElement(node){
        Array.from(node.attributes).forEach(attr=>{
            let attrName =attr.name
            if(this.isDirective(attrName)){
                attrName=attrName.substr(2)
                let key=attr.value
                this.update(node,key,attrName)
            }
        })
    }
    update(node,key,attrName){
        let updateFn= this[attrName+'Updater'];
        updateFn && updateFn(node,this.vm[key])
    }
    //处理v -text
    textUpdater(node,value){
        node.textContent=value
    }
    //处理 v-model
    modelUpdater(node,value){
        node.value=value
    }
    //处理文本
    compileText(node){
        
       let reg=/\{\{(.+?)\}\}/
       let value =node.textContent;
       if(reg.test(value)){
        console.log("~~~~~")
           let key=RegExp.$1.trim()
           node.textContent=value.replace(reg,this.vm[key])
           new Watcher(this.vm,key,(newValue)=>{
               node.textContent=newValue
           })
       }
    }
    //判断指令
    isDirective(attrName){
        return attrName.startsWith('v-')
    }
    //判断是不是文本
    isTextNode(node){
        return node.nodeType===3
    }
    //判断是不是节点
    isElementNode(node){
        return node.nodeType===1
    }

}