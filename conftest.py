import uuid

import pytest
from django.contrib.auth.models import Permission, Group
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def django_user(django_user_model):
    def _get_django_user(username=None, permissions=None, groups=None):
        username = username or str(uuid.uuid4())
        user = django_user_model.objects.create(username=username,
                                                password=uuid.uuid4())

        if permissions:
            for perm in permissions:
                user.user_permissions.add(
                    Permission.objects.get(codename=perm))

        if groups:
            for g in groups:
                user.groups.add(Group.objects.get(name=g))

        return user

    return _get_django_user


@pytest.fixture
def auth_token():
    def _get_auth_token(user):
        return Token.objects.create(user=user).key

    return _get_auth_token
