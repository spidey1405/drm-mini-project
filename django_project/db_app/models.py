from django.db import models

# Create your models here.
class Category(models.Model):
    categoryType = models.CharField(max_length=100,blank = False, unique = True, null = False)
    @property
    def products(self):
        return Product.objects.filter(subCategoryType__categoryType=self)

    def __str__(self):
        return self.categoryType

class SubCategory(models.Model):
    subcategoryType = models.CharField(max_length=100)
    categoryType = models.ForeignKey(Category,on_delete=models.CASCADE, null = True, related_name='category_type')

    def __str__(self):
        return f'{self.categoryType} :: {self.subcategoryType}'
    
class Product(models.Model):
    productName = models.CharField(max_length=50,blank = False, null = False)
    subCategoryType = models.ForeignKey(SubCategory,on_delete=models.SET_NULL, null=True,related_name='product_subcategories')
    #categoryType = models.ForeignKey(Category,on_delete=models.SET_NULL, null=True,related_name='product_categories')

    def __str__(self):
        return f'{self.productName} : {self.subcategoryType}'



