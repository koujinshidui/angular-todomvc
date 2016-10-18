(function(angular){
  var app = angular.module('todoApp.controller',['todoApp.service']);
  // 2.创建控制器,
    app.controller('todoController',['$scope','$location','MyService', function($scope,$location,MyService) {
        console.log(MyService);
        console.log(MyService.get());
        // 功能1.展示数据
        $scope.tasks = MyService.get();

        // 功能2.添加任务
        $scope.newTask = '';
        $scope.add = function() {
             if(!$scope.newTask){// 如果数据为空，则不添加到数组中
              return;
             }
            // 让id唯一，设置新id为最后一条数据的id+1;
            var id;
            if ($scope.tasks.length > 0) {
              // 注意数组长度为0的问题。
                id = $scope.tasks[$scope.tasks.length - 1].id + 1;
            } else {
                id = 1;
            }
            // push之前要保证id唯一.
            // 标记
            MyService.add(id,$scope.newTask);
            $scope.newTask =  '';
        }

        // 功能3 删除任务
        $scope.remove=function(id){
          // $scope.tasks.splice(i,1)
          // 遍历数组，得到相应id的索引，并删除数据
          // 标记
          MyService.remove(id);
        }

        // 功能4 编辑任务,我们并没有直接去保存数据，是angular双向数据绑定自动保存数据，我们只是改变的文本的显示与否。
        $scope.isEditingId=-1;
        $scope.edit=function(id){
          // $scope.xxx;
          $scope.isEditingId=id; // $scope.xxx==id;
        }
        $scope.save=function(){
          $scope.isEditingId=-1;
          // MyService.save();// 还需要保存到本地存储
        }

        // 功能5.已完成，没有写js。
        // 也完成了
        
        // 功能6.批量切换任务状态
        var flag=true;//标记，下一次点击要切换的状态。
        $scope.toggleAll=function(){
           // 遍历数组，设置completed属性为true或者false;
           // 标记
           MyService.toggleAll(flag);
           flag=!flag;
        }

        // 功能7 清除所有已完成的任务
        $scope.clearCompletedAll=function(){
           // 注意，删除组元素后循环条件的变化会导致部分元素没有删除。
           // for (var i = 0; i < $scope.tasks.length; i++) {
           //   var item = $scope.tasks[i];
           //   if(item.completed){
           //      $scope.tasks.splice(i,1);
           //   }
           // }
           

          // 使用一个空数组，然后把所有未完成的任务添加进去，最后再赋值给$scope.tasks
          // $scope.tasks==todos

        
          // 标记
          $scope.tasks=MyService.removeAllCompleted();
          // $scope.tasks==todos;
        }

        // 功能 7.1
        $scope.isShow=function(){
           // 遍历数组，判断只要有一个元素的compoleted的属性为true就显示按钮
           // 标记
          return MyService.isShow();
        }
        
        // 功能 8.显示未完成的任务数
        
        $scope.count=function(){
           return MyService.count();
        }

       // 功能9
       // 初化数据模型，作为过滤的条件
       // $scope.status={};
       // // $scope.str="";
       // // 显示未完成数据
       // $scope.active=function(){
       //   $scope.status={completed:false}
       // }

       // // 显示已完成数据
       // $scope.completed=function(){
       //   $scope.status={completed:true}
       // }
       // // 显示所有数据
       // $scope.all=function(){
       //   $scope.status={};
       // }

       // 监视url中锚点值的变化
       // window.addEventListener('hashchange')
       // location.hash
       console.log($location.url());
       // $watch只能监视数据模型($scope的一些属性)
       // var name='小明';
       // $scope.loca=$location.url() // 如是直接赋值,监视时是得到的固定的字符串，不会改变，监视没有意义。
       $scope.loca=$location;
       // angular内部允许我们直接监视方法，angular会根据锚点的变化去调用loca.url()方法，判断得到的返回值与之前的值是否一致，如果不一致则调用回调函数。
       $scope.status={};
       $scope.$watch('loca.url()',function(now,old){
          switch(now){
            case '/active':
            $scope.status={completed:false};
            break;
            case '/completed':
            $scope.status={completed:true};
            break;
            default:
            $scope.status={};
            break;
          }
       });
    }]);
})(angular)