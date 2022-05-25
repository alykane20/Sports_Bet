from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Bet
from .serializers import BetSerializer
from django.shortcuts import get_object_or_404


@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def user_bets(request):
    if request.method == 'POST':
        serializer = BetSerializer(data=request.data)
        if serializer.is_valid():
            request.user.fund_balance -= request.data['amount_bet']
            request.user.save()
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        bet = Bet.objects.filter(user_id=request.user.id)
        serializer = BetSerializer(bet, many=True)
        return Response(serializer.data)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def update_bet(request, pk):       
    if request.method == 'PATCH':
        bet = get_object_or_404(Bet, pk=pk)
        bet.won = True
        serializer = BetSerializer(bet, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
