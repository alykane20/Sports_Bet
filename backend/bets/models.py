from tkinter import CASCADE
from django.db import models
from authentication.models import User

class Bet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pick = models.CharField(max_length=150)
    amount_bet = models.IntegerField()
    completed = models.BooleanField(default=False)
    team_one = models.CharField(max_length=150)
    team_two = models.CharField(max_length=150)
    winning_team = models.CharField(default="TBD", max_length=150)
    payout = models.CharField(default=0, max_length=150)
    game_id = models.CharField(max_length=150)
