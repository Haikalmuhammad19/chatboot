from rest_framework import serializers
from .models import PredictionHistory


class PredictionRequestSerializer(serializers.Serializer):
    text = serializers.CharField(required=True, allow_blank=False)


class PredictionResponseSerializer(serializers.Serializer):
    text = serializers.CharField()
    predicted_subreddit = serializers.CharField()
    confidence = serializers.FloatField()
    timestamp = serializers.DateTimeField()


class PredictionHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PredictionHistory
        fields = ['id', 'text', 'predicted_subreddit', 'confidence', 'created_at']
