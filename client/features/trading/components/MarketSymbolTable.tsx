import React, { useEffect, useState } from 'react'
import { useTable, useSortBy } from 'react-table'
import { fetchActiveSymbols } from '../services/Symbols'

interface MarketSymbolTableProps {
  onSelectSymbol: (symbol: string) => void // Pass a callback for symbol selection
}

const MarketSymbolTable: React.FC<MarketSymbolTableProps> = ({
  onSelectSymbol,
}) => {
  const [symbols, setSymbols] = useState<symbol[]>([])
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null) // Track selected row

  // Fetch symbols once on component mount
  useEffect(() => {
    const initializeSymbols = async () => {
      try {
        const activeSymbols = await fetchActiveSymbols()
        setSymbols(activeSymbols)
      } catch (error) {
        console.error('Error fetching symbols:', error)
      }
    }

    initializeSymbols()
  }, [])

  // Define columns for each property in the Symbol model
  const columns = React.useMemo(
    () => [
      { Header: 'Symbol', accessor: 'symbol' },
      { Header: 'Display Name', accessor: 'display_name' },
      { Header: 'Market', accessor: 'market' },
      { Header: 'Market Display Name', accessor: 'market_display_name' },
      { Header: 'Submarket', accessor: 'submarket' },
      { Header: 'Submarket Display Name', accessor: 'submarket_display_name' },
      { Header: 'Subgroup', accessor: 'subgroup' },
      { Header: 'Subgroup Display Name', accessor: 'subgroup_display_name' },
      { Header: 'Symbol Type', accessor: 'symbol_type' },
      { Header: 'Allow Forward Starting', accessor: 'allow_forward_starting' },
      { Header: 'Display Order', accessor: 'display_order' },
      { Header: 'Exchange Is Open', accessor: 'exchange_is_open' },
      { Header: 'Is Trading Suspended', accessor: 'is_trading_suspended' },
      { Header: 'Pip', accessor: 'pip' },
    ],
    [],
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: symbols }, useSortBy)

  const handleRowClick = (symbol: string) => {
    setSelectedSymbol(symbol) // Update the selected row
    onSelectSymbol(symbol) // Trigger the callback to display chart
  }

  return (
    <table {...getTableProps()} style={tableStyle}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                key={column.id}
                style={headerStyle}
              >
                {column.render('Header')}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr
              {...row.getRowProps()}
              key={row.id}
              onClick={() => handleRowClick(row.original.symbol)} // Handle row click
              style={{
                ...rowStyle,
                backgroundColor:
                  row.original.symbol === selectedSymbol
                    ? '#004d00'
                    : 'transparent', // Highlight selected row
              }}
            >
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  key={cell.column.id}
                  style={cellStyle}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: '#000', // Black background
  color: '#0f0', // Neon green text
  border: '2px solid #00ff00', // Neon green border
}

const headerStyle: React.CSSProperties = {
  padding: '10px',
  borderBottom: '3px solid #0f0', // Neon green underline
  backgroundColor: '#001a00', // Dark green for headers
  color: '#00ff00', // Neon green text for headers
  fontWeight: 'bold',
  fontSize: '18px',
  textAlign: 'left',
  cursor: 'pointer', // Add cursor pointer to show headers are clickable for sorting
}

const rowStyle: React.CSSProperties = {
  cursor: 'pointer', // Change mouse cursor to pointer when hovering over rows
}

const cellStyle: React.CSSProperties = {
  padding: '10px',
  border: '1px solid #00ff00', // Neon green border
  backgroundColor: '#001a00', // Dark green background for cells
  color: '#0f0', // Neon green text for cells
  fontSize: '16px',
}

export default MarketSymbolTable
