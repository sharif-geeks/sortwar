import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from "@material-ui/core";
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
import { authorHasLangs } from "../../config/vars";
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

  const selects = [
    { title: "Author", state: author, items: authors },
    { title: "Language", state: lang, items: authorHasLangs.hayyaun },
    { title: "Algorithm", state: algo, items: algorithms },
    { title: "Count", state: count, items: sortRanges },
    { title: "Data Type", state: type, items: dataTypes },
    { title: "Mode", state: mode, items: modes },
  ];

  const classes = useStyles();

  return (
    <Container>
      {selects.map(({ title, state: [value, setter], items }, i) => (
        <FormControl
          variant="outlined"
          className={classes.formControl}
          key={"form-" + i}
        >
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
            {Array.isArray(items)
              ? items.map((item, i) => (
                  <MenuItem value={item} key={"item-" + i}>
                    {item}
                  </MenuItem>
                ))
              : Object.keys(items).map((key, i) => (
                  <MenuItem value={items[key]} key={"item-" + i}>
                    {items[key]}
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
    flex: 1,
    margin: 12,
    minWidth: 120,
  },
}));

const Container = styled.div`
  position: relative;
  display: flex;
  padding-top: 8px;
  box-sizing: border-box;
`;
