import { CssBaseline } from '@mui/material';
import { createRoot } from 'react-dom/client';
import App from 'content-scripts/components/App';
import { StoreContextProvider } from 'content-scripts/context/RootStoreContext';

function injectReact() {
    const app = document.createElement('div');
    const root = createRoot(app);

    document.body.appendChild(app);
    root.render(
        <CssBaseline>
            <StoreContextProvider>
                <App />
            </StoreContextProvider>
        </CssBaseline>
    );
}

export default injectReact;
