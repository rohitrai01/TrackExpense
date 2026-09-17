from django.core.management.base import BaseCommand
from expenses.models import Category

class Command(BaseCommand):
    help = 'Seed default expense categories'

    def handle(self, *args, **kwargs):
        categories = ["Food", "Transport", "Rent", "Utilities", "Entertainment"]
        for name in categories:
            obj, created = Category.objects.get_or_create(name=name)
            if created:
                self.stdout.write(f"Created category: {name}")
            else:
                self.stdout.write(f"Already exists: {name}")