import styled from 'styled-components';
import AsyncSelect from 'react-select/async';
import colors from '~/styles/colors';

export const Select = styled(AsyncSelect).attrs({
  styles: {
    control: (provided, state) => ({
      ...provided,
      fontSize: 16,
      height: 45,
      border: state.isFocused ? '1px solid #dddddd' : '1px solid #dddddd',
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      '&:hover': {
        border: state.isFocused ? '1px solid #dddddd' : '1px solid #dddddd',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      background: state.isSelected ? colors.primary : 'null ',
      '&:hover': {
        background: 'rgba(125, 64, 231, 0.3)',
      },
    }),
    menu: provided => ({
      ...provided,
    }),
  },
  theme: theme => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: 'rgba(125, 64, 231, 0.3)',
    },
  }),
})``;
