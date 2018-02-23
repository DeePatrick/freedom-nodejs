$(document).ready(function(){
            $(".loadedData").click(function(){
                $.getJSON("../dist/data/json_data.json", function(obj){
                    $.each(obj, function(key, value){
                        $("ul").append("<li>" + value.name + "</li>");   
                    });
                });
            });		
        });