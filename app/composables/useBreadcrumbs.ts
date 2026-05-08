type BreadcrumbItem = {
  label: string
  to: string
}

export function useBreadcrumbs() {
  const route = useRoute()

  const items = computed<BreadcrumbItem[]>(() => {
    return (route.meta.breadcrumb as BreadcrumbItem[]) ?? []
  })

  return { items }
}
