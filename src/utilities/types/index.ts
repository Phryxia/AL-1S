export type MakeRequired<T, P extends keyof T> = Omit<T, P> & Required<Pick<T, P>>
