import React from 'react';

import styles from './button.module.scss';

export type Props = {
    onClick: () => void;
};

export const Button = ({ onClick }: Props) => {
    return (
        <button className={styles.base} onClick={onClick}>
            click
        </button>
    );
};
