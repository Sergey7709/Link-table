import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css';
import { useState } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_PaginationState,
  type MRT_SortingState,
} from 'mantine-react-table';
import { useGetData } from '@/service/hooks/useGetData';
import { dataColumns } from './constants';

export const Table = () => {
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const { data, isError, isFetching, isLoading, error } = useGetData({
    pagination,
    sorting,
  });

  const fetchedLink = data?.data ?? [];

  const totalCount = Number(data?.headers['x-total-count']);

  const table = useMantineReactTable({
    columns: dataColumns,
    data: fetchedLink,
    enableGlobalFilter: false,
    enableFilters: false,
    enableColumnActions: true,
    enablePagination: true,
    manualPagination: true,
    manualSorting: true,
    enableTopToolbar: true,
    enableDensityToggle: false,
    enableBottomToolbar: true,
    enableClickToCopy: true,
    rowCount: totalCount,
    mantineToolbarAlertBannerProps: isError
      ? {
          color: 'red',
          children: `Error loading data.  ${error?.message}`,
        }
      : undefined,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isFetching,
      sorting,
    },
  });
  return <MantineReactTable table={table} />;
};
