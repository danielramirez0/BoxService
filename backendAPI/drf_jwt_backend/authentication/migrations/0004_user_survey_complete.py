# Generated by Django 3.2.9 on 2021-11-11 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0003_auto_20211109_0015'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='survey_complete',
            field=models.BooleanField(default=False),
        ),
    ]
