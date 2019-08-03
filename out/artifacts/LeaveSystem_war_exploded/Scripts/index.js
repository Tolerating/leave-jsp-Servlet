$(function(){
    function g(id){return document.getElementById(id);}
    let leftlist = g("aside").getElementsByTagName("li");
	let iframeNum = 0;        //iframe窗口个数,上限6
    //console.log(leftlist);     //5
    //获取选项卡节点
    let topTab = g("content").getElementsByTagName("button");
    //console.log(topTab);
    //获取存放iframe节点
    let topIframe = g("content").getElementsByTagName("iframe");;
    for(var i =0;i<leftlist.length;i++){
        leftlist[i].onclick = function(){
            for(var j=0;j<leftlist.length;j++){
                if(this == leftlist[j]){
                    if(g("t_"+j.toString()) == null){       //通过判断当前选项卡是否已经存在
						if(iframeNum <= 9){
							createTab(j.toString(),this.innerHTML);       //创建选项卡
							creatIframe("i_" + j.toString(), this.getAttribute("data-href"));    //创建iframe窗口
							iframeNum++;
							console.log(iframeNum);
						}else{
						    alert("窗口个数上限为9个");
						    break;
						}                        
                    }
                    clearDisplay();          //将所有iframe的display设置为none
                    g("i_"+j.toString()).style.display = "block";
                    g("t_"+j.toString()).className = "btn btn-default content-tab active";
                }
            }
        }
    }

    //将iframe设置为none,选项卡设置为bootstrap的默认按钮样式
    function clearDisplay(){
         for(var i=0;i<topTab.length;i++){
            topTab[i].className = "btn btn-default content-tab"
         }
         for(var j=0;j<topIframe.length;j++){
            topIframe[j].style.display = "none";
         }
    }
    
    //我的信息选项卡
    document.getElementById("must").onclick = function(){
        clearDisplay();
        g("iframecontent").style.display = "block";
    }
    //创建iframe窗口
    function creatIframe(id,href){
        let div = document.createElement("DIV");
        let templeteIframe = '<iframe src="'+href+'" id="'+ id +'" height="100%" width="100%"></iframe>';
        div.innerHTML=templeteIframe;
        document.querySelector("#content .content-iframe").appendChild(div.firstChild);
    }

    //创建选项卡
    function createTab(id,titleName){
        let buttonEle = document.createElement("BUTTON");
        let spanEle = document.createElement("SPAN");
        buttonEle.setAttribute("type","button");
        buttonEle.id = "t_"+id;
        buttonEle.className = "btn btn-default content-tab";
        buttonEle.innerHTML = titleName;
        spanEle.className = "glyphicon glyphicon-remove";
        buttonEle.appendChild(spanEle);
        buttonEle.onclick = function(){
            clearDisplay();
            g("i_"+id).style.display = "block";
        }
        spanEle.onclick = function(evt){
            evt=(evt)?evt:((window.event)?window.event:null); 
            if(evt.stopPropagation){evt.stopPropagation()} //取消opera和Safari冒泡行为;
            this.parentNode.parentNode.removeChild(buttonEle);//删除当前标签 
            iframeNum--;
            g("i_"+id).parentNode.removeChild(g("i_"+id));
            if(topTab.length == 1){
                g("iframecontent").style.display = "block";
            }else{
                document.querySelector("#content .content-iframe").lastChild.style.display = "block";
            }
        }
        document.querySelector("#content .content-header").appendChild(buttonEle);
        
    }

});