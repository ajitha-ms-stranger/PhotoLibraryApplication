from rest_framework import serializers
from .models import PhotoManager

class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PhotoManager
        fields = '__all__'
