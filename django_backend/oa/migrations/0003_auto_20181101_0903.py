# Generated by Django 2.1.2 on 2018-11-01 01:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('oa', '0002_auto_20181101_0857'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='CONTENT',
            field=models.CharField(max_length=2048),
        ),
    ]
