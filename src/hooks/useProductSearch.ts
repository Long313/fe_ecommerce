import { ParamsSearchType, ProductDetailProps } from '@/common/type';
import { createNewProduct, searchProductByName } from '@/service/product';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type ProductSearchResponse = {
  status: number;
  data: ProductDetailProps[];
  pagination: {
    total: number
  }
};

export const useProductSearch = (params: ParamsSearchType) => {
  const queryClient = useQueryClient();

  return useQuery<ProductSearchResponse>({
    queryKey: ['product-search', params],
    queryFn: () => searchProductByName(params),
    staleTime: 1000 * 60 * 3,
    refetchOnWindowFocus: false,

    // ✅ Sử dụng placeholderData để giữ data cũ
    placeholderData: () => {
      // Lấy dữ liệu từ query trước đó (nếu có)
      const previous = queryClient.getQueryData<ProductSearchResponse>(['product-search', params]);
      return previous;
    }
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => createNewProduct(formData),

    onSuccess: () => {
      // ✅ Xóa cache để lần sau refetch danh sách
      queryClient.invalidateQueries({ queryKey: ['product-create'] });
    },

    onError: (error) => {
      console.error('Create product failed:', error);
    },
  });
};

// export const useDeleteProduct = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (id: string) => deleteProduct(id),

//     onSuccess: () => {
//       // ✅ Xóa cache để lần sau refetch danh sách
//       queryClient.invalidateQueries({ queryKey: ['product-delete'] });
//     },

//     onError: (error) => {
//       console.error('Delete product failed:', error);
//     },
//   });
// };
