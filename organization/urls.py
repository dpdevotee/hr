from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('regions', views.RegionViewSet)
router.register('countries', views.CountryViewSet)
