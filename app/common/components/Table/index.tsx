import type { ReactNode } from "react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { cn } from "../../utils/utils";
import SortIcon from "@fareeds-remix-app/common/assets/icons/chevron-selector-vertical-icon.svg";
import type { SelectProps } from "../Select";
import Select from "../Select";
import { twMerge } from "tailwind-merge";

type DataColumnProps<T> = {
  width?: string;
  header: ReactNode;
  value: keyof T;
  id?: string;
  accessor?: string;
  sortable?: boolean;
};

type TemplateColumnProps<T> = {
  width?: string;
  header: ReactNode;
  type: "template";
  value: (value: T) => ReactNode;
  id?: string;
  accessor?: string;
  sortable?: boolean;
};

export type TemplateExpandRowProps<T> = {
  id: string | number;
  getId: (value: T) => string | number;
  value: (value: T) => ReactNode;
  rowExpandClassName?: (value: T) => string;
};

function isTemplateColumn<T>(
  column: ColumnProps<T>
): column is TemplateColumnProps<T> {
  return "type" in column && column.type === "template";
}

export type ColumnProps<T> = DataColumnProps<T> | TemplateColumnProps<T>;

export type TableProps<T> = {
  columns: ColumnProps<T>[];
  expandRows?: TemplateExpandRowProps<T>[];
  data: T[];
  externalClasses?: string;
  theadClasses?: string;
  tbodyClasses?: string;
  showCount?: boolean;
  pagination?: boolean;
  onClick?: (row: T) => void;
  onRowDblClick?: (row: T) => void;
  paginationClassName?: string;
  itemsPerPage?: Partial<SelectProps>;
  emptyTextClassName?: string;
  externalSortIcon?: JSX.Element;
  countClassName?: string;
  className?: string;
  itemsPerPageClassName?: string;
};

const SortIconImage = () => {
  return <img src={SortIcon} alt="sort" className="inline-block" />;
};

// This is basic table implementation
const Table = <T,>({
  columns,
  data,
  externalClasses,
  theadClasses,
  tbodyClasses,
  showCount,
  pagination,
  onClick,
  onRowDblClick,
  paginationClassName,
  itemsPerPage,
  emptyTextClassName,
  externalSortIcon,
  countClassName,
  className,
  expandRows,
  itemsPerPageClassName,
}: TableProps<T>) => {
  const [tableData, setTableData] = useState<T[]>(data);
  const [isAscending, setIsAscending] = useState(true);
  const [isExpandRowId, setIsExpandRowId] = useState<number | string | null>(
    null
  );

  const handleRowClick = useCallback(
    (row: T, rowId: number | string | undefined) => {
      if (onClick) {
        onClick(row);
      }

      if (!rowId) {
        return;
      }

      expandRows && rowId === isExpandRowId
        ? setIsExpandRowId(null)
        : setIsExpandRowId(rowId);
    },
    [expandRows, isExpandRowId, onClick]
  );

  useEffect(() => setTableData(data), [data]);
  const getCellValue = (row: T, column: ColumnProps<T>): ReactNode => {
    if (isTemplateColumn(column)) {
      return column.value(row);
    }

    return row?.[column?.value] as ReactNode;
  };

  const getExpandValue = (
    row: T,
    rowExpand: TemplateExpandRowProps<T>
  ): ReactNode => {
    return rowExpand.value(row);
  };

  const sortMethod = (column: ColumnProps<T>) => {
    const key = isTemplateColumn(column) ? column.accessor : column.value;
    if (key) {
      setIsAscending(!isAscending);
      let sortedData: T[] = tableData;
      sortedData = sortedData.sort((a: T, b: T) => {
        const currentKey = a[key as keyof T] as string | number;
        const prevsKey = b[key as keyof T] as string | number;
        if (typeof currentKey === "string" && typeof prevsKey === "string")
          return isAscending
            ? currentKey.localeCompare(prevsKey)
            : prevsKey.localeCompare(currentKey);
        else
          return isAscending
            ? (currentKey as number) - (prevsKey as number)
            : (prevsKey as number) - (currentKey as number);
      });

      setTableData(sortedData);
    }
  };

  const isColumnSortEnabled = (column: ColumnProps<T>) =>
    isTemplateColumn(column)
      ? column.accessor && column.sortable
      : column.sortable;

  return (
    <>
      <div className="w-full overflow-x-auto lg:overflow-x-none">
        <table className={cn("w-full", externalClasses)}>
          <thead
            className={cn(
              "font-Calibri text-[8px] md:text-sm font-bold uppercase text-zinc-400",
              theadClasses
            )}
          >
            <tr>
              {columns.map((column, idx) => (
                <th
                  className={cn(
                    "px-2.5 lg:w-auto w-[100px] lg:px-0 py-1 lg:py-3 text-[9px] lg:text-sm whitespace-nowrap",
                    isColumnSortEnabled(column) ? "cursor-pointer" : ""
                  )}
                  style={{ width: column?.width }}
                  key={column.id ?? idx}
                  onClick={() =>
                    isColumnSortEnabled(column) ? sortMethod(column) : {}
                  }
                >
                  {column.header}
                  {isColumnSortEnabled(column) && externalSortIcon ? (
                    externalSortIcon
                  ) : isColumnSortEnabled(column) ? (
                    <SortIconImage />
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            className={cn("text-sm text-zinc-400 text-center", tbodyClasses)}
          >
            {tableData.map((row, idx) => {
              const expandRowData = expandRows?.find(
                (expandRow) => expandRow.getId(row) === expandRow.id
              );

              return (
                <Fragment key={`row-${idx}`}>
                  <tr
                    onClick={() => handleRowClick(row, expandRowData?.id)}
                    onDoubleClick={() => onRowDblClick?.(row)}
                    className={expandRowData?.rowExpandClassName?.(row)}
                  >
                    {columns.map((column, idx) => (
                      <td
                        className="py-2 lg:py-3 text-[8px] lg:text-sm"
                        style={{ width: column?.width }}
                        key={`row-${idx}-column-${column.id ?? idx}`}
                      >
                        {getCellValue(row, column)}
                      </td>
                    ))}
                  </tr>
                  {expandRowData?.id === isExpandRowId && (
                    <tr>
                      <td colSpan={columns.length} className="!p-0">
                        {getExpandValue(row, expandRowData)}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
        {data.length === 0 && (
          <div
            className={twMerge(
              "text-black text-sm font-light px-6 mt-3",
              emptyTextClassName
            )}
          >
            No data available in table
          </div>
        )}
        <div className="flex justify-between items-center mt-5 lg:mb-0 mb-4">
          {showCount && (
            <p
              className={twMerge(
                "text-xs sm:text-base font-light mt-5",
                countClassName
              )}
            >
              Showing 1 to 10 of {data?.length} entries
            </p>
          )}
          {itemsPerPage && (
            <div
              className={cn(
                "flex items-center text-white",
                itemsPerPageClassName
              )}
            >
              <p className="font-Calibri text-sm font-normal mt-1 mr-1">View</p>
              <Select
                {...itemsPerPage}
                className="w-0"
                labelClassName="hidden"
              />
              <p className="font-Rubib text-sm font-normal ml-12">
                Items per page
              </p>
            </div>
          )}
          {pagination && (
            <div
              className={cn(
                "flex gap-[30px] items-center !mt-0",
                paginationClassName
              )}
            >
              <p className="text-xs sm:text-base font-light ">Previous</p>
              <p className="text-xs sm:text-base font-light">Next</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Table;
