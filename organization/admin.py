from django.contrib import admin

from . import models

admin.site.register(models.Region)
admin.site.register(models.Country)
admin.site.register(models.Location)
admin.site.register(models.Department)
admin.site.register(models.Job)
admin.site.register(models.Employee)
admin.site.register(models.Dependent)
