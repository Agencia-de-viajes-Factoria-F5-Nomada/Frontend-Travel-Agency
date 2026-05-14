import { classNames } from '../../services/classNames'

const VARIANT_STYLES = {
  subtle: {
    header: {
      row: '',
      cell: 'py-3 text-xs uppercase tracking-wide text-ink-muted font-normal',
    },
    body: {
      row: 'border-t border-surface-700 text-ink-soft',
      cell: 'py-4',
    },
  },
  branded: {
    header: {
      row: 'bg-brand-400',
      cell: 'px-5 py-3 font-semibold text-white text-xs uppercase tracking-wide',
      first: 'rounded-l-full',
      last: 'rounded-r-full',
    },
    body: {
      row: 'text-brand-200',
      cell: 'border-b border-brand-500/30 px-5 py-3',
    },
  },
}

const Table = ({ columns, data, variant = 'subtle', minWidth = '640px', className }) => {
  const styles = VARIANT_STYLES[variant]

  return (
    <div className={classNames('overflow-x-auto', className)}>
      <table className="w-full text-left text-sm" style={{ minWidth }}>
        <thead>
          <tr className={styles.header.row}>
            {columns.map((col, i) => (
              <th
                key={col.key}
                scope="col"
                className={classNames(
                  styles.header.cell,
                  col.align === 'right' && 'text-right',
                  i === 0 && styles.header.first,
                  i === columns.length - 1 && styles.header.last,
                  col.headerClassName,
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={row.id ?? rowIdx} className={styles.body.row}>
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={classNames(
                    styles.body.cell,
                    col.align === 'right' && 'text-right',
                    col.className,
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
