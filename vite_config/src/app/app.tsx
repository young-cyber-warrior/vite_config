import { Suspense } from 'react';
import styles from './app.module.scss';
import { Main } from './components/main/components/main';

const Header = lazy(() => import('./components/head/components/header'));
const Footer = lazy(() => import('./components/footer/components/footer'));

const content = {
    header: 'header',
    footer: 'footer',
    none: 'none',
} as const;

export type State = ValueOf<typeof content>;

function App() {
    const [showedContent, setShowedContent] = useState<State>(content.none);

    function handleChangeContent() {
        setShowedContent((prev) => {
            if (prev === content.none) {
                return content.footer;
            }

            if (prev === content.footer) {
                return content.header;
            }

            return content.none;
        });
    }

    return (
        <div className={styles.base}>
            <div className={styles.container}>
                {showedContent === content.header && (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Header />
                    </Suspense>
                )}
                <Main
                    props={{ id: 10, name: 'hi' }}
                    changeContent={handleChangeContent}
                />
                {showedContent === content.footer && (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Footer />
                    </Suspense>
                )}
            </div>
        </div>
    );
}

export default App;
