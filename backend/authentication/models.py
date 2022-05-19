from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    fund_balance = models.CharField(default="100", max_length=300)
    total_bets_won = models.IntegerField(default=0)
    status = models.CharField(default="Newbie", max_length=100)
    current_bets = models.CharField(max_length=500)
    past_results = models.CharField(max_length=500)
    
    
    '''
    This is a custom version of the built in User class
    It contains all of the built in fields and functionality of the standard User
    You can add fields here for any additional properties you want a User to have
    This is useful for adding roles (Customer and Employee, for example)
    For just a few roles, adding boolean fields is advised
    '''
    # Example (note import of models above that is commented out)
    # this will add a column to the user table
    # is_student = models.BooleanField('student status', default=False)
