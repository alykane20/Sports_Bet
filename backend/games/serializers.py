from rest_framework import serializers
from .models import Game

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields =['id', 'sport_category', 'team_one', 'team_two', 'winning_team', 'bet_id']
        depth = 1