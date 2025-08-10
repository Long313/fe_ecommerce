import { ChangePasswordType } from '@/common/type';
import { changePassword } from '@/service/forgot-password';
import { useMutation } from '@tanstack/react-query';

export const useChangePassword = () => {
    return useMutation({
        mutationFn: (body: ChangePasswordType) => changePassword(body),
        onError: (error) => {
            console.error('Change password failed:', error);
        },
    });
};


