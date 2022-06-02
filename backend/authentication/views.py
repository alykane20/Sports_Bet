from django.contrib.auth import get_user_model
from .serializers import MyTokenObtainPairSerializer, RegistrationSerializer
from rest_framework import generics
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import User
from .serializers import UserSerializer
User = get_user_model()


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_data(request):
    if request.method == 'GET':
        user = User.objects.filter(id=request.user.id)
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user(request, pk):
     if request.method == 'PUT':
        user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_funds(request):       
    if request.method == 'PATCH':
        request.user.fund_balance += int(request.data['fund_increase'])
        request.user.save()
        return Response(status=status.HTTP_200_OK)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def resolve_win(request):       
    if request.method == 'PATCH':
        request.user.fund_balance += int(request.data['payout'])
        request.user.total_bets_won += 1
        request.user.save()
        return Response(status=status.HTTP_200_OK)