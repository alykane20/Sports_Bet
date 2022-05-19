from django.urls import path
from bets import views

urlpatterns = [
    path('', views.user_bets),
    
]