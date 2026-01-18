from django.urls import path
from .views import PredictView, PredictionHistoryListView, HealthCheckView

urlpatterns = [
    path('predict/', PredictView.as_view(), name='predict'),
    path('history/', PredictionHistoryListView.as_view(), name='prediction-history'),
    path('health/', HealthCheckView.as_view(), name='health-check'),
]
