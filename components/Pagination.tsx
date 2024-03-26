import React from 'react'
 
import { Pagination } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles'
 import { useStyles } from '../utils/muiStyled'

export default function BasicPagination() {
  const classes = useStyles()

  const [page, setPage] = React.useState(1)
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  return (
    <>
      <div>page : {page}</div>
      <Pagination
        page={page}
        onChange={handleChange}
        count={10}
        variant="outlined"
        shape="rounded"
        classes={{ ul: classes.newStyles }}
      />
    </>
  )
}
