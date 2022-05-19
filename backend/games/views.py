from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import Game
from .serializers import GameSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def games(request):
    if request.method == 'GET':
        game = Game.objects.all()
        serializer = GameSerializer(game, many=True)
        return Response(serializer.data)