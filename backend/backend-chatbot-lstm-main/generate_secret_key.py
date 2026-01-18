#!/usr/bin/env python
"""
Generate Django Secret Key untuk production
"""
from django.core.management.utils import get_random_secret_key

if __name__ == '__main__':
    print("Generated Django Secret Key (copy & use in .env):")
    print("=" * 50)
    print(get_random_secret_key())
    print("=" * 50)
