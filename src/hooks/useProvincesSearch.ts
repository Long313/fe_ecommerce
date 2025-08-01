import { ParamsSearchProvincesType, ProvincesProps } from '@/common/type';
import { searchCity, searchDistrict, searchWard } from '@/service/provinces';
import { useQuery, useQueryClient } from '@tanstack/react-query';

type ProvincesSearchResponse = {
    total: number;
    data: ProvincesProps[];
    code: string;
};

export const useCitySearch = (params: ParamsSearchProvincesType) => {
    const queryClient = useQueryClient();

    return useQuery<ProvincesSearchResponse>({
        queryKey: ['city-search', params],
        queryFn: () => searchCity(params),
        staleTime: 1000 * 60 * 3,
        refetchOnWindowFocus: false,
        placeholderData: () => {
            const previous = queryClient.getQueryData<ProvincesSearchResponse>(['city-search', params]);
            return previous;
        }
    });
};

export const useDistrictSearch = (id: string,params: ParamsSearchProvincesType) => {
    const queryClient = useQueryClient();

    return useQuery<ProvincesSearchResponse>({
        queryKey: ['district-search', params],
        queryFn: () => searchDistrict(id,params),
        staleTime: 1000 * 60 * 3,
        refetchOnWindowFocus: false,
        placeholderData: () => {
            const previous = queryClient.getQueryData<ProvincesSearchResponse>(['district-search', params]);
            return previous;
        }
    });
};

export const useWardSearch = (id: string,params: ParamsSearchProvincesType) => {
    const queryClient = useQueryClient();

    return useQuery<ProvincesSearchResponse>({
        queryKey: ['ward-search', params],
        queryFn: () => searchWard(id,params),
        staleTime: 1000 * 60 * 3,
        refetchOnWindowFocus: false,
        placeholderData: () => {
            const previous = queryClient.getQueryData<ProvincesSearchResponse>(['ward-search', params]);
            return previous;
        }
    });
};
