import React from 'react';
import { render, cleanup } from 'tests';

import CardCount from './CardCount';

afterEach(cleanup);

test('<CardCount /> - Testando passar todas as props para exibir o PercentageNumber', () => {
    const label = 'Minha label';
    const icon = ['fab', 'facebook'];
    const breakLine = false;
    const evolution = 12;

    const { getByTestId, queryByTestId } = render(
        <CardCount evolution={evolution} label={label} icon={icon} breakLine={breakLine} />,
    );

    expect(getByTestId('tinyLabel')).toHaveTextContent(label);
    expect(getByTestId('tinyLabel')).toHaveStyle('white-space: nowrap');
    expect(getByTestId('percentageWithoutTooltip')).toHaveTextContent('12.00%');
    expect(queryByTestId('iconUp')).toBeTruthy();
    expect(queryByTestId('percentageWithTooltip')).toBeFalsy();
    expect(getByTestId('labelIcon')).toHaveAttribute('data-icon', 'facebook');
});

test('<CardCount /> - Testando passar todas as props para exibir o PercentageWithTooltip', () => {
    const showPercentageWithTooltip = true;
    const item = {
        evolution: 1,
        compared_value: 12,
        name: 'test',
    };
    const data = {
        compared_period_start: new Date('January 01, 2020'),
        compared_period_end: new Date('January 01, 2020'),
    };

    const { getByTestId, queryByTestId } = render(
        <CardCount item={item} data={data} showPercentageWithTooltip={showPercentageWithTooltip} />,
    );

    expect(getByTestId('toolTipContent')).toHaveTextContent('January 1, 2020 - January 1, 2020 undefined de 12');
    expect(queryByTestId('percentageWithoutTooltip')).toBeFalsy();
});

test('<CardCount /> - Testando não passar nenhuma prop', () => {
    const { queryByTestId } = render(<CardCount />);

    expect(queryByTestId('tinyLabel')).toBeFalsy();
    expect(queryByTestId('labelIcon')).toBeFalsy();
    expect(queryByTestId('percentageWithoutTooltip')).toBeFalsy();
    expect(queryByTestId('percentageWithTooltip')).toBeFalsy();
});

test('<CardCount /> - Testando passar algumas props', () => {
    const label = 'Minha label';
    const { getByTestId, queryByTestId } = render(<CardCount label={label} />);

    expect(getByTestId('tinyLabel')).toHaveTextContent(label);
    expect(queryByTestId('labelIcon')).toBeFalsy();
    expect(queryByTestId('percentageWithoutTooltip')).toBeFalsy();
    expect(queryByTestId('percentageWithTooltip')).toBeFalsy();
});
