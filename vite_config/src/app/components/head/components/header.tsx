import styles from './header.module.scss';
import { Button } from '@biven_mira/components';
import { mathOperations } from '@biven_mira/helpers';

const Header = () => {
    function handleClick() {
        console.log('handleClick');
    }

    return (
        <div className={styles.base}>
            <div>
                <a href="https://vite.dev" target="_blank"></a>
                <a href="https://react.dev" target="_blank"></a>
                <Button onClick={handleClick} />
            </div>
            <h1>{mathOperations.calculate([10, 12])}</h1>
        </div>
    );
};

export default Header;
