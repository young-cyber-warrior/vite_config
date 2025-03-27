import { MainProps } from '@global_types/types';
import styles from './main.module.scss';
import cx from 'classnames';
import { Suspense } from 'react';

import { Button } from '@mui/material';

const point = {
    left: 'left',
    right: 'right',
} as const;

// <------------------------------------------------>
// Here I did asynchronous loading with lazy and import just default

// const additionalContent = Object.entries(
//     import.meta.glob('./additionalContent/**', { import: 'default' })
// ).map(([_, importFn]) => ({
//     Component: lazy(importFn as () => Promise<{ default: FC<{}> }>),
// }));

// <------------------------------------------------>
// Here I did synchronous loading with { eager: true }

const additionalContent = (
    Object.entries(
        import.meta.glob('./additionalContent/**', { eager: true })
    ) as [
        string,
        {
            default: React.FC;
        }
    ][]
).map(([_, mod]) => ({ Component: mod.default }));

export type State = ValueOf<typeof point>;

export type Props = { props: MainProps; changeContent: () => void };

export const Main = ({ props, changeContent }: Props) => {
    const [side, setSide] = useState<State>(point.left);

    function changeSide() {
        setSide((prev) => (prev === point.left ? point.right : point.left));
    }

    return (
        <div className={styles.base}>
            <div className={styles.container}>
                <div className={cx(styles.block, styles[`block__${side}`])}>
                    {props.id} {side}
                </div>
                <Button
                    onClick={() => changeSide()}
                    color="error"
                    size="medium"
                >
                    Change side
                </Button>
                <Button
                    onClick={() => changeContent()}
                    color="success"
                    size="medium"
                >
                    Change content
                </Button>
            </div>

            <div className={styles.additionalContent}>
                {side === point.right && (
                    <Suspense fallback={<div>Loading...</div>}>
                        {additionalContent.map(({ Component }, index) => (
                            <Component key={index} />
                        ))}
                    </Suspense>
                )}
            </div>
        </div>
    );
};
