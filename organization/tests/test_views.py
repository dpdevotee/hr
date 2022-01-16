import pytest
from mixer.backend.django import mixer


@pytest.mark.django_db
def test_retrieve_region(client):
    region = mixer.blend('organization.Region', region_name='Africa')

    response = client.get(f'/api/regions/{region.region_id}/')
    assert response.status_code == 200
    assert response.data == {'region_name': 'Africa',
                             'region_id': region.region_id}


@pytest.mark.django_db
def test_list_regions(client, settings):
    mixer.cycle(3).blend('organization.Region')

    settings.REST_FRAMEWORK['PAGE_SIZE'] = 2
    response = client.get(f'/api/regions/')
    print('resp:', response.data)
    assert response.status_code == 200
    assert len(response.data['results']) == 3


@pytest.mark.django_db
def test_list_employees(client, settings):
    settings.REST_FRAMEWORK['PAGE_SIZE'] = 2

    mixer.cycle(3).blend('organization.Employee', manager=None)

    response = client.get(f'/api/employees/')
    assert response.status_code == 200
    assert len(response.data['results']) == 2

    response = client.get(f'/api/employees/?page=2')
    assert response.status_code == 200
    assert len(response.data['results']) == 1

    response = client.get(f'/api/employees/?page=3')
    assert response.status_code == 404
