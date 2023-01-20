from django.contrib import admin
from .models import (
    Post,
    Category,
    Tag,
    Comment,
    Site,
    User,
)

class PostAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'is_published',
        'is_featured',
        'created_date',
        'updated_date',
    )
    prepopulated_fields = {'slug': ('title',)}


class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}


class TagAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}


class CommentAdmin(admin.ModelAdmin):
    list_display = (
        '__str__',
        'is_approved',
        'created_date',
    )

class UserAdmin(admin.ModelAdmin):
    list_display = (
        'username',
        'first_name',
        'last_name',
        'email',
        'date_joined',
    )


admin.site.register(Post, PostAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Tag, TagAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Site)
admin.site.register(User, UserAdmin)
