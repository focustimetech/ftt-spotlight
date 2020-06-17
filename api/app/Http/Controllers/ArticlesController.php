<?php

namespace App\Http\Controllers;

use App\Article;
use App\ArticleGroup;
use App\ArticleSection;
use App\User;
use App\Http\Resources\Article as ArticleResource;
use App\Http\Resources\ArticleGroup as ArticleGroupResource;
use App\Http\Resources\ArticleSection as ArticleSectionResource;
use Illuminate\Http\Request;

class ArticlesController extends Controller
{
    private function verifyAccess(User $user, $sectionId)
    {
        return true;
    }

    private function findArticle($articleId)
    {
        $user = auth()->user();
        $article = Article::findOrFail($articleId);
        $group = ArticleGroup::findOrFail($article->group_id);
        $section = ArticleSection::findOrFail($group->section_id);
        if ($this->verifyAccess($user, $section->id)) {
            return $article;
        } else {
            return response()->json(["This User doesn't have access to this Article."], 403);
        }
    }

    public function getSection($sectionId)
    {
        $user = auth()->user();
        if ($this->verifyAccess($user, $sectionId)) {
            $section = ArticleSection::findOrFail($sectionId);
            return new ArticleSectionResource($section);
        } else {
            return response()->json(["This User doesn't have access to this Article Section."], 403);
        }
    }

    public function getGroup($groupId)
    {
        $user = auth()->user();
        $group = ArticleGroup::findOrFail($groupId);
        $section = ArticleSection::findOrFail($group->section_id);
        if ($this->verifyAccess($user, $section->id)) {
            return new ArticleGroupResource($group);
        } else {
            return response()->json(["This User doesn't have access to this Article Group."], 403);
        }
    }

    public function getArticle($articleId)
    {
        $article = $this->findArticle($articleId);
        return new ArticleResource($article);
    }

    public function getArticleContent($articleId)
    {
        $article = $this->findArticle($articleId);
        return $article->content;
    }
}
