# Generated by Django 4.0.4 on 2022-05-25 18:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_alter_user_fund_balance'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='fund_balance',
            field=models.IntegerField(default=100),
        ),
    ]