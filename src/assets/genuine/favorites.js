function changeFavaritesStage(){

    document.getElementById('favariteButton').innerHTML="已收藏";
    
}

function onload2(){
    
    connectWebViewJavascriptBridge(function(bridge) {
                                  
                                   //准备函数为了oc端调用
                                   bridge.registerHandler('changeFavarites', function(data, responseCallback) {
                                                          
                                                       
                                                          
                                                          if(data == true){
                                                          
                                                          //document.getElementById('favariteButton').innerHTML="已收藏";
                                                          // document.getElementById('favoritespan').setAttribute("class", "favourite on");
                                                          document.getElementById('favoritespan').className = "favourite on";
                                                          // document.getElementById('favariteButton').innerHTML="<div class='favourite'>favourite</div>";
                                                          
                                                          
                                                          
                                                          } else{
                                                          
                                                          document.getElementById('favoritespan').setAttribute("class", "favourite");
                                                          // document.getElementById('favariteButton').innerHTML="<div class='favourite on'>favourite</div>";
                                                          }
                                                          
                                                          
                                                          });
                                   
                                   });
    
}

function addFavorites(){
   
    //bridge.send('hi');
    connectWebViewJavascriptBridge(function(bridge) {
     bridge.callHandler('webViewaddFavorites','true',function(response){ //{'articleId':'1'}
          console.log("seed Action and received response");
      });
          
    
                                   bridge.registerHandler('hasReceived', function(data, responseCallback) {
                                                          console.log(data);
                                                          changeFavaritesStage();
                                                          });
                                   
                                   //准备函数为了oc端调用
                                   bridge.registerHandler('changeFavarites', function(data, responseCallback) {
                                                       
                                                          
                                                          if(data == true){
                                                          
                                                          //document.getElementById('favariteButton').innerHTML="已收藏";
                                                          // document.getElementById('favoritespan').setAttribute("class", "favourite on");
                                                          document.getElementById('favoritespan').className = "favourite on";
                                                          // document.getElementById('favariteButton').innerHTML="<div class='favourite'>favourite</div>";
                                                          
                                                          
                                                          
                                                          } else{
                                                          
                                                          document.getElementById('favoritespan').setAttribute("class", "favourite");
                                                          // document.getElementById('favariteButton').innerHTML="<div class='favourite on'>favourite</div>";
                                                          }
                                                          
                                                          
                                                          });
                                   
                                   });

       
}





