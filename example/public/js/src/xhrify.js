(function(){
  var internalLinkRegex = new RegExp(
    '^' + location.protocol + 
    '//' + location.host);
  var isInternal = function(link){
    return !link || internalLinkRegex.test(link);
  };

  var History = window.History;
  if ( !History )
    return;

  History.Adapter.bind(window,'statechange',function(){
    var state = History.getState();
    var result = state.data;

    $[result.method](result.action, result.data, function(req){
      req.data.skipLayout = true;
      dust.render(req.template, req.data, function(err, out) {
        document.body.innerHTML = out;
        document.title = req.data.title;
      }); 
    });
  });

  $(document).ready(function(){
    var pageRequest = function(event){
      var _this = $(this)
      var result = {
        method: 'get',
        action: '',
        data: ''
      };
      
      if (_this.is('a'))
        result.action = this.href;
      if (_this.is('form')){
        if (_this.attr('method').toLowerCase()==='post')
          result.method = 'post';
        result.action = _this.attr('action') || window.location.pathname;
        result.data = _this.serialize();
      }

      if (isInternal(result.action)){
        event.preventDefault();
        History.pushState(result, '', result.action);
      }
    };

    $('body').on('click', 'a', pageRequest);
    $('body').on('submit', 'form', pageRequest); 
  });
})();