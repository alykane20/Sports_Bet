from tkinter import CASCADE
from django.db import models
from authentication.models import User

class Bet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pick = models.CharField(max_length=150)
    amount_bet = models.CharField(max_length=200)
    won = models.BooleanField(default=False)
