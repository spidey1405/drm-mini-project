# Generated by Django 3.2.5 on 2021-07-25 09:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='categoryType',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
