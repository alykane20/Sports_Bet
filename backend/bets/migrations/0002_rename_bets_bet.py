# Generated by Django 4.0.4 on 2022-05-19 19:48

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('bets', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Bets',
            new_name='Bet',
        ),
    ]
