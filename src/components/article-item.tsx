import { Article } from '@/models/article'
import React from 'react'
import { format } from 'date-fns'
import Image from 'next/image'
import noImage from '../../public/images/no-image.png'

interface ArticleItemProps {
    article: Article
}

export default function ArticleItem({ article }: ArticleItemProps) {

    console.log('article', article)

    return (
        <div className="bg-white overflow-hidden max-w-xl">
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

                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {article.title}
                </h2>

                <p className="text-gray-600 mb-4">
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
