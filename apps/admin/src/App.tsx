import Layout from '@/components/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'uno.css'
import config from './config'
import { routes, type IRouter } from './routes'

const App = () => {
  const createRoute = ({ path, component: Component }: IRouter) => {
    return <Route key={path} path={path} element={<Component />} />
  }

  const mapRoutes = routes.map(route => {
    if (route.children?.length) {
      return route.children.map(createRoute)
    }
    return createRoute(route)
  })

  return (
    <BrowserRouter basename={config.routeBasename}>
      <Layout>
        <Routes>{mapRoutes}</Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
