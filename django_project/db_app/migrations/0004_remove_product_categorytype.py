# Generated by Django 3.2.5 on 2021-07-25 15:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('db_app', '0003_product_categorytype'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='categoryType',
        ),
    ]
