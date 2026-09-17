#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
python manage.py seed_categories

# Create superuser if it doesn't already exist
python manage.py createsuperuser --noinput || true