import pytest
from mixer.backend.django import mixer

from ..models import Region


@pytest.mark.django_db
def test_retrieve_region(api_client):
    region = mixer.blend('organization.Region', region_name='Africa')

    response = api_client.get(f'/api/regions/{region.region_id}/')
    assert response.status_code == 200
    assert response.data == {'region_name': 'Africa',
                             'region_id': region.region_id}


@pytest.mark.django_db
def test_create_region(api_client, django_user, auth_token):
    user = django_user(permissions=['add_region'])
    token = auth_token(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Token {token}')
    response = api_client.post(f'/api/regions/',
                               format='json',
                               data={'region_name': 'Africa'})
    assert response.status_code == 201
    assert response.data['region_name'] == 'Africa'
    assert 'region_id' in response.data
    assert Region.objects.get(region_id=response.data['region_id'])


@pytest.mark.django_db
def test_create_region_denied(api_client, django_user, auth_token):
    user = django_user()
    token = auth_token(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Token {token}')
    response = api_client.post(f'/api/regions/',
                               format='json',
                               data={'region_name': 'Africa'})
    assert response.status_code == 403


@pytest.mark.django_db
def test_delete_region(api_client, django_user, auth_token):
    region = mixer.blend('organization.Region', region_name='Africa')
    user = django_user(permissions=['delete_region'])
    token = auth_token(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Token {token}')
    response = api_client.delete(f'/api/regions/{region.region_id}/')
    assert response.status_code == 204
    assert Region.objects.filter(region_id=region.region_id).count() == 0


@pytest.mark.django_db
def test_delete_region_403(api_client, django_user, auth_token):
    region = mixer.blend('organization.Region', region_name='Africa')
    user = django_user()
    token = auth_token(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Token {token}')
    response = api_client.delete(f'/api/regions/{region.region_id}/')
    assert response.status_code == 403
    assert Region.objects.filter(region_id=region.region_id)


@pytest.mark.django_db
def test_edit_region(api_client, django_user, auth_token):
    region = mixer.blend('organization.Region', region_name='Africa')
    user = django_user(permissions=['change_region'])
    token = auth_token(user)
    api_client.credentials(HTTP_AUTHORIZATION=f'Token {token}')
    response = api_client.put(f'/api/regions/{region.region_id}/',
                              format='json',
                              data={'region_name': 'Antarctica'})
    assert response.status_code == 200
    assert Region.objects.get(
        region_id=region.region_id).region_name == 'Antarctica'


@pytest.mark.django_db
def test_list_regions(api_client):
    mixer.cycle(3).blend('organization.Region')

    response = api_client.get(f'/api/regions/')
    assert response.status_code == 200
    assert len(response.data['results']) == 3


@pytest.mark.django_db
def test_list_employees(api_client):
    mixer.cycle(11).blend('organization.Employee', manager=None)

    response = api_client.get(f'/api/employees/')
    assert response.status_code == 200
    assert len(response.data['results']) == 10

    response = api_client.get(f'/api/employees/?page=2')
    assert response.status_code == 200
    assert len(response.data['results']) == 1

    response = api_client.get(f'/api/employees/?page=3')
    assert response.status_code == 404
