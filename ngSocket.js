angular.module('ag.service', []).factory('ngSocket', ['$rootScope', function($rootScope) {
    var socket;
    var socketServer;

    function connect(res) {
        socket = io.connect(socketServer);
        socket.on('connect', function() {
            console.log('socket connect');
            $rootScope.$broadcast('socketConnect');
        });
        socket.on('connect_error', function() {
            console.log('socket connect_error');
        });
        socket.on('connect_timeout', function() {
            console.log('socket connect_timeout');
        });
        socket.on('error', function(reason) {
            console.error('Unable to connect Socket.IO', reason);
        });
        socket.on('failToDo', function(res) {
            console.error('socket error', res);
        });
    }

    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
}])
