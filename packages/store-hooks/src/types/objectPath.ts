// Thanks @cefn for the whole of this
export type PathImpl<T, Key extends keyof T> = Key extends string
    ? T[Key] extends Record<string, any>
    ?
    | `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof any[]>> &
    string}`
    | `${Key}.${Exclude<keyof T[Key], keyof any[]> & string}`
    : never
    : never;

export type DescendantPath<T> = PathImpl<T, keyof T> | keyof T;

export type Path<T> = keyof T extends string
    ? DescendantPath<T> extends string | keyof T
    ? DescendantPath<T>
    : keyof T
    : never

export type PathValue<
    T,
    P extends Path<T>,
> = P extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
    ? Rest extends Path<T[Key]>
    ? PathValue<T[Key], Rest>
    : never
    : never
    : P extends keyof T
    ? T[P]
    : never;