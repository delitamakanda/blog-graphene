import graphene
from blog.models import Site, User, Post, Comment, Category, Tag
from blog.types import SiteType, UserType, PostType, CommentType, CategoryType, TagType

class Query(graphene.ObjectType):
    site = graphene.Field(SiteType)
    all_posts = graphene.List(PostType)
    all_categories = graphene.List(CategoryType)
    all_tags = graphene.List(TagType)
    posts_by_category = graphene.List(PostType, category=graphene.String())
    posts_by_tag = graphene.List(PostType, tag=graphene.String())
    post_by_slug = graphene.Field(PostType, slug=graphene.String())
    
    def resolve_site(root, info):
        return Site.objects.first()

    def resolve_all_posts(root, info):
        return Post.objects.all()

    def resolve_all_categories(root, info):
        return Category.objects.all()

    def resolve_all_tags(root, info):
        return Tag.objects.all()

    def resolve_posts_by_category(root, info, category):
        return Post.objects.filter(category__slug__iexact=category)

    def resolve_posts_by_tag(root, info, tag):
        return Post.objects.filter(tags__slug__iexact=tag)

    def resolve_post_by_slug(root, info, slug):
        return Post.objects.get(slug__iexact=slug)

