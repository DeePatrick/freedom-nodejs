$(document).ready(function(){
    $('.deleteUser').click(function(){
        var confirmation = confirm('Are you sure ?');


        if(confirmation){
            $.ajax({
                type:'DELETE',
                url:'/users/delete/'+ $('.deleteUser').data('user.id')
            }).done(function(response){
                window.location.replace('/user');
            });
            window.location.replace('/user');
        }
        else{
            return false;
        }
    });
});