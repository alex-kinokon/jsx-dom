declare const __FULL_BUILD__: boolean
declare function cast<T = any>(value: any): T

interface Array<T> {
  filter(predicate: BooleanConstructor): Exclude<T, false | "" | 0 | null | undefined>[]
}
