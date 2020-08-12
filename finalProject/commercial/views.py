from django.shortcuts import render,redirect
from django.views.decorators.csrf import csrf_exempt
import pandas as pd
from . import crawling
import numpy as np
cardData = "";
from .models import Mapper
# Create your views here.
def index(request):
    if "userid" in request.session:
        return render(request,"index.html", {"id":request.session['userid']})
    else:
        return render(request,"index.html")
def gologin(request):
    return render(request, "login/login.html")
@csrf_exempt
def login(request):
    mapper = Mapper("semiProject/kosmo@192.168.0.117:1521/orcl")
    userSession = mapper.getUserData(request.POST.get("Id",""))
    if userSession["APWD"].values[0] == request.POST.get("password",""):
        request.session["userid"] = userSession.to_json()
        return render(request, "index.html",{"session":request.session["userid"]})
    else:
        return render(request, "login/login.html")
def logout(request):
    del request.session["userid"]
    return redirect("home")
def goProduct(request):
    return render(request, "product/productSearch.html")
def goAnalysis(request):
    return render(request, "analysis/analysisMain.html")
def goAnalysisCommercial(request):
    return render(request, "analysis/analysisCommercial.html")
def goAnalysisApart(request):
    return render(request, "analysis/analysisApart.html")
def goMyPage(request):
    return render(request, "mypage/mypage.html")
@csrf_exempt
def mypage_info(request):
    mapper = Mapper("semiProject/kosmo@192.168.0.117:1521/orcl")
    print("확인 : " + request.POST.get("user_NUM",""))
    user_infor = mapper.getmemberdata(request.POST.get("user_NUM",""))
    user_data = user_infor.to_json()
    return render(request,"mypage/user_infor.html",{"userinfor":user_data})
def goMyPage_infor(request):
    return render(request, "mypage/user_infor.html",)
def getCardDataForGuName(request):
    mapper = Mapper("semiProject/kosmo@192.168.0.117:1521/orcl")
    guName = pd.Series.tolist(mapper.getGuName())
    guName = [y for x in guName for y in x]
    print(guName)
    return render(request, "server/analysisCommercialTagServer.html",{"data":guName})
def getCardDataForDongName(request):
    guName = request.GET["guName"]
    mapper = Mapper("semiProject/kosmo@192.168.0.117:1521/orcl")
    dongName = pd.Series.tolist(mapper.getDongName(guName))
    dongName = [y for x in dongName for y in x]
    return render(request, "server/analysisCommercialTagServer.html",{"data":dongName})
def goCommercialResult(request):
    return render(request, "analysis/analysisCommercialResult.html")
def getJuDamLoanData(request):
    result = crawling.getJuDanDaeLoanData()
    return render(request, "server/analysisCommercialServer.html", {"value":result[0],"time":result[1]})
def goCalc(request):
    return render(request, "analysis/taxCalc.html")
def getPriceCalc(request):
    getPrice = request.GET.get('getPrice')
    getTax = int(getPrice) * 0.04
    specialTax = int(getPrice) * 0.002
    eduTax = int(getPrice) * 0.004
    totalTax = int(getPrice) * 0.046
    result = [int(getPrice), int(getTax), int(specialTax), int(eduTax), int(totalTax)]
    return render(request, "server/calcServer.html", {"result":result,"length":len(result)})
def inheritTaxCalc(request):
    getPrice = int(request.GET.get('getPrice'))
    if getPrice <= 100000000:
        tax_ratio = 0.1
        deductible = 0
    elif  getPrice <= 500000000:
        tax_ratio = 0.2
        deductible = 10000000
    elif getPrice <= 1000000000:
        tax_ratio = 0.3
        deductible = 6000000
    elif getPrice <= 3000000000:
        tax_ratio = 0.4
        deductible = 16000000
    elif getPrice > 3000000000:
        tax_ratio = 0.5
        deductible = 46000000
    total = getPrice * tax_ratio - deductible
    result = [getPrice, int(tax_ratio*100), deductible, total]
    return render(request, "server/calcServer.html", {"result":result,"length":len(result)})