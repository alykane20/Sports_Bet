# Generated by Django 4.0.4 on 2022-05-24 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bets', '0003_bet_game_id_bet_team_one_bet_team_two_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='bet',
            name='payout',
            field=models.CharField(default=0, max_length=150),
        ),
    ]
