function sleep (delay) {
   var start = new Date().getTime();
   while (new Date().getTime() < start + delay);
}

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
	$.ajaxPrefilter('json', function(options, orig, jqXHR){
		return 'jsonp';
	});
function getCDChart(){	$.ajax({
		url         : 'http://ecos.bok.or.kr/api/StatisticSearch/UK7OYPB8FWIWM5LLJFYH/json/kr/1/10/028Y001/MM/202001/202007/BEEA21/',
		type        : 'GET',
		dataType    : 'json',
		success     : function (result) {
			makeBarChart(result);
		},
		error       : function (result) {
			console.log("error >> " + $(result).text());
		}
	});}
	function makeBarChart(jsonData) {
		var rows = jsonData.StatisticSearch.row;
		var datas = new Array();
		var xColumn = new Array();
		xColumn.push('x')
		datas.push(rows[0].ITEM_NAME1);
		for (var row in rows) {
			xColumn.push(rows[row].TIME);
			datas.push(rows[row].DATA_VALUE);
		}
		var chart = c3.generate({
			bindto: '#chartCD',
			data : {
				type : 'bar',
				x : 'x',
				columns : [
				    xColumn,
					datas
				]
			},
			bar : {
				width : {
					radio : 0.5
				}
			}
		});
	}
function getLoan(){	$.ajax({
		url         : 'http://ecos.bok.or.kr/api/StatisticSearch/UK7OYPB8FWIWM5LLJFYH/json/kr/1/10/008Y002/MM/202001/202007/11100A0/',
		type        : 'GET',
		dataType    : 'json',
		success     : function (result) {
			makeBarChart2(result);
		},
		error       : function (result) {
			console.log("error >> " + $(result).text());
		}
	});}
	function makeBarChart2(jsonData) {
		var rows = jsonData.StatisticSearch.row;
		var datas = new Array();
		var xColumn = new Array();
		xColumn.push('x')
		datas.push(rows[0].ITEM_NAME1);
		for (var row in rows) {
			xColumn.push(rows[row].TIME);
			datas.push(rows[row].DATA_VALUE);
		}
		var chart = c3.generate({
			bindto: '#chartLoan',
			data : {
				type : 'bar',
				x : 'x',
				columns : [
				    xColumn,
					datas
				]
			},
			bar : {
				width : {
					radio : 0.5
				}
			}
		});
	}
function getProduceChart(){
    var value1;
    var value2;
    $.ajax({
		url         : 'http://ecos.bok.or.kr/api/StatisticSearch/UK7OYPB8FWIWM5LLJFYH/json/kr/1/10/013Y202/MM/202001/202007/*AA/',
		type        : 'GET',
		dataType    : 'json',
		success     : function (result) {
			value1= result
			$.ajax({
                    url         : 'http://ecos.bok.or.kr/api/StatisticSearch/UK7OYPB8FWIWM5LLJFYH/json/kr/1/10/021Y125/MM/202001/202007/0/',
                    type        : 'GET',
                    dataType    : 'json',
                    success     : function (result) {
                        value2= result;
                        makeLineChart1(value1,value2);
                    },
		error  : function (result) {
			console.log("error >> " + $(result).text());
		}
	});
		},
		error       : function (result) {
			console.log("error >> " + $(result).text());
		}
	});
	}
	function makeLineChart(jsonData) {
		var rows = jsonData.StatisticSearch.row;
		var datas = new Array();
		var xColumn = new Array();
		xColumn.push('x')
		datas.push(rows[0].ITEM_NAME1);
		for (var row in rows) {
			xColumn.push(rows[row].TIME);
			datas.push(rows[row].DATA_VALUE);
		}
		var chart = c3.generate({
			bindto: '#chartProductPriceIndex',
			data : {
				type : 'line',
				x : 'x',
				columns : [
				    xColumn,
					datas
				]
			}
		});
	}
function getTradeChart(url1,url2){
    var value1 = '';
    var value2 = '';
	$.ajax({
		url         : url1,
		type        : 'GET',
		dataType    : 'json',
		async: false,
		success     : function(result){
		    value1 = result;
		    $.ajax({
                url         : url2,
                type        : 'GET',
                dataType    : 'json',
                async: false,
                success     : function(result){
                    value2 = result;
                    makeLineChart2(value1, value2)
                },
		error       : function (result) {
			console.log("error >> " + $(result).text());
		}
	})
		},
		error       : function (result) {
			console.log("error >> " + $(result).text());
		}
	})
}
function makeLineChart1(jsonData1, jsonData2) {
		var rows1 = jsonData1.StatisticSearch.row;
		var rows2 = jsonData2.StatisticSearch.row;
		var datas1 = new Array();
		var datas2 = new Array();
		var xColumn = new Array();
		xColumn.push('x')
		datas1.push(rows1[0].STAT_NAME);
		datas2.push(rows2[0].STAT_NAME);
		for (var row in rows1) {
			xColumn.push(rows1[row].TIME);
			datas1.push(rows1[row].DATA_VALUE);
		}
		for (var row in rows2) {
		    datas2.push(rows2[row].DATA_VALUE);
		}
		var chart = c3.generate({
			bindto: '#priceIndex',
			data : {
				type : 'line',
				x : 'x',
				columns : [
				    xColumn,
					datas1,
					datas2
				]
			}
		});
	}
	function makeLineChart2(jsonData1, jsonData2) {
		var rows1 = jsonData1.StatisticSearch.row;
		var rows2 = jsonData2.StatisticSearch.row;
		var datas1 = new Array();
		var datas2 = new Array();
		var xColumn = new Array();
		xColumn.push('x')
		datas1.push(rows1[0].ITEM_NAME1);
		datas2.push(rows2[0].ITEM_NAME1);
		for (var row in rows1) {
			xColumn.push(rows1[row].TIME);
			datas1.push(rows1[row].DATA_VALUE);
		}
		for (var row in rows2) {
		    datas2.push(rows2[row].DATA_VALUE);
		}
		var chart = c3.generate({
			bindto: '#chartInoutcomePriceIndex',
			data : {
				type : 'line',
				x : 'x',
				columns : [
				    xColumn,
					datas1,
					datas2
				]
			}
		});
	}
function getSalesData(){
        $.ajax({
		url         : 'http://ecos.bok.or.kr/api/StatisticSearch/UK7OYPB8FWIWM5LLJFYH/json/kr/1/10/043Y070/MM/202005/202007/A/?/DAV/',
		type        : 'GET',
		dataType    : 'json',
		success     : function (result) {
			/*makePieChart(result);*/
		},
		error : function (result) {
		    console.log(result)
			console.log("error >> " + $(result).text());
		}
	});
	}
	function makePieChart(jsonData) {
		var rows = jsonData.StatisticSearch.row;
		var datas = new Array();
		for (var row in rows) {
			var temp = new Array();
			temp.push(rows[row].TIME);
			temp.push(rows[row].DATA_VALUE);
			datas.push(temp);
		}
		var chart = c3.generate({
			bindto: '#chartSales',
			data : {
				type : 'pie',
				columns :
					datas
			},
			bar : {
				width : {
					radio : 0.5
				}
			}
		});
	}


getTradeChart('http://ecos.bok.or.kr/api/StatisticSearch/UK7OYPB8FWIWM5LLJFYH/json/kr/1/10/901Y001/MM/202001/202007/AI1BE/','http://ecos.bok.or.kr/api/StatisticSearch/UK7OYPB8FWIWM5LLJFYH/json/kr/1/10/901Y001/MM/202001/202007/AI1BD/')
getProduceChart()
getCDChart()
getLoan()
getSalesData()
