$(function(){

    $("#myButton")
        .attr('value',"Get User List")
        .css({"background":"blue","color":"white"})

    $("#myButton").click(function () {
        $("#postList").removeClass("added")
        $("#postList").addClass("removed")
        $("#commentList").addClass("removed")
        $("#commentList").removeClass("added")

        $.get("http://jsonplaceholder.typicode.com/users",{

            dataType:"application/json"
        }).done(function(data){



            $("#myBody").empty();
            $("#myButton")
                .attr('value',"Get User List")
                .css({"background":"blue","color":"white"})

            for (let i =0; i<data.length;i++){
                console.log(data[i].name)

                $("#myBody").append("<tr id='"+data[i].id+"' class='postItem' ><td>"+data[i].name+"</td><td>"+data[i].username+"</td><td>"+data[i].email+"</td><td>"+data[i].phone+"</td></tr>")
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
    
    
    $(document).on("click",".postItem",function () {
        let id = $(this).attr("id")

        let url = "http://jsonplaceholder.typicode.com/posts?userId="+id

        $("#userList").removeClass("added");
        $("#userList").addClass("removed");
        $("#commentList").addClass("removed")
        $("#commentList").removeClass("added")


        $.get(url,{

            dataType:"application/json"
        }).done(data=>{

            $("#postBody").empty();
            $("#myButton")
                .attr('value',"Back to User List")
                .css({"background":"red","color":"white"})


            for (let i=0;i<data.length;i++){
                $("#postBody").append("<tr id='"+data[i].id+"' class='commentItem'><td>"+data[i].id+"</td><td>"+data[i].title+"</td><td>"+data[i].body+"</td></tr>")
            }


        })
            .fail(err=>{

            })
            .always(()=>{
                $("#postList").addClass("added")
                $("#postList").removeClass("removed")
            });
    })




    $(document).on("click",".commentItem",function () {
        let id = $(this).attr("id")

        let url = "http://jsonplaceholder.typicode.com/comments?postId="+id

        $("#userList").removeClass("added");
        $("#userList").addClass("removed");
        $("#postList").removeClass("added");
        $("#postList").addClass("removed");


        $.get(url,{

            dataType:"application/json"
        }).done(data=>{

            $("#postBody").empty();
            $("#myButton")
                .attr('value',"Back to User List")
                .css({"background":"red","color":"white"})


            for (let i=0;i<data.length;i++){
                $("#commentBody").append("<tr id='"+data[i].id+"' class='commentItem'><td>"+data[i].id+"</td><td>"+data[i].name+"</td><td>"+data[i].email+"</td><td>"+data[i].body+"</td></tr>")
            }


        })
            .fail(err=>{

            })
            .always(()=>{
                $("#commentList").addClass("added")
                $("#commentList").removeClass("removed")
            });
    })


})