"""finalProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('home', views.index, name="home"),
    path('gologin', views.gologin, name="gologin"),
    path('login', views.login, name="login"),
    path('logout', views.logout, name="logout"),
    path('goProduct', views.goProduct, name="goProduct"),
    path('goAnalysis', views.goAnalysis, name="goAnalysis"),
    path('goAnalysisCommercial', views.goAnalysisCommercial, name="goAnalysisCommercial"),
    path('goAnalysisApart', views.goAnalysisApart, name="goAnalysisApart"),
    path('goMyPage', views.goMyPage, name="goMyPage"),
    path('mypage_info', views.mypage_info, name="mypage_info"),
    path('getCardDataForGuName', views.getCardDataForGuName, name="getCardDataForGuName"),
    path('getCardDataForDongName', views.getCardDataForDongName, name="getCardDataForDongName"),
    path('goCommercialResult', views.goCommercialResult, name="goCommercialResult"),
    path('getJuDamDataData', views.getJuDamLoanData, name="getJuDamLoanData"),
]
