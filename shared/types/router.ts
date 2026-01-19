import type { RoutesNamesList } from '@typed-router/__routes'

import type { NuxtRoute } from '@typed-router/__router'
import type { RoutePathSchema } from '@typed-router/__paths'

/**
 * Route of App
 *
 * @template T  - when true, allows `https://` external URLs. Default false
 *
 */
export type RouteTo<
  T extends boolean = false,
> = T extends true
  ? NuxtRoute<RoutesNamesList, RoutePathSchema, false> | `https://${string}`
  : NuxtRoute<RoutesNamesList, RoutePathSchema, false>
