from django.contrib import admin
from .models import PredictionHistory


@admin.register(PredictionHistory)
class PredictionHistoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'predicted_subreddit', 'confidence', 'created_at']
    list_filter = ['predicted_subreddit', 'created_at']
    search_fields = ['text', 'predicted_subreddit']
    readonly_fields = ['created_at']
    ordering = ['-created_at']
