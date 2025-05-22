
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Post
 * 
 */
export type Post = $Result.DefaultSelection<Prisma.$PostPayload>
/**
 * Model PostComment
 * 
 */
export type PostComment = $Result.DefaultSelection<Prisma.$PostCommentPayload>
/**
 * Model ArrestLog
 * 
 */
export type ArrestLog = $Result.DefaultSelection<Prisma.$ArrestLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  USER: 'USER',
  GUEST: 'GUEST'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.postComment`: Exposes CRUD operations for the **PostComment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostComments
    * const postComments = await prisma.postComment.findMany()
    * ```
    */
  get postComment(): Prisma.PostCommentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.arrestLog`: Exposes CRUD operations for the **ArrestLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArrestLogs
    * const arrestLogs = await prisma.arrestLog.findMany()
    * ```
    */
  get arrestLog(): Prisma.ArrestLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Post: 'Post',
    PostComment: 'PostComment',
    ArrestLog: 'ArrestLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "post" | "postComment" | "arrestLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Post: {
        payload: Prisma.$PostPayload<ExtArgs>
        fields: Prisma.PostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findFirst: {
            args: Prisma.PostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findMany: {
            args: Prisma.PostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          create: {
            args: Prisma.PostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          createMany: {
            args: Prisma.PostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          delete: {
            args: Prisma.PostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          update: {
            args: Prisma.PostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          deleteMany: {
            args: Prisma.PostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          upsert: {
            args: Prisma.PostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.PostGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
      PostComment: {
        payload: Prisma.$PostCommentPayload<ExtArgs>
        fields: Prisma.PostCommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostCommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostCommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCommentPayload>
          }
          findFirst: {
            args: Prisma.PostCommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostCommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCommentPayload>
          }
          findMany: {
            args: Prisma.PostCommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCommentPayload>[]
          }
          create: {
            args: Prisma.PostCommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCommentPayload>
          }
          createMany: {
            args: Prisma.PostCommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostCommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCommentPayload>[]
          }
          delete: {
            args: Prisma.PostCommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCommentPayload>
          }
          update: {
            args: Prisma.PostCommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCommentPayload>
          }
          deleteMany: {
            args: Prisma.PostCommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostCommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostCommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCommentPayload>[]
          }
          upsert: {
            args: Prisma.PostCommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostCommentPayload>
          }
          aggregate: {
            args: Prisma.PostCommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostComment>
          }
          groupBy: {
            args: Prisma.PostCommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostCommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCommentCountArgs<ExtArgs>
            result: $Utils.Optional<PostCommentCountAggregateOutputType> | number
          }
        }
      }
      ArrestLog: {
        payload: Prisma.$ArrestLogPayload<ExtArgs>
        fields: Prisma.ArrestLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArrestLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArrestLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArrestLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArrestLogPayload>
          }
          findFirst: {
            args: Prisma.ArrestLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArrestLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArrestLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArrestLogPayload>
          }
          findMany: {
            args: Prisma.ArrestLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArrestLogPayload>[]
          }
          create: {
            args: Prisma.ArrestLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArrestLogPayload>
          }
          createMany: {
            args: Prisma.ArrestLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArrestLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArrestLogPayload>[]
          }
          delete: {
            args: Prisma.ArrestLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArrestLogPayload>
          }
          update: {
            args: Prisma.ArrestLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArrestLogPayload>
          }
          deleteMany: {
            args: Prisma.ArrestLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArrestLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArrestLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArrestLogPayload>[]
          }
          upsert: {
            args: Prisma.ArrestLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArrestLogPayload>
          }
          aggregate: {
            args: Prisma.ArrestLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArrestLog>
          }
          groupBy: {
            args: Prisma.ArrestLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArrestLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArrestLogCountArgs<ExtArgs>
            result: $Utils.Optional<ArrestLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    post?: PostOmit
    postComment?: PostCommentOmit
    arrestLog?: ArrestLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    posts: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | UserCountOutputTypeCountPostsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  }


  /**
   * Count Type PostCountOutputType
   */

  export type PostCountOutputType = {
    postComments: number
  }

  export type PostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    postComments?: boolean | PostCountOutputTypeCountPostCommentsArgs
  }

  // Custom InputTypes
  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCountOutputType
     */
    select?: PostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountPostCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostCommentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    firstname: string | null
    lastname: string | null
    username: string | null
    email: string | null
    role: $Enums.Role | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    firstname: string | null
    lastname: string | null
    username: string | null
    email: string | null
    role: $Enums.Role | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    firstname: number
    lastname: number
    username: number
    email: number
    role: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    firstname?: true
    lastname?: true
    username?: true
    email?: true
    role?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    firstname?: true
    lastname?: true
    username?: true
    email?: true
    role?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    firstname?: true
    lastname?: true
    username?: true
    email?: true
    role?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    firstname: string
    lastname: string
    username: string
    email: string
    role: $Enums.Role
    password: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstname?: boolean
    lastname?: boolean
    username?: boolean
    email?: boolean
    role?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    posts?: boolean | User$postsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstname?: boolean
    lastname?: boolean
    username?: boolean
    email?: boolean
    role?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstname?: boolean
    lastname?: boolean
    username?: boolean
    email?: boolean
    role?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    firstname?: boolean
    lastname?: boolean
    username?: boolean
    email?: boolean
    role?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstname" | "lastname" | "username" | "email" | "role" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | User$postsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      posts: Prisma.$PostPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstname: string
      lastname: string
      username: string
      email: string
      role: $Enums.Role
      password: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    posts<T extends User$postsArgs<ExtArgs> = {}>(args?: Subset<T, User$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly firstname: FieldRef<"User", 'String'>
    readonly lastname: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly password: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.posts
   */
  export type User$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Post
   */

  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostAvgAggregateOutputType = {
    id: number | null
    arrestLogId: number | null
  }

  export type PostSumAggregateOutputType = {
    id: number | null
    arrestLogId: number | null
  }

  export type PostMinAggregateOutputType = {
    id: number | null
    title: string | null
    body: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    arrestLogId: number | null
  }

  export type PostMaxAggregateOutputType = {
    id: number | null
    title: string | null
    body: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    arrestLogId: number | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    title: number
    body: number
    userId: number
    createdAt: number
    updatedAt: number
    arrestLogId: number
    _all: number
  }


  export type PostAvgAggregateInputType = {
    id?: true
    arrestLogId?: true
  }

  export type PostSumAggregateInputType = {
    id?: true
    arrestLogId?: true
  }

  export type PostMinAggregateInputType = {
    id?: true
    title?: true
    body?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    arrestLogId?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    title?: true
    body?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    arrestLogId?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    title?: true
    body?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    arrestLogId?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Post to aggregate.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type PostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    orderBy?: PostOrderByWithAggregationInput | PostOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _avg?: PostAvgAggregateInputType
    _sum?: PostSumAggregateInputType
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    id: number
    title: string
    body: string
    userId: string
    createdAt: Date
    updatedAt: Date
    arrestLogId: number | null
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type PostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    body?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    arrestLogId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    postComments?: boolean | Post$postCommentsArgs<ExtArgs>
    arrestLog?: boolean | Post$arrestLogArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    body?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    arrestLogId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    body?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    arrestLogId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectScalar = {
    id?: boolean
    title?: boolean
    body?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    arrestLogId?: boolean
  }

  export type PostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "body" | "userId" | "createdAt" | "updatedAt" | "arrestLogId", ExtArgs["result"]["post"]>
  export type PostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    postComments?: boolean | Post$postCommentsArgs<ExtArgs>
    arrestLog?: boolean | Post$arrestLogArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Post"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      postComments: Prisma.$PostCommentPayload<ExtArgs>[]
      arrestLog: Prisma.$ArrestLogPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      body: string
      userId: string
      createdAt: Date
      updatedAt: Date
      arrestLogId: number | null
    }, ExtArgs["result"]["post"]>
    composites: {}
  }

  type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = $Result.GetResult<Prisma.$PostPayload, S>

  type PostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface PostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Post'], meta: { name: 'Post' } }
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostFindUniqueArgs>(args: SelectSubset<T, PostFindUniqueArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Post that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(args: SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostFindFirstArgs>(args?: SelectSubset<T, PostFindFirstArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(args?: SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostFindManyArgs>(args?: SelectSubset<T, PostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
     */
    create<T extends PostCreateArgs>(args: SelectSubset<T, PostCreateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Posts.
     * @param {PostCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostCreateManyArgs>(args?: SelectSubset<T, PostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Posts and returns the data saved in the database.
     * @param {PostCreateManyAndReturnArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostCreateManyAndReturnArgs>(args?: SelectSubset<T, PostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
     */
    delete<T extends PostDeleteArgs>(args: SelectSubset<T, PostDeleteArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostUpdateArgs>(args: SelectSubset<T, PostUpdateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostDeleteManyArgs>(args?: SelectSubset<T, PostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostUpdateManyArgs>(args: SelectSubset<T, PostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts and returns the data updated in the database.
     * @param {PostUpdateManyAndReturnArgs} args - Arguments to update many Posts.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostUpdateManyAndReturnArgs>(args: SelectSubset<T, PostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
     */
    upsert<T extends PostUpsertArgs>(args: SelectSubset<T, PostUpsertArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Post model
   */
  readonly fields: PostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    postComments<T extends Post$postCommentsArgs<ExtArgs> = {}>(args?: Subset<T, Post$postCommentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    arrestLog<T extends Post$arrestLogArgs<ExtArgs> = {}>(args?: Subset<T, Post$arrestLogArgs<ExtArgs>>): Prisma__ArrestLogClient<$Result.GetResult<Prisma.$ArrestLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Post model
   */
  interface PostFieldRefs {
    readonly id: FieldRef<"Post", 'Int'>
    readonly title: FieldRef<"Post", 'String'>
    readonly body: FieldRef<"Post", 'String'>
    readonly userId: FieldRef<"Post", 'String'>
    readonly createdAt: FieldRef<"Post", 'DateTime'>
    readonly updatedAt: FieldRef<"Post", 'DateTime'>
    readonly arrestLogId: FieldRef<"Post", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Post findUnique
   */
  export type PostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findUniqueOrThrow
   */
  export type PostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findFirst
   */
  export type PostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findFirstOrThrow
   */
  export type PostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findMany
   */
  export type PostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post create
   */
  export type PostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to create a Post.
     */
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }

  /**
   * Post createMany
   */
  export type PostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post createManyAndReturn
   */
  export type PostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Post update
   */
  export type PostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to update a Post.
     */
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    /**
     * Choose, which Post to update.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Post updateManyAndReturn
   */
  export type PostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Post upsert
   */
  export type PostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The filter to search for the Post to update in case it exists.
     */
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     */
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }

  /**
   * Post delete
   */
  export type PostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter which Post to delete.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Posts to delete
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to delete.
     */
    limit?: number
  }

  /**
   * Post.postComments
   */
  export type Post$postCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentInclude<ExtArgs> | null
    where?: PostCommentWhereInput
    orderBy?: PostCommentOrderByWithRelationInput | PostCommentOrderByWithRelationInput[]
    cursor?: PostCommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostCommentScalarFieldEnum | PostCommentScalarFieldEnum[]
  }

  /**
   * Post.arrestLog
   */
  export type Post$arrestLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArrestLog
     */
    select?: ArrestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArrestLog
     */
    omit?: ArrestLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArrestLogInclude<ExtArgs> | null
    where?: ArrestLogWhereInput
  }

  /**
   * Post without action
   */
  export type PostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
  }


  /**
   * Model PostComment
   */

  export type AggregatePostComment = {
    _count: PostCommentCountAggregateOutputType | null
    _avg: PostCommentAvgAggregateOutputType | null
    _sum: PostCommentSumAggregateOutputType | null
    _min: PostCommentMinAggregateOutputType | null
    _max: PostCommentMaxAggregateOutputType | null
  }

  export type PostCommentAvgAggregateOutputType = {
    id: number | null
    postId: number | null
  }

  export type PostCommentSumAggregateOutputType = {
    id: number | null
    postId: number | null
  }

  export type PostCommentMinAggregateOutputType = {
    id: number | null
    postId: number | null
    body: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostCommentMaxAggregateOutputType = {
    id: number | null
    postId: number | null
    body: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostCommentCountAggregateOutputType = {
    id: number
    postId: number
    body: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PostCommentAvgAggregateInputType = {
    id?: true
    postId?: true
  }

  export type PostCommentSumAggregateInputType = {
    id?: true
    postId?: true
  }

  export type PostCommentMinAggregateInputType = {
    id?: true
    postId?: true
    body?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostCommentMaxAggregateInputType = {
    id?: true
    postId?: true
    body?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostCommentCountAggregateInputType = {
    id?: true
    postId?: true
    body?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PostCommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostComment to aggregate.
     */
    where?: PostCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostComments to fetch.
     */
    orderBy?: PostCommentOrderByWithRelationInput | PostCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostComments
    **/
    _count?: true | PostCommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostCommentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostCommentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostCommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostCommentMaxAggregateInputType
  }

  export type GetPostCommentAggregateType<T extends PostCommentAggregateArgs> = {
        [P in keyof T & keyof AggregatePostComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostComment[P]>
      : GetScalarType<T[P], AggregatePostComment[P]>
  }




  export type PostCommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostCommentWhereInput
    orderBy?: PostCommentOrderByWithAggregationInput | PostCommentOrderByWithAggregationInput[]
    by: PostCommentScalarFieldEnum[] | PostCommentScalarFieldEnum
    having?: PostCommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCommentCountAggregateInputType | true
    _avg?: PostCommentAvgAggregateInputType
    _sum?: PostCommentSumAggregateInputType
    _min?: PostCommentMinAggregateInputType
    _max?: PostCommentMaxAggregateInputType
  }

  export type PostCommentGroupByOutputType = {
    id: number
    postId: number
    body: string
    createdAt: Date
    updatedAt: Date
    _count: PostCommentCountAggregateOutputType | null
    _avg: PostCommentAvgAggregateOutputType | null
    _sum: PostCommentSumAggregateOutputType | null
    _min: PostCommentMinAggregateOutputType | null
    _max: PostCommentMaxAggregateOutputType | null
  }

  type GetPostCommentGroupByPayload<T extends PostCommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostCommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostCommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostCommentGroupByOutputType[P]>
            : GetScalarType<T[P], PostCommentGroupByOutputType[P]>
        }
      >
    >


  export type PostCommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    body?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postComment"]>

  export type PostCommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    body?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postComment"]>

  export type PostCommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    body?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postComment"]>

  export type PostCommentSelectScalar = {
    id?: boolean
    postId?: boolean
    body?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PostCommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "postId" | "body" | "createdAt" | "updatedAt", ExtArgs["result"]["postComment"]>
  export type PostCommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
  }
  export type PostCommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
  }
  export type PostCommentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | PostDefaultArgs<ExtArgs>
  }

  export type $PostCommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostComment"
    objects: {
      post: Prisma.$PostPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      postId: number
      body: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["postComment"]>
    composites: {}
  }

  type PostCommentGetPayload<S extends boolean | null | undefined | PostCommentDefaultArgs> = $Result.GetResult<Prisma.$PostCommentPayload, S>

  type PostCommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostCommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCommentCountAggregateInputType | true
    }

  export interface PostCommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostComment'], meta: { name: 'PostComment' } }
    /**
     * Find zero or one PostComment that matches the filter.
     * @param {PostCommentFindUniqueArgs} args - Arguments to find a PostComment
     * @example
     * // Get one PostComment
     * const postComment = await prisma.postComment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostCommentFindUniqueArgs>(args: SelectSubset<T, PostCommentFindUniqueArgs<ExtArgs>>): Prisma__PostCommentClient<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PostComment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostCommentFindUniqueOrThrowArgs} args - Arguments to find a PostComment
     * @example
     * // Get one PostComment
     * const postComment = await prisma.postComment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostCommentFindUniqueOrThrowArgs>(args: SelectSubset<T, PostCommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostCommentClient<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostComment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCommentFindFirstArgs} args - Arguments to find a PostComment
     * @example
     * // Get one PostComment
     * const postComment = await prisma.postComment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostCommentFindFirstArgs>(args?: SelectSubset<T, PostCommentFindFirstArgs<ExtArgs>>): Prisma__PostCommentClient<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostComment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCommentFindFirstOrThrowArgs} args - Arguments to find a PostComment
     * @example
     * // Get one PostComment
     * const postComment = await prisma.postComment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostCommentFindFirstOrThrowArgs>(args?: SelectSubset<T, PostCommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostCommentClient<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PostComments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostComments
     * const postComments = await prisma.postComment.findMany()
     * 
     * // Get first 10 PostComments
     * const postComments = await prisma.postComment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postCommentWithIdOnly = await prisma.postComment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostCommentFindManyArgs>(args?: SelectSubset<T, PostCommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PostComment.
     * @param {PostCommentCreateArgs} args - Arguments to create a PostComment.
     * @example
     * // Create one PostComment
     * const PostComment = await prisma.postComment.create({
     *   data: {
     *     // ... data to create a PostComment
     *   }
     * })
     * 
     */
    create<T extends PostCommentCreateArgs>(args: SelectSubset<T, PostCommentCreateArgs<ExtArgs>>): Prisma__PostCommentClient<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PostComments.
     * @param {PostCommentCreateManyArgs} args - Arguments to create many PostComments.
     * @example
     * // Create many PostComments
     * const postComment = await prisma.postComment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostCommentCreateManyArgs>(args?: SelectSubset<T, PostCommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PostComments and returns the data saved in the database.
     * @param {PostCommentCreateManyAndReturnArgs} args - Arguments to create many PostComments.
     * @example
     * // Create many PostComments
     * const postComment = await prisma.postComment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PostComments and only return the `id`
     * const postCommentWithIdOnly = await prisma.postComment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostCommentCreateManyAndReturnArgs>(args?: SelectSubset<T, PostCommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PostComment.
     * @param {PostCommentDeleteArgs} args - Arguments to delete one PostComment.
     * @example
     * // Delete one PostComment
     * const PostComment = await prisma.postComment.delete({
     *   where: {
     *     // ... filter to delete one PostComment
     *   }
     * })
     * 
     */
    delete<T extends PostCommentDeleteArgs>(args: SelectSubset<T, PostCommentDeleteArgs<ExtArgs>>): Prisma__PostCommentClient<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PostComment.
     * @param {PostCommentUpdateArgs} args - Arguments to update one PostComment.
     * @example
     * // Update one PostComment
     * const postComment = await prisma.postComment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostCommentUpdateArgs>(args: SelectSubset<T, PostCommentUpdateArgs<ExtArgs>>): Prisma__PostCommentClient<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PostComments.
     * @param {PostCommentDeleteManyArgs} args - Arguments to filter PostComments to delete.
     * @example
     * // Delete a few PostComments
     * const { count } = await prisma.postComment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostCommentDeleteManyArgs>(args?: SelectSubset<T, PostCommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostComments
     * const postComment = await prisma.postComment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostCommentUpdateManyArgs>(args: SelectSubset<T, PostCommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostComments and returns the data updated in the database.
     * @param {PostCommentUpdateManyAndReturnArgs} args - Arguments to update many PostComments.
     * @example
     * // Update many PostComments
     * const postComment = await prisma.postComment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PostComments and only return the `id`
     * const postCommentWithIdOnly = await prisma.postComment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostCommentUpdateManyAndReturnArgs>(args: SelectSubset<T, PostCommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PostComment.
     * @param {PostCommentUpsertArgs} args - Arguments to update or create a PostComment.
     * @example
     * // Update or create a PostComment
     * const postComment = await prisma.postComment.upsert({
     *   create: {
     *     // ... data to create a PostComment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostComment we want to update
     *   }
     * })
     */
    upsert<T extends PostCommentUpsertArgs>(args: SelectSubset<T, PostCommentUpsertArgs<ExtArgs>>): Prisma__PostCommentClient<$Result.GetResult<Prisma.$PostCommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PostComments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCommentCountArgs} args - Arguments to filter PostComments to count.
     * @example
     * // Count the number of PostComments
     * const count = await prisma.postComment.count({
     *   where: {
     *     // ... the filter for the PostComments we want to count
     *   }
     * })
    **/
    count<T extends PostCommentCountArgs>(
      args?: Subset<T, PostCommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostCommentAggregateArgs>(args: Subset<T, PostCommentAggregateArgs>): Prisma.PrismaPromise<GetPostCommentAggregateType<T>>

    /**
     * Group by PostComment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostCommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostCommentGroupByArgs['orderBy'] }
        : { orderBy?: PostCommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostCommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostComment model
   */
  readonly fields: PostCommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostComment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostCommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends PostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostDefaultArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PostComment model
   */
  interface PostCommentFieldRefs {
    readonly id: FieldRef<"PostComment", 'Int'>
    readonly postId: FieldRef<"PostComment", 'Int'>
    readonly body: FieldRef<"PostComment", 'String'>
    readonly createdAt: FieldRef<"PostComment", 'DateTime'>
    readonly updatedAt: FieldRef<"PostComment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PostComment findUnique
   */
  export type PostCommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentInclude<ExtArgs> | null
    /**
     * Filter, which PostComment to fetch.
     */
    where: PostCommentWhereUniqueInput
  }

  /**
   * PostComment findUniqueOrThrow
   */
  export type PostCommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentInclude<ExtArgs> | null
    /**
     * Filter, which PostComment to fetch.
     */
    where: PostCommentWhereUniqueInput
  }

  /**
   * PostComment findFirst
   */
  export type PostCommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentInclude<ExtArgs> | null
    /**
     * Filter, which PostComment to fetch.
     */
    where?: PostCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostComments to fetch.
     */
    orderBy?: PostCommentOrderByWithRelationInput | PostCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostComments.
     */
    cursor?: PostCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostComments.
     */
    distinct?: PostCommentScalarFieldEnum | PostCommentScalarFieldEnum[]
  }

  /**
   * PostComment findFirstOrThrow
   */
  export type PostCommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentInclude<ExtArgs> | null
    /**
     * Filter, which PostComment to fetch.
     */
    where?: PostCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostComments to fetch.
     */
    orderBy?: PostCommentOrderByWithRelationInput | PostCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostComments.
     */
    cursor?: PostCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostComments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostComments.
     */
    distinct?: PostCommentScalarFieldEnum | PostCommentScalarFieldEnum[]
  }

  /**
   * PostComment findMany
   */
  export type PostCommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentInclude<ExtArgs> | null
    /**
     * Filter, which PostComments to fetch.
     */
    where?: PostCommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostComments to fetch.
     */
    orderBy?: PostCommentOrderByWithRelationInput | PostCommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostComments.
     */
    cursor?: PostCommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostComments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostComments.
     */
    skip?: number
    distinct?: PostCommentScalarFieldEnum | PostCommentScalarFieldEnum[]
  }

  /**
   * PostComment create
   */
  export type PostCommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentInclude<ExtArgs> | null
    /**
     * The data needed to create a PostComment.
     */
    data: XOR<PostCommentCreateInput, PostCommentUncheckedCreateInput>
  }

  /**
   * PostComment createMany
   */
  export type PostCommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostComments.
     */
    data: PostCommentCreateManyInput | PostCommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostComment createManyAndReturn
   */
  export type PostCommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * The data used to create many PostComments.
     */
    data: PostCommentCreateManyInput | PostCommentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostComment update
   */
  export type PostCommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentInclude<ExtArgs> | null
    /**
     * The data needed to update a PostComment.
     */
    data: XOR<PostCommentUpdateInput, PostCommentUncheckedUpdateInput>
    /**
     * Choose, which PostComment to update.
     */
    where: PostCommentWhereUniqueInput
  }

  /**
   * PostComment updateMany
   */
  export type PostCommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostComments.
     */
    data: XOR<PostCommentUpdateManyMutationInput, PostCommentUncheckedUpdateManyInput>
    /**
     * Filter which PostComments to update
     */
    where?: PostCommentWhereInput
    /**
     * Limit how many PostComments to update.
     */
    limit?: number
  }

  /**
   * PostComment updateManyAndReturn
   */
  export type PostCommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * The data used to update PostComments.
     */
    data: XOR<PostCommentUpdateManyMutationInput, PostCommentUncheckedUpdateManyInput>
    /**
     * Filter which PostComments to update
     */
    where?: PostCommentWhereInput
    /**
     * Limit how many PostComments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostComment upsert
   */
  export type PostCommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentInclude<ExtArgs> | null
    /**
     * The filter to search for the PostComment to update in case it exists.
     */
    where: PostCommentWhereUniqueInput
    /**
     * In case the PostComment found by the `where` argument doesn't exist, create a new PostComment with this data.
     */
    create: XOR<PostCommentCreateInput, PostCommentUncheckedCreateInput>
    /**
     * In case the PostComment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostCommentUpdateInput, PostCommentUncheckedUpdateInput>
  }

  /**
   * PostComment delete
   */
  export type PostCommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentInclude<ExtArgs> | null
    /**
     * Filter which PostComment to delete.
     */
    where: PostCommentWhereUniqueInput
  }

  /**
   * PostComment deleteMany
   */
  export type PostCommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostComments to delete
     */
    where?: PostCommentWhereInput
    /**
     * Limit how many PostComments to delete.
     */
    limit?: number
  }

  /**
   * PostComment without action
   */
  export type PostCommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostComment
     */
    select?: PostCommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostComment
     */
    omit?: PostCommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostCommentInclude<ExtArgs> | null
  }


  /**
   * Model ArrestLog
   */

  export type AggregateArrestLog = {
    _count: ArrestLogCountAggregateOutputType | null
    _avg: ArrestLogAvgAggregateOutputType | null
    _sum: ArrestLogSumAggregateOutputType | null
    _min: ArrestLogMinAggregateOutputType | null
    _max: ArrestLogMaxAggregateOutputType | null
  }

  export type ArrestLogAvgAggregateOutputType = {
    id: number | null
    OBJECTID: number | null
    OBJECTID_1: number | null
    postId: number | null
  }

  export type ArrestLogSumAggregateOutputType = {
    id: number | null
    OBJECTID: number | null
    OBJECTID_1: number | null
    postId: number | null
  }

  export type ArrestLogMinAggregateOutputType = {
    id: number | null
    AGE: string | null
    ARREST_STATUS: string | null
    ArrestLocationAptFlr: string | null
    ArrestLocationCity: string | null
    ArrestLocationStreet: string | null
    ArrestLocationStreetNBR: string | null
    Arrest_Charge: string | null
    Arrest_ID: string | null
    Case_Number: string | null
    Charge_Description: string | null
    Charge_Sequence: string | null
    DATE_ARRESTED: string | null
    DOB: string | null
    Degree: string | null
    FIRSTNAME: string | null
    LASTNAME: string | null
    MIDDLENAME: string | null
    OBJECTID: number | null
    OBJECTID_1: number | null
    RACE: string | null
    SEX: string | null
    SUFFIX: string | null
    TIME_ARREST: string | null
    UNIQUEKEY: string | null
    postId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArrestLogMaxAggregateOutputType = {
    id: number | null
    AGE: string | null
    ARREST_STATUS: string | null
    ArrestLocationAptFlr: string | null
    ArrestLocationCity: string | null
    ArrestLocationStreet: string | null
    ArrestLocationStreetNBR: string | null
    Arrest_Charge: string | null
    Arrest_ID: string | null
    Case_Number: string | null
    Charge_Description: string | null
    Charge_Sequence: string | null
    DATE_ARRESTED: string | null
    DOB: string | null
    Degree: string | null
    FIRSTNAME: string | null
    LASTNAME: string | null
    MIDDLENAME: string | null
    OBJECTID: number | null
    OBJECTID_1: number | null
    RACE: string | null
    SEX: string | null
    SUFFIX: string | null
    TIME_ARREST: string | null
    UNIQUEKEY: string | null
    postId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ArrestLogCountAggregateOutputType = {
    id: number
    AGE: number
    ARREST_STATUS: number
    ArrestLocationAptFlr: number
    ArrestLocationCity: number
    ArrestLocationStreet: number
    ArrestLocationStreetNBR: number
    Arrest_Charge: number
    Arrest_ID: number
    Case_Number: number
    Charge_Description: number
    Charge_Sequence: number
    DATE_ARRESTED: number
    DOB: number
    Degree: number
    FIRSTNAME: number
    LASTNAME: number
    MIDDLENAME: number
    OBJECTID: number
    OBJECTID_1: number
    RACE: number
    SEX: number
    SUFFIX: number
    TIME_ARREST: number
    UNIQUEKEY: number
    postId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ArrestLogAvgAggregateInputType = {
    id?: true
    OBJECTID?: true
    OBJECTID_1?: true
    postId?: true
  }

  export type ArrestLogSumAggregateInputType = {
    id?: true
    OBJECTID?: true
    OBJECTID_1?: true
    postId?: true
  }

  export type ArrestLogMinAggregateInputType = {
    id?: true
    AGE?: true
    ARREST_STATUS?: true
    ArrestLocationAptFlr?: true
    ArrestLocationCity?: true
    ArrestLocationStreet?: true
    ArrestLocationStreetNBR?: true
    Arrest_Charge?: true
    Arrest_ID?: true
    Case_Number?: true
    Charge_Description?: true
    Charge_Sequence?: true
    DATE_ARRESTED?: true
    DOB?: true
    Degree?: true
    FIRSTNAME?: true
    LASTNAME?: true
    MIDDLENAME?: true
    OBJECTID?: true
    OBJECTID_1?: true
    RACE?: true
    SEX?: true
    SUFFIX?: true
    TIME_ARREST?: true
    UNIQUEKEY?: true
    postId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArrestLogMaxAggregateInputType = {
    id?: true
    AGE?: true
    ARREST_STATUS?: true
    ArrestLocationAptFlr?: true
    ArrestLocationCity?: true
    ArrestLocationStreet?: true
    ArrestLocationStreetNBR?: true
    Arrest_Charge?: true
    Arrest_ID?: true
    Case_Number?: true
    Charge_Description?: true
    Charge_Sequence?: true
    DATE_ARRESTED?: true
    DOB?: true
    Degree?: true
    FIRSTNAME?: true
    LASTNAME?: true
    MIDDLENAME?: true
    OBJECTID?: true
    OBJECTID_1?: true
    RACE?: true
    SEX?: true
    SUFFIX?: true
    TIME_ARREST?: true
    UNIQUEKEY?: true
    postId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ArrestLogCountAggregateInputType = {
    id?: true
    AGE?: true
    ARREST_STATUS?: true
    ArrestLocationAptFlr?: true
    ArrestLocationCity?: true
    ArrestLocationStreet?: true
    ArrestLocationStreetNBR?: true
    Arrest_Charge?: true
    Arrest_ID?: true
    Case_Number?: true
    Charge_Description?: true
    Charge_Sequence?: true
    DATE_ARRESTED?: true
    DOB?: true
    Degree?: true
    FIRSTNAME?: true
    LASTNAME?: true
    MIDDLENAME?: true
    OBJECTID?: true
    OBJECTID_1?: true
    RACE?: true
    SEX?: true
    SUFFIX?: true
    TIME_ARREST?: true
    UNIQUEKEY?: true
    postId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ArrestLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArrestLog to aggregate.
     */
    where?: ArrestLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArrestLogs to fetch.
     */
    orderBy?: ArrestLogOrderByWithRelationInput | ArrestLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArrestLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArrestLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArrestLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArrestLogs
    **/
    _count?: true | ArrestLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ArrestLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ArrestLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArrestLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArrestLogMaxAggregateInputType
  }

  export type GetArrestLogAggregateType<T extends ArrestLogAggregateArgs> = {
        [P in keyof T & keyof AggregateArrestLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArrestLog[P]>
      : GetScalarType<T[P], AggregateArrestLog[P]>
  }




  export type ArrestLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArrestLogWhereInput
    orderBy?: ArrestLogOrderByWithAggregationInput | ArrestLogOrderByWithAggregationInput[]
    by: ArrestLogScalarFieldEnum[] | ArrestLogScalarFieldEnum
    having?: ArrestLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArrestLogCountAggregateInputType | true
    _avg?: ArrestLogAvgAggregateInputType
    _sum?: ArrestLogSumAggregateInputType
    _min?: ArrestLogMinAggregateInputType
    _max?: ArrestLogMaxAggregateInputType
  }

  export type ArrestLogGroupByOutputType = {
    id: number
    AGE: string | null
    ARREST_STATUS: string | null
    ArrestLocationAptFlr: string | null
    ArrestLocationCity: string | null
    ArrestLocationStreet: string | null
    ArrestLocationStreetNBR: string | null
    Arrest_Charge: string | null
    Arrest_ID: string | null
    Case_Number: string | null
    Charge_Description: string | null
    Charge_Sequence: string | null
    DATE_ARRESTED: string | null
    DOB: string | null
    Degree: string | null
    FIRSTNAME: string | null
    LASTNAME: string | null
    MIDDLENAME: string | null
    OBJECTID: number | null
    OBJECTID_1: number | null
    RACE: string | null
    SEX: string | null
    SUFFIX: string | null
    TIME_ARREST: string | null
    UNIQUEKEY: string | null
    postId: number
    createdAt: Date
    updatedAt: Date
    _count: ArrestLogCountAggregateOutputType | null
    _avg: ArrestLogAvgAggregateOutputType | null
    _sum: ArrestLogSumAggregateOutputType | null
    _min: ArrestLogMinAggregateOutputType | null
    _max: ArrestLogMaxAggregateOutputType | null
  }

  type GetArrestLogGroupByPayload<T extends ArrestLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArrestLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArrestLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArrestLogGroupByOutputType[P]>
            : GetScalarType<T[P], ArrestLogGroupByOutputType[P]>
        }
      >
    >


  export type ArrestLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    AGE?: boolean
    ARREST_STATUS?: boolean
    ArrestLocationAptFlr?: boolean
    ArrestLocationCity?: boolean
    ArrestLocationStreet?: boolean
    ArrestLocationStreetNBR?: boolean
    Arrest_Charge?: boolean
    Arrest_ID?: boolean
    Case_Number?: boolean
    Charge_Description?: boolean
    Charge_Sequence?: boolean
    DATE_ARRESTED?: boolean
    DOB?: boolean
    Degree?: boolean
    FIRSTNAME?: boolean
    LASTNAME?: boolean
    MIDDLENAME?: boolean
    OBJECTID?: boolean
    OBJECTID_1?: boolean
    RACE?: boolean
    SEX?: boolean
    SUFFIX?: boolean
    TIME_ARREST?: boolean
    UNIQUEKEY?: boolean
    postId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    post?: boolean | ArrestLog$postArgs<ExtArgs>
  }, ExtArgs["result"]["arrestLog"]>

  export type ArrestLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    AGE?: boolean
    ARREST_STATUS?: boolean
    ArrestLocationAptFlr?: boolean
    ArrestLocationCity?: boolean
    ArrestLocationStreet?: boolean
    ArrestLocationStreetNBR?: boolean
    Arrest_Charge?: boolean
    Arrest_ID?: boolean
    Case_Number?: boolean
    Charge_Description?: boolean
    Charge_Sequence?: boolean
    DATE_ARRESTED?: boolean
    DOB?: boolean
    Degree?: boolean
    FIRSTNAME?: boolean
    LASTNAME?: boolean
    MIDDLENAME?: boolean
    OBJECTID?: boolean
    OBJECTID_1?: boolean
    RACE?: boolean
    SEX?: boolean
    SUFFIX?: boolean
    TIME_ARREST?: boolean
    UNIQUEKEY?: boolean
    postId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    post?: boolean | ArrestLog$postArgs<ExtArgs>
  }, ExtArgs["result"]["arrestLog"]>

  export type ArrestLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    AGE?: boolean
    ARREST_STATUS?: boolean
    ArrestLocationAptFlr?: boolean
    ArrestLocationCity?: boolean
    ArrestLocationStreet?: boolean
    ArrestLocationStreetNBR?: boolean
    Arrest_Charge?: boolean
    Arrest_ID?: boolean
    Case_Number?: boolean
    Charge_Description?: boolean
    Charge_Sequence?: boolean
    DATE_ARRESTED?: boolean
    DOB?: boolean
    Degree?: boolean
    FIRSTNAME?: boolean
    LASTNAME?: boolean
    MIDDLENAME?: boolean
    OBJECTID?: boolean
    OBJECTID_1?: boolean
    RACE?: boolean
    SEX?: boolean
    SUFFIX?: boolean
    TIME_ARREST?: boolean
    UNIQUEKEY?: boolean
    postId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    post?: boolean | ArrestLog$postArgs<ExtArgs>
  }, ExtArgs["result"]["arrestLog"]>

  export type ArrestLogSelectScalar = {
    id?: boolean
    AGE?: boolean
    ARREST_STATUS?: boolean
    ArrestLocationAptFlr?: boolean
    ArrestLocationCity?: boolean
    ArrestLocationStreet?: boolean
    ArrestLocationStreetNBR?: boolean
    Arrest_Charge?: boolean
    Arrest_ID?: boolean
    Case_Number?: boolean
    Charge_Description?: boolean
    Charge_Sequence?: boolean
    DATE_ARRESTED?: boolean
    DOB?: boolean
    Degree?: boolean
    FIRSTNAME?: boolean
    LASTNAME?: boolean
    MIDDLENAME?: boolean
    OBJECTID?: boolean
    OBJECTID_1?: boolean
    RACE?: boolean
    SEX?: boolean
    SUFFIX?: boolean
    TIME_ARREST?: boolean
    UNIQUEKEY?: boolean
    postId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ArrestLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "AGE" | "ARREST_STATUS" | "ArrestLocationAptFlr" | "ArrestLocationCity" | "ArrestLocationStreet" | "ArrestLocationStreetNBR" | "Arrest_Charge" | "Arrest_ID" | "Case_Number" | "Charge_Description" | "Charge_Sequence" | "DATE_ARRESTED" | "DOB" | "Degree" | "FIRSTNAME" | "LASTNAME" | "MIDDLENAME" | "OBJECTID" | "OBJECTID_1" | "RACE" | "SEX" | "SUFFIX" | "TIME_ARREST" | "UNIQUEKEY" | "postId" | "createdAt" | "updatedAt", ExtArgs["result"]["arrestLog"]>
  export type ArrestLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | ArrestLog$postArgs<ExtArgs>
  }
  export type ArrestLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | ArrestLog$postArgs<ExtArgs>
  }
  export type ArrestLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | ArrestLog$postArgs<ExtArgs>
  }

  export type $ArrestLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArrestLog"
    objects: {
      post: Prisma.$PostPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      AGE: string | null
      ARREST_STATUS: string | null
      ArrestLocationAptFlr: string | null
      ArrestLocationCity: string | null
      ArrestLocationStreet: string | null
      ArrestLocationStreetNBR: string | null
      Arrest_Charge: string | null
      Arrest_ID: string | null
      Case_Number: string | null
      Charge_Description: string | null
      Charge_Sequence: string | null
      DATE_ARRESTED: string | null
      DOB: string | null
      Degree: string | null
      FIRSTNAME: string | null
      LASTNAME: string | null
      MIDDLENAME: string | null
      OBJECTID: number | null
      OBJECTID_1: number | null
      RACE: string | null
      SEX: string | null
      SUFFIX: string | null
      TIME_ARREST: string | null
      UNIQUEKEY: string | null
      postId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["arrestLog"]>
    composites: {}
  }

  type ArrestLogGetPayload<S extends boolean | null | undefined | ArrestLogDefaultArgs> = $Result.GetResult<Prisma.$ArrestLogPayload, S>

  type ArrestLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArrestLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArrestLogCountAggregateInputType | true
    }

  export interface ArrestLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArrestLog'], meta: { name: 'ArrestLog' } }
    /**
     * Find zero or one ArrestLog that matches the filter.
     * @param {ArrestLogFindUniqueArgs} args - Arguments to find a ArrestLog
     * @example
     * // Get one ArrestLog
     * const arrestLog = await prisma.arrestLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArrestLogFindUniqueArgs>(args: SelectSubset<T, ArrestLogFindUniqueArgs<ExtArgs>>): Prisma__ArrestLogClient<$Result.GetResult<Prisma.$ArrestLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ArrestLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArrestLogFindUniqueOrThrowArgs} args - Arguments to find a ArrestLog
     * @example
     * // Get one ArrestLog
     * const arrestLog = await prisma.arrestLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArrestLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ArrestLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArrestLogClient<$Result.GetResult<Prisma.$ArrestLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArrestLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArrestLogFindFirstArgs} args - Arguments to find a ArrestLog
     * @example
     * // Get one ArrestLog
     * const arrestLog = await prisma.arrestLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArrestLogFindFirstArgs>(args?: SelectSubset<T, ArrestLogFindFirstArgs<ExtArgs>>): Prisma__ArrestLogClient<$Result.GetResult<Prisma.$ArrestLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArrestLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArrestLogFindFirstOrThrowArgs} args - Arguments to find a ArrestLog
     * @example
     * // Get one ArrestLog
     * const arrestLog = await prisma.arrestLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArrestLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ArrestLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArrestLogClient<$Result.GetResult<Prisma.$ArrestLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ArrestLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArrestLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArrestLogs
     * const arrestLogs = await prisma.arrestLog.findMany()
     * 
     * // Get first 10 ArrestLogs
     * const arrestLogs = await prisma.arrestLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const arrestLogWithIdOnly = await prisma.arrestLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArrestLogFindManyArgs>(args?: SelectSubset<T, ArrestLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArrestLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ArrestLog.
     * @param {ArrestLogCreateArgs} args - Arguments to create a ArrestLog.
     * @example
     * // Create one ArrestLog
     * const ArrestLog = await prisma.arrestLog.create({
     *   data: {
     *     // ... data to create a ArrestLog
     *   }
     * })
     * 
     */
    create<T extends ArrestLogCreateArgs>(args: SelectSubset<T, ArrestLogCreateArgs<ExtArgs>>): Prisma__ArrestLogClient<$Result.GetResult<Prisma.$ArrestLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ArrestLogs.
     * @param {ArrestLogCreateManyArgs} args - Arguments to create many ArrestLogs.
     * @example
     * // Create many ArrestLogs
     * const arrestLog = await prisma.arrestLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArrestLogCreateManyArgs>(args?: SelectSubset<T, ArrestLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ArrestLogs and returns the data saved in the database.
     * @param {ArrestLogCreateManyAndReturnArgs} args - Arguments to create many ArrestLogs.
     * @example
     * // Create many ArrestLogs
     * const arrestLog = await prisma.arrestLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ArrestLogs and only return the `id`
     * const arrestLogWithIdOnly = await prisma.arrestLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArrestLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ArrestLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArrestLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ArrestLog.
     * @param {ArrestLogDeleteArgs} args - Arguments to delete one ArrestLog.
     * @example
     * // Delete one ArrestLog
     * const ArrestLog = await prisma.arrestLog.delete({
     *   where: {
     *     // ... filter to delete one ArrestLog
     *   }
     * })
     * 
     */
    delete<T extends ArrestLogDeleteArgs>(args: SelectSubset<T, ArrestLogDeleteArgs<ExtArgs>>): Prisma__ArrestLogClient<$Result.GetResult<Prisma.$ArrestLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ArrestLog.
     * @param {ArrestLogUpdateArgs} args - Arguments to update one ArrestLog.
     * @example
     * // Update one ArrestLog
     * const arrestLog = await prisma.arrestLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArrestLogUpdateArgs>(args: SelectSubset<T, ArrestLogUpdateArgs<ExtArgs>>): Prisma__ArrestLogClient<$Result.GetResult<Prisma.$ArrestLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ArrestLogs.
     * @param {ArrestLogDeleteManyArgs} args - Arguments to filter ArrestLogs to delete.
     * @example
     * // Delete a few ArrestLogs
     * const { count } = await prisma.arrestLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArrestLogDeleteManyArgs>(args?: SelectSubset<T, ArrestLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArrestLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArrestLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArrestLogs
     * const arrestLog = await prisma.arrestLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArrestLogUpdateManyArgs>(args: SelectSubset<T, ArrestLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArrestLogs and returns the data updated in the database.
     * @param {ArrestLogUpdateManyAndReturnArgs} args - Arguments to update many ArrestLogs.
     * @example
     * // Update many ArrestLogs
     * const arrestLog = await prisma.arrestLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ArrestLogs and only return the `id`
     * const arrestLogWithIdOnly = await prisma.arrestLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ArrestLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ArrestLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArrestLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ArrestLog.
     * @param {ArrestLogUpsertArgs} args - Arguments to update or create a ArrestLog.
     * @example
     * // Update or create a ArrestLog
     * const arrestLog = await prisma.arrestLog.upsert({
     *   create: {
     *     // ... data to create a ArrestLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArrestLog we want to update
     *   }
     * })
     */
    upsert<T extends ArrestLogUpsertArgs>(args: SelectSubset<T, ArrestLogUpsertArgs<ExtArgs>>): Prisma__ArrestLogClient<$Result.GetResult<Prisma.$ArrestLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ArrestLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArrestLogCountArgs} args - Arguments to filter ArrestLogs to count.
     * @example
     * // Count the number of ArrestLogs
     * const count = await prisma.arrestLog.count({
     *   where: {
     *     // ... the filter for the ArrestLogs we want to count
     *   }
     * })
    **/
    count<T extends ArrestLogCountArgs>(
      args?: Subset<T, ArrestLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArrestLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArrestLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArrestLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArrestLogAggregateArgs>(args: Subset<T, ArrestLogAggregateArgs>): Prisma.PrismaPromise<GetArrestLogAggregateType<T>>

    /**
     * Group by ArrestLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArrestLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArrestLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArrestLogGroupByArgs['orderBy'] }
        : { orderBy?: ArrestLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArrestLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArrestLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArrestLog model
   */
  readonly fields: ArrestLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArrestLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArrestLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends ArrestLog$postArgs<ExtArgs> = {}>(args?: Subset<T, ArrestLog$postArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ArrestLog model
   */
  interface ArrestLogFieldRefs {
    readonly id: FieldRef<"ArrestLog", 'Int'>
    readonly AGE: FieldRef<"ArrestLog", 'String'>
    readonly ARREST_STATUS: FieldRef<"ArrestLog", 'String'>
    readonly ArrestLocationAptFlr: FieldRef<"ArrestLog", 'String'>
    readonly ArrestLocationCity: FieldRef<"ArrestLog", 'String'>
    readonly ArrestLocationStreet: FieldRef<"ArrestLog", 'String'>
    readonly ArrestLocationStreetNBR: FieldRef<"ArrestLog", 'String'>
    readonly Arrest_Charge: FieldRef<"ArrestLog", 'String'>
    readonly Arrest_ID: FieldRef<"ArrestLog", 'String'>
    readonly Case_Number: FieldRef<"ArrestLog", 'String'>
    readonly Charge_Description: FieldRef<"ArrestLog", 'String'>
    readonly Charge_Sequence: FieldRef<"ArrestLog", 'String'>
    readonly DATE_ARRESTED: FieldRef<"ArrestLog", 'String'>
    readonly DOB: FieldRef<"ArrestLog", 'String'>
    readonly Degree: FieldRef<"ArrestLog", 'String'>
    readonly FIRSTNAME: FieldRef<"ArrestLog", 'String'>
    readonly LASTNAME: FieldRef<"ArrestLog", 'String'>
    readonly MIDDLENAME: FieldRef<"ArrestLog", 'String'>
    readonly OBJECTID: FieldRef<"ArrestLog", 'Int'>
    readonly OBJECTID_1: FieldRef<"ArrestLog", 'Int'>
    readonly RACE: FieldRef<"ArrestLog", 'String'>
    readonly SEX: FieldRef<"ArrestLog", 'String'>
    readonly SUFFIX: FieldRef<"ArrestLog", 'String'>
    readonly TIME_ARREST: FieldRef<"ArrestLog", 'String'>
    readonly UNIQUEKEY: FieldRef<"ArrestLog", 'String'>
    readonly postId: FieldRef<"ArrestLog", 'Int'>
    readonly createdAt: FieldRef<"ArrestLog", 'DateTime'>
    readonly updatedAt: FieldRef<"ArrestLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ArrestLog findUnique
   */
  export type ArrestLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArrestLog
     */
    select?: ArrestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArrestLog
     */
    omit?: ArrestLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArrestLogInclude<ExtArgs> | null
    /**
     * Filter, which ArrestLog to fetch.
     */
    where: ArrestLogWhereUniqueInput
  }

  /**
   * ArrestLog findUniqueOrThrow
   */
  export type ArrestLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArrestLog
     */
    select?: ArrestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArrestLog
     */
    omit?: ArrestLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArrestLogInclude<ExtArgs> | null
    /**
     * Filter, which ArrestLog to fetch.
     */
    where: ArrestLogWhereUniqueInput
  }

  /**
   * ArrestLog findFirst
   */
  export type ArrestLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArrestLog
     */
    select?: ArrestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArrestLog
     */
    omit?: ArrestLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArrestLogInclude<ExtArgs> | null
    /**
     * Filter, which ArrestLog to fetch.
     */
    where?: ArrestLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArrestLogs to fetch.
     */
    orderBy?: ArrestLogOrderByWithRelationInput | ArrestLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArrestLogs.
     */
    cursor?: ArrestLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArrestLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArrestLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArrestLogs.
     */
    distinct?: ArrestLogScalarFieldEnum | ArrestLogScalarFieldEnum[]
  }

  /**
   * ArrestLog findFirstOrThrow
   */
  export type ArrestLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArrestLog
     */
    select?: ArrestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArrestLog
     */
    omit?: ArrestLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArrestLogInclude<ExtArgs> | null
    /**
     * Filter, which ArrestLog to fetch.
     */
    where?: ArrestLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArrestLogs to fetch.
     */
    orderBy?: ArrestLogOrderByWithRelationInput | ArrestLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArrestLogs.
     */
    cursor?: ArrestLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArrestLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArrestLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArrestLogs.
     */
    distinct?: ArrestLogScalarFieldEnum | ArrestLogScalarFieldEnum[]
  }

  /**
   * ArrestLog findMany
   */
  export type ArrestLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArrestLog
     */
    select?: ArrestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArrestLog
     */
    omit?: ArrestLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArrestLogInclude<ExtArgs> | null
    /**
     * Filter, which ArrestLogs to fetch.
     */
    where?: ArrestLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArrestLogs to fetch.
     */
    orderBy?: ArrestLogOrderByWithRelationInput | ArrestLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArrestLogs.
     */
    cursor?: ArrestLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArrestLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArrestLogs.
     */
    skip?: number
    distinct?: ArrestLogScalarFieldEnum | ArrestLogScalarFieldEnum[]
  }

  /**
   * ArrestLog create
   */
  export type ArrestLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArrestLog
     */
    select?: ArrestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArrestLog
     */
    omit?: ArrestLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArrestLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ArrestLog.
     */
    data: XOR<ArrestLogCreateInput, ArrestLogUncheckedCreateInput>
  }

  /**
   * ArrestLog createMany
   */
  export type ArrestLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArrestLogs.
     */
    data: ArrestLogCreateManyInput | ArrestLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ArrestLog createManyAndReturn
   */
  export type ArrestLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArrestLog
     */
    select?: ArrestLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArrestLog
     */
    omit?: ArrestLogOmit<ExtArgs> | null
    /**
     * The data used to create many ArrestLogs.
     */
    data: ArrestLogCreateManyInput | ArrestLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArrestLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArrestLog update
   */
  export type ArrestLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArrestLog
     */
    select?: ArrestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArrestLog
     */
    omit?: ArrestLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArrestLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ArrestLog.
     */
    data: XOR<ArrestLogUpdateInput, ArrestLogUncheckedUpdateInput>
    /**
     * Choose, which ArrestLog to update.
     */
    where: ArrestLogWhereUniqueInput
  }

  /**
   * ArrestLog updateMany
   */
  export type ArrestLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArrestLogs.
     */
    data: XOR<ArrestLogUpdateManyMutationInput, ArrestLogUncheckedUpdateManyInput>
    /**
     * Filter which ArrestLogs to update
     */
    where?: ArrestLogWhereInput
    /**
     * Limit how many ArrestLogs to update.
     */
    limit?: number
  }

  /**
   * ArrestLog updateManyAndReturn
   */
  export type ArrestLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArrestLog
     */
    select?: ArrestLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArrestLog
     */
    omit?: ArrestLogOmit<ExtArgs> | null
    /**
     * The data used to update ArrestLogs.
     */
    data: XOR<ArrestLogUpdateManyMutationInput, ArrestLogUncheckedUpdateManyInput>
    /**
     * Filter which ArrestLogs to update
     */
    where?: ArrestLogWhereInput
    /**
     * Limit how many ArrestLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArrestLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArrestLog upsert
   */
  export type ArrestLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArrestLog
     */
    select?: ArrestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArrestLog
     */
    omit?: ArrestLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArrestLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ArrestLog to update in case it exists.
     */
    where: ArrestLogWhereUniqueInput
    /**
     * In case the ArrestLog found by the `where` argument doesn't exist, create a new ArrestLog with this data.
     */
    create: XOR<ArrestLogCreateInput, ArrestLogUncheckedCreateInput>
    /**
     * In case the ArrestLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArrestLogUpdateInput, ArrestLogUncheckedUpdateInput>
  }

  /**
   * ArrestLog delete
   */
  export type ArrestLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArrestLog
     */
    select?: ArrestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArrestLog
     */
    omit?: ArrestLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArrestLogInclude<ExtArgs> | null
    /**
     * Filter which ArrestLog to delete.
     */
    where: ArrestLogWhereUniqueInput
  }

  /**
   * ArrestLog deleteMany
   */
  export type ArrestLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArrestLogs to delete
     */
    where?: ArrestLogWhereInput
    /**
     * Limit how many ArrestLogs to delete.
     */
    limit?: number
  }

  /**
   * ArrestLog.post
   */
  export type ArrestLog$postArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
  }

  /**
   * ArrestLog without action
   */
  export type ArrestLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArrestLog
     */
    select?: ArrestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArrestLog
     */
    omit?: ArrestLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArrestLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    firstname: 'firstname',
    lastname: 'lastname',
    username: 'username',
    email: 'email',
    role: 'role',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PostScalarFieldEnum: {
    id: 'id',
    title: 'title',
    body: 'body',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    arrestLogId: 'arrestLogId'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const PostCommentScalarFieldEnum: {
    id: 'id',
    postId: 'postId',
    body: 'body',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PostCommentScalarFieldEnum = (typeof PostCommentScalarFieldEnum)[keyof typeof PostCommentScalarFieldEnum]


  export const ArrestLogScalarFieldEnum: {
    id: 'id',
    AGE: 'AGE',
    ARREST_STATUS: 'ARREST_STATUS',
    ArrestLocationAptFlr: 'ArrestLocationAptFlr',
    ArrestLocationCity: 'ArrestLocationCity',
    ArrestLocationStreet: 'ArrestLocationStreet',
    ArrestLocationStreetNBR: 'ArrestLocationStreetNBR',
    Arrest_Charge: 'Arrest_Charge',
    Arrest_ID: 'Arrest_ID',
    Case_Number: 'Case_Number',
    Charge_Description: 'Charge_Description',
    Charge_Sequence: 'Charge_Sequence',
    DATE_ARRESTED: 'DATE_ARRESTED',
    DOB: 'DOB',
    Degree: 'Degree',
    FIRSTNAME: 'FIRSTNAME',
    LASTNAME: 'LASTNAME',
    MIDDLENAME: 'MIDDLENAME',
    OBJECTID: 'OBJECTID',
    OBJECTID_1: 'OBJECTID_1',
    RACE: 'RACE',
    SEX: 'SEX',
    SUFFIX: 'SUFFIX',
    TIME_ARREST: 'TIME_ARREST',
    UNIQUEKEY: 'UNIQUEKEY',
    postId: 'postId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ArrestLogScalarFieldEnum = (typeof ArrestLogScalarFieldEnum)[keyof typeof ArrestLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    firstname?: StringFilter<"User"> | string
    lastname?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    posts?: PostListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    username?: SortOrder
    email?: SortOrder
    role?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    posts?: PostOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstname?: StringFilter<"User"> | string
    lastname?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    password?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    posts?: PostListRelationFilter
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    username?: SortOrder
    email?: SortOrder
    role?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    firstname?: StringWithAggregatesFilter<"User"> | string
    lastname?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    password?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type PostWhereInput = {
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    id?: IntFilter<"Post"> | number
    title?: StringFilter<"Post"> | string
    body?: StringFilter<"Post"> | string
    userId?: StringFilter<"Post"> | string
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    arrestLogId?: IntNullableFilter<"Post"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    postComments?: PostCommentListRelationFilter
    arrestLog?: XOR<ArrestLogNullableScalarRelationFilter, ArrestLogWhereInput> | null
  }

  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    body?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    arrestLogId?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    postComments?: PostCommentOrderByRelationAggregateInput
    arrestLog?: ArrestLogOrderByWithRelationInput
  }

  export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    title?: StringFilter<"Post"> | string
    body?: StringFilter<"Post"> | string
    userId?: StringFilter<"Post"> | string
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    arrestLogId?: IntNullableFilter<"Post"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    postComments?: PostCommentListRelationFilter
    arrestLog?: XOR<ArrestLogNullableScalarRelationFilter, ArrestLogWhereInput> | null
  }, "id">

  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    body?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    arrestLogId?: SortOrderInput | SortOrder
    _count?: PostCountOrderByAggregateInput
    _avg?: PostAvgOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
    _sum?: PostSumOrderByAggregateInput
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    OR?: PostScalarWhereWithAggregatesInput[]
    NOT?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Post"> | number
    title?: StringWithAggregatesFilter<"Post"> | string
    body?: StringWithAggregatesFilter<"Post"> | string
    userId?: StringWithAggregatesFilter<"Post"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    arrestLogId?: IntNullableWithAggregatesFilter<"Post"> | number | null
  }

  export type PostCommentWhereInput = {
    AND?: PostCommentWhereInput | PostCommentWhereInput[]
    OR?: PostCommentWhereInput[]
    NOT?: PostCommentWhereInput | PostCommentWhereInput[]
    id?: IntFilter<"PostComment"> | number
    postId?: IntFilter<"PostComment"> | number
    body?: StringFilter<"PostComment"> | string
    createdAt?: DateTimeFilter<"PostComment"> | Date | string
    updatedAt?: DateTimeFilter<"PostComment"> | Date | string
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
  }

  export type PostCommentOrderByWithRelationInput = {
    id?: SortOrder
    postId?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    post?: PostOrderByWithRelationInput
  }

  export type PostCommentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PostCommentWhereInput | PostCommentWhereInput[]
    OR?: PostCommentWhereInput[]
    NOT?: PostCommentWhereInput | PostCommentWhereInput[]
    postId?: IntFilter<"PostComment"> | number
    body?: StringFilter<"PostComment"> | string
    createdAt?: DateTimeFilter<"PostComment"> | Date | string
    updatedAt?: DateTimeFilter<"PostComment"> | Date | string
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
  }, "id">

  export type PostCommentOrderByWithAggregationInput = {
    id?: SortOrder
    postId?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PostCommentCountOrderByAggregateInput
    _avg?: PostCommentAvgOrderByAggregateInput
    _max?: PostCommentMaxOrderByAggregateInput
    _min?: PostCommentMinOrderByAggregateInput
    _sum?: PostCommentSumOrderByAggregateInput
  }

  export type PostCommentScalarWhereWithAggregatesInput = {
    AND?: PostCommentScalarWhereWithAggregatesInput | PostCommentScalarWhereWithAggregatesInput[]
    OR?: PostCommentScalarWhereWithAggregatesInput[]
    NOT?: PostCommentScalarWhereWithAggregatesInput | PostCommentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PostComment"> | number
    postId?: IntWithAggregatesFilter<"PostComment"> | number
    body?: StringWithAggregatesFilter<"PostComment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PostComment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PostComment"> | Date | string
  }

  export type ArrestLogWhereInput = {
    AND?: ArrestLogWhereInput | ArrestLogWhereInput[]
    OR?: ArrestLogWhereInput[]
    NOT?: ArrestLogWhereInput | ArrestLogWhereInput[]
    id?: IntFilter<"ArrestLog"> | number
    AGE?: StringNullableFilter<"ArrestLog"> | string | null
    ARREST_STATUS?: StringNullableFilter<"ArrestLog"> | string | null
    ArrestLocationAptFlr?: StringNullableFilter<"ArrestLog"> | string | null
    ArrestLocationCity?: StringNullableFilter<"ArrestLog"> | string | null
    ArrestLocationStreet?: StringNullableFilter<"ArrestLog"> | string | null
    ArrestLocationStreetNBR?: StringNullableFilter<"ArrestLog"> | string | null
    Arrest_Charge?: StringNullableFilter<"ArrestLog"> | string | null
    Arrest_ID?: StringNullableFilter<"ArrestLog"> | string | null
    Case_Number?: StringNullableFilter<"ArrestLog"> | string | null
    Charge_Description?: StringNullableFilter<"ArrestLog"> | string | null
    Charge_Sequence?: StringNullableFilter<"ArrestLog"> | string | null
    DATE_ARRESTED?: StringNullableFilter<"ArrestLog"> | string | null
    DOB?: StringNullableFilter<"ArrestLog"> | string | null
    Degree?: StringNullableFilter<"ArrestLog"> | string | null
    FIRSTNAME?: StringNullableFilter<"ArrestLog"> | string | null
    LASTNAME?: StringNullableFilter<"ArrestLog"> | string | null
    MIDDLENAME?: StringNullableFilter<"ArrestLog"> | string | null
    OBJECTID?: IntNullableFilter<"ArrestLog"> | number | null
    OBJECTID_1?: IntNullableFilter<"ArrestLog"> | number | null
    RACE?: StringNullableFilter<"ArrestLog"> | string | null
    SEX?: StringNullableFilter<"ArrestLog"> | string | null
    SUFFIX?: StringNullableFilter<"ArrestLog"> | string | null
    TIME_ARREST?: StringNullableFilter<"ArrestLog"> | string | null
    UNIQUEKEY?: StringNullableFilter<"ArrestLog"> | string | null
    postId?: IntFilter<"ArrestLog"> | number
    createdAt?: DateTimeFilter<"ArrestLog"> | Date | string
    updatedAt?: DateTimeFilter<"ArrestLog"> | Date | string
    post?: XOR<PostNullableScalarRelationFilter, PostWhereInput> | null
  }

  export type ArrestLogOrderByWithRelationInput = {
    id?: SortOrder
    AGE?: SortOrderInput | SortOrder
    ARREST_STATUS?: SortOrderInput | SortOrder
    ArrestLocationAptFlr?: SortOrderInput | SortOrder
    ArrestLocationCity?: SortOrderInput | SortOrder
    ArrestLocationStreet?: SortOrderInput | SortOrder
    ArrestLocationStreetNBR?: SortOrderInput | SortOrder
    Arrest_Charge?: SortOrderInput | SortOrder
    Arrest_ID?: SortOrderInput | SortOrder
    Case_Number?: SortOrderInput | SortOrder
    Charge_Description?: SortOrderInput | SortOrder
    Charge_Sequence?: SortOrderInput | SortOrder
    DATE_ARRESTED?: SortOrderInput | SortOrder
    DOB?: SortOrderInput | SortOrder
    Degree?: SortOrderInput | SortOrder
    FIRSTNAME?: SortOrderInput | SortOrder
    LASTNAME?: SortOrderInput | SortOrder
    MIDDLENAME?: SortOrderInput | SortOrder
    OBJECTID?: SortOrderInput | SortOrder
    OBJECTID_1?: SortOrderInput | SortOrder
    RACE?: SortOrderInput | SortOrder
    SEX?: SortOrderInput | SortOrder
    SUFFIX?: SortOrderInput | SortOrder
    TIME_ARREST?: SortOrderInput | SortOrder
    UNIQUEKEY?: SortOrderInput | SortOrder
    postId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    post?: PostOrderByWithRelationInput
  }

  export type ArrestLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    UNIQUEKEY?: string
    postId?: number
    AND?: ArrestLogWhereInput | ArrestLogWhereInput[]
    OR?: ArrestLogWhereInput[]
    NOT?: ArrestLogWhereInput | ArrestLogWhereInput[]
    AGE?: StringNullableFilter<"ArrestLog"> | string | null
    ARREST_STATUS?: StringNullableFilter<"ArrestLog"> | string | null
    ArrestLocationAptFlr?: StringNullableFilter<"ArrestLog"> | string | null
    ArrestLocationCity?: StringNullableFilter<"ArrestLog"> | string | null
    ArrestLocationStreet?: StringNullableFilter<"ArrestLog"> | string | null
    ArrestLocationStreetNBR?: StringNullableFilter<"ArrestLog"> | string | null
    Arrest_Charge?: StringNullableFilter<"ArrestLog"> | string | null
    Arrest_ID?: StringNullableFilter<"ArrestLog"> | string | null
    Case_Number?: StringNullableFilter<"ArrestLog"> | string | null
    Charge_Description?: StringNullableFilter<"ArrestLog"> | string | null
    Charge_Sequence?: StringNullableFilter<"ArrestLog"> | string | null
    DATE_ARRESTED?: StringNullableFilter<"ArrestLog"> | string | null
    DOB?: StringNullableFilter<"ArrestLog"> | string | null
    Degree?: StringNullableFilter<"ArrestLog"> | string | null
    FIRSTNAME?: StringNullableFilter<"ArrestLog"> | string | null
    LASTNAME?: StringNullableFilter<"ArrestLog"> | string | null
    MIDDLENAME?: StringNullableFilter<"ArrestLog"> | string | null
    OBJECTID?: IntNullableFilter<"ArrestLog"> | number | null
    OBJECTID_1?: IntNullableFilter<"ArrestLog"> | number | null
    RACE?: StringNullableFilter<"ArrestLog"> | string | null
    SEX?: StringNullableFilter<"ArrestLog"> | string | null
    SUFFIX?: StringNullableFilter<"ArrestLog"> | string | null
    TIME_ARREST?: StringNullableFilter<"ArrestLog"> | string | null
    createdAt?: DateTimeFilter<"ArrestLog"> | Date | string
    updatedAt?: DateTimeFilter<"ArrestLog"> | Date | string
    post?: XOR<PostNullableScalarRelationFilter, PostWhereInput> | null
  }, "id" | "UNIQUEKEY" | "postId">

  export type ArrestLogOrderByWithAggregationInput = {
    id?: SortOrder
    AGE?: SortOrderInput | SortOrder
    ARREST_STATUS?: SortOrderInput | SortOrder
    ArrestLocationAptFlr?: SortOrderInput | SortOrder
    ArrestLocationCity?: SortOrderInput | SortOrder
    ArrestLocationStreet?: SortOrderInput | SortOrder
    ArrestLocationStreetNBR?: SortOrderInput | SortOrder
    Arrest_Charge?: SortOrderInput | SortOrder
    Arrest_ID?: SortOrderInput | SortOrder
    Case_Number?: SortOrderInput | SortOrder
    Charge_Description?: SortOrderInput | SortOrder
    Charge_Sequence?: SortOrderInput | SortOrder
    DATE_ARRESTED?: SortOrderInput | SortOrder
    DOB?: SortOrderInput | SortOrder
    Degree?: SortOrderInput | SortOrder
    FIRSTNAME?: SortOrderInput | SortOrder
    LASTNAME?: SortOrderInput | SortOrder
    MIDDLENAME?: SortOrderInput | SortOrder
    OBJECTID?: SortOrderInput | SortOrder
    OBJECTID_1?: SortOrderInput | SortOrder
    RACE?: SortOrderInput | SortOrder
    SEX?: SortOrderInput | SortOrder
    SUFFIX?: SortOrderInput | SortOrder
    TIME_ARREST?: SortOrderInput | SortOrder
    UNIQUEKEY?: SortOrderInput | SortOrder
    postId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ArrestLogCountOrderByAggregateInput
    _avg?: ArrestLogAvgOrderByAggregateInput
    _max?: ArrestLogMaxOrderByAggregateInput
    _min?: ArrestLogMinOrderByAggregateInput
    _sum?: ArrestLogSumOrderByAggregateInput
  }

  export type ArrestLogScalarWhereWithAggregatesInput = {
    AND?: ArrestLogScalarWhereWithAggregatesInput | ArrestLogScalarWhereWithAggregatesInput[]
    OR?: ArrestLogScalarWhereWithAggregatesInput[]
    NOT?: ArrestLogScalarWhereWithAggregatesInput | ArrestLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ArrestLog"> | number
    AGE?: StringNullableWithAggregatesFilter<"ArrestLog"> | string | null
    ARREST_STATUS?: StringNullableWithAggregatesFilter<"ArrestLog"> | string | null
    ArrestLocationAptFlr?: StringNullableWithAggregatesFilter<"ArrestLog"> | string | null
    ArrestLocationCity?: StringNullableWithAggregatesFilter<"ArrestLog"> | string | null
    ArrestLocationStreet?: StringNullableWithAggregatesFilter<"ArrestLog"> | string | null
    ArrestLocationStreetNBR?: StringNullableWithAggregatesFilter<"ArrestLog"> | string | null
    Arrest_Charge?: StringNullableWithAggregatesFilter<"ArrestLog"> | string | null
    Arrest_ID?: StringNullableWithAggregatesFilter<"ArrestLog"> | string | null
    Case_Number?: StringNullableWithAggregatesFilter<"ArrestLog"> | string | null
    Charge_Description?: StringNullableWithAggregatesFilter<"ArrestLog"> | string | null
    Charge_Sequence?: StringNullableWithAggregatesFilter<"ArrestLog"> | string | null
    DATE_ARRESTED?: StringNullableWithAggregatesFilter<"ArrestLog"> | string | null
    DOB?: StringNullableWithAggregatesFilter<"ArrestLog"> | string | null
    Degree?: StringNullableWithAggregatesFilter<"ArrestLog"> | string | null
    FIRSTNAME?: StringNullableWithAggregatesFilter<"ArrestLog"> | string | null
    LASTNAME?: StringNullableWithAggregatesFilter<"ArrestLog"> | string | null
    MIDDLENAME?: StringNullableWithAggregatesFilter<"ArrestLog"> | string | null
    OBJECTID?: IntNullableWithAggregatesFilter<"ArrestLog"> | number | null
    OBJECTID_1?: IntNullableWithAggregatesFilter<"ArrestLog"> | number | null
    RACE?: StringNullableWithAggregatesFilter<"ArrestLog"> | string | null
    SEX?: StringNullableWithAggregatesFilter<"ArrestLog"> | string | null
    SUFFIX?: StringNullableWithAggregatesFilter<"ArrestLog"> | string | null
    TIME_ARREST?: StringNullableWithAggregatesFilter<"ArrestLog"> | string | null
    UNIQUEKEY?: StringNullableWithAggregatesFilter<"ArrestLog"> | string | null
    postId?: IntWithAggregatesFilter<"ArrestLog"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ArrestLog"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ArrestLog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    firstname: string
    lastname: string
    username: string
    email: string
    role: $Enums.Role
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    posts?: PostCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    firstname: string
    lastname: string
    username: string
    email: string
    role: $Enums.Role
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
    posts?: PostUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: PostUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    firstname: string
    lastname: string
    username: string
    email: string
    role: $Enums.Role
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCreateInput = {
    title: string
    body: string
    createdAt?: Date | string
    updatedAt?: Date | string
    arrestLogId?: number | null
    user: UserCreateNestedOneWithoutPostsInput
    postComments?: PostCommentCreateNestedManyWithoutPostInput
    arrestLog?: ArrestLogCreateNestedOneWithoutPostInput
  }

  export type PostUncheckedCreateInput = {
    id?: number
    title: string
    body: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    arrestLogId?: number | null
    postComments?: PostCommentUncheckedCreateNestedManyWithoutPostInput
    arrestLog?: ArrestLogUncheckedCreateNestedOneWithoutPostInput
  }

  export type PostUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arrestLogId?: NullableIntFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutPostsNestedInput
    postComments?: PostCommentUpdateManyWithoutPostNestedInput
    arrestLog?: ArrestLogUpdateOneWithoutPostNestedInput
  }

  export type PostUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arrestLogId?: NullableIntFieldUpdateOperationsInput | number | null
    postComments?: PostCommentUncheckedUpdateManyWithoutPostNestedInput
    arrestLog?: ArrestLogUncheckedUpdateOneWithoutPostNestedInput
  }

  export type PostCreateManyInput = {
    id?: number
    title: string
    body: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    arrestLogId?: number | null
  }

  export type PostUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arrestLogId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PostUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arrestLogId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PostCommentCreateInput = {
    body: string
    createdAt?: Date | string
    updatedAt?: Date | string
    post: PostCreateNestedOneWithoutPostCommentsInput
  }

  export type PostCommentUncheckedCreateInput = {
    id?: number
    postId: number
    body: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostCommentUpdateInput = {
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutPostCommentsNestedInput
  }

  export type PostCommentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    postId?: IntFieldUpdateOperationsInput | number
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCommentCreateManyInput = {
    id?: number
    postId: number
    body: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostCommentUpdateManyMutationInput = {
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCommentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    postId?: IntFieldUpdateOperationsInput | number
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArrestLogCreateInput = {
    AGE?: string | null
    ARREST_STATUS?: string | null
    ArrestLocationAptFlr?: string | null
    ArrestLocationCity?: string | null
    ArrestLocationStreet?: string | null
    ArrestLocationStreetNBR?: string | null
    Arrest_Charge?: string | null
    Arrest_ID?: string | null
    Case_Number?: string | null
    Charge_Description?: string | null
    Charge_Sequence?: string | null
    DATE_ARRESTED?: string | null
    DOB?: string | null
    Degree?: string | null
    FIRSTNAME?: string | null
    LASTNAME?: string | null
    MIDDLENAME?: string | null
    OBJECTID?: number | null
    OBJECTID_1?: number | null
    RACE?: string | null
    SEX?: string | null
    SUFFIX?: string | null
    TIME_ARREST?: string | null
    UNIQUEKEY?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    post?: PostCreateNestedOneWithoutArrestLogInput
  }

  export type ArrestLogUncheckedCreateInput = {
    id?: number
    AGE?: string | null
    ARREST_STATUS?: string | null
    ArrestLocationAptFlr?: string | null
    ArrestLocationCity?: string | null
    ArrestLocationStreet?: string | null
    ArrestLocationStreetNBR?: string | null
    Arrest_Charge?: string | null
    Arrest_ID?: string | null
    Case_Number?: string | null
    Charge_Description?: string | null
    Charge_Sequence?: string | null
    DATE_ARRESTED?: string | null
    DOB?: string | null
    Degree?: string | null
    FIRSTNAME?: string | null
    LASTNAME?: string | null
    MIDDLENAME?: string | null
    OBJECTID?: number | null
    OBJECTID_1?: number | null
    RACE?: string | null
    SEX?: string | null
    SUFFIX?: string | null
    TIME_ARREST?: string | null
    UNIQUEKEY?: string | null
    postId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArrestLogUpdateInput = {
    AGE?: NullableStringFieldUpdateOperationsInput | string | null
    ARREST_STATUS?: NullableStringFieldUpdateOperationsInput | string | null
    ArrestLocationAptFlr?: NullableStringFieldUpdateOperationsInput | string | null
    ArrestLocationCity?: NullableStringFieldUpdateOperationsInput | string | null
    ArrestLocationStreet?: NullableStringFieldUpdateOperationsInput | string | null
    ArrestLocationStreetNBR?: NullableStringFieldUpdateOperationsInput | string | null
    Arrest_Charge?: NullableStringFieldUpdateOperationsInput | string | null
    Arrest_ID?: NullableStringFieldUpdateOperationsInput | string | null
    Case_Number?: NullableStringFieldUpdateOperationsInput | string | null
    Charge_Description?: NullableStringFieldUpdateOperationsInput | string | null
    Charge_Sequence?: NullableStringFieldUpdateOperationsInput | string | null
    DATE_ARRESTED?: NullableStringFieldUpdateOperationsInput | string | null
    DOB?: NullableStringFieldUpdateOperationsInput | string | null
    Degree?: NullableStringFieldUpdateOperationsInput | string | null
    FIRSTNAME?: NullableStringFieldUpdateOperationsInput | string | null
    LASTNAME?: NullableStringFieldUpdateOperationsInput | string | null
    MIDDLENAME?: NullableStringFieldUpdateOperationsInput | string | null
    OBJECTID?: NullableIntFieldUpdateOperationsInput | number | null
    OBJECTID_1?: NullableIntFieldUpdateOperationsInput | number | null
    RACE?: NullableStringFieldUpdateOperationsInput | string | null
    SEX?: NullableStringFieldUpdateOperationsInput | string | null
    SUFFIX?: NullableStringFieldUpdateOperationsInput | string | null
    TIME_ARREST?: NullableStringFieldUpdateOperationsInput | string | null
    UNIQUEKEY?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneWithoutArrestLogNestedInput
  }

  export type ArrestLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    AGE?: NullableStringFieldUpdateOperationsInput | string | null
    ARREST_STATUS?: NullableStringFieldUpdateOperationsInput | string | null
    ArrestLocationAptFlr?: NullableStringFieldUpdateOperationsInput | string | null
    ArrestLocationCity?: NullableStringFieldUpdateOperationsInput | string | null
    ArrestLocationStreet?: NullableStringFieldUpdateOperationsInput | string | null
    ArrestLocationStreetNBR?: NullableStringFieldUpdateOperationsInput | string | null
    Arrest_Charge?: NullableStringFieldUpdateOperationsInput | string | null
    Arrest_ID?: NullableStringFieldUpdateOperationsInput | string | null
    Case_Number?: NullableStringFieldUpdateOperationsInput | string | null
    Charge_Description?: NullableStringFieldUpdateOperationsInput | string | null
    Charge_Sequence?: NullableStringFieldUpdateOperationsInput | string | null
    DATE_ARRESTED?: NullableStringFieldUpdateOperationsInput | string | null
    DOB?: NullableStringFieldUpdateOperationsInput | string | null
    Degree?: NullableStringFieldUpdateOperationsInput | string | null
    FIRSTNAME?: NullableStringFieldUpdateOperationsInput | string | null
    LASTNAME?: NullableStringFieldUpdateOperationsInput | string | null
    MIDDLENAME?: NullableStringFieldUpdateOperationsInput | string | null
    OBJECTID?: NullableIntFieldUpdateOperationsInput | number | null
    OBJECTID_1?: NullableIntFieldUpdateOperationsInput | number | null
    RACE?: NullableStringFieldUpdateOperationsInput | string | null
    SEX?: NullableStringFieldUpdateOperationsInput | string | null
    SUFFIX?: NullableStringFieldUpdateOperationsInput | string | null
    TIME_ARREST?: NullableStringFieldUpdateOperationsInput | string | null
    UNIQUEKEY?: NullableStringFieldUpdateOperationsInput | string | null
    postId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArrestLogCreateManyInput = {
    id?: number
    AGE?: string | null
    ARREST_STATUS?: string | null
    ArrestLocationAptFlr?: string | null
    ArrestLocationCity?: string | null
    ArrestLocationStreet?: string | null
    ArrestLocationStreetNBR?: string | null
    Arrest_Charge?: string | null
    Arrest_ID?: string | null
    Case_Number?: string | null
    Charge_Description?: string | null
    Charge_Sequence?: string | null
    DATE_ARRESTED?: string | null
    DOB?: string | null
    Degree?: string | null
    FIRSTNAME?: string | null
    LASTNAME?: string | null
    MIDDLENAME?: string | null
    OBJECTID?: number | null
    OBJECTID_1?: number | null
    RACE?: string | null
    SEX?: string | null
    SUFFIX?: string | null
    TIME_ARREST?: string | null
    UNIQUEKEY?: string | null
    postId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArrestLogUpdateManyMutationInput = {
    AGE?: NullableStringFieldUpdateOperationsInput | string | null
    ARREST_STATUS?: NullableStringFieldUpdateOperationsInput | string | null
    ArrestLocationAptFlr?: NullableStringFieldUpdateOperationsInput | string | null
    ArrestLocationCity?: NullableStringFieldUpdateOperationsInput | string | null
    ArrestLocationStreet?: NullableStringFieldUpdateOperationsInput | string | null
    ArrestLocationStreetNBR?: NullableStringFieldUpdateOperationsInput | string | null
    Arrest_Charge?: NullableStringFieldUpdateOperationsInput | string | null
    Arrest_ID?: NullableStringFieldUpdateOperationsInput | string | null
    Case_Number?: NullableStringFieldUpdateOperationsInput | string | null
    Charge_Description?: NullableStringFieldUpdateOperationsInput | string | null
    Charge_Sequence?: NullableStringFieldUpdateOperationsInput | string | null
    DATE_ARRESTED?: NullableStringFieldUpdateOperationsInput | string | null
    DOB?: NullableStringFieldUpdateOperationsInput | string | null
    Degree?: NullableStringFieldUpdateOperationsInput | string | null
    FIRSTNAME?: NullableStringFieldUpdateOperationsInput | string | null
    LASTNAME?: NullableStringFieldUpdateOperationsInput | string | null
    MIDDLENAME?: NullableStringFieldUpdateOperationsInput | string | null
    OBJECTID?: NullableIntFieldUpdateOperationsInput | number | null
    OBJECTID_1?: NullableIntFieldUpdateOperationsInput | number | null
    RACE?: NullableStringFieldUpdateOperationsInput | string | null
    SEX?: NullableStringFieldUpdateOperationsInput | string | null
    SUFFIX?: NullableStringFieldUpdateOperationsInput | string | null
    TIME_ARREST?: NullableStringFieldUpdateOperationsInput | string | null
    UNIQUEKEY?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArrestLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    AGE?: NullableStringFieldUpdateOperationsInput | string | null
    ARREST_STATUS?: NullableStringFieldUpdateOperationsInput | string | null
    ArrestLocationAptFlr?: NullableStringFieldUpdateOperationsInput | string | null
    ArrestLocationCity?: NullableStringFieldUpdateOperationsInput | string | null
    ArrestLocationStreet?: NullableStringFieldUpdateOperationsInput | string | null
    ArrestLocationStreetNBR?: NullableStringFieldUpdateOperationsInput | string | null
    Arrest_Charge?: NullableStringFieldUpdateOperationsInput | string | null
    Arrest_ID?: NullableStringFieldUpdateOperationsInput | string | null
    Case_Number?: NullableStringFieldUpdateOperationsInput | string | null
    Charge_Description?: NullableStringFieldUpdateOperationsInput | string | null
    Charge_Sequence?: NullableStringFieldUpdateOperationsInput | string | null
    DATE_ARRESTED?: NullableStringFieldUpdateOperationsInput | string | null
    DOB?: NullableStringFieldUpdateOperationsInput | string | null
    Degree?: NullableStringFieldUpdateOperationsInput | string | null
    FIRSTNAME?: NullableStringFieldUpdateOperationsInput | string | null
    LASTNAME?: NullableStringFieldUpdateOperationsInput | string | null
    MIDDLENAME?: NullableStringFieldUpdateOperationsInput | string | null
    OBJECTID?: NullableIntFieldUpdateOperationsInput | number | null
    OBJECTID_1?: NullableIntFieldUpdateOperationsInput | number | null
    RACE?: NullableStringFieldUpdateOperationsInput | string | null
    SEX?: NullableStringFieldUpdateOperationsInput | string | null
    SUFFIX?: NullableStringFieldUpdateOperationsInput | string | null
    TIME_ARREST?: NullableStringFieldUpdateOperationsInput | string | null
    UNIQUEKEY?: NullableStringFieldUpdateOperationsInput | string | null
    postId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PostListRelationFilter = {
    every?: PostWhereInput
    some?: PostWhereInput
    none?: PostWhereInput
  }

  export type PostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    username?: SortOrder
    email?: SortOrder
    role?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    username?: SortOrder
    email?: SortOrder
    role?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    firstname?: SortOrder
    lastname?: SortOrder
    username?: SortOrder
    email?: SortOrder
    role?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PostCommentListRelationFilter = {
    every?: PostCommentWhereInput
    some?: PostCommentWhereInput
    none?: PostCommentWhereInput
  }

  export type ArrestLogNullableScalarRelationFilter = {
    is?: ArrestLogWhereInput | null
    isNot?: ArrestLogWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PostCommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    body?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    arrestLogId?: SortOrder
  }

  export type PostAvgOrderByAggregateInput = {
    id?: SortOrder
    arrestLogId?: SortOrder
  }

  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    body?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    arrestLogId?: SortOrder
  }

  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    body?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    arrestLogId?: SortOrder
  }

  export type PostSumOrderByAggregateInput = {
    id?: SortOrder
    arrestLogId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type PostScalarRelationFilter = {
    is?: PostWhereInput
    isNot?: PostWhereInput
  }

  export type PostCommentCountOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostCommentAvgOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
  }

  export type PostCommentMaxOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostCommentMinOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    body?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostCommentSumOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type PostNullableScalarRelationFilter = {
    is?: PostWhereInput | null
    isNot?: PostWhereInput | null
  }

  export type ArrestLogCountOrderByAggregateInput = {
    id?: SortOrder
    AGE?: SortOrder
    ARREST_STATUS?: SortOrder
    ArrestLocationAptFlr?: SortOrder
    ArrestLocationCity?: SortOrder
    ArrestLocationStreet?: SortOrder
    ArrestLocationStreetNBR?: SortOrder
    Arrest_Charge?: SortOrder
    Arrest_ID?: SortOrder
    Case_Number?: SortOrder
    Charge_Description?: SortOrder
    Charge_Sequence?: SortOrder
    DATE_ARRESTED?: SortOrder
    DOB?: SortOrder
    Degree?: SortOrder
    FIRSTNAME?: SortOrder
    LASTNAME?: SortOrder
    MIDDLENAME?: SortOrder
    OBJECTID?: SortOrder
    OBJECTID_1?: SortOrder
    RACE?: SortOrder
    SEX?: SortOrder
    SUFFIX?: SortOrder
    TIME_ARREST?: SortOrder
    UNIQUEKEY?: SortOrder
    postId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArrestLogAvgOrderByAggregateInput = {
    id?: SortOrder
    OBJECTID?: SortOrder
    OBJECTID_1?: SortOrder
    postId?: SortOrder
  }

  export type ArrestLogMaxOrderByAggregateInput = {
    id?: SortOrder
    AGE?: SortOrder
    ARREST_STATUS?: SortOrder
    ArrestLocationAptFlr?: SortOrder
    ArrestLocationCity?: SortOrder
    ArrestLocationStreet?: SortOrder
    ArrestLocationStreetNBR?: SortOrder
    Arrest_Charge?: SortOrder
    Arrest_ID?: SortOrder
    Case_Number?: SortOrder
    Charge_Description?: SortOrder
    Charge_Sequence?: SortOrder
    DATE_ARRESTED?: SortOrder
    DOB?: SortOrder
    Degree?: SortOrder
    FIRSTNAME?: SortOrder
    LASTNAME?: SortOrder
    MIDDLENAME?: SortOrder
    OBJECTID?: SortOrder
    OBJECTID_1?: SortOrder
    RACE?: SortOrder
    SEX?: SortOrder
    SUFFIX?: SortOrder
    TIME_ARREST?: SortOrder
    UNIQUEKEY?: SortOrder
    postId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArrestLogMinOrderByAggregateInput = {
    id?: SortOrder
    AGE?: SortOrder
    ARREST_STATUS?: SortOrder
    ArrestLocationAptFlr?: SortOrder
    ArrestLocationCity?: SortOrder
    ArrestLocationStreet?: SortOrder
    ArrestLocationStreetNBR?: SortOrder
    Arrest_Charge?: SortOrder
    Arrest_ID?: SortOrder
    Case_Number?: SortOrder
    Charge_Description?: SortOrder
    Charge_Sequence?: SortOrder
    DATE_ARRESTED?: SortOrder
    DOB?: SortOrder
    Degree?: SortOrder
    FIRSTNAME?: SortOrder
    LASTNAME?: SortOrder
    MIDDLENAME?: SortOrder
    OBJECTID?: SortOrder
    OBJECTID_1?: SortOrder
    RACE?: SortOrder
    SEX?: SortOrder
    SUFFIX?: SortOrder
    TIME_ARREST?: SortOrder
    UNIQUEKEY?: SortOrder
    postId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ArrestLogSumOrderByAggregateInput = {
    id?: SortOrder
    OBJECTID?: SortOrder
    OBJECTID_1?: SortOrder
    postId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type PostCreateNestedManyWithoutUserInput = {
    create?: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput> | PostCreateWithoutUserInput[] | PostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUserInput | PostCreateOrConnectWithoutUserInput[]
    createMany?: PostCreateManyUserInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type PostUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput> | PostCreateWithoutUserInput[] | PostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUserInput | PostCreateOrConnectWithoutUserInput[]
    createMany?: PostCreateManyUserInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PostUpdateManyWithoutUserNestedInput = {
    create?: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput> | PostCreateWithoutUserInput[] | PostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUserInput | PostCreateOrConnectWithoutUserInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutUserInput | PostUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PostCreateManyUserInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutUserInput | PostUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PostUpdateManyWithWhereWithoutUserInput | PostUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type PostUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput> | PostCreateWithoutUserInput[] | PostUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostCreateOrConnectWithoutUserInput | PostCreateOrConnectWithoutUserInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutUserInput | PostUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PostCreateManyUserInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutUserInput | PostUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PostUpdateManyWithWhereWithoutUserInput | PostUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPostsInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    connect?: UserWhereUniqueInput
  }

  export type PostCommentCreateNestedManyWithoutPostInput = {
    create?: XOR<PostCommentCreateWithoutPostInput, PostCommentUncheckedCreateWithoutPostInput> | PostCommentCreateWithoutPostInput[] | PostCommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostCommentCreateOrConnectWithoutPostInput | PostCommentCreateOrConnectWithoutPostInput[]
    createMany?: PostCommentCreateManyPostInputEnvelope
    connect?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
  }

  export type ArrestLogCreateNestedOneWithoutPostInput = {
    create?: XOR<ArrestLogCreateWithoutPostInput, ArrestLogUncheckedCreateWithoutPostInput>
    connectOrCreate?: ArrestLogCreateOrConnectWithoutPostInput
    connect?: ArrestLogWhereUniqueInput
  }

  export type PostCommentUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<PostCommentCreateWithoutPostInput, PostCommentUncheckedCreateWithoutPostInput> | PostCommentCreateWithoutPostInput[] | PostCommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostCommentCreateOrConnectWithoutPostInput | PostCommentCreateOrConnectWithoutPostInput[]
    createMany?: PostCommentCreateManyPostInputEnvelope
    connect?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
  }

  export type ArrestLogUncheckedCreateNestedOneWithoutPostInput = {
    create?: XOR<ArrestLogCreateWithoutPostInput, ArrestLogUncheckedCreateWithoutPostInput>
    connectOrCreate?: ArrestLogCreateOrConnectWithoutPostInput
    connect?: ArrestLogWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    upsert?: UserUpsertWithoutPostsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPostsInput, UserUpdateWithoutPostsInput>, UserUncheckedUpdateWithoutPostsInput>
  }

  export type PostCommentUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostCommentCreateWithoutPostInput, PostCommentUncheckedCreateWithoutPostInput> | PostCommentCreateWithoutPostInput[] | PostCommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostCommentCreateOrConnectWithoutPostInput | PostCommentCreateOrConnectWithoutPostInput[]
    upsert?: PostCommentUpsertWithWhereUniqueWithoutPostInput | PostCommentUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostCommentCreateManyPostInputEnvelope
    set?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
    disconnect?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
    delete?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
    connect?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
    update?: PostCommentUpdateWithWhereUniqueWithoutPostInput | PostCommentUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostCommentUpdateManyWithWhereWithoutPostInput | PostCommentUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostCommentScalarWhereInput | PostCommentScalarWhereInput[]
  }

  export type ArrestLogUpdateOneWithoutPostNestedInput = {
    create?: XOR<ArrestLogCreateWithoutPostInput, ArrestLogUncheckedCreateWithoutPostInput>
    connectOrCreate?: ArrestLogCreateOrConnectWithoutPostInput
    upsert?: ArrestLogUpsertWithoutPostInput
    disconnect?: ArrestLogWhereInput | boolean
    delete?: ArrestLogWhereInput | boolean
    connect?: ArrestLogWhereUniqueInput
    update?: XOR<XOR<ArrestLogUpdateToOneWithWhereWithoutPostInput, ArrestLogUpdateWithoutPostInput>, ArrestLogUncheckedUpdateWithoutPostInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PostCommentUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostCommentCreateWithoutPostInput, PostCommentUncheckedCreateWithoutPostInput> | PostCommentCreateWithoutPostInput[] | PostCommentUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostCommentCreateOrConnectWithoutPostInput | PostCommentCreateOrConnectWithoutPostInput[]
    upsert?: PostCommentUpsertWithWhereUniqueWithoutPostInput | PostCommentUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostCommentCreateManyPostInputEnvelope
    set?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
    disconnect?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
    delete?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
    connect?: PostCommentWhereUniqueInput | PostCommentWhereUniqueInput[]
    update?: PostCommentUpdateWithWhereUniqueWithoutPostInput | PostCommentUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostCommentUpdateManyWithWhereWithoutPostInput | PostCommentUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostCommentScalarWhereInput | PostCommentScalarWhereInput[]
  }

  export type ArrestLogUncheckedUpdateOneWithoutPostNestedInput = {
    create?: XOR<ArrestLogCreateWithoutPostInput, ArrestLogUncheckedCreateWithoutPostInput>
    connectOrCreate?: ArrestLogCreateOrConnectWithoutPostInput
    upsert?: ArrestLogUpsertWithoutPostInput
    disconnect?: ArrestLogWhereInput | boolean
    delete?: ArrestLogWhereInput | boolean
    connect?: ArrestLogWhereUniqueInput
    update?: XOR<XOR<ArrestLogUpdateToOneWithWhereWithoutPostInput, ArrestLogUpdateWithoutPostInput>, ArrestLogUncheckedUpdateWithoutPostInput>
  }

  export type PostCreateNestedOneWithoutPostCommentsInput = {
    create?: XOR<PostCreateWithoutPostCommentsInput, PostUncheckedCreateWithoutPostCommentsInput>
    connectOrCreate?: PostCreateOrConnectWithoutPostCommentsInput
    connect?: PostWhereUniqueInput
  }

  export type PostUpdateOneRequiredWithoutPostCommentsNestedInput = {
    create?: XOR<PostCreateWithoutPostCommentsInput, PostUncheckedCreateWithoutPostCommentsInput>
    connectOrCreate?: PostCreateOrConnectWithoutPostCommentsInput
    upsert?: PostUpsertWithoutPostCommentsInput
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutPostCommentsInput, PostUpdateWithoutPostCommentsInput>, PostUncheckedUpdateWithoutPostCommentsInput>
  }

  export type PostCreateNestedOneWithoutArrestLogInput = {
    create?: XOR<PostCreateWithoutArrestLogInput, PostUncheckedCreateWithoutArrestLogInput>
    connectOrCreate?: PostCreateOrConnectWithoutArrestLogInput
    connect?: PostWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type PostUpdateOneWithoutArrestLogNestedInput = {
    create?: XOR<PostCreateWithoutArrestLogInput, PostUncheckedCreateWithoutArrestLogInput>
    connectOrCreate?: PostCreateOrConnectWithoutArrestLogInput
    upsert?: PostUpsertWithoutArrestLogInput
    disconnect?: PostWhereInput | boolean
    delete?: PostWhereInput | boolean
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutArrestLogInput, PostUpdateWithoutArrestLogInput>, PostUncheckedUpdateWithoutArrestLogInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type PostCreateWithoutUserInput = {
    title: string
    body: string
    createdAt?: Date | string
    updatedAt?: Date | string
    arrestLogId?: number | null
    postComments?: PostCommentCreateNestedManyWithoutPostInput
    arrestLog?: ArrestLogCreateNestedOneWithoutPostInput
  }

  export type PostUncheckedCreateWithoutUserInput = {
    id?: number
    title: string
    body: string
    createdAt?: Date | string
    updatedAt?: Date | string
    arrestLogId?: number | null
    postComments?: PostCommentUncheckedCreateNestedManyWithoutPostInput
    arrestLog?: ArrestLogUncheckedCreateNestedOneWithoutPostInput
  }

  export type PostCreateOrConnectWithoutUserInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput>
  }

  export type PostCreateManyUserInputEnvelope = {
    data: PostCreateManyUserInput | PostCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PostUpsertWithWhereUniqueWithoutUserInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutUserInput, PostUncheckedUpdateWithoutUserInput>
    create: XOR<PostCreateWithoutUserInput, PostUncheckedCreateWithoutUserInput>
  }

  export type PostUpdateWithWhereUniqueWithoutUserInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutUserInput, PostUncheckedUpdateWithoutUserInput>
  }

  export type PostUpdateManyWithWhereWithoutUserInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutUserInput>
  }

  export type PostScalarWhereInput = {
    AND?: PostScalarWhereInput | PostScalarWhereInput[]
    OR?: PostScalarWhereInput[]
    NOT?: PostScalarWhereInput | PostScalarWhereInput[]
    id?: IntFilter<"Post"> | number
    title?: StringFilter<"Post"> | string
    body?: StringFilter<"Post"> | string
    userId?: StringFilter<"Post"> | string
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    arrestLogId?: IntNullableFilter<"Post"> | number | null
  }

  export type UserCreateWithoutPostsInput = {
    id?: string
    firstname: string
    lastname: string
    username: string
    email: string
    role: $Enums.Role
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutPostsInput = {
    id?: string
    firstname: string
    lastname: string
    username: string
    email: string
    role: $Enums.Role
    password: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
  }

  export type PostCommentCreateWithoutPostInput = {
    body: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostCommentUncheckedCreateWithoutPostInput = {
    id?: number
    body: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostCommentCreateOrConnectWithoutPostInput = {
    where: PostCommentWhereUniqueInput
    create: XOR<PostCommentCreateWithoutPostInput, PostCommentUncheckedCreateWithoutPostInput>
  }

  export type PostCommentCreateManyPostInputEnvelope = {
    data: PostCommentCreateManyPostInput | PostCommentCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type ArrestLogCreateWithoutPostInput = {
    AGE?: string | null
    ARREST_STATUS?: string | null
    ArrestLocationAptFlr?: string | null
    ArrestLocationCity?: string | null
    ArrestLocationStreet?: string | null
    ArrestLocationStreetNBR?: string | null
    Arrest_Charge?: string | null
    Arrest_ID?: string | null
    Case_Number?: string | null
    Charge_Description?: string | null
    Charge_Sequence?: string | null
    DATE_ARRESTED?: string | null
    DOB?: string | null
    Degree?: string | null
    FIRSTNAME?: string | null
    LASTNAME?: string | null
    MIDDLENAME?: string | null
    OBJECTID?: number | null
    OBJECTID_1?: number | null
    RACE?: string | null
    SEX?: string | null
    SUFFIX?: string | null
    TIME_ARREST?: string | null
    UNIQUEKEY?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArrestLogUncheckedCreateWithoutPostInput = {
    id?: number
    AGE?: string | null
    ARREST_STATUS?: string | null
    ArrestLocationAptFlr?: string | null
    ArrestLocationCity?: string | null
    ArrestLocationStreet?: string | null
    ArrestLocationStreetNBR?: string | null
    Arrest_Charge?: string | null
    Arrest_ID?: string | null
    Case_Number?: string | null
    Charge_Description?: string | null
    Charge_Sequence?: string | null
    DATE_ARRESTED?: string | null
    DOB?: string | null
    Degree?: string | null
    FIRSTNAME?: string | null
    LASTNAME?: string | null
    MIDDLENAME?: string | null
    OBJECTID?: number | null
    OBJECTID_1?: number | null
    RACE?: string | null
    SEX?: string | null
    SUFFIX?: string | null
    TIME_ARREST?: string | null
    UNIQUEKEY?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ArrestLogCreateOrConnectWithoutPostInput = {
    where: ArrestLogWhereUniqueInput
    create: XOR<ArrestLogCreateWithoutPostInput, ArrestLogUncheckedCreateWithoutPostInput>
  }

  export type UserUpsertWithoutPostsInput = {
    update: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPostsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
  }

  export type UserUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    lastname?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCommentUpsertWithWhereUniqueWithoutPostInput = {
    where: PostCommentWhereUniqueInput
    update: XOR<PostCommentUpdateWithoutPostInput, PostCommentUncheckedUpdateWithoutPostInput>
    create: XOR<PostCommentCreateWithoutPostInput, PostCommentUncheckedCreateWithoutPostInput>
  }

  export type PostCommentUpdateWithWhereUniqueWithoutPostInput = {
    where: PostCommentWhereUniqueInput
    data: XOR<PostCommentUpdateWithoutPostInput, PostCommentUncheckedUpdateWithoutPostInput>
  }

  export type PostCommentUpdateManyWithWhereWithoutPostInput = {
    where: PostCommentScalarWhereInput
    data: XOR<PostCommentUpdateManyMutationInput, PostCommentUncheckedUpdateManyWithoutPostInput>
  }

  export type PostCommentScalarWhereInput = {
    AND?: PostCommentScalarWhereInput | PostCommentScalarWhereInput[]
    OR?: PostCommentScalarWhereInput[]
    NOT?: PostCommentScalarWhereInput | PostCommentScalarWhereInput[]
    id?: IntFilter<"PostComment"> | number
    postId?: IntFilter<"PostComment"> | number
    body?: StringFilter<"PostComment"> | string
    createdAt?: DateTimeFilter<"PostComment"> | Date | string
    updatedAt?: DateTimeFilter<"PostComment"> | Date | string
  }

  export type ArrestLogUpsertWithoutPostInput = {
    update: XOR<ArrestLogUpdateWithoutPostInput, ArrestLogUncheckedUpdateWithoutPostInput>
    create: XOR<ArrestLogCreateWithoutPostInput, ArrestLogUncheckedCreateWithoutPostInput>
    where?: ArrestLogWhereInput
  }

  export type ArrestLogUpdateToOneWithWhereWithoutPostInput = {
    where?: ArrestLogWhereInput
    data: XOR<ArrestLogUpdateWithoutPostInput, ArrestLogUncheckedUpdateWithoutPostInput>
  }

  export type ArrestLogUpdateWithoutPostInput = {
    AGE?: NullableStringFieldUpdateOperationsInput | string | null
    ARREST_STATUS?: NullableStringFieldUpdateOperationsInput | string | null
    ArrestLocationAptFlr?: NullableStringFieldUpdateOperationsInput | string | null
    ArrestLocationCity?: NullableStringFieldUpdateOperationsInput | string | null
    ArrestLocationStreet?: NullableStringFieldUpdateOperationsInput | string | null
    ArrestLocationStreetNBR?: NullableStringFieldUpdateOperationsInput | string | null
    Arrest_Charge?: NullableStringFieldUpdateOperationsInput | string | null
    Arrest_ID?: NullableStringFieldUpdateOperationsInput | string | null
    Case_Number?: NullableStringFieldUpdateOperationsInput | string | null
    Charge_Description?: NullableStringFieldUpdateOperationsInput | string | null
    Charge_Sequence?: NullableStringFieldUpdateOperationsInput | string | null
    DATE_ARRESTED?: NullableStringFieldUpdateOperationsInput | string | null
    DOB?: NullableStringFieldUpdateOperationsInput | string | null
    Degree?: NullableStringFieldUpdateOperationsInput | string | null
    FIRSTNAME?: NullableStringFieldUpdateOperationsInput | string | null
    LASTNAME?: NullableStringFieldUpdateOperationsInput | string | null
    MIDDLENAME?: NullableStringFieldUpdateOperationsInput | string | null
    OBJECTID?: NullableIntFieldUpdateOperationsInput | number | null
    OBJECTID_1?: NullableIntFieldUpdateOperationsInput | number | null
    RACE?: NullableStringFieldUpdateOperationsInput | string | null
    SEX?: NullableStringFieldUpdateOperationsInput | string | null
    SUFFIX?: NullableStringFieldUpdateOperationsInput | string | null
    TIME_ARREST?: NullableStringFieldUpdateOperationsInput | string | null
    UNIQUEKEY?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ArrestLogUncheckedUpdateWithoutPostInput = {
    id?: IntFieldUpdateOperationsInput | number
    AGE?: NullableStringFieldUpdateOperationsInput | string | null
    ARREST_STATUS?: NullableStringFieldUpdateOperationsInput | string | null
    ArrestLocationAptFlr?: NullableStringFieldUpdateOperationsInput | string | null
    ArrestLocationCity?: NullableStringFieldUpdateOperationsInput | string | null
    ArrestLocationStreet?: NullableStringFieldUpdateOperationsInput | string | null
    ArrestLocationStreetNBR?: NullableStringFieldUpdateOperationsInput | string | null
    Arrest_Charge?: NullableStringFieldUpdateOperationsInput | string | null
    Arrest_ID?: NullableStringFieldUpdateOperationsInput | string | null
    Case_Number?: NullableStringFieldUpdateOperationsInput | string | null
    Charge_Description?: NullableStringFieldUpdateOperationsInput | string | null
    Charge_Sequence?: NullableStringFieldUpdateOperationsInput | string | null
    DATE_ARRESTED?: NullableStringFieldUpdateOperationsInput | string | null
    DOB?: NullableStringFieldUpdateOperationsInput | string | null
    Degree?: NullableStringFieldUpdateOperationsInput | string | null
    FIRSTNAME?: NullableStringFieldUpdateOperationsInput | string | null
    LASTNAME?: NullableStringFieldUpdateOperationsInput | string | null
    MIDDLENAME?: NullableStringFieldUpdateOperationsInput | string | null
    OBJECTID?: NullableIntFieldUpdateOperationsInput | number | null
    OBJECTID_1?: NullableIntFieldUpdateOperationsInput | number | null
    RACE?: NullableStringFieldUpdateOperationsInput | string | null
    SEX?: NullableStringFieldUpdateOperationsInput | string | null
    SUFFIX?: NullableStringFieldUpdateOperationsInput | string | null
    TIME_ARREST?: NullableStringFieldUpdateOperationsInput | string | null
    UNIQUEKEY?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCreateWithoutPostCommentsInput = {
    title: string
    body: string
    createdAt?: Date | string
    updatedAt?: Date | string
    arrestLogId?: number | null
    user: UserCreateNestedOneWithoutPostsInput
    arrestLog?: ArrestLogCreateNestedOneWithoutPostInput
  }

  export type PostUncheckedCreateWithoutPostCommentsInput = {
    id?: number
    title: string
    body: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    arrestLogId?: number | null
    arrestLog?: ArrestLogUncheckedCreateNestedOneWithoutPostInput
  }

  export type PostCreateOrConnectWithoutPostCommentsInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutPostCommentsInput, PostUncheckedCreateWithoutPostCommentsInput>
  }

  export type PostUpsertWithoutPostCommentsInput = {
    update: XOR<PostUpdateWithoutPostCommentsInput, PostUncheckedUpdateWithoutPostCommentsInput>
    create: XOR<PostCreateWithoutPostCommentsInput, PostUncheckedCreateWithoutPostCommentsInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutPostCommentsInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutPostCommentsInput, PostUncheckedUpdateWithoutPostCommentsInput>
  }

  export type PostUpdateWithoutPostCommentsInput = {
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arrestLogId?: NullableIntFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutPostsNestedInput
    arrestLog?: ArrestLogUpdateOneWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutPostCommentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arrestLogId?: NullableIntFieldUpdateOperationsInput | number | null
    arrestLog?: ArrestLogUncheckedUpdateOneWithoutPostNestedInput
  }

  export type PostCreateWithoutArrestLogInput = {
    title: string
    body: string
    createdAt?: Date | string
    updatedAt?: Date | string
    arrestLogId?: number | null
    user: UserCreateNestedOneWithoutPostsInput
    postComments?: PostCommentCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutArrestLogInput = {
    id?: number
    title: string
    body: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    arrestLogId?: number | null
    postComments?: PostCommentUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutArrestLogInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutArrestLogInput, PostUncheckedCreateWithoutArrestLogInput>
  }

  export type PostUpsertWithoutArrestLogInput = {
    update: XOR<PostUpdateWithoutArrestLogInput, PostUncheckedUpdateWithoutArrestLogInput>
    create: XOR<PostCreateWithoutArrestLogInput, PostUncheckedCreateWithoutArrestLogInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutArrestLogInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutArrestLogInput, PostUncheckedUpdateWithoutArrestLogInput>
  }

  export type PostUpdateWithoutArrestLogInput = {
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arrestLogId?: NullableIntFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutPostsNestedInput
    postComments?: PostCommentUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutArrestLogInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arrestLogId?: NullableIntFieldUpdateOperationsInput | number | null
    postComments?: PostCommentUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostCreateManyUserInput = {
    id?: number
    title: string
    body: string
    createdAt?: Date | string
    updatedAt?: Date | string
    arrestLogId?: number | null
  }

  export type PostUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arrestLogId?: NullableIntFieldUpdateOperationsInput | number | null
    postComments?: PostCommentUpdateManyWithoutPostNestedInput
    arrestLog?: ArrestLogUpdateOneWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arrestLogId?: NullableIntFieldUpdateOperationsInput | number | null
    postComments?: PostCommentUncheckedUpdateManyWithoutPostNestedInput
    arrestLog?: ArrestLogUncheckedUpdateOneWithoutPostNestedInput
  }

  export type PostUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    arrestLogId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type PostCommentCreateManyPostInput = {
    id?: number
    body: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostCommentUpdateWithoutPostInput = {
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCommentUncheckedUpdateWithoutPostInput = {
    id?: IntFieldUpdateOperationsInput | number
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCommentUncheckedUpdateManyWithoutPostInput = {
    id?: IntFieldUpdateOperationsInput | number
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}