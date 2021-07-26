from django.contrib import admin

from db_app.models import Category, SubCategory

@admin.register(Category)
class PersonAdmin(admin.ModelAdmin):
    pass

@admin.register(SubCategory)
class CourseAdmin(admin.ModelAdmin):
    pass