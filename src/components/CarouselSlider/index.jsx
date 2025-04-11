// Packages
import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import cx from 'classnames';
// Styles
import { Pagination, Navigation } from 'swiper';

import styles from './CarouselSlider.module.scss';

const Slide = ({
    className,
    children,
    speed,
    shouldAllowTransitions,
    prevSlideProps,
    nextSlideProps,
    activeSlideProps,
    isActive,
    isNext,
    isPrev,
}) => {
    const getExtraProps = () => {
        if (isActive) return { ...activeSlideProps };
        if (isPrev) return { ...prevSlideProps };
        if (isNext) return { ...nextSlideProps };
        return {};
    };
    const extraProps = getExtraProps();

    return (
        <div
            {...extraProps}
            style={{ transitionDuration: `${speed}ms` }}
            className={cx(styles.slide, className, extraProps.className, {
                [styles.noTransitions]: !shouldAllowTransitions,
            })}>
            {children}
        </div>
    );
};

const DefaultControls = ({
    prevRef,
    nextRef,
    className,
    classNamePrev,
    classNameNext,
    ...restProps
}) => {
    return (
        <>
            <button
                {...restProps}
                ref={prevRef}
                className={cx(
                    styles.control,
                    styles.controlPrev,
                    className,
                    classNamePrev
                )}
            >Previous</button>
            <button
                {...restProps}
                ref={nextRef}
                className={cx(
                    styles.control,
                    styles.controlNext,
                    className,
                    classNameNext
                )}
            >Next</button>
        </>
    );
};

export default function CaraouselSlider({
    children = [],
    showControls = true,
    prevRefCustom,
    nextRefCustom,
    onBeforeInit = () => undefined,
    onBreakpoint = () => undefined,
    speed = 300,
    slideProps,
    controlProps,
    containerProps,
    paginationRefCustom,
    paginationProps,
    _ref,
    className,
    modules = [],
    threshold = 5,
    ...restProps
}) {
    const prevRefDefault = useRef(null);
    const nextRefDefault = useRef(null);
    const paginationRefDefualt = useRef(null);

    const prevRef = prevRefCustom ?? prevRefDefault;
    const nextRef = nextRefCustom ?? nextRefDefault;
    const paginationRef = paginationRefCustom ?? paginationRefDefualt;

    const [shouldAllowTransitions, setShouldAllowTransitions] = useState(false);
    const [slideTransitionSpeed, setSlideTransitionSpeed] = useState(speed);

    useEffect(() => {
        const timeOut = setTimeout(setShouldAllowTransitions, 0, true);
        return () => {
            clearTimeout(timeOut);
        };
    }, []);

    const hasCustomControls = prevRefCustom || nextRefCustom;
    const isUsingDefaultControls = showControls && !hasCustomControls;

    const swiperProps = {
        ...restProps,
        className: cx(
            styles.swiper,
            { [styles.withDefaultControls]: isUsingDefaultControls },
            className
        ),
        ref: _ref,
        speed,
        threshold,
        onBreakpoint: (swiper, breakpointParams) => {
            onBreakpoint(swiper, breakpointParams);
            setSlideTransitionSpeed(breakpointParams.speed);
        },
        navigation: {
            prevEl: prevRef?.current,
            nextEl: nextRef?.current,
        },
        onBeforeInit: (swiper) => {
            onBeforeInit(swiper);
            setSlideTransitionSpeed(swiper.params.speed);
        },
        pagination: {
            ...paginationProps,
            el: paginationRef.current,
            clickable: true,
        },
        modules: [Navigation, Pagination, ...modules],
    };

    const defaultControlsProps = {
        ...controlProps,
        prevRef: prevRefDefault,
        nextRef: nextRefDefault,
    };

    const _slideProps = {
        ...slideProps,
        shouldAllowTransitions,
        speed: slideTransitionSpeed,
    };

    return (
        <div
            {...containerProps}
            className={cx(styles.container, containerProps?.className)}>
            {isUsingDefaultControls && <DefaultControls {...defaultControlsProps} />}
            <Swiper {...swiperProps} className={styles.swiperContianer}>
                {React.Children.map(children, (child, i) => (
                    <SwiperSlide key={i} virtualIndex={i}>
                        {(currentSlideProps) => (
                            <Slide {..._slideProps} {...currentSlideProps}>
                                {child}
                            </Slide>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
            {paginationProps?.enabled && (
                <div
                    ref={paginationRef}
                    aria-label="Slider Pagination"
                    className={cx('swiper-pagination', styles.customPagination)}
                    role="tablist"
                />
            )}
        </div>
    );
}


