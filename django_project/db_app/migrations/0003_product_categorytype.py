# Generated by Django 3.2.5 on 2021-07-25 14:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('db_app', '0002_alter_category_categorytype'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='categoryType',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='product_categories', to='db_app.category'),
        ),
    ]
