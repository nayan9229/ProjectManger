# Generated by Django 2.2.6 on 2019-10-10 14:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='projectId',
            field=models.CharField(default=0, max_length=120),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='todo',
            name='taskId',
            field=models.CharField(default=0, max_length=120),
            preserve_default=False,
        ),
    ]
