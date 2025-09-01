import { ArticleDetailState } from "./articleDetailState"
import { ArticleListState } from "./articleListState"

export interface ArticleSliceState {
    list: ArticleListState
    detail: ArticleDetailState
}