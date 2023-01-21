import graphene
from graphene_django import DjangoObjectType
from blog.models import Site, User, Post, Comment, Category, Tag

class SiteType(DjangoObjectType):
    class Meta:
        model = Site


class UserType(DjangoObjectType):
    class Meta:
        model = User


class PostType(DjangoObjectType):
    class Meta:
        model = Post


class CommentType(DjangoObjectType):
    class Meta:
        model = Comment


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category


class TagType(DjangoObjectType):
    class Meta:
        model = Tag

