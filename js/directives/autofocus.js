(function(angular){
  // 1.创建自定义指令模块
  var app = angular.module('todoApp.directive',[]);

  // 2.创建自定义指令
  app.directive('autoFocus',['$timeout',function($timeout){
    return {
      link:function(scope,element,attributes){
        element.on('dblclick',function(){
          var item =element.parent().next().children();
         console.dir(item);
         // setTimeout()
         $timeout(function(){
           item[0].focus();
         },500);
        });
      }
    }
  }])
})(angular)