'use client'

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchArticleById, clearSelectedArticle, fetchArticles } from "@/store/slices/articleSlice"
import Navbar from "@/components/navbar"
import Image from "next/image"
import noImage from '../../../../../public/images/no-image.png'
import ArticleContent from "@/components/article-content"
import Footer from "@/components/footer"

export default function ArticleDetailPage() {
    const dispatch = useAppDispatch()
    const params = useParams()
    const id = Array.isArray(params.id) ? params.id[0] : params.id
    const { article, loading, error } = useAppSelector(state => state.articleReducer.detail)
    const router = useRouter();
    const { items } = useAppSelector(
        state => state.articleReducer.list
    )

    useEffect(() => {
        if (id) dispatch(fetchArticleById(id))

        return () => {
            dispatch(clearSelectedArticle())
        }
    }, [dispatch, id])

    useEffect(() => {
        dispatch(fetchArticles())
    }, [dispatch])

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error}</div>
    if (!article) return <div>Article not found</div>

    return (
        <>
            <Navbar />
            <div className="border-b border-gray-200" />
            <div className="px-5 py-10 lg:px-40 gap-6 lg:gap-10 flex flex-col">
                <div className="gap-4">
                    <div className="w-full flex justify-center text-sm font-medium text-slate-600">{article.createdAt} | Created by {article.user.username}</div>
                    <div className="w-full flex justify-center text-3xl font-semibold text-slate-900">{article.title}</div>
                </div>
                <div className="w-full h-[480px] relative">
                    <Image
                        src={article.imageUrl || noImage}
                        alt=""
                        fill
                        className="object-cover rounded-2xl"
                    />
                </div>
                <div
                    className="font-['Archivo'] text-base leading-[24px] text-slate-900"
                >
                    {article.content}
                </div>
            </div>
            <div className="gap-6 lg:gap-14 px-5 pt-10 pb-14 lg:pt-14 lg:px-44 lg:pb-24 flex flex-col">
                <div className="gap-6">
                    <div className="text-xl font-bold text-slate-900">Other articles</div>
                    <ArticleContent isDetailPage={true} currentId={id} />
                </div>
            </div>
            <Footer />
        </>
    )
}
