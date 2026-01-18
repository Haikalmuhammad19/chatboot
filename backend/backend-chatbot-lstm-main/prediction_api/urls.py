from django.urls import path
from .views import PredictView, PredictionHistoryListView, HealthCheckView
from .auth_views import (
    CustomTokenObtainPairView,
    TokenRefreshViewCustom,
    RegisterView,
    ProtectedTestView
)

urlpatterns = [
    # Authentication endpoints
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshViewCustom.as_view(), name='token_refresh'),
    path('auth/test/', ProtectedTestView.as_view(), name='protected-test'),
    
    # Prediction endpoints
    path('predict/', PredictView.as_view(), name='predict'),
    path('history/', PredictionHistoryListView.as_view(), name='prediction-history'),
    path('health/', HealthCheckView.as_view(), name='health-check'),
]
