import React from 'react';
import { SearchBar } from '../../lib/style/generalStyles';

const RecipesSearchBar = ({ callback }) => {
	return (
		<SearchBar
			placeholder='Search name or description'
			onChange={callback}
		/>
	);
};

export default RecipesSearchBar;
