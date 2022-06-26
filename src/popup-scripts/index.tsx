import App from 'popup-scripts/components/App';
import { createRoot } from 'react-dom/client';
import { connect as connectHotReload } from 'chrome-extension-hot-reload';
import { StoreContextProvider } from './context/StoreContext';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './styles/globals.scss';

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
    connectHotReload();
}

const root = createRoot(document.getElementById('root')!);

root.render(
    <StoreContextProvider>
        <App />
    </StoreContextProvider>
);
