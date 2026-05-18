import type { AnyObject, Flags, Maybe } from 'yup'

import 'yup'

declare module 'yup' {
  interface StringSchema<_TType extends Maybe<string> = string | undefined, _TContext = AnyObject, _TDefault = undefined, _TFlags extends Flags = ''> {
    phone(): this
  }
}
