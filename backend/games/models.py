from django.db import models
from bets.models import Bet

class Game(models.Model):
    bet = models.ForeignKey(Bet, on_delete=models.CASCADE)
    sport_category = models.CharField(max_length=150)
    team_one = models.CharField(max_length=150)
    team_two = models.CharField(max_length=150)
    winning_team = models.CharField(max_length=150)

