from rest_framework import viewsets, serializers, pagination
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly

from . import models


class RegionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Region
        fields = ['region_id', 'region_name']


class RegionViewSet(viewsets.ModelViewSet):
    queryset = models.Region.objects.all().order_by('region_id')
    serializer_class = RegionSerializer
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Country
        fields = ['country_id', 'country_name', 'region']


class CountryPagination(pagination.CursorPagination):
    ordering = 'country_id'


class CountryViewSet(viewsets.ModelViewSet):
    queryset = models.Country.objects.all().order_by('country_id')
    serializer_class = CountrySerializer
    pagination_class = CountryPagination
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Employee
        fields = ['employee_id', 'first_name', 'last_name', 'email']


class EmployeePagination(pagination.CursorPagination):
    ordering = 'employee_id'


class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = models.Employee.objects.all().order_by('employee_id')
    serializer_class = EmployeeSerializer
    permission_classes = [DjangoModelPermissionsOrAnonReadOnly]
