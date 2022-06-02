from rest_framework import serializers
from .models import Bet

class BetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bet
        fields =['id', 'pick', 'amount_bet', 'completed', 'user_id', 'team_one', 'team_two', 'winning_team', 'payout', 'game_id']
        depth = 1