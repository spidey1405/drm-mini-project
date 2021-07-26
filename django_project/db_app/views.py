from rest_framework.generics import ListAPIView
from rest_framework import viewsets, mixins
from db_app.models import Category
from db_app.models import SubCategory
from db_app.models import Product
from db_app.serializers import CategorySerializer
from db_app.serializers import SubCategorySerializer
from db_app.serializers import CategorySerializerSub
from db_app.serializers import ProductCRUDSerializer
from db_app.serializers import SubCategoryProducts
from db_app.serializers import CategoryProducts
from db_app.serializers import ProductTableData




class ListAllCategories(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ListAllSubCategories(ListAPIView):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer

class ListAllSubCategoriesWithRespectToCategories(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializerSub

class ListAllSubCategoryProducts(viewsets.ReadOnlyModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategoryProducts

class ListAllCategoryProducts(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategoryProducts

class ListProductCategories(mixins.CreateModelMixin,mixins.ListModelMixin,mixins.RetrieveModelMixin,viewsets.GenericViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductCRUDSerializer

class ListProductTable(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductTableData

