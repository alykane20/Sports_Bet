# Generated by Django 4.0.4 on 2022-05-25 18:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bets', '0004_bet_payout'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bet',
            name='amount_bet',
            field=models.IntegerField(),
        ),
    ]
