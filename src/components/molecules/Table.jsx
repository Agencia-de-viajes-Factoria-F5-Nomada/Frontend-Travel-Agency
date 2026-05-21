import { classNames } from '../../utils/classNames'
import LoadingSpinner from '../atoms/LoadingSpinner'

const Table = ({
  columns = [],
  data = [],
  onRowClick,
  emptyMessage = 'No hay datos',
  loading = false,
  striped = false,
  hoverable = true,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!data.length) {
    return (
      <div className="py-12 text-center text-ink-muted">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-surface-700/40">
      <table className="w-full min-w-max">
        <thead>
          <tr className="bg-brand-200/50">
            {columns.map((col) => (
              <th
                key={col.key}
                className={classNames(
                  'px-4 py-3 text-left text-sm font-semibold text-white whitespace-nowrap',
                  col.align === 'center' && 'text-center',
                  col.align === 'right' && 'text-right',
                  col.sticky && 'sticky right-0 bg-surface-800 z-10',
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={row.id || idx}
              className={classNames(
                striped ? (idx % 2 === 0 ? 'bg-white' : 'bg-surface-950/20') : undefined,
                hoverable && 'hover:bg-brand-100/40 transition-colors',
                onRowClick && 'cursor-pointer',
              )}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={classNames(
                    'px-4 py-3 text-sm text-ink-soft whitespace-nowrap',
                    col.align === 'center' && 'text-center',
                    col.align === 'right' && 'text-right',
                    col.sticky && 'sticky right-0 bg-surface-900 z-10',
                  )}
                >
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table