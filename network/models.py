from django.contrib.auth.models import AbstractUser, AbstractBaseUser
from django.db import models


class User(AbstractUser):

    following = models.IntegerField(default=0, blank=True)
    followers = models.IntegerField(default=0, blank=True)

    def __str__(self):
        return f"{self.username}"

    def serialize(self):
        return{
            "user": self.username,
            "following": self.following,
            "followers": self.followers
            
        }

class Post(models.Model):
    author = models.ForeignKey("User", on_delete=models.CASCADE)
    body = models.TextField(max_length=400)
    like = models.BooleanField(default=False)
    like_count = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)
 
    def serialize(self):
        return {
            "id": self.id,
            "author": self.author.username,
            "body": self.body,
            "like": self.like,
            "likes": self.like_count,
            "timestamp": self.timestamp.strftime("%b %-d %Y, %-I:%M %p")

        }

class Follow(models.Model):
    follower = models.CharField(max_length=100)
    following = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.following} is following {self.follower}"



