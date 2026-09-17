from rest_framework import viewsets, generics
from rest_framework.response import Response
from django.db.models import Sum
from .models import Expense, Category
from django.utils import timezone
from .serializers import ExpenseSerializer, CategorySerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        qs = Expense.objects.filter(owner=self.request.user)
        category = self.request.query_params.get('category')
        if category:
            qs = qs.filter(category_id=category)
        return qs

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ExpenseSummaryView(generics.GenericAPIView):
    def get(self, request):
        qs = Expense.objects.filter(owner=request.user)
        total = qs.aggregate(total=Sum('amount'))['total'] or 0

        now = timezone.now()
        month_total = qs.filter(
            date__year=now.year,
            date__month=now.month
        ).aggregate(total=Sum('amount'))['total'] or 0

        by_category = (
            qs.values('category__name')
            .annotate(total=Sum('amount'))
            .order_by('-total')
        )
        return Response({
            'total': total,
            'month_total': month_total,
            'by_category': list(by_category)
        })