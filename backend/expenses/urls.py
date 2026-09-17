from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import ExpenseViewSet, CategoryViewSet, ExpenseSummaryView

router = DefaultRouter()
router.register(r'expenses', ExpenseViewSet, basename='expense')
router.register(r'categories', CategoryViewSet, basename='category')

urlpatterns = router.urls + [
    path('summary/', ExpenseSummaryView.as_view(), name='summary'),
]
