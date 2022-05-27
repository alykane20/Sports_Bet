from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

# from backend.games import views
from .views import RegisterView, MyTokenObtainPairView
from authentication import views

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('update/<int:pk>/', views.update_user),
    path('funds/', views.update_funds)
]
