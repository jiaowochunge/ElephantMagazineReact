
function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function() {
            callback(WebViewJavascriptBridge)
        }, false)
    }
}


connectWebViewJavascriptBridge(function(bridge) {

    bridge.init(function(message, responseCallback) {
       //function同样是用来接收Objective-C里面通过send方法发送的消息的，参数与OC里的send方法参数对应 
       console.log(message)
       var data = {'key':'我已收到OC的send'}
       console.log(data)
       responseCallback(data)
    });


    //为了让Objective-C调用JavaScript，先在JavaScript里面注册一个方法：
    bridge.registerHandler('imagesDownloadComplete', function(data, responseCallback) {
        console.log(data);

        var imageUrl = data[0];
        var imageCachePath = data[1];

        var allImage = document.querySelectorAll("img");
        allImage = Array.prototype.slice.call(allImage, 0);
        allImage.forEach(function(image) {
            if (image.getAttribute("esrc") == imageUrl || image.getAttribute("esrc") == decodeURIComponent(imageUrl)) {
                image.src = imageCachePath;
            }
        }); 
        
        var responseData = { 'Javascript Says':'Right back atcha!' }
        responseCallback(responseData);
    })
                               
    

                               

})


function onLoaded() {
    
    connectWebViewJavascriptBridge(function(bridge) {
        
        var allImage = document.querySelectorAll("img[esrc]");
        allImage = Array.prototype.slice.call(allImage, 0);
        var imageUrlsArray = new Array();
        var imageShouldClick = new Array();
        allImage.forEach(function(image) {
            imageShouldClick.push(image.parentElement.tagName == "H4");
            var esrc = image.getAttribute("esrc");
            var newLength = imageUrlsArray.push(esrc);
        });

        bridge.callHandler('webviewOnLoaded', {'imgs':imageUrlsArray, 'should_click':imageShouldClick}, function(response) {
            console.log("onload结束，JS已经发出imgurl和是否点击，同时收到回调，说明OC已经收到数据");
        });
             
    });
    
    //调用Favorites.js 中的
    onload2();
}


function imagesDownloadComplete(pOldUrl, pNewUrl) {
    var allImage = document.querySelectorAll("img");
    allImage = Array.prototype.slice.call(allImage, 0);
    allImage.forEach(function(image) {
        if (image.getAttribute("esrc") == pOldUrl || image.getAttribute("esrc") == decodeURIComponent(pOldUrl)) {
            image.src = pNewUrl;
        }
    });
}


function onImageClick(picUrl){

    connectWebViewJavascriptBridge(function(bridge) {
        var allImage = document.querySelectorAll("p img[esrc],h6 img[esrc]");
        allImage = Array.prototype.slice.call(allImage, 0);
        var urls = new Array();
        var index = -1;
        var x = 0;
        var y = 0;
        var width = 0;
        var height = 0;

        allImage.forEach(function(image) {
            var imgUrl = image.getAttribute("esrc");
            console.log("imgUrl:"+imgUrl);
            console.log("decodeURIComponent(picUrl):"+decodeURIComponent(picUrl));
            var newLength = urls.push(imgUrl);
            if(imgUrl == decodeURIComponent(picUrl)){
                index = newLength-1;
                x = image.getBoundingClientRect().left;
                y = image.getBoundingClientRect().top;
                x = x + document.documentElement.scrollLeft;
                y = y + document.documentElement.scrollTop;
                width = image.width;
                height = image.height;

                console.log("x:"+x + ";y:"+y  + ";width:"+image.width + ";height:"+image.height);
            }
        });
        console.log("picUrl:"+picUrl);
        console.log("检测到点击");

        bridge.callHandler('imageDidClicked', {'index':index,'x':x,'y':y,'width':width,'height':height}, function(response) {
            console.log("JS已经发出imgurl和index，同时收到回调，说明OC已经收到数据");
        });
    });

}
