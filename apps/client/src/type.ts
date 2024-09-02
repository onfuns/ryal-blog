import { RootStore } from '@/store'
import { type GetServerSidePropsContext, type PreviewData } from 'next'
import type { ParsedUrlQuery } from 'querystring'

/** nextjs ServerSideProps begin */
export type GetServerSidePropsContextProps<
  T extends ParsedUrlQuery,
  U extends PreviewData,
> = GetServerSidePropsContext<T, U> & {
  req: GetServerSidePropsContext<T, U>['req'] & {
    query?: Record<string, any>
    mobxStore: typeof RootStore
  }
}
/** nextjs ServerSideProps end */

/** 推导 store 赋值 begin */
export type FunctionPropertyNever<T> = {
  [K in keyof T]: T[K] extends Function ? never : T[K]
}

export type NonFunctionPropertyNames<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: T[K]
}

export type ClassDataType<StoreDataType> = NonFunctionPropertyNames<
  FunctionPropertyNever<StoreDataType>
>
/** 推导 store 赋值 end */
