import { useEffect } from 'react';
import {
    Toast as ToastWrapper,
    Icon,
    Content,
    Title,
    ContentWrapper,
    XButton,
} from './ToastStyle';

import AlertIcon from '../../assets/img/alert-icon.svg';
import ApproveIcon from '../../assets/img/approve-icon.svg';
import ErrorIcon from '../../assets/img/error-icon.svg';
import xButtonIcon from '../../assets/img/xButton-icon.svg';

const Toast = ({ toastType, setToastType }) => {
    useEffect(() => {
        if (toastType.open === true) {
            setTimeout(() => {
                setToastType({
                    ...toastType,
                    open: false,
                });
            }, 3500);
        }
    }, [toastType, setToastType]);

    return (
        <ToastWrapper isOpen={toastType.open}>
            {toastType.type === 'success' && (
                <Icon src={ApproveIcon} alt="imgApprove" />
            )}
            {toastType.type === 'error' && <Icon src={ErrorIcon} alt="imgError" />}
            {toastType.type === 'alert' && <Icon src={AlertIcon} alt="imgAlert" />}
            <ContentWrapper>
                {toastType.type === 'success' && <Title>Successfully Message</Title>}
                {toastType.type === 'error' && <Title>Error Message</Title>}
                {toastType.type === 'alert' && <Title>Alert Message</Title>}
                <Content>{toastType.message}</Content>
            </ContentWrapper>
            <XButton
                src={xButtonIcon}
                alt="xButton"
                onClick={() => setToastType({ ...toastType, open: false })}
            />
        </ToastWrapper>
    );
};

export default Toast;
