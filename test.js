$(function(){

    $("#myButton")
        .attr('value',"Get User List")
        .css({"background":"blue","color":"white"})

    $("#myButton").click(function () {
        $("#postList").removeClass("added")
        $("#postList").addClass("removed")

        $.get("http://jsonplaceholder.typicode.com/users",{

            dataType:"application/json"
        }).done(function(data){



            $("#myBody").empty();
            $("#myButton")
                .attr('value',"Get User List")
                .css({"background":"blue","color":"white"})

            for (let i =0; i<data.length;i++){
                console.log(data[i].name)

                $("#myBody").append("<tr id='"+data[i].id+"' class='myItem' ><td>"+data[i].name+"</td><td>"+data[i].username+"</td><td>"+data[i].email+"</td><td>"+data[i].phone+"</td></tr>")
            }

        })
            .fail(function (err) {

                console.log("hello")
            })
            .always(function () {

                $("#userList").removeClass("removed")
                $("#userList").addClass("added")
            });
    })
    
    
    $(document).on("click",".myItem",function () {
        let id = $(this).attr("id")

        let url = "http://jsonplaceholder.typicode.com/users/"+id+"/posts"

        $("#userList").removeClass("added");
        $("#userList").addClass("removed");


        $.get(url,{

            dataType:"application/json"
        }).done(data=>{

            $("#postBody").empty();
            $("#myButton")
                .attr('value',"Back to User List")
                .css({"background":"red","color":"white"})


            for (let i=0;i<data.length;i++){
                $("#postBody").append("<tr id='"+data[i].id+"'><td>"+data[i].title+"</td><td>"+data[i].body+"</td></tr>")
            }


        })
            .fail(err=>{

            })
            .always(()=>{
                $("#postList").addClass("added")
                $("#postList").removeClass("removed")
            });
    })


})