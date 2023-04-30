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

import AlertIcon from '../../assets/img/alert-icon.svg';
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

    return (
        <ToastWrapper
            isOpen={toastType.open}
            toastType={toastType.type}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <ToastHeader>
                <IconTitleWrapper>
                    {toastType.type === 'success' && (
                        <Icon src={ApproveIcon} alt="imgApprove" />
                    )}
                    {toastType.type === 'error' && <Icon src={ErrorIcon} alt="imgError" />}
                    {toastType.type === 'alert' && <Icon src={AlertIcon} alt="imgAlert" />}
                    {toastType.type === 'success' && <Title>Success</Title>}
                    {toastType.type === 'error' && <Title>Error</Title>}
                    {toastType.type === 'alert' && <Title>Alert</Title>}
                </IconTitleWrapper>

                <XButton
                    src={xButtonIcon}
                    alt="xButton"
                    width="15px"
                    height="15px"

                    onClick={() => handleClose()}
                />
            </ToastHeader>

            <ContentWrapper>
                {toastType.message}
            </ContentWrapper>
            {/* <TimerBar remainingTime={remainingTime} totalTime={5000} toastType={toastType.type} /> */}
        </ToastWrapper>
    );
};

export default Toast;
