type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args) => any ? never : K
}[keyof T]

type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>

/** 拿出数组对象 */
type ArrayType<T extends any[] | undefined> = T extends Array<infer R> ? R : never
type NonNullable<T> = T extends null | undefined ? never : T
type PickArrayItem<T extends any[] | undefined> = ArrayType<NonNullable<T>>
