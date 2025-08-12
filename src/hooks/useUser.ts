import { getUser, updateUser } from '@/service/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => updateUser(formData),
    onSuccess: () => {
      // Tự trigger fetch lại user
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.error('Update user failed:', error);
    },
  });
};

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id], // thêm id vào queryKey để React Query quản lý cache riêng theo id
    queryFn: () => getUser(id), // truyền hàm không tham số, gọi getUser với id
  });
};

