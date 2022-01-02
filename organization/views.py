from rest_framework import viewsets, serializers
from . import models


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Region
        fields = ['region_id', 'region_name']


class RegionViewSet(viewsets.ModelViewSet):
    queryset = models.Region.objects.all()
    serializer_class = RegionSerializer


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Country
        fields = ['country_id', 'country_name', 'region']


class CountryViewSet(viewsets.ModelViewSet):
    queryset = models.Country.objects.all()
    serializer_class = CountrySerializer
