import React, { useEffect, useMemo, useRef } from 'react';
import {
  AutoSizer as _AutoSizer,
  CellMeasurer as _CellMeasurer,
  CellMeasurerCache,
  InfiniteLoader as _InfiniteLoader,
  Grid as _Grid,
  Index,
  GridCellProps,
  CellMeasurerProps,
  InfiniteLoaderProps,
  AutoSizerProps,
  GridProps,
} from 'react-virtualized';

import useBreakpoint from '../../common/hooks/useBreakpoint';
import { calculateColumnCount } from '../../common/utils/formatters';

const cache = new CellMeasurerCache({
  defaultHeight: 220,
  fixedWidth: true,
  keyMapper: () => 1,
});

export interface InfiniteLoaderGridProps {
  list: any[];
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => any;
  children: any;
  column?: number;
  minHeight?: number | string;
  measureCache?: CellMeasurerCache;
  scrollRowIndex?: number;
  onScroll?: () => void;
}

export interface CellRendererProps extends GridCellProps {
  children: any;
  columnCount: number;
}

const InfiniteLoaderGrid: React.FC<InfiniteLoaderGridProps> = ({
  children,
  measureCache,
  list,
  hasMore,
  loading,
  onLoadMore,
  column,
  minHeight,
  scrollRowIndex,
  onScroll,
}) => {
  const breakpoint = useBreakpoint();

  const isMounted = useRef(false);
  const listRef = useRef<_Grid | null>(null);

  const infiniteCache = measureCache || cache;
  const InfiniteLoader = _InfiniteLoader as unknown as React.FC<InfiniteLoaderProps>;
  const AutoSizer = _AutoSizer as unknown as React.FC<AutoSizerProps>;
  const CellMeasurer = _CellMeasurer as unknown as React.FC<CellMeasurerProps>;
  const Grid = _Grid as unknown as React.FC<GridProps>;

  const columnCount = useMemo(() => column || calculateColumnCount(breakpoint), [breakpoint]);

  const loadMoreItems = () => {
    isMounted.current = true;
    return loading ? () => Promise.resolve() : onLoadMore();
  };

  const rowCount = hasMore ? Math.ceil(list.length / columnCount) + 1 : Math.ceil(list.length / columnCount);

  const isItemLoaded = ({ index }: Index) => {
    return !!list[index * columnCount];
  };

  const cellRenderer: React.FC<CellRendererProps> = ({ children, columnCount, columnIndex, key, parent, rowIndex, style }) => {
    if (!list[columnIndex + rowIndex * columnCount]) {
      return null;
    }

    return (
      <CellMeasurer cache={infiniteCache} columnIndex={columnIndex} key={key} parent={parent} rowIndex={rowIndex}>
        <div style={style}>{children({ data: list[columnIndex + rowIndex * columnCount] })}</div>
      </CellMeasurer>
    );
  };

  const onResize = () => {
    infiniteCache.clearAll();
    if (listRef.current) {
      listRef.current.recomputeGridSize();
      listRef.current.forceUpdate();
    }
  };

  useEffect(() => {
    infiniteCache.clearAll();
    if (listRef.current) {
      listRef.current.recomputeGridSize();
      listRef.current.forceUpdate();
    }
  }, [list]);

  return (
    <InfiniteLoader isRowLoaded={isItemLoaded} loadMoreRows={loadMoreItems} rowCount={rowCount} threshold={5}>
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer style={{ minHeight: (list.length > columnCount && minHeight) || 360 }} onResize={onResize}>
          {({ width, height }) => {
            return (
              <Grid
                scrollToRow={!isMounted.current ? scrollRowIndex : undefined}
                width={width}
                height={height}
                ref={(grid: _Grid) => {
                  listRef.current = grid;
                  registerChild(grid);
                }}
                onScroll={onScroll}
                columnWidth={width / columnCount}
                columnCount={columnCount}
                rowCount={rowCount}
                rowHeight={infiniteCache.rowHeight}
                cellRenderer={(props) => cellRenderer({ children, columnCount, ...props })}
                onSectionRendered={({ rowStartIndex, rowStopIndex }) => {
                  onRowsRendered({ startIndex: rowStartIndex, stopIndex: rowStopIndex });
                }}
              />
            );
          }}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
};

export default InfiniteLoaderGrid;
