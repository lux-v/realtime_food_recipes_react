import { useCallback, useEffect, useState } from 'react';
import {
    Toast as ToastWrapper,
    ToastHeader,
    IconTitleWrapper,
    Icon,
    Title,
    ContentWrapper,
    XButton,
    TimerBar,
} from './ToastStyle';

import AlertIcon from '../../assets/icons/alert-icon.svg';
import ApproveIcon from '../../assets/img/approve-icon.svg';
import ErrorIcon from '../../assets/img/error-icon.svg';
import xButtonIcon from '../../assets/img/x-icon.svg';

let intervalId = null;
let intervalRemainingTimeId = null;


const Toast = ({ toastType, setToastType }) => {
    const [remainingTime, setRemainingTime] = useState(5000)


    const handleMouseEnter = () => {
        clearInterval(intervalId)
        clearInterval(intervalRemainingTimeId)
    }

    const handleMouseLeave = () => {
        startTimer()
    }

    const resetIntervalValues = () => {
        clearInterval(intervalId)
        clearInterval(intervalRemainingTimeId)
        setTimeout(() => {
            setRemainingTime(5000)
        }, 500);
    }

    const handleClose = useCallback(
        () => {
            resetIntervalValues()

            setToastType({
                ...toastType,
                open: false,
            })
        },
        [intervalId, intervalRemainingTimeId],
    )


    const startTimer = () => {
        if (toastType.open) {
            intervalId = setInterval(() => {
                setToastType({
                    ...toastType,
                    open: false,
                })
            }, remainingTime);

            intervalRemainingTimeId = setInterval(() => {
                intervalRemainingTimeId !== null &&
                    setRemainingTime(value => value - 5)
            }, 5);


        } else {
            resetIntervalValues()
        }
    }

    useEffect(() => {
        startTimer()

    }, [toastType.open, setToastType])






    const [toastWidth, setToastWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const toastElement = document.getElementById('toastElement');
            if (toastElement) {
                const width = toastElement.offsetWidth;
                setToastWidth(width);
            }
        };

        handleResize(); // Initial width calculation

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <ToastWrapper
            id="toastElement"
            isOpen={toastType.open}
            toastType={toastType.type}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            toastWidth={toastWidth}
        >
            {toastType.isHeader &&
                <ToastHeader>

                    <IconTitleWrapper>
                        {toastType.type === 'success' && (
                            <Icon src={ApproveIcon} alt="imgApprove" />
                        )}
                        {toastType.type === 'error' && <Icon src={ErrorIcon} alt="imgError" />}
                        {toastType.type === 'alert' && <Icon src={AlertIcon} alt="imgAlert" />}
                        {toastType.type === "info" && <Title>Info</Title>}

                    </IconTitleWrapper>

                    <XButton
                        src={xButtonIcon}
                        alt="xButton"
                        width="12px"
                        height="12px"

                        onClick={() => handleClose()}
                    />
                </ToastHeader>
            }

            <ContentWrapper>
                {toastType.message}
            </ContentWrapper>
            {/* <TimerBar remainingTime={remainingTime} totalTime={5000} toastType={toastType.type} /> */}
        </ToastWrapper>
    );
};

export default Toast;
