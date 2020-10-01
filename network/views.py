from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
import json
from .models import Post, User, Follow
 



def index(request):
    posts = Post.objects.all()

    posts = posts.order_by("-timestamp").all()
    
   
    #return JsonResponse([post.serialize() for post in posts], safe=False)

    return render(request, "network/index.html",{
        "posts" : posts
    })



def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

@login_required
def new_post(request):

    if request.method == "POST":
        body = request.POST["post_body"]
        post = Post(author=request.user, body=body)
        post.save()

    return HttpResponseRedirect(reverse("index"))

def edit(request, post_id):

    item = Post.objects.get(id=post_id)

    try:
        post = Post.objects.get(author=request.user, id = post_id)
    except Post.DoesNotExist:
        return JsonResponse({"error":"Post does not exist"}, status=404)
    
    if request.method == "GET":
        return JsonResponse(post.serialize())
    
    elif request.method == "PUT":
        data = json.loads(request.body)
    #post_id = data.get("id","")
        body = data.get("body","")
        post.body = body
        post.save()
    else:
        return JsonResponse({"error":"PUT or GET requests required"}, status=404)
    #return render("request","network/edit.html",{
    #    "items": item
    #})

def profile(request, username):
    
    user = User.objects.get(username=username)
    post = Post.objects.filter(author=user)
    
    check = Follow.objects.filter(following = request.user, follower = username)
    if check.exists() == False:
        here = False
    else:
        here = True
    return render(request, "network/profile.html",{
        "infos" : user,
        "posts": post,
        "current_user" : request.user,
        "check": here
    })

def follow(request, follower):
    
    check = Follow(follower = follower, following = request.user)
    foll = User.objects.get(username=follower)
    foll.followers += 1
    foll.save()
    new_follow = Follow(following=request.user, follower=follower)
    new_follow.save()
    return HttpResponseRedirect(reverse("index"))

def following(request, follow):
    check = Follow.objects.filter(follower=follow)
    
    fol = check.values('following')
    print(fol)
    """ the_user = User.objects.filter(username = check.values('following')[a])
    items = Post.objects.filter(author = the_user) """
    return render(request, "network/following.html")







