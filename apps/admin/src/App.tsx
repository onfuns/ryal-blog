import PageLayout from '@/components/PageLayout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'uno.css'
import config from './config'
import { routes, type IRouter } from './routes'

const App = () => {
  const createRoute = ({ path, component: Component }: IRouter) => {
    if (Component) {
      return <Route key={path} path={path} element={<Component />} />
    }
    return null
  }

  const mapRoutes = routes.map(route => {
    if (route.children?.length) {
      return route.children.map(createRoute)
    }
    return createRoute(route)
  })

  return (
    <BrowserRouter basename={config.routeBasename}>
      <PageLayout>
        <Routes>{mapRoutes}</Routes>
      </PageLayout>
    </BrowserRouter>
  )
}

export default App
