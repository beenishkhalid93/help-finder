# Generated by Django 5.1.1 on 2024-10-09 22:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="user",
            name="date_opened",
        ),
        migrations.RemoveField(
            model_name="user",
            name="name",
        ),
        migrations.RemoveField(
            model_name="user",
            name="status",
        ),
        migrations.RemoveField(
            model_name="user",
            name="title",
        ),
        migrations.AddField(
            model_name="user",
            name="email",
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="firstname",
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="password",
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="surname",
            field=models.CharField(max_length=100, null=True),
        ),
    ]
