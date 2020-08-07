$.ajax({
    url:"getCardDataForGuName",
    success:function(d){
        $("#guName").html(d);
    },error:function(e){
        console.log(e);
    }
})
 $.ajax({
    url:"getCardDataForDongName?guName=도봉구",
    success:function(d){
        $("#dongName").html(d);
    },error:function(e){
        console.log(e);
 }
 })
$("#guName").change(function(){
    $.ajax({
    url:"getCardDataForDongName?guName="+$(this).val(),
    success:function(d){
        $("#dongName").html(d);
    },error:function(e){
        console.log(e);
    }
})
})
$("#moreInfoAdd").hide()
$("#moreInfo").change(function(){
    var cate = $(this).val();
    var interestRates = "<option>정기예금금리</option><option>국고채(3년)</option><option>CD</option>"
    var tax = "<option>1년미만보유,세율</option><option>2년미만보유,세율</option><option>2년이상보유,1200만원이하,세율</option><option>2년이상보유,4600만원이하,세율</option><option>2년이상보유,8800만원이하,세율</option><option>2년이상보유,15000이하,세율</option>"
    var loan = "<option>주택대출액</option><option>가계대출액</option>"
    if(cate == "세금"){
        $("#moreInfoAdd").html(tax)
        $("#moreInfoAdd").show()
    }else if(cate == "금리"){
        $("#moreInfoAdd").html(interestRates)
        $("#moreInfoAdd").show()
    }else if(cate == "대출"){
        $("#moreInfoAdd").html(loan)
        $("#moreInfoAdd").show()
    }
})

$("#moreInfoAdd").change(function(){
    var add = "<a id='"+$(this).val()+"'class='btn btn-3 btn-sep icon-heart info col-4'>"+$(this).val() +"</a>"
    $("#select_list").append(add)
    removeA()
})
$("#estateIndex").change(function(){
    var add = "<a class='btn btn-3 btn-sep icon-heart info col-4'>"+$(this).val() +"</a>"
    $("#select_list").append(add)
    removeA()
})
function removeA(){
$("a").click(function(){
    $(this).remove();
})
}