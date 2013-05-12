
(function(){
  var htmlDecode = function(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  var History = window.History;
  if ( !History )
    return false;

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
      event.preventDefault();
      var _this = $(this)
      var result = {
        method: 'get',
        action: '',
        data: ''
      };
      
      if (_this.is('a'))
        result.action = _this.attr('href');
      if (_this.is('form')){
        if (_this.attr('method').toLowerCase()==='post')
          result.method = 'post';
        result.action = _this.attr('action') || window.location.pathname;
        result.data = _this.serialize();
      }
      History.pushState(result, '', result.action);
    };

    $('body').on('click', 'a', pageRequest);
    $('body').on('submit', 'form', pageRequest); 
  });
})();