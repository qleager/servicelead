import type { BreadcrumbItem } from '~/components/the/Breadcrumbs.vue'

declare module '#app' {
  interface PageMeta {
    /**
      * Breadcrumb items rendered by TheBreadcrumbs component
     */
    breadcrumbs?: BreadcrumbItem[]
  }
}

export {}
