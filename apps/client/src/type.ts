import { RootStore } from '@/store'
import { type GetServerSidePropsContext, type PreviewData } from 'next'
import type { ParsedUrlQuery } from 'querystring'

export type GetServerSidePropsContextProps<
  T extends ParsedUrlQuery,
  U extends PreviewData,
> = GetServerSidePropsContext<T, U> & {
  req: GetServerSidePropsContext<T, U>['req'] & {
    query?: Record<string, any>
    mobxStore: typeof RootStore
  }
}

export type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends () => void ? never : K
}[keyof T]

export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>
