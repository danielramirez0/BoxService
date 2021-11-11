# Generated by Django 3.2.9 on 2021-11-09 00:15

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BoxTier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level', models.CharField(max_length=50)),
                ('cost', models.IntegerField()),
                ('games_per_month', models.IntegerField()),
                ('bundled_accessories', models.BooleanField()),
            ],
        ),
    ]
