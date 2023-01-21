import graphene
import graphql_jwt
from blog.models import User, Comment, Post
from blog.types import UserType, CommentType, PostType

class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        username = graphene.String(required=True)
        email = graphene.String(required=True)
        password = graphene.String(required=True)


    def mutate(self, info, username, email, password):
        user = User(username=username, email=email)
        user.set_password(password)
        user.save()
        return CreateUser(user=user)


class ObtainJSONWebToken(graphql_jwt.JSONWebTokenMutation):
    user = graphene.Field(UserType)

    @classmethod
    def resolve(cls, root, info, **kwargs):
        return cls(user=info.context.user)


class CreateComment(graphene.Mutation):
    comment = graphene.Field(CommentType)

    class Arguments:
        author_id = graphene.ID(required=True)
        post_id = graphene.ID(required=True)
        content = graphene.String(required=True)

    def mutate(self, info, post_id, author_id, content):
        comment = Comment.objects.create(
            author_id=author_id,
            post_id=post_id,
            content=content
        )
        comment.save()
        return CreateComment(comment=comment)

class UpdatePostLikes(graphene.Mutation):
    post = graphene.Field(PostType)

    class Arguments:
        post_id = graphene.ID(required=True)
        author_id = graphene.ID(required=True)

    def mutate(self, info, post_id, author_id):
        post = Post.objects.get(id=post_id)
        if post.likes.filter(id=author_id).exists():
            post.likes.remove(author_id)
        else:
            post.likes.add(author_id)
        post.save()
        return UpdatePostLikes(post=post)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
    token_auth = ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    create_comment = CreateComment.Field()
    update_post_likes = UpdatePostLikes.Field()

