import { DataGrid } from "@material-ui/data-grid";
import styled from "styled-components";
import { colors } from "../../config/vars";

const cols = [
  { field: "lang", headerName: "Language", width: 130 },
  { field: "algo", headerName: "Algorithm", width: 130 },
  {
    field: "count",
    headerName: "Count",
    width: 180,
    valueFormatter: ({ value: v }) => parseInt(v).toLocaleString(),
  },
  { field: "type", headerName: "Data Type", width: 130 },
  { field: "mode", headerName: "Mode", width: 130 },
  {
    field: "time",
    headerName: "Execution Time (ms)",
    align: "right",
    headerAlign: "right",
    flex: 1,
    valueFormatter: ({ value: v }) => v.toLocaleString(),
  },
];

function TableTab({ data }) {
  const rows = data.map((datum, i) => ({ ...datum, id: i }));
  return (
    <StyledDataGrid
      rows={rows}
      columns={cols}
      hideFooterPagination
    />
  );
}

export default TableTab;

const StyledDataGrid = styled(DataGrid)`
  && {
    .MuiDataGrid-colCellTitle {
      color: ${colors.primary.main};
    }
  }
`;
