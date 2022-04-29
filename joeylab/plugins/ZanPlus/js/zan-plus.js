$(document).ready(function(){
    $(".post-zan").on("click", function(){
        var zan = $(this);
        var id = zan.attr("data-cid");
        var zaned_list = $.cookie("zaned_list") || "";
        if (!id || !/^\d{1,10}$/.test(id)) return;
        if (-1 !== zaned_list.indexOf("," + id + ",")) return alert("您已经赞过了！");
        if(zaned_list)
        {
            if(zaned_list >= 160)
            {
                zaned_list = zaned_list.substring(0, zaned_list.length - 1);
                zaned_list = zaned_list.substr(1).split(",");
                zaned_list.splice(0, 1);
                zaned_list.push(id);
                zaned_list = zaned_list.join(",");
                $.removeCookie("joeylab_zaned");
                $.cookie("zaned_list", "," + zaned_list +",", { expires: 7, path: "/" });
            }
            else
            {
                $.cookie("zaned_list", zaned_list + id + ",", { expires: 7, path: "/" })
            }
        }
        else
        {
            $.cookie("zaned_list", "," + id + ",", { expires: 7, path: "/" });
        }
        $.post(location.protocol + '//' + location.host + "/action/ZanPlus", {cid: zan.attr("data-cid")},function(data){
                if(data.result == 1){
                    zan.find("div.fave").toggleClass("active");
                    var cnt = zan.find("p.likeCount").text();
                    zan.find("p.likeCount").text(parseInt(cnt) + 1);
                }
                //alert(data.message);
        }, "json");
    })
});