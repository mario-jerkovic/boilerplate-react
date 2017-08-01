import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Button from '../Button';
import styles from './styles.scss';

class Pagination extends React.PureComponent {

    static propTypes = {
        numberOfPages: PropTypes.number.isRequired,
        currentPage: PropTypes.number,
        pageStep: PropTypes.number,
        onNextPage: PropTypes.func,
        onPreviousPage: PropTypes.func,
    };

    static defaultProps = {
        currentPage: 1,
        pageStep: 2,
        onNextPage: () => {},
        onPreviousPage: () => {},
    };

    constructor(props) {
        super(props);

        this.state = {
            currentPage: props.currentPage,
        };
    }

    getStartEndPage() {
        const { currentPage } = this.state;
        const { numberOfPages, pageStep } = this.props;
        const maxButtonsCount = (pageStep * 2) + 1;

        let start = 1;
        let end = maxButtonsCount > numberOfPages ? numberOfPages : maxButtonsCount;

        if ((currentPage + pageStep) > numberOfPages) {
            start = (numberOfPages - end) + 1;
            end = numberOfPages;
        } else if (currentPage > pageStep) {
            start = currentPage - pageStep;
            end = currentPage + pageStep;
        }

        return { start, end };
    }

    setCurrentPage(oldCurrentPage, newCurrentPage) {
        this.setState(() => ({ currentPage: newCurrentPage }), () => {
            const direction = oldCurrentPage - this.state.currentPage > 0;

            if (direction) {
                this.props.onPreviousPage();
            } else {
                this.props.onNextPage();
            }
        });
    }

    render() {
        const pageButtons = [];

        const { currentPage } = this.state;
        const { numberOfPages, ...other } = this.props;
        const { start, end } = this.getStartEndPage();
        const className = classNames(styles.paginationContainer, other.className);

        for (let index = start; index <= end; index++) { // eslint-disable-line
            const buttonClassName = classNames(styles.pageButton, {
                [styles.selected]: currentPage === index,
            });

            pageButtons.push(
                <Button
                    key={index}
                    label={String(index)}
                    className={buttonClassName}
                    onClick={() => {
                        this.setCurrentPage(currentPage, index);
                    }}
                />,
            );
        }

        const isPrevDisabled = currentPage <= 1;
        const isNextDisabled = currentPage >= numberOfPages;
        return (
            <div className={className}>
                <Button
                    label="Previous"
                    disabled={isPrevDisabled}
                    onClick={() => {
                        this.setCurrentPage(currentPage, currentPage - 1);
                    }}
                />
                {pageButtons}
                <Button
                    label="Next"
                    disabled={isNextDisabled}
                    onClick={() => {
                        this.setCurrentPage(currentPage, currentPage + 1);
                    }}
                />
            </div>
        );
    }
}

export default Pagination;
