
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeContextProvider } from './Context/ThemeContext.jsx'
import { UserContextProvider } from './Context/UserData.jsx'

createRoot(document.getElementById('root')).render(
    <ThemeContextProvider>
      <UserContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserContextProvider>
    </ThemeContextProvider> 
)
