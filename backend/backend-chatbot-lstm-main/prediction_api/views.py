from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.utils import timezone
from .serializers import (
    PredictionRequestSerializer,
    PredictionResponseSerializer,
    PredictionHistorySerializer
)
from .models import PredictionHistory
from .ml_service import MLModelService


class PredictView(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.ml_service = MLModelService()

    def post(self, request):
        serializer = PredictionRequestSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                {"error": "Invalid input", "details": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

        text = serializer.validated_data['text']

        try:
            predicted_subreddit, confidence = self.ml_service.predict(text)

            PredictionHistory.objects.create(
                text=text,
                predicted_subreddit=predicted_subreddit,
                confidence=confidence
            )

            response_data = {
                "text": text,
                "predicted_subreddit": predicted_subreddit,
                "confidence": confidence,
                "timestamp": timezone.now()
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": "Prediction failed", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class PredictionHistoryListView(generics.ListAPIView):
    queryset = PredictionHistory.objects.all()
    serializer_class = PredictionHistorySerializer


class HealthCheckView(APIView):
    def get(self, request):
        return Response({
            "status": "healthy",
            "message": "Subreddit Prediction API is running"
        })
