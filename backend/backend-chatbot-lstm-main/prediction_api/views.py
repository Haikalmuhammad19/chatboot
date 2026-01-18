from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.utils import timezone
import logging
from .serializers import (
    PredictionRequestSerializer,
    PredictionResponseSerializer,
    PredictionHistorySerializer
)
from .models import PredictionHistory
from .ml_service import MLModelService

logger = logging.getLogger(__name__)


class PredictView(APIView):
    permission_classes = [IsAuthenticated]
    ml_service = None
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        try:
            if PredictView.ml_service is None:
                logger.info("Initializing ML service...")
                PredictView.ml_service = MLModelService()
                logger.info("ML service initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize ML service: {e}")
            raise

    def post(self, request):
        serializer = PredictionRequestSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {"error": "Invalid input", "details": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

        text = serializer.validated_data['text']

        try:
            predicted_subreddit, confidence = PredictView.ml_service.predict(text)

            PredictionHistory.objects.create(
                text=text,
                predicted_subreddit=predicted_subreddit,
                confidence=confidence,
                user=request.user
            )

            response_data = {
                "text": text,
                "predicted_subreddit": predicted_subreddit,
                "confidence": confidence,
                "timestamp": timezone.now()
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Prediction error: {e}")
            return Response(
                {"error": "Prediction failed", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class PredictionHistoryListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PredictionHistorySerializer

    def get_queryset(self):
        return PredictionHistory.objects.filter(user=self.request.user)


class HealthCheckView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        return Response({
            "status": "healthy",
            "message": "Subreddit Prediction API is running"
        })
