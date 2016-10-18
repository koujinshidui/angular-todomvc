(function(angular) {
    // 1.创建服务模块
    var app = angular.module('todoApp.service', []);
    // 2.创建服务,
    // 第一个参数，是服务名字
    // 第二个参数，和控制器第二个参数一样
    // 第二个参数的function可以一个构建函数来使用。angular会自动帮助我们new这个对象，在controller中可以直接传入它。或者直接return一个对象

    app.service('MyService', ['$window', function($window) {
        // this.name="掌上电";
        var storage = $window.localStorage;
        var str = storage.getItem('todos');
        var todos = JSON.parse(str || '[]');

        // 1.获取数据
        this.get = function() {
            // console.log($window==window);
            return todos;
        }

        // 2.添加数据
        this.add = function(id, newTask) {
            todos.push({ id: id, name: newTask, completed: false });
            this.save();
        }

        // 3.删除数据
        this.remove = function(id) {
            for (var i = 0; i < todos.length; i++) {
                var item = todos[i];
                if (item.id == id) {
                    todos.splice(i, 1); //用来从数组中删除元素
                    this.save();
                    return;
                }
            }
        }

        // 4.保存数据
        this.save = function() {
            storage.setItem('todos', JSON.stringify(todos));
        }

        // 6. 批量切换状态
        this.toggleAll = function(flag) {
            for (var i = 0; i < todos.length; i++) {
                var item = todos[i];
                item.completed = flag;
            }
        }

        // 7.删除所有已完成数据
        this.removeAllCompleted = function() {
          var tmp =[];
                for (var i = 0; i < todos.length; i++) {
                    var item = todos[i];
                    if (!item.completed) {
                        tmp.push(item);
                    }
                }
                todos=tmp;
                return tmp;
            }
            // return {aaa:33};
        // 7.isShow
        this.isShow=function(){
          for (var i = 0; i < todos.length; i++) {
            var item =  todos[i];
            if(item.completed){
              return true;
            }
           }
           return false;
        }

        // 8.获取未完成的任务数
        this.count=function(){
          var count = 0;
           // 遍历数组，判断未完成的任务数有多少
           for (var i = 0; i < todos.length; i++) {
             var item = todos[i];
             if(!item.completed){
                count++;
             }
           }
           // 在这里执行一下保存
           this.save();
           return count;
        }
    }])
})(angular)
