"""django_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from db_app import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r"categories_subcategories", views.ListAllSubCategoriesWithRespectToCategories, basename="subcategories")
router.register(r"products", views.ListProductCategories, basename="products")
router.register(r"products_data", views.ListProductTable, basename="products_data")
router.register(r"subcategories_products", views.ListAllSubCategoryProducts, basename="subcategories_products")
router.register(r"category_products", views.ListAllCategoryProducts, basename="categories_products")



urlpatterns = [
    path('admin/', admin.site.urls),
    path('categories/', views.ListAllCategories.as_view(), name = 'categories'),
    path('subcategories/', views.ListAllSubCategories.as_view(), name = 'subcategories'),
] + router.urls
