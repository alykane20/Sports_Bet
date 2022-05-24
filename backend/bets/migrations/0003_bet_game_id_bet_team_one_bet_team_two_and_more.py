# Generated by Django 4.0.4 on 2022-05-24 15:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bets', '0002_rename_bets_bet'),
    ]

    operations = [
        migrations.AddField(
            model_name='bet',
            name='game_id',
            field=models.CharField(default='none', max_length=150),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bet',
            name='team_one',
            field=models.CharField(default='team1', max_length=150),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bet',
            name='team_two',
            field=models.CharField(default='team2', max_length=150),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bet',
            name='winning_team',
            field=models.CharField(default='TBD', max_length=150),
        ),
    ]