# Generated by Django 3.2 on 2022-01-02 23:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Country',
            fields=[
                ('country_id', models.CharField(max_length=2, primary_key=True, serialize=False, verbose_name='Unique ID')),
                ('country_name', models.CharField(max_length=40, verbose_name='Country name')),
            ],
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('department_id', models.BigAutoField(primary_key=True, serialize=False, verbose_name='Unique ID')),
                ('department_name', models.CharField(max_length=30, verbose_name='Department name')),
            ],
        ),
        migrations.CreateModel(
            name='Job',
            fields=[
                ('job_id', models.BigAutoField(primary_key=True, serialize=False, verbose_name='Unique ID')),
                ('job_title', models.CharField(max_length=35, verbose_name='Job title')),
                ('min_salary', models.DecimalField(decimal_places=2, max_digits=8, verbose_name='Minimal salary')),
                ('max_salary', models.DecimalField(decimal_places=2, max_digits=8, verbose_name='Maximal salary')),
            ],
        ),
        migrations.CreateModel(
            name='Region',
            fields=[
                ('region_id', models.BigAutoField(primary_key=True, serialize=False, verbose_name='Unique ID')),
                ('region_name', models.CharField(max_length=25, verbose_name='Region name')),
            ],
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('location_id', models.BigAutoField(primary_key=True, serialize=False, verbose_name='Unique ID')),
                ('street_address', models.CharField(max_length=40, null=True, verbose_name='Street address')),
                ('postal_code', models.CharField(max_length=12, null=True, verbose_name='Postal code')),
                ('city', models.CharField(max_length=30, verbose_name='City')),
                ('state_province', models.CharField(max_length=25, null=True, verbose_name='State province')),
                ('country', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='organization.country')),
            ],
        ),
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('employee_id', models.BigAutoField(primary_key=True, serialize=False, verbose_name='Unique ID')),
                ('first_name', models.CharField(max_length=20, verbose_name='First name')),
                ('last_name', models.CharField(max_length=25, verbose_name='Last name')),
                ('email', models.CharField(max_length=100, verbose_name='E-mail')),
                ('phone_number', models.CharField(max_length=20, null=True, verbose_name='Phone number')),
                ('hire_date', models.DateField(verbose_name='Hire date')),
                ('salary', models.DecimalField(decimal_places=2, max_digits=8, verbose_name='Salary')),
                ('department', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='organization.department')),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='organization.job')),
                ('manager', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='organization.employee')),
            ],
        ),
        migrations.CreateModel(
            name='Dependent',
            fields=[
                ('dependent_id', models.BigAutoField(primary_key=True, serialize=False, verbose_name='Unique ID')),
                ('first_name', models.CharField(max_length=50, verbose_name='First name')),
                ('last_name', models.CharField(max_length=50, verbose_name='Last name')),
                ('relationship', models.CharField(max_length=25, verbose_name='Relationship')),
                ('employee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='organization.employee')),
            ],
        ),
        migrations.AddField(
            model_name='department',
            name='location',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='organization.location'),
        ),
        migrations.AddField(
            model_name='country',
            name='region',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='organization.region'),
        ),
    ]
