import '@/utils/http-request'
import ReactDOM from 'react-dom'
import App from './App'

const root = document.getElementById('root')
/**
 * 使用了第三方插件缓存页面，不能使用 ReactDOMClient.createRoot
 * https://github.com/CJY0208/react-activation/issues/225#issuecomment-1311136388
 */
ReactDOM.render(<App />, root)
