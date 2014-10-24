'use strict';

app.controller('PostViewCtrl', function($scope, $routeParams, Post, Comment, Auth) {

    $scope.post = Post.get($routeParams.postId);
    $scope.comments = Post.comments($routeParams.postId);

    $scope.user = Auth.user;
    $scope.signedIn = Auth.signedIn;

    $scope.addComment = function() {
        if (!$scope.commentText || $scope.commentText === '') {
            return;
        }

        var comment = {
            text: $scope.commentText,
            creator: $scope.user.profile.username,
            creatorUID: $scope.user.uid, 
        };

        Comment.create($routeParams.postId, comment);
        $scope.commentText = '';
    };

    $scope.deleteComment = function(comment) {
        $scope.comments.$remove(comment);
    };

});