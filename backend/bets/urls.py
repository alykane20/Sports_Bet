from django.urls import path
from bets import views

urlpatterns = [
    path('', views.user_bets),
    path('<int:pk>/', views.update_bet),  
]