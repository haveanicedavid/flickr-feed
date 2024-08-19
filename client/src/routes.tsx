import { lazy, Suspense } from 'react'
import { Routes as ReactRoutes, Route } from 'react-router-dom'

import { AppLayout } from './components/app-layout'
import { LoadingSpinner } from './components/loading-spinner'

const HomePage = lazy(() => import('./pages/home'))
const NotFoundPage = lazy(() => import('./pages/not-found'))
const TagPage = lazy(() => import('./pages/tag'))

export function Routes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ReactRoutes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="tags">
            <Route path=":tag" element={<TagPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </ReactRoutes>
    </Suspense>
  )
}
