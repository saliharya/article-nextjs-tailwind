import { Article } from '@/models/article'
import React from 'react'
import { format } from 'date-fns'
import Image from 'next/image'
import noImage from '../../public/images/no-image.png'

interface ArticleItemProps {
    article: Article
    onClick?: (article: any) => void
}

export default function ArticleItem({ article, onClick }: ArticleItemProps) {

    return (
        <div className="overflow-hidden max-w-xl" onClick={() => onClick && onClick(article)}>
            <div className="w-full h-60 relative rounded-[12px] overflow-hidden">
                <Image
                    src={article.imageUrl ?? noImage}
                    alt={article.title}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">
                    {format(new Date(article.createdAt), 'MMMM dd, yyyy')}
                </p>

                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {article.title}
                </h2>

                <p className="text-slate-600 text-base mb-4">
                    {article.content.length > 150
                        ? article.content.slice(0, 150) + '...'
                        : article.content}
                </p>

                <span className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full">
                    {article.category?.name}
                </span>
            </div>
        </div>
    )
}
