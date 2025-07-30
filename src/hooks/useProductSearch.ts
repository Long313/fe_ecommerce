import { useQuery, useQueryClient } from '@tanstack/react-query';
import { searchProductByName } from '@/service/product';
import { ProductProps } from '@/common/type';

type ProductSearchResponse = {
  status: number;
  data: ProductProps[];
};

export const useProductSearch = (params: Record<string, string | number>) => {
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
