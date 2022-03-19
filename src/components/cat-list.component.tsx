import { AxiosResponse } from "axios";
import { Component, ChangeEvent } from "react";
import { getBreeds } from "../service/cat.service";
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import NativeSelect from "@mui/material/NativeSelect";
import { InputLabel } from "@mui/material";

type Props = {};
type State = {
  breeds: Breed[]
};

export class CatListComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    
    this.loadData = this.loadData.bind(this);
    
    this.state = {
      breeds: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    getBreeds().then((response: AxiosResponse<any>) => {
      this.setState({
        breeds: response.data
      })
    }).catch((e: Error) => {
      console.log(e);
    });
  }

  renderOption(opt: Breed) {
    return (<MenuItem value={opt.id}>{opt.name}</MenuItem>);
  }

  handleChange(e: SelectChangeEvent<string>) {
  }

  renderSearch() {
    const { breeds } = this.state
    
    return (
      <FormControl fullWidth>
        <InputLabel id="select-input">Breed</InputLabel>
        <Select
          labelId="select-input"
          defaultValue={breeds[0].id}
          inputProps={{
            name: 'breed',
            id: 'breed-select',
          }}
        >
          {breeds.map(breed => this.renderOption(breed))}
        </Select>
      </FormControl>
    );
  }

  renderLoading() {
    return (
      <div>Loading...</div>
    );
  }

  render() {

    const { breeds } = this.state;
    
    return (
      <div>{breeds.length > 0 ? this.renderSearch() : this.renderLoading()}</div>
    );
  }
}

interface Breed {
  id: string;
  name: string;
}