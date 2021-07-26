from rest_framework import serializers
from db_app.models import Category
from db_app.models import SubCategory
from db_app.models import Product

class SubCategorySerializer(serializers.ModelSerializer):
    categoryTitle = serializers.CharField(source="categoryType.categoryType", read_only=True)
    class Meta:
        model = SubCategory
        fields = ('id', 'categoryTitle', 'subcategoryType')
        #fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'categoryType')

class SubCategorySerializerSpecific(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ['subcategoryType']

class SubCategoryCategorySerializerSpecific(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ['categoryType']

class ProductSerializerSpecific(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id','productName')


class CategorySerializerSub(serializers.ModelSerializer):
    subCategories = SubCategorySerializerSpecific(source='category_type', many=True)
    class Meta:
        model = Category
        fields = ('id','subCategories')

class SubCategoryProducts(serializers.ModelSerializer):
    products = ProductSerializerSpecific(source='product_subcategories', many=True)
    class Meta:
        model = SubCategory
        fields = ('id','products')

class SubCategoryProductsSpecific(serializers.ModelSerializer):
    products = ProductSerializerSpecific(source='product_subcategories', many=True)
    class Meta:
        model = SubCategory
        fields = ['products']

class ProductSerializerSpecific_ProductOnly(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id','productName')

class CategoryProducts(serializers.ModelSerializer):
    products = ProductSerializerSpecific_ProductOnly(many=True, read_only=True)
    class Meta:
        model = Category
        fields = ('id','products')


class ProductCRUDSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id','productName','subCategoryType')

class ProductTableData(serializers.ModelSerializer):
    subcategory = serializers.CharField(source="subCategoryType.subcategoryType", read_only=True)
    category = serializers.CharField(source="subCategoryType.categoryType", read_only=True)
    class Meta:
        model = Product
        fields = ('id','productName','subcategory','category')



