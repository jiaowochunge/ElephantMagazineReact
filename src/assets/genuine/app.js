(function($) {
    $(document).ready(function() {
        

        $('.article-body h6').each(function(index, item) {
            var lineHeight = $(item).css('line-height') || 0;
            var height = $(item).height();
            var imgHeight = $(item).find('img').height() || 0 ;
            var imgMarginBottom = $(item).find('p') ? 15: 13;
            lineHeight =Math.floor(+(lineHeight.substr(0, lineHeight.indexOf('px')))) ;

            if(imgHeight > 0) {
                if(Math.ceil(height/(lineHeight + imgHeight + imgMarginBottom)) > 1) {
                    $(item).css('text-align', 'left');
                }
            } else {
                if(Math.ceil(height/lineHeight) > 1) {
                    $(item).css('text-align', 'left');
                }    
            }

            
        });

    });


})(Zepto);
