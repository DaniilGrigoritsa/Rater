# Generated by Django 4.1.3 on 2022-11-26 16:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='vote',
            name='is_finished',
        ),
        migrations.RemoveField(
            model_name='vote',
            name='reward',
        ),
        migrations.AddField(
            model_name='show',
            name='reward',
            field=models.FloatField(blank=True, null=True),
        ),
    ]