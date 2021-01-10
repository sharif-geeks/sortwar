import { FormControl, InputLabel, makeStyles, Select } from "@material-ui/core";
import { MenuItem } from "electron";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {
  algorithms,
  authors,
  dataTypes,
  languages,
  modes,
  sortRanges,
} from "../../config/types";
import {
  algoAtom,
  authorAtom,
  countAtom,
  langAtom,
  modeAtom,
  typeAtom,
} from "../../recoil/atoms";

function Selectors() {
  const mode = useRecoilState(modeAtom);
  const author = useRecoilState(authorAtom);
  const type = useRecoilState(typeAtom);
  const lang = useRecoilState(langAtom);
  const algo = useRecoilState(algoAtom);
  const count = useRecoilState(countAtom);

  const classes = useStyles();

  const selects = [
    { title: "Author", state: author, items: authors },
    { title: "Language", state: lang, items: languages },
    { title: "Algorithm", state: algo, items: algorithms },
    {
      title: "Count",
      state: count,
      items: sortRanges.map((r) => ({ [r]: r })),
    },
    { title: "Data Type", state: type, items: dataTypes },
    { title: "Mode", state: mode, items: modes },
  ];

  return (
    <Container>
      {selects.map(({ title, state: [value, setter], items }, i) => (
        <FormControl variant="outlined" className={classes.formControl} key={i}>
          <InputLabel id="demo-simple-select-outlined-label">
            {title}
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={value}
            onChange={(e) => setter(e.target.value)}
            label="Age"
          >
            {Object.keys(items).map((key, i) => (
              <MenuItem value={items[key]} key={i}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </Container>
  );
}

export default Selectors;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Container = styled.div``;
